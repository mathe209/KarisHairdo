from pydantic import BaseModel, Field
from datetime import datetime, date

class ResponseModel(BaseModel):
    date: datetime

class Booking(BaseModel):
    name: str
    contact: str
    braid_style: str = Field(alias="braidStyle")
    braid_length: str = Field(alias="braidLength")
    booking_date: date = Field(alias="bookingDate")

    class Config:
        allow_population_by_field_name = True