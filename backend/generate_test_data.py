#!/usr/bin/python

from database import *
from models import *

drop_all()
init_db()
store1 = Store('Aldi', 'Supermarkt', 'Klopapier erst wieder ab Montag!!!')
store2 = Store('Netto', 'Supermarkt', 'Alles OK')
store3 = Store('HackBack', 'Bäcker', None)
db_session.add_all([store1, store2, store3])

user = User()
db_session.add(user)

booking = Booking(12334, user, store1)
db_session.add(booking)

db_session.commit()
