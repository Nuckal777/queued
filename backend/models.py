from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Store(Base):
    __tablename__ = 'Store'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    store_type = Column(String(50))
    status = Column(String(1000))

    def __init__(self, name=None, store_type=None, status=None):
        self.name = name
        self.store_type = store_type
        self.status = status

    def __repr__(self):
        return '<Store {}: {}>'.format(self.id, self.name)

class Booking(Base):
    __tablename__ = 'Booking'
    id = Column(Integer, primary_key=True)
    start_date = Column(Integer)
    user_id = Column(Integer, ForeignKey('User.id'))
    user = relationship('User')
    store_id = Column(Integer, ForeignKey('Store.id'))
    store = relationship('Store')

    def __init__(self, start_date=None, user=None, store=None):
        self.start_date = start_date
        self.user = user
        self.store = store

    def __repr__(self):
        return '<Booking {}: {}>'.format(self.id, self.start_date)

class User(Base):
    __tablename__ = 'User'
    id = Column(Integer, primary_key=True)

    def __init__(self):
        pass

    def __repr__(self):
        return '<User {}>'.format(self.id)
