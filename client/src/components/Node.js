import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"
import { Modal, Form } from 'react-bootstrap'
import Navbar from "./Navbar.js";
import background from '../img/background.jpg'
import Card2 from "./Card2.js";

const Node = () => {

  const navigate = useNavigate()
  const { id1, id2 } = useParams()
  const regex = /^\s*$/

  // direction => 0 means selling, 1 means buying
  const [direction, setDirection] = useState(0)
  const [energy, setEnergy] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [isEnergyEmpty, setIsEnergyEmpty] = useState(false)
  const [isDescEmpty, setIsDescEmpty] = useState(false)
  const [isPriceEmpty, setIsPriceEmpty] = useState(false)

  const [user1, setUser1] = useState([])
  const [user2, setUser2] = useState([])
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [show, setShow] = useState(false)
  const [blockchain, setBlockchain] = useState([])
  
  useEffect(() => {

    axios.get("/getUser", {
      params: {
        id: id1
      }
    })
    .then(res => setUser1(res.data))

    axios.get("/getUser", {
      params: {
        id: id2
      }
    })
    .then(res => setUser2(res.data))

    axios.get("/mineBlockchain", {
      params: {
        id1,
        id2
      }
    })
    .then(res => {
      setBlockchain(res.data)
      console.log(blockchain)
    })
  }, [])

  const handleClose = () => {
    setEnergy("")
    setPrice("")
    setDesc("")
    setIsPriceEmpty(false)
    setIsEnergyEmpty(false)
    setIsDescEmpty(false)
    setShow(false)
    setShowMessage(false)
  }

  const handleSubmitTrans = () => {
    console.log("Direction: ", direction)
    
    if (energy.match(regex) != null) {
      setIsEnergyEmpty(true)
      return
    }
    else setIsEnergyEmpty(false)

    if (price.match(regex) != null) {
      setIsPriceEmpty(true)
      return
    }
    else setIsPriceEmpty(false)

    if (desc.match(regex) != null) {
      setIsDescEmpty(true)
      return
    }
    else setIsDescEmpty(false)

    axios.post("/createTrans", {}, {
      params: {
        id1: user1[0],
        name1: user1[1],
        id2: user2[0],
        name2: user2[1],
        direction,
        energy: energy,
        price: price,
        desc: desc
      }
    })
    .then(res => {
      handleClose()
      navigate(0)
    })
  }

  var sectionStyle = {
    backgroundImage: `url(${background})`,
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }

  return (
      <div className="bg-image" style={sectionStyle}> 

      <Navbar userId={id1}/>
      <br />

      <div className="jumbotron m-2 my-5">
        <div className="container text-center">
          <h1>Grid Chain</h1>
          <p>a blockchain based grid management system</p>
        </div>
      </div>
      <br />

      <div className="container mt-5 mb-4">
        <div className='row justify-content-center'>
          <div className="col-7 h4">Transactions</div>
          <button className="col-2 btn btn-danger" onClick={() => setShow(true)}>Create Transaction</button>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mt-5">
              <div className="row">
                {blockchain.map(block => {
                  return (
                    <div className="col-4 mb-5 d-flex justify-content-center">
                      {/* <Link to={`/node/${id}/${item[0]}`} className="text-decoration-none"> */}
                        <Card2
                          key={block[0]}
                          index={block[0]}
                          timestamp={block[1]}
                          trans={block[4]}
                          res={block[5]}
                        />
                      {/* </Link> */}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container">
        <div className='row m-5'>
          {blockchain.map((block) => {
            return (
              <div className="col-12 mb-3 border border-secondary p-4">
                <div className="row m-2 justify-content-center">
                  <div className="col-3"><strong>Timestamp </strong></div>
                  <div className="col-9 text-muted">{block[1]}</div>
                </div>

                <div className="row m-2">
                  <div className="col-3"><strong>Hash of the Block </strong></div>
                  <div className="col-9 text-muted">{block[2]}</div>
                </div>

                <div className="row m-2">
                  <div className="col-3"><strong>Hash of the previous Block </strong></div>
                  <div className="col-9 text-muted">{block[3]}</div>
                </div>

                <div className="row m-2 mb-0">
                  <div className="col-3"><strong>Transactions</strong></div>
                  <div className="col-9 mb-2">
                    {block[4].map(trans => {
                      return(<div className='text-muted mb-2'>{trans}</div>)
                    })}
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-2 h3">Block: {block[0]}</div>
                </div>

              </div>
            )
          })}
        </div>
      </div> */}


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label="Selling"
                value={direction}
                checked={direction == 0}
                onChange={e => setDirection(0)}
                type="radio"
              />
              <Form.Check
                inline
                label="Buying"
                type="radio"
                value={direction}
                checked={direction == 1}
                onChange={e => setDirection(1)}
              />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Energy Amount (in kWh)</Form.Label>
                <Form.Control type="number" step="0.05" value={energy} onChange={e => setEnergy(e.target.value)} placeholder="Enter Energy Amount" required />
                <div className={"text-danger mt-2 " + (isEnergyEmpty ? "" : "d-none")}> Energy can not be empty!</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (in $/kWh)</Form.Label>
                <Form.Control type="number" step="0.05" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Price" required />
                <div className={"text-danger mt-2 " + (isPriceEmpty ? "" : "d-none")}> Price can not be empty!</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <textarea className="form-control" rows="3" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Enter description" />
              <div className={"text-danger mt-2 " + (isDescEmpty ? "" : "d-none")}> Desc can not be empty!</div>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={handleSubmitTrans}>Submit</button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMessage} onHide={() => setShowMessage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowMessage(false)}>Close</button>
        </Modal.Footer>
      </Modal>
     
      </div>
  )
}

export default Node