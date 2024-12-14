import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";  
import { saveRegisterForm } from "../../../Admin/shared/services/apiregister/apiregister"; 
import Swal from "sweetalert2";

const PaymentSuccess = () => { 
  const navigate = useNavigate();
  var isMounted = true;
  
 
    const handlePaymentSuccess = useCallback(async () => {
      const registerData = JSON.parse(localStorage.getItem("registerPaymentData"));
      const sessionId = new URLSearchParams(window.location.search).get("session_id");

      if (registerData && sessionId) {
        registerData.payment_session_id = sessionId;

        try { 
          Swal.fire({
            title: "Processing Payment...",
            text: "Please wait while we process your registration.",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading(); 
            },
          });
     
          const res = await saveRegisterForm(registerData);
     
          if (res?.message === "Registered Successfully") {
            Swal.fire({
              title: "Success!",
              text: "Your payment and registration were successful.",
              icon: "success",
              timer: 3000,  
              showConfirmButton: false,
            });
     
            localStorage.removeItem("registerPaymentData");
            setTimeout(() => navigate("/"), 3000);
          } else { 
            Swal.fire({
              title: "Registration Failed",
              text: "An error occurred during registration. Please try again.",
              icon: "error",
              showConfirmButton: true,
            });
            setTimeout(() => navigate("/"), 5000);
          }
        } catch (error) {
          console.error("Error during registration:", error);
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("Invalid payment session or missing data.");
      }
    });

  useEffect(() => {
    if (isMounted) {
      handlePaymentSuccess();
    }
    return () => (isMounted = false);
  }, [navigate]);

  return ( 
    
    <div className="min-h-screen bg-[url('assets/images/Main/pay-bg.jpg')] bg-no-repeat bg-bottom bg-contain 2xl:bg-cover opacity-75 2xl:opacity-50 2xl:bg-bottom   " >  
    {/* <div className="min-h-screen  " >   */}
    {/* sweat-aleart is used ( in above ) show payment status  */}
    </div>
    
  );
};

export default PaymentSuccess;
