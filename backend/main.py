from fastapi import FastAPI
from dotenv import load_dotenv
import os
import uvicorn
from backend.utils import setup_logging
from backend.routes import definition_router
load_dotenv()

logger = setup_logging(__name__)

app = FastAPI()

#prefix /api
app.include_router(definition_router, prefix="/api")
@app.get("/")
async def read_root():
    return {"message": "Hello, world!"}


if __name__ == "__main__":
    port = int(os.getenv("VITE_API_PORT"))
    logger.info(f"Starting server on port {port}")
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)