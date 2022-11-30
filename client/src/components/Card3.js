import './Card.css'

const Card3 = ({ hour, transactions }) => {

    console.log(transactions);

    return (
        <div className="card bg-light p-2 pe-3" style={{width:"25 rem"}}>
            <div className="card-body text-center card-title h5">
              <div className='row mb-3 mt-2'>
                <div className="h4 text-center text-success mt-1">Hour : {hour}</div>
              </div>
              {transactions.map((trans, index) => {
                return (
                  <>
                    <div className='row mx-2 mb-2 ul'>
                      <div className="h6 text-start text-black-60">
                        <li>{trans}</li>
                      </div>
                    </div>
                  </>
                )
              })}
                {/* <div className='row ms-2 mb-3'>
                  <div className="h4 text-start text-success">Hour : {num}</div>
                  <div className="h6 text-danger mb-1 col-6 text-start">{energy} kWh</div>
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
                </div> */}
            </div>
        </div>
    )
}

export default Card3