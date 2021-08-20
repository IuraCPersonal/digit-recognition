from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import keras


classifier = keras.models.load_model('digit_classifier')


class Image(BaseModel):
    bitmap: List[List[int]]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/predict/')
async def root(image: Image):
    bitmap = np.array(image.bitmap, dtype='uint8')
    if bitmap.shape != (28, 28):
        raise HTTPException(status_code=400, detail='bitmap must be a 28x28 array')
    bitmap = bitmap.flatten()
    label = int(classifier.predict(bitmap.reshape(1, -1)).argmax())
    return { 'label': label }
