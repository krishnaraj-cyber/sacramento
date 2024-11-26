import React, { useState } from 'react'
import Form from '../../Shared/Components/Form/Form'
import AboutUs from '../../Shared/Components/About/AboutUs'

function FormPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        event: '',
        participantName: '',
        agree: false,
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };
    return (
        <>
            <AboutUs title="Sports Fest" />
            <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
        </>
    )
}

export default FormPage
