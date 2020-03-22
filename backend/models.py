from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base

class Store(Base):
    __tablename__ = 'Store'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    store_type = Column(String(50))
    status = Column(String(1000))

    def __repr__(self):
        return '<Store {}: {}>'.format(self.id, self.name)

class Booking(Base):
    __tablename__ = 'Booking'
    id = Column(Integer, primary_key=True)
    start_date = Column(DateTime(timezone=False))
    user_id = Column(Integer, ForeignKey('User.id'))
    user = relationship('User')
    store_id = Column(Integer, ForeignKey('Store.id'))
    store = relationship('Store')

    def __repr__(self):
        return '<Booking {}: {}>'.format(self.id, self.start_date)

class User(Base):
    __tablename__ = 'User'
    id = Column(Integer, primary_key=True)

    def __repr__(self):
        return '<User {}>'.format(self.id)
