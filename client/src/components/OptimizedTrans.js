import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from "react"
import Navbar from "./Navbar.js";
import background from '../img/background.jpg'
import Card3 from './Card3.js';
import { hours } from './Utils'
import Select from 'react-select'

const OptimizedTrans = () => {

  const location = useLocation();
  const userId = location.state.id

  const [trans, setTrans] = useState([]) 
  const [selectedHour, setSelectedHour] = useState(0)

  useEffect(() => {
    axios.get("/optimizeTrans", {
      params: {
        hour: selectedHour
      }
    })
    .then(res => {
      console.log("??????", res.data);
      setTrans([res.data])})
    .catch(err => console.log(err))
  }, [selectedHour])

  var sectionStyle = {
    backgroundImage: `url(${background})`,
    height: trans.length>3 ? "100%" : "100vh",
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
            Optimized Transactions
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
              {trans.map((tran, index) => {
                return (
                  <div className="col-6 d-flex justify-content-center">
                    {/* <Link to={`/node/${id}/${item[0]}`} className="text-decoration-none"> */}
                      <Card3
                        key={index}
                        hour={selectedHour}
                        transactions={tran}
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

export default OptimizedTrans