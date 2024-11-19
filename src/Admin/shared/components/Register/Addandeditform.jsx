import moment from 'moment-timezone';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';

export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate , AddGame, removeGame, handlechangeGames} = props;
  
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

    console.log(formdata)

    return (
        <Dialog header={!formdata?._id ? "Add Registration" : "Update Registration"} visible={visible} onHide={() => setVisible(false)} className="!w-full lg:!w-[40rem]">
            <form onSubmit={!formdata?._id ? handlesave : handleupdate}>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Title</label>
                        </div>
                        <input type="text" name="Title" value={formdata?.Title} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Post Type</label>
                        </div>
                        <select name="Poster_Type" value={formdata?.Poster_Type} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                            <option value="">Select Type</option>
                            <option value="RSVP">RSVP</option>
                            <option value="Registration Form">Registration Form</option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Date</label>
                        </div>
                        <input type="date" name="Event_Date" value={moment(formdata?.Event_Date).format("YYYYY-MM-DD")} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>

                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Time</label>
                        </div>
                        <input type="text" name="Event_Time" value={formdata?.Event_Time} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>

                    {/* <div className="mb-2">
                        <div className="mb-2">
                            <label>Location</label>
                        </div>
                        <input type="text" name="Event_Location" value={formdata?.Event_Location} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div> */}


                    { formdata?.Poster_Type == "RSVP" && <>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Peyment?</label>
                            </div>
                            <select name="Peyment" value={formdata?.Peyment} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                <option value="">Select Type</option>
                                <option value="Yes">Yes</option>
                                <option value="Free">Free</option>
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

                        { formdata?.Peyment == "Yes" && <>

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
                        {formdata?.Games && formdata?.Games.map((items, index) => (
                            <div className='lg:col-span-2' key={index}>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                                
                                    <div className='text-xl font-bold'>
                                        <span className=''>Game</span> {index+1}
                                    </div>
                                    <div className='text-end'>
                                        <button type="button" onClick={(e)=> removeGame(e,index)} className=" px-2 py-1 text-sm text-white bg-danger-600 border rounded-md text-center" > <i className="fa-solid fa-trash"></i></button>
                                    </div>
                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Game Title</label>
                                        </div>
                                        <input type="text" name="Game_Title" value={items?.Game_Title} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                    </div>

                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Participant Type</label>
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
                                            <label>Peyment?</label>
                                        </div>
                                        <select name="Peyment" value={items?.Peyment} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                            <option value="">Select Type</option>
                                            <option value="Yes">Yes</option>
                                            <option value="Free">Free</option>
                                        </select>
                                    </div>

                                    { items?.Peyment == "Yes" && <>
                                        <div className="mb-2">
                                            <div className="mb-2">
                                                <label>Peyment Type?</label>
                                            </div>
                                            <select name="Peyment_Type" value={items?.Peyment_Type} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required>
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
                            <button type="button" onClick={AddGame} className="px-4 py-2 text-white bg-secondary border rounded-md text-center" > <span className='block md:hidden'><i className="fa-solid fa-plus"></i></span> <span className='hidden md:block'>+ Add Game</span></button>
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
                        {!formdata?._id ? "Add Event" : "Update Event"}
                    </button>
                </div>
            </form>
        </Dialog>
    )
}
