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


