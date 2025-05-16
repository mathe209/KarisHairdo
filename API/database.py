from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

passcode = "mathe209"
DATABASE_URL =os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # Fallback (optional): Use local SQLite for development
    DATABASE_URL = "sqlite:///./test.db"
    print("⚠️ WARNING: DATABASE_URL not found. Using local SQLite database.")

# Create SQLAlchemy engine
# Set 'check_same_thread' only for SQLite
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base = declarative_base()