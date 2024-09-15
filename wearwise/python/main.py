import os

from dotenv import load_dotenv

from convex import ConvexClient

load_dotenv(".env.local")
load_dotenv()

client = ConvexClient(os.getenv("CONVEX_URL"))
print(client.query("tasks:get"))


from groq import Groq
import base64


# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "shorts.jpg"

from rembg import remove
from PIL import Image

input = Image.open(image_path)
output = remove(input)
output_path = 'output.png'
# output = output.convert('RGBA')
# image_path_arr = image_path.split(".")
# image_path = image_path_arr[0] + "_output." + image_path_arr[1]
output.save(output_path)

output_path = image_path


# Getting the base64 string
base64_image = encode_image(image_path)

client = Groq()

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Return the type of clothing in the picture in maximum three words (ex: jean shorts, blouse, cap, sneakers, sweatpants, coat, puffer)."},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}",
                    },
                },
            ],
        }
    ],
    model="llava-v1.5-7b-4096-preview",
)

print(chat_completion.choices[0].message.content)

from colorthief import ColorThief

color_thief = ColorThief(image_path)
dominant_color = color_thief.get_color(quality=1)
print(dominant_color)