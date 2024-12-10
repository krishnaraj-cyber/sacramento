import moment from 'moment-timezone';
import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';

export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate, dataUrl, setDataUrl, AddGame, removeGame, progress} = props;


    const closeModel = ()=>{
        setVisible(false);
        setDataUrl(null)
    }
    return (
        <Dialog header={!formdata?.id ? "Add Member" : "Update Member"} visible={visible} onHide={() =>closeModel() } className="!w-full lg:!w-[40rem]">
            <form onSubmit={!formdata?.id ? handlesave : handleupdate}>
               
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>First Name</label>
                        </div>
                        <input type="text" name="First_Name" value={formdata?.First_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Last Name</label>
                        </div>
                        <input type="text" name="Last_Name" value={formdata?.Last_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Email</label>
                        </div>
                        <input type="email" name="Email" value={formdata?.Email} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Phone Number</label>
                        </div>
                        <input type="number" name="Phone_Number" value={formdata?.Phone_Number} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                    </div>
                    <div className="mb-2">
                                    <div className="mb-2">
                                        <label>Location <span className='text-[#ef4444]'>*</span> </label>
                                    </div>
                                    <select name="Location" value={formdata?.Location} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                        <option value="">Select Type</option>
                                        <option value="Sacramento">Sacramento</option>
                                        <option value="Elk Grove">Elk Grove</option>
                                        <option value="Folsom">Folsom</option>
                                        <option value="Rancho Cordova">Rancho Cordova</option>
                                        <option value="Arden-Arcade">Arden-Arcade</option>
                                        <option value="Citrus Heights">Citrus Heights</option>
                                        <option value="Carmichael">Carmichael</option>
                                        <option value="Fair Oaks">Fair Oaks</option>
                                        <option value="North Highlands">North Highlands</option>
                                        <option value="Antelope">Antelope</option>
                                        <option value="Rio Linda">Rio Linda</option>
                                        <option value="Florin">Florin</option>
                                        <option value="Orangevale">Orangevale</option>
                                        <option value="Galt">Galt</option>
                                        <option value="Rosemont">Rosemont</option>
                                        <option value="Gold River">Gold River</option>
                                        <option value="Isleton">Isleton</option>
                                        <option value="Rancho Murieta">Rancho Murieta</option>
                                        <option value="McClellan Park">McClellan Park</option>
                                        <option value="Walnut Grove">Walnut Grove</option>
                                        <option value="Wilton">Wilton</option>
                                        <option value="Foothill Farms">Foothill Farms</option>
                                        <option value="Vineyard">Vineyard</option>
                                        <option value="La Riviera">La Riviera</option>
                                        <option value="Herald">Herald</option>
                                        <option value="Lemon Hill">Lemon Hill</option>
                                        <option value="Courtland">Courtland</option>
                                        <option value="Franklin">Franklin</option>
                                        <option value="Hood">Hood</option>
                                        <option value="Clay">Clay</option>
                                    </select>
                            </div>
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label>Register your spouse <span className='text-[#ef4444]'>*</span></label>
                                </div>
                                <select name="Register_spouse" value={formdata?.Register_spouse} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                        <option value="">Select Type</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                            </div>
                </div>
                <div className="mb-2">
                    <button type="submit" className="w-full px-4 py-2 text-white bg-secondary border rounded-md" >
                        {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>} 
                        {!formdata?.id ? "Add Member" : "Update Member"}
                    </button>
                </div>
            </form>
            {progress > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <ProgressBar value={progress}></ProgressBar>
                </div>
            )}
        </Dialog>
    )
}
