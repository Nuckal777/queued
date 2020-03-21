from sqlalchemy import Column, Integer, String
from database import Base

class Store(Base):
    __tablename__ = 'Store'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    store_type = Column(String(50))

    def __init__(self, name=None, store_type=None):
        self.name = name
        self.store_type = store_type

    def __repr__(self):
        return '<Store %r>' % (self.name)

