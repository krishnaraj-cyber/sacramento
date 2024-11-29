export default function Dashboardcard(props) {
  const { board, activeEvents, youth, sponsor  } = props;
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="relative p-5 overflow-hidden border border-b-3 border-primary rounded-xl">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-primary fi fi-sr-user-tag"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{board}</h1>
          <h3 className="text-sm">No. of Board Members</h3>
        </div>
      </div>
      <div className="relative p-5 overflow-hidden border border-b-3 border-primary rounded-xl">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-primary  fi fi-sr-user-tag"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{youth}</h1>
          <h3 className="text-sm">No. of Youth Forum</h3>
        </div>
      </div>
      <div className="relative p-5 overflow-hidden border border-b-3 border-primary rounded-xl">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-primary fa-solid fa-handshake"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{sponsor}</h1>
          <h3 className="text-sm">No. of Sponsors</h3>
        </div>
      </div>
      <div className="relative p-5 overflow-hidden border border-b-3 border-primary rounded-xl">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-primary fa-duotone fa-solid fa-calendar-check"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{activeEvents.length}</h1>
          <h3 className="text-sm">Active Program</h3>
        </div>
      </div>
    </div>
  )
}
