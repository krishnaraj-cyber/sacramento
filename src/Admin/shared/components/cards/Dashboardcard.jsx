export default function Dashboardcard(props) {
  const { board, activeEvents, youth, sponsor  } = props;
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className=" bg-gradient-to-br from-[#e8e66d] to-[#e81e32ad] p-0.5 pb-1.5 pr-1.5 rounded-[14px]">
      <div className="relative p-5 overflow-hidden rounded-xl bg-white">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-[#157ac2] fi fi-sr-user-tag"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{board.length}</h1>
          <h3 className="text-sm">No. of Board Members</h3>
        </div>
      </div>
      </div>
      <div className=" bg-gradient-to-br from-[#e8e66d] to-[#e81e32ad] p-0.5 pb-1.5 pr-1.5 rounded-[14px]">
      <div className="relative p-5 overflow-hidden rounded-xl bg-white ">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-[#157ac2]  fi fi-sr-user-tag"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{youth.length}</h1>
          <h3 className="text-sm">No. of Youth Forum</h3>
        </div>
      </div>
      </div>
      <div className=" bg-gradient-to-br from-[#e8e66d] to-[#e81e32ad] p-0.5 pb-1.5 pr-1.5 rounded-[14px]">
      <div className="relative p-5 overflow-hidden rounded-xl bg-white">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-[#157ac2] fa-solid fa-handshake"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{sponsor.length}</h1>
          <h3 className="text-sm">No. of Sponsors</h3>
        </div>
      </div>
      </div>
      <div className=" bg-gradient-to-br from-[#e8e66d] to-[#e81e32ad] p-0.5 pb-1.5 pr-1.5 rounded-[14px]">
      <div className="relative p-5 overflow-hidden rounded-xl bg-white">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-[#157ac2] fa-duotone fa-solid fa-calendar-check"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{activeEvents.length}</h1>
          <h3 className="text-sm">Active Program</h3>
        </div>
      </div>
      </div>
    </div>
  )
}
