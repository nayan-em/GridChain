import './Card.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Trash3 } from "react-bootstrap-icons"

const TransCard = ({ index, num, id, name, direction, energy, price, desc }) => {

    // console.log(name)
    const navigate = useNavigate()

    const handleDeleteTrans = () => {
      axios.post("/deleteTrans", {}, {
        params: {
          id
        }
      })
      .then(navigate(0))
    }

    return (
        <div className="card bg-light m-2 p-2" style={{width:"25rem"}}>
            <div className="card-body text-center card-title h5">
                {/* <div className="h5 mt-2 mb-4 text-success">{num}</div> */}
                {/* <div className='row ms-2 text-start'>
                  <div className="col-6 h6">Direction : </div>
                  <div className={"h6 text-danger mb-1 col-6 text-start "+(direction=="0" ? "" : "d-none")}>Selling</div>
                  <div className={"h6 text-danger mb-1 col-6 text-start "+(direction=="1" ? "" : "d-none")}>Buying</div>
                </div> */}
                <div className='row ms-2 mb-3'>
                  <div className="col-8 h4 text-start text-success">Transaction : {num}</div>
                  <div className="col-2"></div>
                  <div className="col-2 h5 text-danger align-items-end">
                   
                    <span id='trashIcon' onClick={handleDeleteTrans}>

                    <Trash3/>
                    </span>
                   
                  </div>
                  {/* <div className="h6 text-danger mb-1 col-6 text-start">{energy} kWh</div> */}
                </div>
                <div className='row ms-2 text-start'>
                  <div className={"col-6 h6 "+(direction=="1" ? "" : "d-none")}>Buyer : </div>
                  <div className={"col-6 h6 "+(direction=="0" ? "" : "d-none")}>Seller : </div>
                  <div className="h6 text-danger mb-1 col-6 text-start">{name}</div>
                </div>
                <div className='row ms-2'>
                  <div className="col-6 h6 text-start">Energy : </div>
                  <div className="h6 text-danger mb-1 col-6 text-start">{energy} kWh</div>
                </div>
                <div className='row ms-2'>
                  <div className="col-6 h6 text-start">Price : </div>
                  <div className="h6 text-danger mb-1 col-6 text-start">{price} $/kWh</div>
                </div>
                <div className='row ms-2'>
                  <div className="col-6 h6 text-start">Description : </div>
                  <div className="h6 text-danger mb-1 col-6 text-start">{desc}</div>
                </div>
            </div>
        </div>
    )
}

export default TransCard