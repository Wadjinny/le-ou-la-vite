from fastapi import FastAPI
from dotenv import load_dotenv
import os
import uvicorn
from backend.utils import setup_logging

load_dotenv()

logger = setup_logging(__name__)

app = FastAPI()


@app.get("/")
async def read_root():
    return {"message": "Hello, world!"}


if __name__ == "__main__":
    port = int(os.getenv("API_PORT"))
    logger.info(f"Starting server on port {port}")
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)