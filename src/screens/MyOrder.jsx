import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("https://food-delivery-backend-gold.vercel.app/api/myOrderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
        }),
      });

      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className='container'>
        <div className='row'>
          {Object.entries(orderData).length !== 0 ? (
              Object.values(orderData).map((order) =>
              order.order_data.slice(0).reverse().map((item, index) => (
                <div key={index}>
                  {item.Order_date ? (
                    <div className='m-auto mt-5' key={index}>
                      {item.Order_date}
                      <hr />
                    </div>
                  ) : (
                    <div className='col-12 col-md-6 col-lg-3' key={index}>
                      <div className='card mt-3 bg-dark' style={{ width: '16rem', maxHeight: '360px' }}>
                        <div className='card-body'>
                          <h5 className='card-title'>{item.name}</h5>
                          <div className='container w-100 p-0 bg-dark' style={{ height: '38px' }}>
                            <span className='m-1 '>{item.qty}</span>
                            <span className='m-1'>{item.size}</span>
                            <span className='m-1'>{item.Order_date}</span>
                            <div className='d-inline ms-2 h-100 w-20 fs-5'>₹{item.price}/-</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )
          ) : (
            <h1>hello stupid</h1>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
