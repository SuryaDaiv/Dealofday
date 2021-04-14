import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from 'react';
import { formatPrice } from "../helpers";
// import success from  "public/images/success.gif";


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0f0",
			color: "#10CF19",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
                        fontColor: "#ffffff",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#FF334C"
		}
	}
}

export default function PaymentForm(props) {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()    


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("https://backendpay.herokuapp.com/payment", {
                amount: props.total,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success && !(props.total==0)? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
       <div>
           <h4 style={{textAlign: "center"}}>Payment for {formatPrice(props.total)} has been Successfully Completed</h4>
           {/* <img src={success}/> */}
           <iframe src="https://giphy.com/embed/qms15Fp6yItUDYRSj9" width="250" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
       </div> 
        }
            
        </>
    )
}
