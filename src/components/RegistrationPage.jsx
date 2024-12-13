import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { geteventbyid } from "../shared/services/apiregistration/apiregistration";
import { saveRegisterForm } from "../Admin/shared/services/apiregister/apiregister";
import toast from "react-hot-toast";
import Registration from "../Shared/Components/Registration/Registration";

export default function RegistrationPage(prpos) {
  const [EventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formdata, setFormdata] = useState({ Participant: [{}] });
  const [success, setSuccess] = useState(false);
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
      if (type === "volunteer") {
        var formatData = { ...formdata, Poster_Type: "Volunteer" };
        delete formatData.id;
        var res = await saveRegisterForm(formatData);

      } else if (formdata.Poster_Type == "RSVP") {
        if (formdata.Peyment == "Yes") {
          if (formdata.Guest_Count == "Age Wise") {
            var totalAmount = formdata.Fees_Adults * 1 * formdata.Adults + formdata.Fees_Kids * 1 * formdata.Kids + formdata.Fees_Under5 * 1 * formdata.Babes;
            var formatData = { ...formdata, Entry_Fees: totalAmount };
            delete formatData.id;
            localStorage.setItem("registerData", JSON.stringify(formatData));
            var res = await saveRegisterForm(formatData);
          } else {
            var totalAmount = formdata.Entry_Fees * 1 * formdata.Number_Guests;
            var formatData = { ...formdata, Entry_Fees: totalAmount };
            delete formatData.id;
            localStorage.setItem("registerData", JSON.stringify(formatData));
            var res = await saveRegisterForm(formatData);
          }
        } else {
          var formatData = { ...formdata, Entry_Fees: "Free" };
          delete formatData.id;
          var res = await saveRegisterForm(formatData);
        }
      } //above are pre

      else if (formdata.Poster_Type === "Registration Form") {
        const participants = formdata?.Participant || [];
        const games = formdata?.Games || [];
        let totalAmount = 0; 
        participants.forEach((participant) => {
          const selectedGame = games.find( (game) => game.Game_Title === participant.Selected_Event ); 

          if (selectedGame.GamePayment === "Yes") {

            if ( selectedGame.Participant_Type === "Custom Team" && selectedGame.Payment_Type === "Individual" ) {
              totalAmount += parseFloat(selectedGame.Entry_Fees || 0) * parseFloat(formdata.Team_Members_Count || 0);

            } else if (selectedGame.Participant_Type === "Individual") {
              const age = parseInt(participant.Age || 0);
              if (age < 5) {
                totalAmount += parseFloat(selectedGame.Under5_Fees || 0);
              } else if (age >= 18) {
                totalAmount += parseFloat(selectedGame.Adult_Fees || 0);
              } else {
                totalAmount += parseFloat(selectedGame.Kids_Fees || 0);
              }

            } else {
              totalAmount += parseFloat(selectedGame.Entry_Fees || 0);
            }
          }
        });

        const formatData = {
          ...formdata,
          Entry_Fees: totalAmount > 0 ? totalAmount : "Free",
        };
        delete formatData.id;
        var res = await saveRegisterForm(formatData);

      } else { // below are pre
        var formatData = formdata;
        delete formatData.id;
        localStorage.setItem("registerData", JSON.stringify(formatData));
        var res = await saveRegisterForm(formatData);
      }
      if (res?.message === "Registered Successfully") {
        setSuccess(true);
      } else {
        toast.error("Registration Failed");
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
