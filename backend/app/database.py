<<<<<<< HEAD

import os

from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
=======
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
>>>>>>> origin/main

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
<<<<<<< HEAD
    raise RuntimeError("DATABASE_URL is missing. Check backend/.env")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
=======
    raise ValueError("DATABASE_URL is missing in the .env file")

engine = create_engine(DATABASE_URL)
>>>>>>> origin/main

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
<<<<<<< HEAD
    bind=engine,
)


def test_database_connection():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        return result.scalar()
=======
    bind=engine
)

Base = declarative_base()
>>>>>>> origin/main
