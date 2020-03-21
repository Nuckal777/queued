#!/usr/bin/python

from flask import Flask, request, jsonify
import os, sys
import logging
import configparser
from werkzeug import serving
from flask_httpauth import HTTPBasicAuth
import ssl
#import requests
from database import init_db
from database import db_session
from models import *


app = Flask(__name__)
# handle tls with proper webserver
app.config['JSON_AS_ASCII'] = False
app.secret_key = os.urandom(24)
auth = HTTPBasicAuth()


loglevel = os.getenv("LOGLEVEL", "DEBUG")
logger = logging.getLogger("app")
print("Setting loglevel to: {}".format(loglevel))
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', datefmt="%Y-%m-%d %H:%M:%S",
                    level=loglevel)

config = configparser.ConfigParser()
if not config.read("settings.ini"):
    logger.info("config-file: could not read settings.ini")
    sys.exit(-1)

admin_pw = config["credentials"]["admin_pw"]
logger.debug("admin_pw is set.")


USER_DATA = {
    "admin": "",
}
USER_DATA["admin"] = "{}".format(admin_pw)

logger.info("USER_DATA: %s" % USER_DATA)

init_db()

@auth.verify_password
def verify(username, password):
    if not (username and password):
        return False
    return USER_DATA.get(username) == password

@app.route('/api/storelist', methods=['GET'])
def storelist():
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
                "Startdate": booking.start_date
            })

        return {"bookings": result_dicts}

    elif request.method == "POST":

        content = request.get_json(silent=False, force=True)

        content['UserID']

        b = Booking()
        b.start_date = content['Startdate']
        b.user_id = content['UserID']
        b.store_id = content['StoreID']

        db_session.add(b)
        db_session.commit()

        return {"BookingID": b.id}

@app.route('/api/capacity', methods=['GET'])
def capacity():
    start_date = request.args.get('Startdate', '')
    end_date = request.args.get('Enddate', '')
    store_id = request.args.get('StoreID', '')
    results = None

    if not all([start_date, end_date, store_id]):
        results = {}
    else:
        results = Booking.query.filter(
            Booking.store_id == store_id,
            Booking.start_date >= start_date,
            Booking.start_date <= end_date
        ).order_by(Booking.start_date).all()

    histogram = {}
    for booking in results:
        if booking.start_date in histogram:
            histogram[booking.start_date] += 1
        else:
            histogram[booking.start_date] = 1

    result_dicts = []
    for slot, amount in histogram.items():
        result_dicts.append({
            "Timeslot": slot,
            "Amout": amount
        })

    return {"capacity": result_dicts}

# handle tls with proper webserver
##context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
##context.load_cert_chain("cert-chain.pem", "key.pem")
##serving.run_simple(host='0.0.0.0', port='5000', ssl_context=context)

#app.run(host='0.0.0.0', port='5000', ssl_context=('cert.pem', 'key.pem'))

app.run(host='0.0.0.0', port=5000)

