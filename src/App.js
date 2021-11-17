import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './components/LandingPage';

import data from './components/data';
import { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Checkout from './components/Basket';

import AboutUs from './components/AboutUs';
import SignUp from './components/SignUp';

import { AlertProvider } from './context/AlertContext';



function App() {

  const [alertMsg, setAlertMsg] = useState(false)
  const showAlert = (message, type) => {
    setAlertMsg({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlertMsg(null)
    }, 3000);
  }



  const { products } = data;
  const [cartItems, setCartItems] = useState([]);

  const [show, setShowToast] = useState(false);

  const onAdd = (e, product) => {

    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    //setShowToast(true);
    showAlert('Item is added to the Cart','success');
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }

  }
  return (
    <div className="App">
      <AlertProvider value={{showAlert, alertMsg}}>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <LandingPage products={products} onAdd={onAdd} cartItems={cartItems} />} />
          <Route exact path="/home" component={() => <LandingPage products={products} onAdd={onAdd} toastShow={show} cartItems={cartItems} setShowToast={setShowToast}  />} />
          <Route exact path="/Checkout" component={() => <Checkout cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />} />
          <Route exact path='/aboutUs' component={() => <AboutUs />} />
          <Route exact path='/signup' component={() => <SignUp />} />
        </Switch>
      </Router>
      </AlertProvider>
    
    </div >
  )
}

export default App;
