from datetime import datetime, date
from sqlalchemy import TIMESTAMP, Boolean, Column, DateTime, ForeignKey, Integer, String, text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Booking(Base):
    __tablename__ = "booking"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    contact: Mapped[str] = mapped_column(nullable=False)
    braidStyle: Mapped[str] = mapped_column(nullable=False)
    braidLength: Mapped[str] = mapped_column(nullable=False)
    bookingDate: Mapped[date] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(nullable=False,default=datetime.utcnow) 