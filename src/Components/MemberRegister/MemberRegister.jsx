import React, { useState } from 'react'
import AboutUs from '../../Shared/Components/About/AboutUs'
import MemberRegisterForm from '../../Shared/Components/MemberRegistration/MemberRegisterForm'
import { saveMemberRegister } from '../../Admin/shared/services/apimemberregister/apimemberregister';
import toast from 'react-hot-toast';

export default function MemberRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [success, setSuccess] = useState(false);

const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
}
const handlesave = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    var res = await saveMemberRegister(formdata);
    setIsLoading(false) 
    if (res.message === "Registered Successfully") {
      setSuccess(true);
    } else {
      toast.error("Registration Failed");
    }
};


  return (
  <>
  <AboutUs title='Member Registration' />
  <MemberRegisterForm handlechange={handlechange} handlesave={handlesave} formdata={formdata} isLoading={isLoading} success={success} />
  </>
  )
}
