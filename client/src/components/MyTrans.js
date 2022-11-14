import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from "react"
import Navbar from "./Navbar.js";
import background from '../img/background.jpg'
import TransCard from './TransCard.js';

const MyTrans = () => {

  const location = useLocation()
  const userId = location.state.id
  const name = location.state.name

  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    axios.get("/viewTrans", {
      params: {
        name
      }
    })
      .then(res => {
        console.log("this is the response", res.data)
        setBlocks(res.data)
      })
  }, [])

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
          <div className="container text-center">
            <h1>Grid Chain</h1>
            <p>a blockchain based grid management system</p>
          </div>
        </div>
        <br />

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="container mt-5">
                <div className="row">
                  {blocks.map((block, index) => {
                    return (
                      <div className="col-4 mb-5 d-flex justify-content-center">
                        {/* <Link to={`/node/${id}/${item[0]}`} className="text-decoration-none"> */}
                          <TransCard
                            key={index}
                            num={index+1}
                            name={block[0]}
                            direction={block[1]}
                            energy={block[2]}
                            price={block[3]}
                            desc={block[4]}
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