import moment from 'moment-timezone';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import apiurl from '../../../../Shared/services/apiendpoint/apiendpoint';

export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata,setFormdata, handleupdate ,setDataUrl, AddGame, removeGame, handlechangeGames,dataUrl} = props;
  
    // const quillRef = useRef(null);

    // useEffect(() => {
    //   const quillInstance = quillRef.current.getEditor();
    //   console.log(quillInstance.getContents());
    // }, [formdata?.Description]);
  
    const modules = {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
      };
    
      const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ];

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
                            <label>Event Type</label>
                        </div>
                        <select name="Poster_Type" value={formdata?.Poster_Type} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                            <option value="">Select Type</option>
                            <option value="RSVP">RSVP</option>
                            <option value="Registration Form">Registration Form</option>
                            <option value="Donation">Donation</option>
                        </select>
                    </div>
                    
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Event Date</label>
                        </div>
                        <input  type="date" name="Date" value={ formdata?.Date ? moment(formdata?.Date).format("YYYY-MM-DD") : ''} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>

                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Event Time</label>
                        </div>
                        <input type="text" name="Event_Time" value={formdata?.Event_Time} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
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

                    { formdata?.Poster_Type == "RSVP" && <>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Payment?</label>
                            </div>
                            <select name="Payment" value={formdata?.Payment} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                <option value="">Select Type</option>
                                <option value="Yes">Yes</option>
                                <option value="Free">No</option>
                            </select>
                        </div>

                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Guest Count</label>
                            </div>
                            <select name="Guest_Count" value={formdata?.Guest_Count} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                <option value="">Select Type</option>
                                <option value="Customizable">Customizable</option>
                                <option value="Age Wise">Age Wise</option>
                            </select>
                        </div>

                        { formdata?.Payment == "Yes" && <>

                            {formdata?.Guest_Count != "Age Wise" && <>
                                <div className="mb-2">
                                    <div className="mb-2">
                                        <label>Entry Fees</label>
                                    </div>
                                    <input type="text" name="Entry_Fees" value={formdata?.Entry_Fees} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                </div>
                            </>}

                            { formdata?.Guest_Count == "Age Wise" && <>
                                <div className="mb-2">
                                    <div className="mb-2">
                                        <label>Fees for Adults</label>
                                    </div>
                                    <input type="text" name="Fees_Adults" value={formdata?.Fees_Adults} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                </div>

                                <div className="mb-2">
                                    <div className="mb-2">
                                        <label>Fees for Kids</label>
                                    </div>
                                    <input type="text" name="Fees_Kids" value={formdata?.Fees_Kids} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                </div>

                                <div className="mb-2">
                                    <div className="mb-2">
                                        <label>Fees For Under 5 Years</label>
                                    </div>
                                    <input type="text" name="Fees_Under5" value={formdata?.Fees_Under5} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                </div>
                            </>}
                        </>}
                    </>}


                    { formdata?.Poster_Type == "Registration Form" && <>
                        { formdata?.Games.length !=0 && formdata?.Games.map((items, index) => (
                            <div className='lg:col-span-2' key={index}>
                                {console.log(formdata.Games)}
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                                
                                    <div className='text-xl font-bold'>
                                        <span className=''>Subevent</span> {index+1}
                                    </div>
                                    <div className='text-end'>
                                        <button type="button" onClick={(e)=> removeGame(e,index)} className=" px-2 py-1 text-sm text-white bg-danger-600 border rounded-md text-center" > <i className="fa-solid fa-trash"></i></button>
                                    </div>
                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Subevent Name</label>
                                        </div>
                                        <input type="text" name="Game_Title" value={items?.Game_Title} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                    </div>

                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Subevent Type</label>
                                        </div>
                                        {/* <input type="text" name="Participant_Type" value={formdata?.Participant_Type} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required /> */}
                                        <select name="Participant_Type" value={items?.Participant_Type} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                            <option value="">Select Type</option>
                                            <option value="Fixed Team">Fixed Team</option>
                                            <option value="Custom Team">Custom Team</option>
                                            <option value="Induvidual">Induvidual</option>
                                        </select>
                                    </div>

                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Payment</label>
                                        </div>
                                        <select name="GamePayment" value={items?.GamePayment} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                            <option value="">Select Type</option>
                                            <option value="Yes">Yes</option>
                                            <option value="Free">No</option>
                                        </select>
                                    </div>

                                    { items?.GamePayment == "Yes" && <>
                                        <div className="mb-2">
                                            <div className="mb-2">
                                                <label>Payment Type?</label>
                                            </div>
                                            <select name="Payment_Type" value={items?.Payment_Type} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                                <option value="">Select Type</option>
                                                <option value="Team">Team</option>
                                                <option value="Individual">Individual</option>
                                            </select>
                                        </div>
                                        
                                        <div className="mb-2">
                                            <div className="mb-2">
                                                <label>Entry Fees</label>
                                            </div>
                                            <input type="text" name="Entry_Fees" value={items?.Entry_Fees} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                        </div>
                                    </>}
                                </div>      
                            </div>
                        ))}
                        <div className='lg:col-span-2 text-end'>
                            <button type="button" onClick={AddGame} className="px-4 py-2 text-white bg-secondary border rounded-md text-center" > <span className='block md:hidden'><i className="fa-solid fa-plus"></i></span> <span className='hidden md:block'>+ Add Subevent</span></button>
                        </div>
                        

                        <div className="mb-2 lg:col-span-2">
                            <div className="mb-2">
                                <label>Disclaimer</label>
                            </div>
                            <ReactQuill value={formdata?.Disclaimer} onChange={(e) => handlechange(e,'Disclaimer')} modules={modules} formats={formats} />
                        </div>
                    </>}

                    <div className="mb-3 lg:col-span-2">
                        <div className="mb-2">
                            <label>Description</label>
                        </div>
                        {/* <Editor value={formdata?.Description} onTextChange={(e) => handlechange(e)} style={{ height: '320px' }} /> */}
                        <ReactQuill value={formdata?.Description} onChange={(e) => handlechange(e,'Description')} modules={modules} formats={formats} />
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
