from flask import Flask, request, jsonify
from sqlalchemy import false
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
    return jsonify(getUserData[0])

@app.route('/allUsers', methods=['GET'])
def getAllUsers():
    id = request.args.get('id')
    users = dbHandler.getAllUsers(id)
    return jsonify(users)

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

@app.route('/viewBlockchain', methods=['GET'])
def viewBlockchain():
    while len(blockchain.transactions) > 0:
        blockchain.mineBlock(max_trans_per_Block, difficulty)
    return jsonify(printBlockchain(blockchain.blockchain))

if __name__ == '__main__':
    app.run(debug = True)
    