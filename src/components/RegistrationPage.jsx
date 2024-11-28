import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { geteventbyid } from '../shared/services/apiregistration/apiregistration';
// import { FreeRegisterion, saveregister } from '../shared/services/apiRegister/apiregister';
import Registration from '../shared/components/Registration/Registration';
import { saveRegisterForm } from '../Admin/shared/services/apiregister/apiregister';
import toast from 'react-hot-toast';

export default function RegistrationPage(prpos) {

    const { Setclientsecret } = prpos;
    // const stripe = loadStripe('pk_live_51PRoZDRqH9kU3X2F9EhsHcgOcv15PADb7WHi86j1i7pFNxZV9OXExMfxehmCyRM1asIun8eKifd4jX873zvyp2Cv00AHEaeiKR');

    const param = useParams();
    const navigate = useNavigate();
    const [EventData, setEventData] = useState({});
    const [loading, setLoading] = useState(false);
    const [Visible, setVisible] = useState(false);
    const [formdata, setFormdata] = useState({});
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const type = queryParams.get('type') || 'register';

    const initialAmount = queryParams.get('amount');


    const geteventbyID = useCallback(async () => {
        const Event = await geteventbyid({ id });
        console.log(Event)
        setEventData(Event);

        if (type === "Donation") {
            setFormdata({ Poster_Type: "Donation", Entry_Fees: initialAmount })
        }
        else {
            setFormdata(Event);
        }

    }, [id]);
    var isMounted = true;
    useEffect(() => {
        if (isMounted) {
            geteventbyID();
        }
        return () => (isMounted = false);
    }, [id, type])


    const handlechange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        if (e.target.name == "Event") {
            var datas = formdata.Games.find(item => item.Game_Title === e.target.value);
            setFormdata({ ...formdata, ...datas });
        }
    }
    const handlesave = async (e) => {
        e.preventDefault();
        if (type === "volunteer") {
            var formatData = { ...formdata, Poster_Type: "Volunteer" };
            delete formatData._id;
            var res = await saveRegisterForm(formatData);
        }
        else if (formdata.Poster_Type == "RSVP") {
            if (formdata.Peyment == "Yes") {
                if (formdata.Guest_Count == "Age Wise") {
                    var totalAmount = ((formdata.Fees_Adults * 1) * formdata.Adults) + ((formdata.Fees_Kids * 1) * formdata.Kids) + ((formdata.Fees_Under5 * 1) * formdata.Babes);
                    var formatData = { ...formdata, Entry_Fees: totalAmount };
                    delete formatData.id;
                    localStorage.setItem('registerData', JSON.stringify(formatData));
                    var res = await saveRegisterForm(formatData);
                    // window.location.href = res.url;
                }
                else {
                    var totalAmount = ((formdata.Entry_Fees * 1) * formdata.Number_Guests);
                    var formatData = { ...formdata, Entry_Fees: totalAmount };
                    delete formatData.id;
                    localStorage.setItem('registerData', JSON.stringify(formatData));
                    var res = await saveRegisterForm(formatData);
                    // window.location.href = res.url;
                }
            }
            else {
                var formatData = { ...formdata, Entry_Fees: "Free" };
                delete formatData.id;
                // var res = await FreeRegisterion(formatData);
                var res = await saveRegisterForm(formatData);
                // navigate('/payment-success/completed')
            }
        }
        else {
            var formatData = formdata;
            delete formatData.id;
            localStorage.setItem('registerData', JSON.stringify(formatData))
            var res = await saveRegisterForm(formatData)
            // Setclientsecret(res.clientSecret)
            // window.location.href = res.url;
        }
        res.message == "Registered Successfully" ? toast.success("Registered Successfully") : toast.error("Registered Failed")
    }

    return (
        <>
            <Registration type={type} EventData={EventData} formdata={formdata} handlechange={handlechange} handlesave={handlesave} />
        </>
    )
}