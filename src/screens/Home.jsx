import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
const Home = () => {
  const [foodCat, setFoodcat] = useState([]);
  const [foodItem, setFooditem] = useState([]);
  const [search,setSearch]=useState("");

  const loadData = async () => {
    let response = await fetch("https://food-delivery-backend-gold.vercel.app/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    
    console.log(response[0],response[1]);

    setFooditem(response[0]);
    setFoodcat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
const mainSearchStyle={
backgroundColor:"#222222",
border:"none",
color:"#6c757d"
}
  return (
    <>
      <div>
        <Navbar />

        <div
        id="carouselExampleControls"
        className="carousel slide "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "1" }}>
            {/* Your search form here */}
            <div className="d-flex justify-content-center">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={mainSearchStyle} value={search} onChange={
          (e)=>{
            setSearch(e.target.value);
          }
        }/>
        {/* <button className="btn btn-success" type="submit">Search</button> */}
      </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/?burger"
              className="d-block w-100 "
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/?pizza"
              className="d-block w-100 "
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/?cake"
              className="d-block w-100 "
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

        <div className="container">
          {foodCat.length > 0
            ? foodCat.map((data) => {
                return ( 
                  <div className="row mb-3 ">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr />
                    
                    {foodItem.length > 0 ? 
                    (
                     foodItem
                        .filter((item) => {
                          return item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase()));
                        }) 
                        .map((filterItem) => {
                          return (
                            <>
                              <div
                                key={filterItem._id}
                                className="col-12 col-md-6 col-lg-3  mb-3"
                                style={{marginLeft:"20px"}}
                              >
                                <Card
                                  foodItem={filterItem}
                                  options={filterItem.options[0]}
                                />
                              </div>
                            </>
                          );
                        })
                    ) : (
                      <div>Hello id</div>
                    )}
                  
                  </div>

                );
              })
            : ""}
           
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
