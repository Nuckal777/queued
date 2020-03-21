#!/usr/bin/python

from database import *
from models import *

drop_all()
init_db()
store1 = Store()
store1.name = 'Aldi'
store1.type = 'Supermarkt'
store1.status = 'Klopapier erst wieder ab Montag!!!'
store2 = Store()
store2.name = 'Netto'
store2.type = 'Supermarkt'
store2.status = 'Alles OK'
store3 = Store()
store3.name = 'HackBack'
store3.type = 'Bäcker'
db_session.add_all([store1, store2, store3])

user = User()
db_session.add(user)

booking = Booking()
booking.start_date = 12334
booking.user = user
booking.store = store1
db_session.add(booking)

db_session.commit()
