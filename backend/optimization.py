from sqlalchemy import false
import models as dbHandler
import sqlite3 as sql

def optimize(hour):
  # dbHandler.deleteCurrentTrans()
  print("hour is: ", hour)
  trans = dbHandler.getAllTrans(hour)
  # print(trans)
  n = len(trans)

  # Store Grid buying and selling price separately
  # for tran in trans: 
  #   if tran[0] == "Grid":
  #     if tran[1] == "1":
  #       grid_buy = int(tran[1])
  #     else:
  #       grid_sell = int(tran[1])

  # Create separate arrays for buyers and sellers
  # and store the name, energy and price
  buy = []
  sell = []
  for i, tran in enumerate(trans):
    if tran[1] != "Grid":
      if tran[3] == "1":
        buy.append([tran[1], tran[4], tran[5]])
      else:
        sell.append([tran[1], tran[4], tran[5]])

  buy.sort(key=lambda x: x[2])
  sell.sort(key=lambda x: x[2])

  print_trans = []
  for buyer in buy:
    # print_trans.append("\n##### Transactions for buyer {} #####".format(buyer[0]))
    for seller in sell:
      if int(seller[1]) >= int(buyer[1]):
        seller[1] = str(int(seller[1]) - int(buyer[1]))
        print_trans.append("{} bought {} kWh energy from {} for {} $/kWh".format(buyer[0], buyer[1], seller[0], seller[2]))
        print(print_trans)
        break 
      else:
        buyer[1] = str(int(buyer[1]) - int(seller[1]))
        print_trans.append("{} bought {} kWh energy from {} for {} $/kWh".format(buyer[0], seller[1], seller[0], seller[2]))
        seller[1] = "0"

  # Format - [buyer, seller, energy, price]
  # final_trans = []
  # for buyer in buy:
  #   # final_trans.append(buyer[0])
  #   for seller in sell:
  #     if int(seller[1]) >= int(buyer[1]):
  #       seller[1] = str(int(seller[1]) - int(buyer[1]))
  #       temp = [buyer[0], seller[0], buyer[1], seller[2]]
  #       final_trans.append(temp)
  #       # final_trans.append("{} bought {} kWh energy from {} for {} $/kWh".format(buyer[0], buyer[1], seller[0], seller[2]))
  #       break
  #     else:
  #       buyer[1] = str(int(buyer[1]) - int(seller[1]))
  #       temp = [buyer[0], seller[0], seller[1], seller[2]]
  #       final_trans.append(temp)
  #       # final_trans.append("{} bought {} kWh energy from {} for {} $/kWh".format(buyer[0], seller[1], seller[0], seller[2]))
  #       seller[1] = "0"

  for t in print_trans:
    print("Printing..." + t)

  return print_trans


