import os, sys, cv2 as cv
import numpy as np
extension = ('.jpg', '.png')
folder = sys.argv[1]
baseUrl = './inspecciones/' + folder + '/'
font = cv.FONT_HERSHEY_SIMPLEX
cwd = os.getcwd()
files = os.listdir(baseUrl)
print(cwd)
print(files)

amarillo_i = np.array([27, 0, 0], np.uint8)
amarillo_f = np.array([30, 255, 255], np.uint8)

if not (os.path.exists(baseUrl+'Analizadas')):
  os.mkdir(baseUrl+'Analizadas')
  print('Se crea carpeta "Analizadas"')
else:
  Afiles = os.listdir(baseUrl+'Analizadas')
  # Verificar si existen imágenes!!!
  if Afiles.__len__()>0:
    sys.stdout.write('ya existen archivos en carpeta Analizadas')
    # sys.exit()

print('Después de IF')

for file in files:
  if file.endswith(extension):
    img = cv.imread(baseUrl+file)
    print(file)
    imHSV = cv.cvtColor(img, cv.COLOR_BGR2HSV)
    imGray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    min_val,max_val,min_indx,max_indx=cv.minMaxLoc(imGray)
    print('MIN_MAX_LOC',min_val,max_val,min_indx,max_indx)
    imShape = img.shape[:]
    print('\timg shape',img.shape[:])
    print('\timGray shape',imGray.shape[:])
    # cv.circle(img, min_indx, 7, (0,255,0), 2)
    # cv.putText(img, 'Minimo gray_scale:'+str(min_val), min_indx, font, 0.5, (0,0,0), 2)
    # Filtro por Color entre rango mínimo y máximo
    mask_amarillo = cv.inRange(imHSV, amarillo_i, amarillo_f) #FILTRO AMARILLO
    # cv.imwrite(baseUrl+'Analizadas/'+'MASK_'+str(file), mask_amarillo)
    ##########################################################################
    contornos, _ = cv.findContours(mask_amarillo,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE)
    print('\tContornos Detectados',contornos.__len__())
    contornos_seleccionados = []
    i = 0
    for contorno in contornos:
      area = cv.contourArea(contorno)
      if area > 500: contornos_seleccionados.append(i)
      i+=1
    print('\tcontornos_seleccionados', contornos_seleccionados)
    # print('Contorno 49', contornos[0])
    # cv.drawContours(img, contornos, 0, (0,255,0), 2)
    for j in contornos_seleccionados:
      extremo_izq = contornos[j][contornos[j][:,:,0].argmin()][0]
      extremo_der = contornos[j][contornos[j][:,:,0].argmax()][0]
      extremo_sup = contornos[j][contornos[j][:,:,1].argmin()][0]
      extremo_inf = contornos[j][contornos[j][:,:,1].argmax()][0]
      print('extremo X izq-der', extremo_izq, extremo_der)
      print('extremo y up-down', extremo_sup, extremo_inf)
      rectangle_p1 = (extremo_izq[0], extremo_sup[1])
      rectangle_p2 = (extremo_der[0], extremo_inf[1])
      if extremo_der[0]>imShape[1] or extremo_inf[0]>imShape[1]:
        print('Punto Rechazado')
        continue
      print('\tRectangulo', rectangle_p1, rectangle_p2)
      print('\t Dibujando Rectangulo')
      cv.rectangle(img, rectangle_p1, rectangle_p2, (0,255,0), 2)
      print('\t Rectangulo Dibujado')
      
      posicion_maximo_local = []
      suma = 0
      for x in range(rectangle_p1[0], rectangle_p2[0]+1):
        for y in range(rectangle_p1[1], rectangle_p2[1]+1):
          try:
            suma_gray = imGray[y,x].sum()
          except cv.error as error:
            print(error)
          if(suma_gray>=suma): 
            suma = suma_gray
            posicion_maximo_local = [x,y]
      print('\tdibujando circulo y texto')
      print('\tMáximo Local', posicion_maximo_local, tuple(posicion_maximo_local))
      cv.circle(img, tuple(posicion_maximo_local), 7, (0,255,0), -1)
      cv.putText(img, 'gray_scale:'+str(suma), tuple(posicion_maximo_local), font, 0.5, (0,0,0), 2)
      print('\t circulo y texto dibujados')
    print('WRITE file ')
    cv.imwrite(baseUrl+'Analizadas/'+str(file), img)

      

  else:
    print('continue')
    continue
  # print('primer pto de contorno_3: ',contornos[3][:][0,:,:][:])

sys.stdout.write('FIN PYTHON SCRIPT')
    

#     for i in contornos_seleccionados:
#       # if i<8: continue #PARA ANALIZAR EL ÚLTIMO CONTORNO
#       extremo_izq = contornos[i][contornos[i][:,:,0].argmin()][0]
#       extremo_der = contornos[i][contornos[i][:,:,0].argmax()][0]
#       extremo_sup = contornos[i][contornos[i][:,:,1].argmin()][0]
#       extremo_inf = contornos[i][contornos[i][:,:,1].argmax()][0]

#       print('********Extremos de contorno_3********')
#       print('extremo_izq', extremo_izq)
#       print('extremo_der', extremo_der)
#       print('extremo_sup', extremo_sup)
#       print('extremo_inf', extremo_inf)

#       rectangle_p1 = (extremo_izq[0], extremo_sup[1])
#       rectangle_p2 = (extremo_der[0], extremo_inf[1])
#       print('******Puntos de Rectangulo*******')
#       print('p1', rectangle_p1)
#       print('p2', rectangle_p2)
#       cv.rectangle(img, rectangle_p1, rectangle_p2, (0,255,0), 2)
      
#       posicion_maximo_local = []
#       suma = 0
#       for x in range(rectangle_p1[0], rectangle_p2[0]+1):
#         for y in range(rectangle_p1[1], rectangle_p2[1]+1):
#           suma_gray = imGray[x,y].sum()
#           # print(im[x,y,:])
#           if(suma_gray>=suma): 
#             suma = suma_gray
#             posicion_maximo_local = [x,y]
#       print('posicion_maimo_local', posicion_maximo_local, 'suma gray', suma)

#       # [0] desestructura [[x,y]]
#       # x,y = contornos[3][1][0]
#       # print('brg', im[x, y, 0:4],'suma de brg',im[x, y, 0:4].sum())

#       cv.circle(img, tuple(posicion_maximo_local), 7, (0,255,0), -1)
#       cv.putText(img, 'suma gray_scale:'+str(suma), tuple(posicion_maximo_local), font, 0.5, (0,0,0), 2)

#     cv.imwrite(baseUrl+'Analizadas/'+str(file), img)
#   # else:
#   #   continue

    

# # cv.imwrite('Camion_maximos.jpg', img)
# # cv.imwrite('Camion_Gray.jpg', imGray)