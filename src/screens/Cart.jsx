import React from 'react';
import { useCart,useDispatch } from '../components/contextReducer';

const Cart = () => {
    let data=useCart();
    let dispatch=useDispatch();
    if(data.length===0){
        return <div>
            <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
        </div>
    }

    const handleCheckout = async () => {
        let userEmail = localStorage.getItem("userEmail");
        console.log(userEmail);
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("https://food-delivery-backend-gold.vercel.app/api/orderData", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            Order_date: new Date().toDateString()
          })
        });
          dispatch({ type: "DROP" })
        
      }
    let totalPrice=data.reduce((total,food)=>{return total+food.price},0);
  return (
    <div>
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md ">
            <table className="table table-hover">
                <thead className="text-success fs-4">
<tr>
    < th scope="col">#</ th>
    < th scope="col">Name</ th>
    < th scope="col">Quantity</ th>
    < th scope="col">Option</ th>
    < th scope="col">Amount</ th>
    < th scope="col"></ th>
</tr>
                </thead>
                <tbody>
{
    data.map((food,index)=>(
        <tr>
            <th scope="row" className="text-white">{index+1}</th>
            <td className="text-white">{food.name}</td>
            <td className="text-white">{food.qty}</td>
            <td className="text-white">{food.size}</td >
            <td className="text-white">{food.price}</td >
            <td><button type="button" className="btn p-0"><img src="" alt="delete" onClick={()=>{
                dispatch({
                    type:"Remove",
                    index:index
                });
            }} /></button></td >
        </tr>
    ))
}
                </tbody>
            </table>

            <div><h1 className="fs-2">Total Price: {totalPrice}/-</h1></div>
            <div>
                <button className="btn bg-success mt-5" onClick={handleCheckout}>Check Out</button>
            </div>
        </div>
      
    </div>
  )
}

export default Cart
