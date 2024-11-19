import React, { useState } from 'react'
import Login from '../shared/components/Login/Login'
import { useLocation, useNavigate } from 'react-router-dom';
import { apilogin } from '../shared/services/apiauthentication/apilogin';
import { login } from '../shared/services/Token/token';
import toast from 'react-hot-toast';


export default function LoginPage() {
    const location = useLocation()
    const [formdata, setFormdata] = useState({});
    const navigate = useNavigate();
    const handlechange = (e) => setFormdata({ ...formdata, [e.target.name]: e.target.value });

    const handlelogin = async (e) => {
        e.preventDefault();
   
        const res = await apilogin(formdata);

        if (res.message === "Successful login") {
            console.log(res.Role)
            if(location?.state?.status=="checkoutlogin"){
                navigate('/checkout')
            }
            else if(res.Role == 'Admin' ||res.Role == 'Employee' ){
                navigate('/admin/dashboard')
            }
            else{
                navigate('/')
            }
            login(res.token)
           
        } else {
            toast.error(res.status);
        }
    };

    return (
        <Login handlelogin={handlelogin} handlechange={handlechange} />
    )
}
