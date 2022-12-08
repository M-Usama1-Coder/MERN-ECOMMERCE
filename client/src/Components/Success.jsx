import React from "react";

function Success() {
  return <div>Success</div>;
}

export default Success;

// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";

// function Success() {
//   const location = useLocation();
//   const data = location.state.stripeData;
//   const cart = location.state.cart;
//   const currentUser = useSelector((state) => state.user.currentUser);
//   const [orderId, setOrderId] = useState(null);

//   useEffect(() => {
//     const createOrder = async () => {
//       try {
//         const res = await axios.post("http://localhost:6500/api/orders", {
//           userId: currentUser._id,
//           products: cart.products.map((item) => ({
//             productId: item._id,
//             quantity: item._quantity,
//           })),
//           amount: cart.total,
//           address: data.billing_details.address,
//         });
//         setOrderId(re.data._id);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//   }, [cart, data, currentUser]);
//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {orderId
//         ? `Order has been created successfully. Your order number is ${orderId}`
//         : `Successfull. Your order is being prepared...`}
//       <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
//     </div>
//   );
// }

// export default Success;
