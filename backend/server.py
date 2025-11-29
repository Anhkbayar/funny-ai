import torch
import torch.nn as nn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from modules import Generator
import base64
from io import BytesIO
from PIL import Image

latent_dim = 100

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = Generator()
model.load_state_dict(torch.load("generator.pth",map_location="cpu"))
model.eval()

@app.get("/")
def home():
    return {"msg": "Модел бэлэн болсон"}

@app.get("/generate")
def generate():
    z = torch.randn(1, latent_dim).to(device)
    
    with torch.no_grad():
        img_tensor = model(z).cpu().squeeze(0)
        
    img_tensor = (img_tensor + 1)/2
    img = Image.fromarray((img_tensor.permute(1,2,0).numpy()*255).astype("uint8"))
    
    buffer = BytesIO
    img.save(buffer, format="JPG")
    img_bytes = buffer.getvalue()
    base64_img = base64.b64encode(img_bytes).decode("utf-8")
    
    return {"image": base64_img}