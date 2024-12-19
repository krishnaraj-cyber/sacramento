import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { geteventbyid } from "../shared/services/apiregistration/apiregistration";
import { saveRegisterForm, saveRegisterFormfree } from "../Admin/shared/services/apiregister/apiregister";
import toast from "react-hot-toast";
import Registration from "../Shared/Components/Registration/Registration";
import { createPaymentSession } from "../Shared/services/apipayment/apipayment";
import Swal from "sweetalert2";

export default function RegistrationPage(props) {
  const [EventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formdata, setFormdata] = useState({ Participant: [{}] });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const type = queryParams.get("type") || "register";
  const initialAmount = queryParams.get("amount");
  var isMounted = true;

  const geteventbyID = useCallback(async () => {
    setIsLoading(true);
    const Event = await geteventbyid({ id });
    setEventData(Event);
    setIsLoading(false);
    if (type === "Donation") {
      setFormdata({ Poster_Type: "Donation", Entry_Fees: initialAmount });
    } else {
      setFormdata({ ...Event, Participant: [{}] });
    }
  }, [id]);
  useEffect(() => {
    if (isMounted) {
      geteventbyID();
    }
    return () => (isMounted = false);
  }, [id, type]);

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    if (e.target.name == "Event") {
      var datas = formdata.Games.find(
        (item) => item.Game_Title === e.target.value
      );
      setFormdata({ ...formdata, ...datas });
    }
  };


  const handlesave = async (e) => {
    e.preventDefault();
    try {
        let formatData;
        let totalAmount = 0;
        const currentYear = new Date().getFullYear();
        const us_time = new Date()
        const date = us_time.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: true });;
        console.log(date)
        if (type === "volunteer") {
            formatData = { ...formdata, Poster_Type: "Volunteer", Entry_Fees: "Free", Registered_Year: currentYear ,created_at:date };
        } else if (formdata.Poster_Type === "RSVP") {
            if (formdata.Payment === "Yes") {
                totalAmount = formdata.Guest_Count === "Age Wise"
                    ? formdata.Fees_Adults * formdata.Adults +
                      formdata.Fees_Kids * formdata.Kids +
                      formdata.Fees_Under5 * formdata.Babes
                    : formdata.Entry_Fees * formdata.Number_Guests;
                formatData = { ...formdata, Entry_Fees: totalAmount, Registered_Year: currentYear,created_at:date  };
            } else {
                formatData = { ...formdata, Entry_Fees: "Free" , Registered_Year: currentYear,created_at:date };
            }
        } else if (formdata.Poster_Type === "Registration Form") {
            const participants = formdata?.Participant || [];
            const games = formdata?.Games || [];

            participants.forEach((participant) => {
                const selectedGame = games.find(game => game.Game_Title === participant.Selected_Event);
                if (selectedGame?.GamePayment === "Yes") {
                    if (selectedGame.Participant_Type === "Custom Team" && selectedGame.Payment_Type === "Individual") {
                        totalAmount += parseFloat(selectedGame.Entry_Fees || 0) * parseFloat(formdata.Team_Members_Count || 0);
                    } else if (selectedGame.Participant_Type === "Individual") {
                        const age = parseInt(participant.Age || 0);
                        if (age < 6) totalAmount += parseFloat(selectedGame.Under5_Fees || 0);
                        else if (age >= 18) totalAmount += parseFloat(selectedGame.Adult_Fees || 0);
                        else totalAmount += parseFloat(selectedGame.Kids_Fees || 0);
                    } else {
                        totalAmount += parseFloat(selectedGame.Entry_Fees || 0);
                    }
                }
            });

            formatData = { ...formdata, Entry_Fees: totalAmount > 0 ? totalAmount : "Free", Registered_Year: currentYear,created_at:date  };
        } else if (formdata.Poster_Type === "Donation"){
          totalAmount = formdata.Entry_Fees ; 
          formatData = { ...formdata, Entry_Fees: totalAmount > 0 ? totalAmount : "Free", 
                                      Eventname: formdata?.Eventname ? formdata.Eventname : "Donation" , Registered_Year: currentYear,created_at:date };
        } else {
            formatData = { ...formdata, Entry_Fees: "Free" , Registered_Year: currentYear,created_at:date };
        }

        delete formatData.id;
        localStorage.setItem("registerData", JSON.stringify(formatData));
        console.log(totalAmount)
        if (totalAmount > 0) { 
           Swal.fire({
                      title: "Processing...",
                      text: "Please wait while we are processing.",
                      allowEscapeKey: false,
                      allowOutsideClick: false,
                      didOpen: () => {
                        Swal.showLoading(); 
                      },
                    });
            await createPaymentSession(formatData.Entry_Fees, formatData);
        } else { 
          Swal.fire({
            title: "Processing...",
            text: "Please wait while we are processing.",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading(); 
            },
          });
            const res = await saveRegisterFormfree(formatData);
            if (res?.message === "Registered Successfully") {
                Swal.fire({
                              title: "Success!",
                              text: "Registration successful.",
                              icon: "success",
                              timer: 3000,  
                              showConfirmButton: false,
                            });
                            setTimeout(() => navigate("/"), 3000);
            } else {
                toast.error("Registration Failed");
            }
        }
    } catch (error) {
        console.error("Error saving data:", error);
    }
};



  const handlechangeGames = (event, index) => {
    const updatedParticipants = [...formdata?.Participant];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [event.target.name]: event.target.value,
    };
    setFormdata({ ...formdata, Participant: updatedParticipants });
  };

  const AddGame = () => {
    setFormdata((prevData) => ({
      ...prevData,
      Participant: [...(prevData?.Participant || []), {}],
    }));
  };

  const removeGame = (e, Index) => {
    const filteredData = formdata?.Participant.filter(
      (_, index) => index !== Index
    );
    setFormdata((prevData) => ({ ...prevData, Participant: filteredData }));
  };

  return (
    <>
      <Registration
        isLoading={isLoading}
        type={type}
        success={success}
        EventData={EventData}
        formdata={formdata}
        handlechange={handlechange}
        handlesave={handlesave}
        handlechangeGames={handlechangeGames}
        AddGame={AddGame}
        removeGame={removeGame}
      />
    </>
  );
}
