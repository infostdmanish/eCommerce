import React, { useState, useContext } from 'react'
import NavBar from './Navbar';
import './Basket.css';
import { Image, Button } from 'react-bootstrap';

import { FaPlus, FaMinus, FaArrowRight,FaShoppingBag } from 'react-icons/fa'

import PayWithPayPal from './PayWithPayPal';
import AlertComponent from "./CustomAlert";
import AlertContext from '../context/AlertContext';

import { useHistory } from 'react-router';

export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  const [checkout, setCheckout] = useState(false);
  const { alertMsg } = useContext(AlertContext);
  const history = useHistory();
  
  const handleReturnBtn= (e)=>{
    history.push("/home");
  }

  return (
    <>
      <NavBar countCartItems={cartItems.length} />
      <AlertComponent alertMsg={alertMsg} />
      <div className="title-container">
        <h3 className="cart-title">SHOPPING CART</h3>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="empty-text">
          <FaShoppingBag size="120" color="#d3d3d4" style={{marginTop:'20px'}}/>
          <p>No products added to the cart</p>
          <Button onClick={()=>handleReturnBtn()} variant="primary" size="md"> Return to Shop</Button>
          </div>

      ) : (
        <div className="main-container">
          <div className="table-container">
          <table striped bordered hover className="cart_table">
            <thead>
              <tr>
                <th></th>
                <th className="table-td-name">PRODUCT NAME</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            {cartItems.map((item) => (
              <tbody key={item.id}>
                <tr className="table-row">
                  <td><Image className="cartImg" src={item.image} rounded /></td>
                  <td className="table-td-name">
                    {item.name}
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <div>
                      <button onClick={(e) => onAdd(e, item)} ><FaPlus /></button>
                      <input className="inputQty" type="text" value={item.qty} />
                      <button onClick={() => onRemove(item)} ><FaMinus /></button>
                    </div></td>
                  <td>$ {item.price * item.qty}</td>
                </tr>
              </tbody>
            ))}
            <tr>
              <th></th>
              <th ></th>
              <th></th>
              <th>TOTAL</th>
              <th>$ {itemsPrice}</th>
            </tr>
          </table>
          </div>
          <div className="checkoutContainer">
            <h5>CART TOTALS</h5>
            <div className="subtotal row my-3">
              <div className="col-6">Subtotal</div>
              <div className="col-6">$ {itemsPrice}</div>
            </div>
            <div className="shipping row my-3">
              <div className="col-6"> Shipping Flat Rate</div>
              <div className="col-6">$ 10</div>
            </div>
            <div className="total row my-3">
              <div className="col-6"> Total</div>
              <div className="col-6">$ {itemsPrice + 10}</div>
            </div>
            {checkout ? (<PayWithPayPal total={itemsPrice + 10} cartItems={cartItems} />) :
              (<Button variant="dark" size="md" onClick={() => { setCheckout(true) }} active>
                PROCEED TO CHECKOUT <FaArrowRight />
              </Button>)
            }
          </div>
        </div>

      )
      }
    </>
  )
}
