from flask import Flask, request, jsonify
from sqlalchemy import false
from optimization import optimize
import models as dbHandler

from src.Blockchain import Blockchain
from src.utils import printTrans, printBlockchain, printAllTrans

app = Flask(__name__)

import sqlite3 as sql

conn = sql.connect('database.db')
cur = conn.cursor()

conn.execute("""CREATE TABLE IF NOT EXISTS users (
  id text primary key,
  name text not null,
  password text not null
)""")

# conn.execute("""DROP TABLE trans""")

conn.execute("""CREATE TABLE IF NOT EXISTS trans (
  id INTEGER primary key AUTOINCREMENT,
  name text not null,
  hour INTEGER not null,
  direction text not null,
  energy text not null,
  price text not null,
  desc text not null
)""")

conn.close()

# Initalize Blockchain object with given difficulty
difficulty = 3
max_trans_per_Block = 7
blockchain = Blockchain(difficulty)

@app.route('/user', methods=['POST'])
def registerUser():
    id = request.args.get('id')
    name = request.args.get('name')
    password = request.args.get('password')

    getUserData = dbHandler.getUser(id)
    if len(getUserData) != 0:
        return "Account already exists"
    else: 
        dbHandler.insertUser(id, name, password)
        return "Account registered successfully!"

@app.route('/user', methods=['GET'])
def verifyUser():
    id = request.args.get('id')
    password = request.args.get('password')

    getUserData = dbHandler.getUser(id)
    if len(getUserData) == 0:
        return "ID does not exists"
    elif password != getUserData[0][2]:
        return "Incorrect password"
    else:
        return "Account verified successfully!"

@app.route('/getUser', methods=['GET'])
def getUserDetails():
    id = request.args.get('id')
    getUserData = dbHandler.getUser(id)
    # print(getUserData)
    return jsonify(getUserData[0])

@app.route('/allUsers', methods=['GET'])
def getAllUsers():
    id = request.args.get('id')
    users = dbHandler.getAllUsers(id)
    return jsonify(users)

@app.route('/viewTrans', methods=['GET'])
def viewTrans():
    name = request.args.get('name')
    hour = request.args.get('selectedHour')
    if name == "NULL":
        trans = dbHandler.getAllTrans(hour)
    else:
        trans = dbHandler.getMyTrans(name, hour)

    return jsonify(trans)

@app.route('/addTrans', methods=['POST'])
def addTrans():
    # id = request.args.get('id')
    name = request.args.get('name')
    hour = request.args.get('hour')
    direction = request.args.get('direction')
    energy = request.args.get('energy')
    price = request.args.get('price')
    desc = request.args.get('desc')

    dbHandler.insertTrans(name, direction, energy, price, desc, hour)
    return "Trans added successfully"

@app.route('/createTrans', methods=['POST'])
def createTrans():
    id1 = request.args.get('id1')
    name1 = request.args.get('name1')
    id2 = request.args.get('id2')
    name2 = request.args.get('name2')
    direction = request.args.get('direction')
    energy = request.args.get('energy')
    price = request.args.get('price')
    desc = request.args.get('desc')

    blockchain.makeTransaction(id1, name1, id2, name2, direction, energy, price, desc)
    print("trans added to pool")
    for x in blockchain.transactions:
        print(x.id1, x.id2)
    print("printing done")
    return "Transaction added successfully!"


@app.route('/mineBlockchain', methods=['GET'])
def mineBlockchain():
    id1 = request.args.get('id1')
    id2 = request.args.get('id2')

    while len(blockchain.transactions) > 0:
        blockchain.mineBlock(max_trans_per_Block, difficulty)
    print("Blockchain: ", printTrans(blockchain.blockchain, id1, id2))

    return jsonify(printTrans(blockchain.blockchain, id1, id2))

@app.route('/viewAllTrans', methods=['GET'])
def viewAllTrans():
    userId = request.args.get('userId')
    return jsonify(printAllTrans(blockchain.blockchain, userId))

@app.route('/optimizeTrans', methods=['GET'])
def optimizeTrans():
    hour = request.args.get('hour')
    optimize(hour)
    return jsonify(optimize(hour))

@app.route('/deleteTrans', methods=['POST'])
def deleteTrans():
    id = request.args.get('id')
    dbHandler.deleteTrans(id)

@app.route('/viewBlockchain', methods=['GET'])
def viewBlockchain():
    optimize()
    return "Successfully optimized the transactions"
    # while len(blockchain.transactions) > 0:
    #     blockchain.mineBlock(max_trans_per_Block, difficulty)
    # return jsonify(printBlockchain(blockchain.blockchain))

if __name__ == '__main__':
    app.run(debug = True)
    