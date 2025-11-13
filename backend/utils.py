import logging
from rich.logging import RichHandler

def setup_logging(name: str):
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    logger.addHandler(RichHandler())
    return logger

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[RichHandler()],
)