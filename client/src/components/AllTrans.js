import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from "react"
import Navbar from "./Navbar.js";
import background from '../img/background.jpg'
import TransCard from './TransCard.js';
import { hours } from './Utils'
import Select from 'react-select'


const AllTrans = () => {

  const location = useLocation();
  const userId = location.state.id

  const [blocks, setBlocks] = useState([])
  const [selectedHour, setSelectedHour] = useState(0)

  useEffect(() => {
    console.log("executing axios query with hour: ", selectedHour);
    axios.get("/viewTrans", {
      params: {
        name: "NULL",
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
            All Transactions
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
                      placeholder="0"
                      options={hours}
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
                        direction={block[3]}
                        energy={block[4]}
                        price={block[5]}
                        desc={block[6]}
                      />
                    {/* </Link> */}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AllTrans