import os, sys, cv2 as cv, json
import numpy as np
extensión = ('.jpg', '.png')
folder = sys.argv[1]
baseUrl = './inspecciones/' + folder + '/'

amarillo_i = np.array([29, 0, 0], np.uint8)
amarillo_f = np.array([32, 255, 255], np.uint8)

if not (os.path.exists(baseUrl+'Analizadas')):
  os.mkdir(baseUrl+'Analizadas')
else:
  sys.stdout.write('FIN PYTHON SCRIPT ya existe carpeta Analizadas')
  # Verificar si existen imágenes!!!
  sys.exit()

for file in os.listdir(baseUrl):
  if file.endswith(extensión):
    img = cv.imread(baseUrl+file)
    assert img is not None, "file could not be read, check with os.path.exists()"
    print('ARG MIN IMAGE', img.argmin(axis=1))
    print('0,0', img[0,0,:])
    imHSV = cv.cvtColor(img, cv.COLOR_BGR2HSV)
    imGray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    mask_amarillo = cv.inRange(imHSV, amarillo_i, amarillo_f)
    contornos, _ = cv.findContours(mask_amarillo,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE)
    contornos_seleccionados = []
    i = 0
    for contorno in contornos:
      area = cv.contourArea(contorno)
      if area > 1000:
        contornos_seleccionados.append(i)
        # M = cv.moments(contorno)
        # if M["m00"]==0: M["m00"]=1
        # cx = int(M["m10"]/M["m00"])
        # cy = int(M["m01"]/M["m00"])
        # cv.circle(im, (cx, cy), 7, (0,255,0), -1)
        font = cv.FONT_HERSHEY_SIMPLEX
        # cv.putText(im, 'area:'+str(int(area)), (cx-25, cy-25), font, 0.5, (0,0,0), 2)
      i+=1

    print('im shape',img.shape[:])
    print('contornos_seleccionados', contornos_seleccionados)
    # print('primer pto de contorno_3: ',contornos[3][:][0,:,:][:])

    for i in contornos_seleccionados:
      # if i<8: continue #PARA ANALIZAR EL ÚLTIMO CONTORNO
      extremo_izq = contornos[i][contornos[i][:,:,0].argmin()][0]
      extremo_der = contornos[i][contornos[i][:,:,0].argmax()][0]
      extremo_sup = contornos[i][contornos[i][:,:,1].argmin()][0]
      extremo_inf = contornos[i][contornos[i][:,:,1].argmax()][0]

      print('********Extremos de contorno_3********')
      print('extremo_izq', extremo_izq)
      print('extremo_der', extremo_der)
      print('extremo_sup', extremo_sup)
      print('extremo_inf', extremo_inf)

      rectangle_p1 = (extremo_izq[0], extremo_sup[1])
      rectangle_p2 = (extremo_der[0], extremo_inf[1])
      print('******Puntos de Rectangulo*******')
      print('p1', rectangle_p1)
      print('p2', rectangle_p2)
      cv.rectangle(img, rectangle_p1, rectangle_p2, (0,255,0), 2)
      
      posicion_maximo_local = []
      suma = 0
      for x in range(rectangle_p1[0], rectangle_p2[0]+1):
        for y in range(rectangle_p1[1], rectangle_p2[1]+1):
          suma_gray = imGray[x,y].sum()
          # print(im[x,y,:])
          if(suma_gray>=suma): 
            suma = suma_gray
            posicion_maximo_local = [x,y]
      print('posicion_maimo_local', posicion_maximo_local, 'suma gray', suma)

      # [0] desestructura [[x,y]]
      # x,y = contornos[3][1][0]
      # print('brg', im[x, y, 0:4],'suma de brg',im[x, y, 0:4].sum())

      cv.circle(img, tuple(posicion_maximo_local), 7, (0,255,0), -1)
      cv.putText(img, 'suma gray_scale:'+str(suma), tuple(posicion_maximo_local), font, 0.5, (0,0,0), 2)

    cv.imwrite(baseUrl+'Analizadas/'+str(file), img)
  else:
    continue

    

# cv.imwrite('Camion_maximos.jpg', img)
# cv.imwrite('Camion_Gray.jpg', imGray)