import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const PUBLIC_KEY = "pk_test_51IJXWkJxMDhneAhqBlfJJQYKTmpR4hHCl9RYmy6ZCWKYTe17oebgVavR5SGSmI5scsyZO74XUZ2MuqpGS5Xv6VbN00J81GAzEs"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

class StripeContainer extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        showItem: false
                };
                }
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    console.log(fish)
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };
    // Make sure the fish is loaded before we continue!
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
      <li key={key}>
        <span>
          <TransitionGroup component="span" className="count">
            <CSSTransition
              classNames="count"
              key={count}
              timeout={{ enter: 500, exit: 500 }}
            >
              <span>{count}</span>
            </CSSTransition>
          </TransitionGroup>
          lbs {fish.name} &emsp; {formatPrice(count * fish.price)}
          <button onClick={() => this.props.removeFromOrder(key)}>
            &times;
          </button>
        </span>
      </li>
    </CSSTransition>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      
      <div className="order-wrap">
        <h2>Order</h2>
        {this.state.showItem ? 
                <Elements stripe={stripeTestPromise}>
			<PaymentForm total={total} />
		</Elements> : 
        <> 
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      <button onClick={() => this.setState({ showItem: true })}>Go for Payments</button></>}
      </div>
    );
  }
}

export default StripeContainer;







// #########################################################
// Working code


// import { Elements } from "@stripe/react-stripe-js"
// import { loadStripe } from "@stripe/stripe-js"
// import React from "react"
// import Order from "./Order"
// import PaymentForm from "./PaymentForm"

// const PUBLIC_KEY = "pk_test_51IJXWkJxMDhneAhqBlfJJQYKTmpR4hHCl9RYmy6ZCWKYTe17oebgVavR5SGSmI5scsyZO74XUZ2MuqpGS5Xv6VbN00J81GAzEs"

// const stripeTestPromise = loadStripe(PUBLIC_KEY)

// export default function StripeContainer() {
// 	return (
// 		<Elements stripe={stripeTestPromise}>
			
// 			<PaymentForm />
//                         <Order
//                                 fishes={this.state.fishes}
//                                 order={this.state.order}
//                                 removeFromOrder={this.removeFromOrder}
//                         />

// 		</Elements>
// 	)
// }
