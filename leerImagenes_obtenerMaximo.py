import os, cv2, json
from functools import reduce
obj = {}

for file in os.listdir('./'):
    if file.endswith('.jpg'):
        img = cv2.imread(file)
        pixels = reduce(lambda x,y:x*y, img.shape)
        obj.update({file: str(img.sum()//pixels)})
        os.remove(file)
    else: continue

print(json.dumps(obj))
