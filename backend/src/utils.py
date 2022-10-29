from hashlib import sha256
import json

def createHash(block_trans, time, prevhash, nonce):
    """
    A utility function use sha256 to hash the contents of the block
    """
    return sha256((str(time)+str(block_trans)+str(prevhash)+str(nonce)).encode()).hexdigest()

def printMyBlocks(index, block, id1, id2):
    blockData = []
    dir = ""
    grammar = ""
    desc = ""
    for index, trans in enumerate(block.data):
        if trans.id1 == id1 and trans.id2 == id2:
            if int(trans.direction) == 0:
                dir = "selling"
                grammar = "to"
            else:
                dir = "buying"
                grammar = "from"
            blockData.append("{}. {} is {} {} kWh energy {} {} at a price of {} $/kWh".format(index+1, trans.name1, dir, trans.energy, grammar, trans.name2, trans.price))
            desc = trans.desc

    res = []
    if len(blockData) is not 0:
        res = [i for j in blockData[0].split() for i in (j, ' ')][:-1]
    res.append(desc)
        
    return [block.index, block.timestamp, block.hash, block.prevhash, blockData, res]

def printAllMyTrans(index, block, userId):
    blockData = []
    dir = ""
    grammar = ""
    desc = ""
    for index, trans in enumerate(block.data):
        if(trans.id1 == userId):
            if int(trans.direction) == 0:
                dir = "selling"
                grammar = "to"
            else:
                dir = "buying"
                grammar = "from"
            blockData.append("{}. {} is {} {} kWh energy {} {} at a price of {} $/kWh".format(index+1, trans.name1, dir, trans.energy, grammar, trans.name2, trans.price))
            desc = trans.desc
    
    res = []
    if len(blockData) is not 0:
        res = [i for j in blockData[0].split() for i in (j, ' ')][:-1]
    res.append(desc)
    return [block.index, block.timestamp, block.hash, block.prevhash, blockData, res]

def printAllBlockchain(index, block):
    blockData = []
    dir = ""
    grammar = ""
    for index, trans in enumerate(block.data):
        if int(trans.direction) == 0:
            dir = "selling"
            grammar = "to"
        else:
            dir = "buying"
            grammar = "from"
        blockData.append("{}. {} is {} {} kWh energy {} {} at a price of {} $/kWh".format(index+1, trans.name1, dir, trans.energy, grammar, trans.name2, trans.price))

    
        
    return [block.index, block.timestamp, block.hash, block.prevhash, blockData]

def printTrans(blockchain, id1, id2):
    """
    A function to print all transactions of a user with a particular node
    """
    result = []

    for index, block in enumerate(blockchain[1:]):
        temp = printMyBlocks(index+1, block, id1, id2)
        if(len(temp[4]) != 0):
            result.append(temp)

    return result

 
def printAllTrans(blockchain, userId):
    """
    A function to print all transactions of a user
    """
    result = []

    for index, block in enumerate(blockchain[1:]):
        temp = printAllMyTrans(index+1, block, userId)
        if(len(temp[4]) != 0):
            result.append(temp)

    return result

def printBlockchain(blockchain):
    """
    A function to print the entire blockchain
    """
    result = []
    genesis = [blockchain[0].index, blockchain[0].timestamp, blockchain[0].hash, blockchain[0].prevhash, ["No Transactions"]]
    result.append(genesis)

    for index, block in enumerate(blockchain[1:]):
        result.append(printAllBlockchain(index+1, block))

    return result