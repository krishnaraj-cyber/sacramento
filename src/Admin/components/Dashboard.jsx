import { useCallback, useEffect, useState } from "react";
import Dashboardcard from "../shared/components/cards/Dashboardcard";
import { getallBoardmembers } from "../shared/services/apiboardmembers/apiboardmembers";
import { getallYouthForum } from "../shared/services/apiyouthforum/apiyouthforum";
import { getallSponsors } from "../shared/services/apisponsor/apisponsor";
import { getallEvents, getEventByStatus } from "../shared/services/apievent/apievent";

export default function Dashboard() {
    let isMounted = true;
    const [board, setBoard] = useState([])
    const [youth, setYouth] = useState([])
    const [sponsor, setSponsor] = useState([])
    const [event, setEvent] = useState([])

    const getallGallery = useCallback(async () => {
        const res1 = await getallBoardmembers({});
        setBoard(res1.resdata);
        const res2 = await getallYouthForum({});
        setYouth(res2.resdata);
        const res3 = await getallSponsors({});
        setSponsor(res3.resdata);
        const res4 = await getEventByStatus({});
        setEvent(res4.resdata);
      }, []);    
      useEffect(() => {
        if (isMounted) {
          getallGallery();
        }
        return () => (isMounted = false);
      }, []);

  return (
    <div>
      <Dashboardcard board={board} activeEvents={event} youth={youth} sponsor={sponsor} />
    </div>
  );
}
