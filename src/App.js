import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import Orders from './Component/Orders/Orders'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Component/Heder/Header';
import Home from './Home/Home';
//import Loggin from './Loggin/Loggin';
//import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import Login from './Component/Login/Login';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Inventory from './Component/Inventory/Inventory';
import OrderReview from './Component/OrderReview/OrderReview';
import EditProduct from './Component/EditProduct/EditProduct';


export const UserContext = createContext()


function App() {
  const [loggedInUser, setloggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setloggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Home path='/home'></Home>
          <Route exact path="/">
            <Home></Home>
          </Route>

          <PrivateRoute path="/order/:orders_Id">
            <Orders></Orders>
          </PrivateRoute>

          <Route path='/login'>
            <Login></Login>
          </Route>

          <PrivateRoute path='/inventory'>
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/order-review">
            <OrderReview></OrderReview>
          </Route>
          <PrivateRoute path="/editproduct">
            <EditProduct></EditProduct>
          </PrivateRoute>
        </Switch>

      </Router>

    </UserContext.Provider >
  );
}

export default App;
