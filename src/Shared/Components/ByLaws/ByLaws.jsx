import React from 'react'

function ByLaws() {
    return (
        <>
            <section className="max-w-[70rem] mx-auto my-10 px-5 overflow-hidden ">
                <object data="src/Components/PDF/stm_bylaws.pdf" type="application/pdf" className="w-full h-screen overflow-hidden scrollbar-hide" >
                    <p>Your browser does not support PDFs. <a href="src/Components/PDF/stm_bylaws.pdf">Download the PDF</a>.</p>
                </object>
            </section>
        </>
    )
}
export default ByLaws
