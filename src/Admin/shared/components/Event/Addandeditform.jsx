import moment from 'moment-timezone';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import apiurl from '../../../../Shared/services/apiendpoint/apiendpoint';

export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata,setFormdata, handleupdate ,setDataUrl, AddGame, removeGame, handlechangeGames,dataUrl} = props;
  

    return (
        <Dialog header={!formdata?.id ? "Add Event" : "Update Event"} visible={visible} onHide={() => setVisible(false)} className="!w-full lg:!w-[40rem]">
            <form onSubmit={!formdata?.id ? handlesave : handleupdate}>
                <div className="mb-3">
                    <div className="flex items-center justify-center mb-3">
                    <label className=" relative z-[1] flex flex-col items-center justify-center w-40 h-40 sm:w-60 sm:h-60 overflow-hidden rounded-xl border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {dataUrl ? (
                                <div className='mb-5'>
                                    <img src={dataUrl.src} alt="Uploaded" />
                                    <i onClick={() => { setDataUrl(null); setFormdata(prev => ({ ...prev, Image: null }));}} className="fa-solid fa-circle-xmark absolute top-3 right-3 text-red-600 text-2xl z-20"></i>
                                </div>
                            ) : formdata&& formdata?.Image ? (
                                <div className='mb-5'>
                                    <img src={`${apiurl()}/${formdata.Image}`} alt="" />
                                    <i onClick={() => { setFormdata(prev => ({ ...prev, Image: null }));}} className="fa-solid fa-circle-xmark absolute top-3 right-3 text-red-600 text-2xl z-20"></i>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-4 pb-5">
                                    <i className="fi fi-sr-mode-landscape"></i>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span>
                                    </p>
                                    <input type="file" name="Image" multiple required onChange={handlechange} className="hidden" />
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Event Name</label>
                        </div>
                        <input type="text" name="Eventname" value={formdata?.Eventname} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>
                    
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Event Date</label>
                        </div>
                        <input  type="datetime-local" name="Date" value={moment(formdata?.Date).format("YYYY-MM-DDTHH:mm")} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>

                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Activities</label>
                        </div>
                        <input type="text" name="Activities" value={formdata?.Activities} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>
                    
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Status</label>
                        </div>
                        <select name="Status" value={formdata?.Status} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                </div>
                
                <div className="mb-2">
                    <button type="submit" className="w-full px-4 py-2 text-white bg-secondary border rounded-md" >
                        {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>} 
                        {!formdata?.id ? "Add Event" : "Update Event"}
                    </button>
                </div>
            </form>
        </Dialog>
    )
}
