from pydantic import BaseModel
from datetime import datetime, date

class ResponseModel(BaseModel):
    date: datetime

class Booking(BaseModel):
    name: str
    contact: str
    braidStyle: str
    braidLength: str
    bookingDate: date