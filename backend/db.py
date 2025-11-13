from sqlalchemy import create_engine
from dotenv import load_dotenv
import os   
from sqlalchemy import text
load_dotenv()
from sqlalchemy.pool import QueuePool

POSTGRES_CONNECTION_STRING = os.getenv("POSTGRES_CONNECTION_STRING")


# Create a connection pool for SQLAlchemy engine
# (default pool size is 5, can be adjusted as needed)
engine = create_engine(
    POSTGRES_CONNECTION_STRING,
    poolclass=QueuePool,
    pool_size=10,           # Maximum number of persistent connections.
    max_overflow=20,        # Maximum number of overflow connections (above pool_size).
    pool_timeout=30,        # Seconds to wait before giving up on getting a connection.
    pool_recycle=1800       # Recycle connections after 30 minutes (helps avoid disconnects).
)

with engine.connect() as connection:
    result = connection.execute(text("SELECT 1"))
    print(result.fetchone())

