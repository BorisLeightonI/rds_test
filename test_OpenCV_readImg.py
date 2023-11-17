import cv2
url = 'https://res.cloudinary.com/dirfklbry/image/upload/v1694015195/foo/275fdc21-c7a8-41ae-93b6-b0eb33ea7bcd.jpg.jpg'
img = cv2.imread(url)
print(img)