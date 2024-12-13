import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';

export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate, dataUrl, setDataUrl, AddGame, removeGame, progress} = props;


    const closeModel = ()=>{
        setVisible(false);
        setDataUrl(null)
    }
    return (
        <Dialog header={!formdata?.id ? "Add Content" : "Update Content"} visible={visible} onHide={() =>closeModel() } className="!w-full lg:!w-[40rem]">
            <form onSubmit={!formdata?.id ? handlesave : handleupdate}> 
                <div className="grid grid-cols-1  gap-3 mb-3">

                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Content</label>
                        </div>
                        <textarea type="" name="Content" value={formdata?.Content} onChange={handlechange} className="w-full px-4 py-2 min-h-32 border rounded-md outline-none" required />
                    </div>

                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Status</label>
                        </div>
                        <select name="Status" value={formdata?.Status} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                            <option value="">Select Type</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>  

                </div>
                
                <div className="mb-2">
                    <button type="submit" className="w-full px-4 py-2 text-white bg-secondary border rounded-md" >
                        {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>} 
                        {!formdata?.id ? "Add Content" : "Update Content"}
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
