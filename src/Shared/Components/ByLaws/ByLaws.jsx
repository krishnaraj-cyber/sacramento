import React from 'react'

function ByLaws() {
    return (
        <>
            <section className="max-w-[70rem] mx-auto my-10 px-5 overflow-hidden">
                <embed src="src/Components/PDF/stm_bylaws.pdf" type="application/pdf" className="w-full h-screen min-h-[80vh] md:min-h-[90vh]" />
            </section>
        </>
    )
}
export default ByLaws
