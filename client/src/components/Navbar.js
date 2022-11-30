import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from 'react-router-dom';
import { hours } from './Utils'
import Select from 'react-select'

function Navbar({ id }) {

  // var Select = require('react-select')
  const navigate = useNavigate()
  const regex = /^\s*$/

  const [show, setShow] = useState(false)
  const [showCreateTrans, setShowCreateTrans] = useState(false)
  const [showBlockchain, setShowBlockchain] = useState(false)
  const [showError, setShowError] = useState(false)
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [isTitleEmpty, setIsTitleEmpty] = useState(false)
  const [isDescEmpty, setIsDescEmpty] = useState(false)


  const [user, setUser] = useState([])
  const [hour, setHour] = useState(0)
  const [direction, setDirection] = useState(0)
  const [energy, setEnergy] = useState("")
  const [price, setPrice] = useState("")
  const [isEnergyEmpty, setIsEnergyEmpty] = useState(false)
  const [isPriceEmpty, setIsPriceEmpty] = useState(false)

  useEffect(() => {

    axios.get("/getUser", {
      params: {
        id: id
      }
    })
    .then(res => setUser(res.data))

    // axios.get("/mineBlockchain", {
    //   params: {
    //     id1,
    //     id2
    //   }
    // })
    // .then(res => {
    //   setBlockchain(res.data)
    //   console.log(blockchain)
    // })
  }, [])

  // const handleShow = () => setShow(true)

  const handleClose = () => {
    setTitle("")
    setDesc("")
    setPassword("")
    setIsTitleEmpty(false)
    setIsDescEmpty(false)
    setShowBlockchain(false)
    setShowError(false)
    setShowCreateTrans(false)
    setShow(false)
  }

  const handleAllTrans = () => {
    navigate('/viewAllTrans', {
      state: { id }
    })
  }

  const handleMyTrans = () => {
    navigate('/viewMyTrans', {
      state: { id, name: user[1] }
    })
  } 

  const handleOptimizedTrans = () => {
    navigate('/viewOptimizedTrans', {
      state: { id }
    })
  } 

  const handleSubmitTrans = () => {
    console.log("user: ", user)
    
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

    axios.post("/addTrans", {}, {
      params: {
        // id: user[0],
        name: user[1],
        hour,
        direction,
        energy,
        price,
        desc
      }
    })
    .then(res => {
      handleClose()
      navigate(0)
    })
  }

  const handleSubmitPass = () => {
    if(password === "admin123")
      navigate('/viewBlockchain', {
        state: {
          userId: id,
        }
      })
    else{
      setShowError(true)
    }
  }

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light shadow-5-strong pt-3">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to={'/home/'+id} style={{ textDecoration: 'none' }}>
            <div className="navbar-brand mt-2 mt-lg-0 text-muted">GridChain</div>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              {/* <div className="nav-item me-4" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={handleShow}>Create Poll</div>
              </div> */}

              <div className="nav-item me-4" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={() => setShowCreateTrans(true)}>Create Trans</div>
              </div>

              <div className="nav-item me-4" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={handleAllTrans}>All Trans</div>
              </div>

              <div className="nav-item me-4" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={handleMyTrans}>My Trans</div>
              </div>

              <div className="nav-item me-4" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={handleOptimizedTrans}>Optimized Trans</div>
              </div>

              <div className="nav-item" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={() => setShowBlockchain(true)}>Blockchain</div>
              </div>

              <div className="nav-item ms-3" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={handleLogout}>Logout</div>
              </div>

            </ul>
          </div>
        </div>
      </nav>

      <Modal show={showBlockchain} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Authentication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Admin Password" required autoFocus />
              <div className={"text-danger mt-2 " + (showError ? "" : "d-none")}>Incorrect Password!</div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={handleSubmitPass}>Submit</button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateTrans} onHide={handleClose}>
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
                checked={direction === 0}
                onChange={e => setDirection(0)}
                type="radio"
              />
              <Form.Check
                inline
                label="Buying"
                type="radio"
                value={direction}
                checked={direction === 1}
                onChange={e => setDirection(1)}
              />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Hour</Form.Label>
              <Select
                name="form-field-name"
                options={hours}
                onChange={e => {console.log("HOUR: ", e.value);setHour(e.value)}}
              />
            </Form.Group>


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
    </>
  )
}

export default Navbar