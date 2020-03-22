#!/usr/bin/python

from flask import Flask, request, jsonify
from database import init_db
from database import db_session
from models import *
from datetime import datetime, timedelta
from pytz import utc

app = Flask(__name__)
# deliver JSON content with uft-8 charset
app.config['JSON_AS_ASCII'] = False

# initialize database connection
init_db()

# define RESET endpoints

@app.route('/')
def index():
    """index page (not important)"""
    return """
<title>Queued Backend</title>
<h1>Queued Backend</h1>
    <span style="font-weight: bold; background-color: lightgreen; padding: 8px">
        is running
    </span>"""

@app.route('/api/storelist', methods=['GET'])
def storelist():
    """return list of stores based on type"""
    store_type = request.args.get('type', None)
    results = None

    if store_type is None:
        results = Store.query.all()
    else:
        results = Store.query.filter(Store.store_type == store_type).all()

    result_dicts = []
    for store in results:
        result_dicts.append({
            "StoreID": store.id,
            "Type": store.store_type,
            "Name": store.name,
            "Status": store.status,
        })

    return {"storelist": result_dicts}

@app.route('/api/booking', methods=['GET', 'POST'])
def booking():
    """handle booking creations (POST) and queries (GET)"""
    if request.method == "GET":
        user_id = request.args.get('UserID', None)
        results = None

        if user_id is None:
            results = {}
        else:
            results = Booking.query.filter(Booking.user_id == user_id).all()

        result_dicts = []
        for booking in results:
            result_dicts.append({
                "BookingID": booking.id,
                "Startdate": to_time_stamp(booking.start_date),
                "StoreName": booking.store.name
            })

        return {"bookings": result_dicts}

    elif request.method == "POST":

        b = Booking()
        b.start_date = datetime.utcfromtimestamp(int(request.args.get('Startdate')))
        b.user_id = request.args.get('UserID')
        b.store_id = request.args.get('StoreID')

        db_session.add(b)
        db_session.commit()

        return {
            "BookingID": b.id,
            "Startdate": to_time_stamp(b.start_date),
            "StoreName": b.store.name
        }

@app.route('/api/capacity', methods=['GET'])
def capacity():
    """return utilization (amount of bookings) of each 10 minute time slot of a day"""
    start_date = request.args.get('Startdate', '')
    store_id = request.args.get('StoreID', '')
    results = None

    if not all([start_date, store_id]):
        results = {}
    else:
        start_date = datetime.utcfromtimestamp(int(start_date))
        # extract day
        start_date = datetime(start_date.year, start_date.month, start_date.day, 0, 0, 0)
        # next day
        end_date = start_date + timedelta(days=1)

        results = Booking.query.filter(
            Booking.store_id == store_id,
            Booking.start_date >= start_date,
            Booking.start_date < end_date
        ).order_by(Booking.start_date).all()

    first_slot = start_date + timedelta(hours=8)
    last_slot = start_date + timedelta(hours=18)
    step_size = timedelta(minutes=10)

    histogram = {}
    current_slot = first_slot
    for _ in range((last_slot - first_slot) // step_size):
        histogram[current_slot] = 0
        current_slot = current_slot + step_size

    for booking in results:
        histogram[booking.start_date] += 1

    result_dicts = []
    for slot, amount in histogram.items():
        result_dicts.append({
            "Timeslot": to_time_stamp(slot),
            "Amout": amount
        })

    return {"capacity": result_dicts}

def to_time_stamp(dt):
    """convert datetime objects to UTC timestamp"""
    return int(utc.localize(dt).timestamp())

# run the app
# 0.0.0.0 is accessible from other computers
app.run(host='0.0.0.0', port=5000)

