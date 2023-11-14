
import React, { useState } from 'react';
import {Link,useNavigate} from "react-router-dom";
import { Badge } from 'react-bootstrap';
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './contextReducer';

const Navbar = () => {
  const [cartView,setCartView]=useState(false);
  const navigate=useNavigate();
  let data=useCart();

  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="classNamenavbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
       
        
        {(localStorage.getItem("authToken"))?
        <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                  </li>:null
}
      </ul>

   {(localStorage.getItem("authToken"))?
             <div className="d-flex">
                                    <div className="btn bg-white text-success mx-1" onClick={()=>{
                                    setCartView(true);}}>
                                        My Cart {"  "}
                                      {data.length>0&&<Badge pill bg="danger">{data.length}</Badge>}
                                      </div>
{cartView? <Modal onClose={()=>{setCartView(false);}}><Cart /></Modal>:null}
                        <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>Log out</div>
             </div>    :
             <div className="d-flex">
          <Link className="btn bg-white text-success mx-1" to="/login" >Log in</Link>
          <Link className="btn bg-white text-success mx-1" to="/createUser">Sign up</Link>
          </div>
}
  
    </div>
  </div>
</nav>
      
    </>
  )
}

export default Navbar
