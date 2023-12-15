import os, sys, cv2, json
extensión = ('.jpg', '.png')
folder = sys.argv[1]
baseUrl = './inspecciones/' + folder + '/'
if not (os.path.exists(baseUrl+'Analizadas')):
    os.mkdir(baseUrl+'Analizadas')
else:
    sys.stdout.write('FIN PYTHON SCRIPT init')
    # Verificar si existen imágenes!!!
    sys.exit()

for file in os.listdir(baseUrl):
    if file.endswith(extensión):
        # print(file)
        img = cv2.imread(baseUrl+file)
        x, y = img.shape[:2]
        # print(x,y)
        x_cut = x-100
        img_cuted = img [0:x_cut, 0:y]
        # print('img cutted:',img_cuted.shape[:2])
        blur = cv2.blur(img_cuted, (4, 4))
        bordes = cv2.Canny(blur, 80, 200)
        contours, _ = cv2.findContours(bordes, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        withContours=cv2.drawContours(img_cuted, contours, -1, (0,255,0), 3)

        # Obtener el contorno de más datos
        contour_len = 0
        idx_max_contour = 0
        for idx, contour in enumerate(contours):
            if contour.__len__()>= contour_len: 
                contour_len = contour.__len__()
                idx_max_contour = idx
        # print(idx_max_contour, contour_len)
        # print(contours[idx_max_contour].mean(axis=0))
        cx, cy = contours[idx_max_contour].mean(axis=0)[0]
        cx = round(cx)
        cy = round(cy)
        # print(cx, cy)
        cv2.circle(withContours, (cx, cy), 7, (0,0,255), -1)
        cv2.rectangle(withContours, (cx-50, cy-50), (cx+50, cy+50), (0,0,255), 3)

        # font 
        font = cv2.FONT_HERSHEY_SIMPLEX 
        
        # org 
        org = (cx-150, cy-10) 
        
        # fontScale 
        fontScale = 1
        
        # Blue color in BGR 
        color = (0, 255, 200) 
        
        # Line thickness of 1px 
        thickness = 2
        cv2.putText(withContours, f"Probabilidad de fisura {round(cx/x, 3)}", org, font, fontScale, color, thickness, cv2.LINE_AA)
        cv2.imwrite(baseUrl+'Analizadas/'+str(file), withContours)

    else: continue

sys.stdout.write('FIN PYTHON SCRIPT')

