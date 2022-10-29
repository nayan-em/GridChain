import './Card.css'

const Card2 = ({index, timestamp, trans, res}) => {

    console.log(res);

    return (
        <div className="card bg-light m-2 p-2" style={{width:"25rem"}}>
            <div className="card-body text-center card-title h5">
                <div className="h5 mt-2 mb-4 text-success">{timestamp}</div>
                <div className='row ms-2 text-start'>
                  <div className="col-6 h6">Direction : </div>
                  <div className={"h6 text-danger mb-1 col-6 text-start "+(res[6]=="selling" ? "" : "d-none")}>Selling</div>
                  <div className={"h6 text-danger mb-1 col-6 text-start "+(res[6]=="buying" ? "" : "d-none")}>Buying</div>
                </div>
                <div className='row ms-2 text-start'>
                  <div className={"col-6 h6 "+(res[6]=="selling" ? "" : "d-none")}>Buyer : </div>
                  <div className={"col-6 h6 "+(res[6]=="buying" ? "" : "d-none")}>Seller : </div>
                  <div className="h6 text-danger mb-1 col-6 text-start">{res[16]}</div>
                </div>
                <div className='row ms-2'>
                  <div className="col-6 h6 text-start">Energy : </div>
                  <div className="h6 text-danger mb-1 col-6 text-start">{res[8]} kWh</div>
                </div>
                <div className='row ms-2'>
                  <div className="col-6 h6 text-start">Price : </div>
                  <div className="h6 text-danger mb-1 col-6 text-start">{res[26]} $/kWh</div>
                </div>
                <div className='row ms-2'>
                  <div className="col-6 h6 text-start">Description : </div>
                  <div className="h6 text-danger mb-1 col-6 text-start">{res[29]}</div>
                </div>
            </div>
        </div>
    )
}

export default Card2