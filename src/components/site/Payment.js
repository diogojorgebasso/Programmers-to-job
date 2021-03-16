import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { database } from "../../firebase";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { paymentRequest } from "../../services/Payment";

export default function Payment() {
  const [clientSecret, setClientSecret] = useState(true);
  const history = useHistory();
  const { currentUser } = useAuth();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async () => {
    setProcessing(true);

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation from stripe
        // save in a collection inside Firestore
        database.users
          .doc(currentUser?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: 10.0,
            amount: paymentIntent.amount,
            createdAt: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        history.replace("/thanks");
      });
  };
  useEffect(() => {
    //generate the special stripe secret from the backend
    const getClientSecret = async () => {
      const response = await paymentRequest;
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, []);

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement onChange={handleChange} />
        <div className="paymentPriceContainer">
          <CurrencyFormat
            renderText={(value) => <h3>Order Total: {value}</h3>}
            decimalScale={2}
            value={10}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"R$"}
          />
          <button disabled={processing || disabled || succeeded}>
            <span>{processing ? "Processando" : "Garanta já"}</span>
          </button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
