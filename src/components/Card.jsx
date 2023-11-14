import React,{useEffect,useState,useRef} from "react";
import {useCart,useDispatch} from "./contextReducer"
const Card = ({foodItem,options}) => {
  let dispatch=useDispatch();
  let priceOptions=Object.keys(options);
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");
  let data=useCart();
  const priceRef=useRef();

  const handleAddtoCart=async ()=>{
    let food=[];
    for (const item of data){
      if(item.id===foodItem._id){
      food=item;
      break;}
      
      
    }
    if(food.length !== 0){
        if(food.size===size){
          await dispatch({type:"Update",id:foodItem._id,price:finalPrice,qty:qty});
          
        }
        else if(food.size!==size){
          await dispatch({type:"Add",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qty,size:size});

        }
    }
    else{          await dispatch({type:"Add",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qty,size:size});
  }
    
  }
  let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);

  },[])
  return (
    <>
      <div >
        <div
       
          className="card m-3 bg-dark "
          style={{ width: "18rem"}}
        >
          <img src={foodItem.img} className="card-img-top" alt="..." style={{height:"13rem",width:"18rem",maxHeight:"300px"}}/>
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>
            
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e)=>{
                setQty(e.target.value);
              }}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e)=>{
                setSize(e.target.value);
              }}>
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
<hr />
<button className="btn btn-success justify-center ms-2 " onClick={handleAddtoCart}>Add to Cart</button>

            </div>
            {/* <a href className="btn btn-primary">Go somewhere</a> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
