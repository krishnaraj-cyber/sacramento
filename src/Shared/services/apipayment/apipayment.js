import apiurl from "../apiendpoint/apiendpoint";
import axios from "axios";
 

export const createPaymentSession = async (amount, registerData) => {
    try {
        const response = await axios.post(`${apiurl()}/api/create-payment-session`, {
            Title: "Registration Payment",
            Amount: amount,
        });

        if (response.data.url) { 
            localStorage.setItem("registerPaymentData", JSON.stringify(registerData));
            window.location.href = response.data.url;  
        } else {
            console.error("Error creating payment session:", response.data.error);
        }
    } catch (error) {
        console.error("Error in createPaymentSession:", error);
    }
};

// const handlePaymentSuccess = async () => {
//     const registerData = JSON.parse(localStorage.getItem("registerPaymentData"));
//     const sessionId = new URLSearchParams(window.location.search).get("session_id");

//     if (registerData && sessionId) {
//         registerData.payment_session_id = sessionId;

//         const res = await saveRegisterForm(registerData);
//         if (res?.message === "Registered Successfully") {
//             setSuccess(true);
//             localStorage.removeItem("registerPaymentData");
//         } else {
//             toast.error("Registration Failed");
//         }
//     }
// };

