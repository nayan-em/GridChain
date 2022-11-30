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

def insertTrans(name, direction, energy, price, desc, hour):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("INSERT INTO trans (name, direction, energy, price, desc, hour) VALUES (?,?,?,?,?,?);", (name, direction, energy, price, desc, hour))
  con.commit()
  con.close()

def getAllTrans(hour):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM trans WHERE trans.hour=?;", (hour,))
  trans = cur.fetchall()
  con.commit()
  con.close()
  return trans

def getMyTrans(name, hour):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM trans WHERE (trans.name=? AND trans.hour=?);", (name, hour))
  trans = cur.fetchall()
  con.commit()
  con.close()
  return trans

def getCurrentTrans(hour):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM trans WHERE trans.hour=?;", (hour,))
  trans = cur.fetchall()
  con.commit()
  con.close()
  return trans

def deleteCurrentTrans():
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("DELETE FROM trans")
  con.commit()
  con.close()

def deleteTrans(id):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("DELETE FROM trans WHERE trans.id=?;", (id, ))
  con.commit()
  con.close()

# def insertCandidate(pollId, name, desc):
#   con = sql.connect("database.db")
#   cur = con.cursor()
#   cur.execute("INSERT INTO candidates (pollId,name,desc) VALUES (?,?,?);", (pollId, name, desc))
#   con.commit()
#   con.close()

# def getCandidates(pollId):
#   con = sql.connect("database.db")
#   cur = con.cursor()
#   cur.execute("SELECT * FROM candidates WHERE candidates.pollId=(?);", (pollId,))
#   candidates = cur.fetchall()
#   con.commit()
#   con.close()
#   return candidates