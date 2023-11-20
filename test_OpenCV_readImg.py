import cv2, sys
url = 'tempImage.jpg'
img = cv2.imread(url)
print('Dentro de python script')
print('First param:'+sys.argv[1]+'#')
print('Second param:'+sys.argv[2]+'#')
sys.stdout.write('Dentro de python stdout')
print(img.shape[:2])