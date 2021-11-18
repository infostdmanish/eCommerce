import React,{useRef, useEffect,useContext} from 'react';
import { useHistory } from 'react-router';
import AlertContext from '../context/AlertContext';

function PayWithPayPal(props) {
    const {cartItems}=props;
    const paypal = useRef();
    const history = useHistory();
    const {showAlert} = useContext(AlertContext);

    useEffect(() => {
        window.paypal.Buttons({
            createOrder:(data,actions, err)=>{
                return actions.order.create({
                    intent:"CAPTURE",
                    purchase_units:[
                        {
                            description:cartItems[0].name,
                            amount:{
                                currency_code:"USD",
                                value: props.total
                            }
                        }
                    ]
                })
            },
            onApprove: async(data, actions)=>{
                const order = await actions.order.capture();
                console.log(order);
                alert('Purchase Successfull');
                history.push("/Checkout");
                showAlert("Purchase Succesfull ", "success");
            },
            onError: (err)=>{
                console.log(err);
            }
        }).render(paypal.current)
       
    }, [])

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default PayWithPayPal
