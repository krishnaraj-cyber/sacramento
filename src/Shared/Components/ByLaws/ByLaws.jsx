import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function ByLaws(props) {
    const { defaultLayoutPluginInstance } = props;
    return (
        <section className="max-w-[70rem] mx-auto my-10 px-5">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <div className="w-full h-screen min-h-[80vh] md:min-h-[90vh]">
                    <Viewer
                        fileUrl="/stm_bylaws.pdf"
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </div>
            </Worker>
        </section>
    );
}

export default ByLaws;
