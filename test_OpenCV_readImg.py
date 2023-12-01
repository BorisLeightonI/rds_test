import sys, cv2, json
url = 'tempImage.jpg'
img = cv2.imread(url)
blur = cv2.blur(img, (5, 5))
print('***** Dentro de python script *****')
print('First param:'+sys.argv[1]+'#')
print('Second param:'+sys.argv[2]+'#')
print('un objeto:'+json.dumps({'clave':'valor'}))
print(img.shape[:])
print('img shape:',img.shape[:2])
bordes = cv2.Canny(blur, 100, 200)
cv2.imwrite('tempImage_bordes.jpg', bordes)
sys.stdout.write('Dentro de python stdout')