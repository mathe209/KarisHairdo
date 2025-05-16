from fastapi import Depends, FastAPI, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.orm import Session

from . import models, Schemas
import database
from database import SessionLocal, engine
from typing import Optional, List
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
# Allow requests from your frontend (localhost:5500)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Dependency creation
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/booked-dates",  response_model=List[Schemas.ResponseModel])
def get_dates(db:Session=Depends(get_db)):
    dates = db.execute(select(models.Booking.bookingDate)).scalars().all()
    return [{"date": d} for d in dates]

@app.post("/book")
def createBooking(booking:Schemas.Booking, db:Session=Depends(get_db)):
    new_booking = models.Booking(**booking.dict())
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking