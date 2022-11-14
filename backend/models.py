import sqlite3 as sql

def insertUser(id, name, password):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("INSERT INTO users VALUES (?,?,?);", (id, name, password))
  con.commit()
  con.close()

def getUser(id):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM users WHERE users.id=?;", (id,))
  user = cur.fetchall()
  con.commit()
  con.close()
  return user

def getAllUsers(id):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM users WHERE NOT users.id=?;", (id,))
  users = cur.fetchall()
  con.commit()
  con.close()
  return users

def insertTrans(name, direction, energy, price, desc):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("INSERT INTO trans VALUES (?,?,?,?,?);", (name, direction, energy, price, desc))
  con.commit()
  con.close()

def getAllTrans():
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM trans")
  trans = cur.fetchall()
  con.commit()
  con.close()
  return trans

def getMyTrans(name):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM trans WHERE trans.name=?;", (name,))
  trans = cur.fetchall()
  con.commit()
  con.close()
  return trans

def insertCandidate(pollId, name, desc):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("INSERT INTO candidates (pollId,name,desc) VALUES (?,?,?);", (pollId, name, desc))
  con.commit()
  con.close()

def getCandidates(pollId):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM candidates WHERE candidates.pollId=(?);", (pollId,))
  candidates = cur.fetchall()
  con.commit()
  con.close()
  return candidates