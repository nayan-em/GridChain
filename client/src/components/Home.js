import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"
import Card from './Card.js'
import Navbar from "./Navbar.js";
import background from '../img/background.jpg'
// import background from '../img/2.jpg'
// import background from '../img/1.webp'

function Home() {

  const { id } = useParams()
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get("/allUsers", {
      params: {
        id
      }
    })
    .then(res => {
      console.log(res.data);
      setItems(res.data)})
  }, [])

  var sectionStyle = {
    backgroundImage: `url(${background})`,
    height: items.length>3 ? "100%" : "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }


  return (
    <div class="bg-image" style={sectionStyle}>
      <Navbar id={id}/>
      <br />
      
      <div className="styledimg">
      <div className="jumbotron m-2 my-5">
        <div className="container text-center">
          <h1>Grid Chain</h1>
          <p>a blockchain based grid management system</p>
        </div>
      </div>
      </div>
      
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mt-5">
              <div className="row">
                {items.map(item => {
                  return (
                    <div className="col-4 mb-5 d-flex justify-content-center">
                      {/* <Link to={`/node/${id}/${item[0]}`} className="text-decoration-none"> */}
                        <Card
                          key={item[0]}
                          name={item[1]}
                          desc={item[2]}
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

      
      </div>
  )
}

export default Home