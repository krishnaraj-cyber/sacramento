import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { geteventbyid } from '../shared/services/apiregistration/apiregistration';
import Registration from '../shared/components/Registration/Registration';
import { FreeRegisterion, saveregister } from '../shared/services/apiRegister/apiregister';
import { loadStripe } from '@stripe/stripe-js';

export default function RegistrationPage(prpos) {

    const { Setclientsecret } = prpos;
    const stripe = loadStripe('pk_live_51PRoZDRqH9kU3X2F9EhsHcgOcv15PADb7WHi86j1i7pFNxZV9OXExMfxehmCyRM1asIun8eKifd4jX873zvyp2Cv00AHEaeiKR');

    const param = useParams();
    const navigate = useNavigate();
    const [EventData, setEventData] = useState({});
    const [loading, setLoading] = useState(false);
    const [Visible, setVisible] = useState(false);
    const [formdata, setFormdata]=useState([]);

    const geteventbyID = useCallback(async () => {
        const Event = await geteventbyid({_id:param.id});
        setEventData(Event);
        setFormdata(Event)
    }, []);

    var isMounted = true;
    useEffect(()=>{
        if (isMounted) {
            geteventbyID();
        }
        return () => (isMounted = false);
    },[param.id])

    const handlechange = (e)=>{
        setFormdata({...formdata, [e.target.name]: e.target.value});
        if(e.target.name == "Event"){
            var datas = formdata.Games.find(item => item.Game_Title === e.target.value);
            setFormdata({...formdata,...datas}); 
        }
    }

    const handlesave = async(e)=>{
        e.preventDefault();
        console.log(formdata)
        if(formdata.Poster_Type == "RSVP"){
            if(formdata.Peyment == "Yes"){
                if(formdata.Guest_Count == "Age Wise"){
                    var totalAmount = ( (formdata.Fees_Adults*1)*formdata.Adults)+((formdata.Fees_Kids*1)*formdata.Kids)+((formdata.Fees_Under5*1)*formdata.Babes );
                    //console.log(totalAmount)
                    var formatData = {...formdata,Entry_Fees:totalAmount};
                    delete formatData._id;
                    localStorage.setItem('registerData',JSON.stringify(formatData));
                    var res = await saveregister(formatData);
                    window.location.href = res.url;
                }
                else{
                    var totalAmount = ((formdata.Entry_Fees*1)*formdata.Number_Guests);
                    //console.log(totalAmount)
                    var formatData = {...formdata,Entry_Fees:totalAmount};
                    delete formatData._id;
                    localStorage.setItem('registerData',JSON.stringify(formatData));
                    var res = await saveregister(formatData);
                    window.location.href = res.url;
                }
            }
            else{
                var formatData = {...formdata,Entry_Fees:"Free"};
                delete formatData._id;
                var res = await FreeRegisterion(formatData);
                navigate('/payment-success/completed')
            }
        }
        else{
            var formatData = formdata;
            delete formatData._id;
            localStorage.setItem('registerData',JSON.stringify(formatData))
            var res = await saveregister(formatData)
            // Setclientsecret(res.clientSecret)
            window.location.href = res.url;
        }
    }

    return (
        <>
            <Registration EventData={EventData} formdata={formdata} handlechange={handlechange} handlesave={handlesave}/>
        </>
    )
}
