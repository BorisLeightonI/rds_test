import sys, cv2, json
url = 'tempImage.jpg'
imUrl = 'C:\\Users\\bleig\\Documents\\Imagenes de Fisuras\\fotos\\797\\CAEX18\\IMG_20220811_133721.jpg'
img = cv2.imread(url)
blur = cv2.blur(img, (5, 5))
print('***** Dentro de python script *****')
# print('First param:'+sys.argv[1]+'#')
# print('Second param:'+sys.argv[2]+'#')
print('un objeto:'+json.dumps({'clave':'valor'}))
print(img.shape[:])
print('img shape:',img.shape[:2])
bordes = cv2.Canny(blur, 100, 190)
contours, _ = cv2.findContours(bordes, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
withContours=cv2.drawContours(img, contours, -1, (0,255,0), 3)
cv2.imwrite('tempImage_bordes.jpg', withContours)
# print('contours ', len(contours))
# cv2.imwrite('withContours.jpg', withContours)
sys.stdout.write('Dentro de python stdout')