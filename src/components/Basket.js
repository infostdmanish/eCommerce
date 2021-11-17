import React from 'react'
import NavBar from './Navbar';
import './Basket.css';
import { Image } from 'react-bootstrap';

import { FaPlus, FaMinus } from 'react-icons/fa'


export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    <>
      <NavBar countCartItems={cartItems.length} />
      <h3 className="cart-title">Shopping Cart</h3>
       {cartItems.length === 0 ?(
         <div>No products added to the cart</div>

       ):(
         <div>
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

       )
        }
    </>
  )
}
