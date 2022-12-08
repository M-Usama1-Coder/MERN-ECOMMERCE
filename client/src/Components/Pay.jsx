import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const KEY =
  "pk_test_51MAh2CDiZA7C4HtWuLTDFErW8epwOClqmCmNyoOT3I9GSNmGVcfSgP8qKPTYnPPWtr0fYezwfYugGRdKBm1SNXWJ00sK461GXN";

function Pay() {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    const { id } = token;
    setStripeToken(id);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:6500/api/checkout/payment",
          {
            tokenId: stripeToken,
            amount: 2000,
          }
        );
        console.warn(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StripeCheckout
        name="E-Shop"
        billingAddress
        shippingAddress
        description="Your total is $30"
        amount={3000}
        token={onToken}
        stripeKey={KEY}
      >
        <button
          style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
}

export default Pay;
