import numpy as np
import cv2 as cv
imUrl = 'C:\\Users\\bleig\\Documents\\Imagenes de Fisuras\\fotos\\797\\CAEX18\\IMG_20220811_133721.jpg'
im = cv.imread(imUrl)
assert im is not None, "file could not be read, check with os.path.exists()"
imgray = cv.cvtColor(im, cv.COLOR_BGR2GRAY)
ret, thresh = cv.threshold(imgray, 127, 255, 0)
contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
print('el tipo de contornos:',type(contours))
withContours=cv.drawContours(im, contours, -1, (0,255,0), 3)
cv.imwrite('withContours.jpg', withContours)