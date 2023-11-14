import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import {CardProvider} from "./components/contextReducer";
import MyOrder from "./screens/MyOrder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <CardProvider>
    <Router>
      {" "}
      {/*React fragement*/}
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createUser" element={<Signup />} />
          <Route exact path="/myOrder" element={<MyOrder />} />


        </Routes>
      </div>
    </Router>
    </CardProvider>
  );
}

export default App;
