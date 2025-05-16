from pydantic import BaseModel, Field
from datetime import datetime, date

class ResponseModel(BaseModel):
    date: datetime

class Booking(BaseModel):
    name: str
    contact: str
    braidstyle: str = Field(alias="braidStyle")
    braidlength: str = Field(alias="braidLength")
    bookingdate: date = Field(alias="bookingDate")

    class Config:
        allow_population_by_field_name = True