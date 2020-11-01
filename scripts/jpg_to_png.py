import sys
import os
from PIL import Image


input_dir = sys.argv[1]
output_dir = sys.argv[2]

if (not os.path.exists(output_dir)):
    os.mkdir(output_dir)

for filename in os.listdir(input_dir):
    img = Image.open(f'{input_dir}{filename}')
    clean_name = os.path.splitext(filename)[0]
    img.save(f'{output_dir}{clean_name}.png', 'png')

# png to jpg
# im1 = Image.open(r'path.png')
# im1 = im1.convert('RGB')
# im1.save(r'path.jpg')