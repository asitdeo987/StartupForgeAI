from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {" This is Home page"}

@app.get("/health")
def health():
    return {"Your health is ok"}