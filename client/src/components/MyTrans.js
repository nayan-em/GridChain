import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Navbar from "./Navbar.js";
import background from '../img/background.jpg'
import TransCard from './TransCard.js'
import { hours } from './Utils'
import Select from 'react-select'

const MyTrans = () => {

  const location = useLocation()
  const userId = location.state.id
  const name = location.state.name

  const [blocks, setBlocks] = useState([])
  const [selectedHour, setSelectedHour] = useState(0)

  useEffect(() => {
    console.log("executing axios query with hour: ", selectedHour);
    axios.get("/viewTrans", {
      params: {
        name,
        selectedHour
      }
    })
      .then(res => {
        // console.log("this is the response", res.data)
        setBlocks(res.data)
      })
  }, [selectedHour])

  var sectionStyle = {
    backgroundImage: `url(${background})`,
    height: blocks.length>3 ? "100%" : "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }

  return (
    <>
      <div class="bg-image" style={sectionStyle}>
        <Navbar id={userId} />
        <br />

        <div className="jumbotron m-2 my-5">
          <div className="container text-center display-6">
            My Transactions
            {/* <p>a blockchain based grid management system</p> */}
          </div>
        </div>
        <br />

        <div className="container">
          <div className="container mt-5">
            <div className="row ms-2 mb-4">
                <div className="col-2">
                  <div className="row align-items-center">
                    <div className="col-4 h5 pt-2">
                      Hour
                    </div>
                    <div className="col-8">
                      <Select
                        className='my-3'
                        name="form-field-name"
                        options={hours}
                        placeholder="0"                   
                        onChange={e => setSelectedHour(e.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-1">

                </div> */}
              </div>
            <div className="row">
              {blocks.map((block, index) => {
                return (
                  <div className="col-4 mb-5 d-flex justify-content-center">
                    {/* <Link to={`/node/${id}/${item[0]}`} className="text-decoration-none"> */}
                      <TransCard
                        key={index}
                        num={index+1}
                        id={block[0]}
                        name={block[1]}
                        direction={block[2]}
                        energy={block[3]}
                        price={block[4]}
                        desc={block[5]}
                      />
                    {/* </Link> */}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* <div className="container">
          <div className='row m-5'>
            {blocks.map((block) => {
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
                        return (<div className='text-muted mb-2'>{trans}</div>)
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
      </div>
    </>
  )
}

export default MyTrans