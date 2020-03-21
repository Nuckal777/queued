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
store = Store('Aldi', 'Supermarkt')
user = User()
booking = Booking(12334, user, store)
db_session.add(store)
db_session.add(user)
db_session.add(booking)
db_session.commit()

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
            "id": store.id,
            "type": store.store_type,
            "name": store.name,
            "status": store.status,
        })

    return {"storelist": result_dicts}

@app.route('/api/msg/', methods=['POST'])
@auth.login_required
def booking():
    try:
        content = request.get_json(silent=False, force=True)
        # logger.debug("Parsed update: {}".format(content))
    except Exception as e:
        # logger.error("Failed to parse as json: {}".format(request.data))
        return jsonify(err_something=False)

    #{"new": "userid;location;timestamp"}

    if 'new' in content:
        new_result = content['new']
        param = new_result.split(";")
        user_id = param[0]
        location = param[1]
        timestamp = param[2]


        #logger.info("add_new with user_id: %s, location: %s, timestamp: %s") % (user_id,location,timestamp)
        return jsonify('{"yeah":"number_in_Q_1238457; qr_code; location: %s"}' % location)

    return jsonify('{"msg":msg}')


# handle tls with proper webserver
##context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
##context.load_cert_chain("cert-chain.pem", "key.pem")
##serving.run_simple(host='0.0.0.0', port='5000', ssl_context=context)

#app.run(host='0.0.0.0', port='5000', ssl_context=('cert.pem', 'key.pem'))

app.run(host='0.0.0.0', port=5000)

