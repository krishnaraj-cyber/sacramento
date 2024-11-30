import { useCallback, useEffect, useState } from "react";
import Dashboardcard from "../shared/components/cards/Dashboardcard";
import { getallBoardmembers } from "../shared/services/apiboardmembers/apiboardmembers";
import { getallYouthForum } from "../shared/services/apiyouthforum/apiyouthforum";
import { getallSponsors } from "../shared/services/apisponsor/apisponsor";
import { getallEvents } from "../shared/services/apievent/apievent";

export default function Dashboard() {
    let isMounted = true;
    const [board, setBoard] = useState([])
    const [youth, setYouth] = useState([])
    const [sponsor, setSponsor] = useState([])
    const [event, setEvent] = useState([])

    const getallGallery = useCallback(async () => {
        const res = await getallBoardmembers({});
        setBoard(res.resdata);
      }, []);    
      useEffect(() => {
        if (isMounted) {
          getallGallery();
        }
        return () => (isMounted = false);
      }, []);

      const getallGallery2 = useCallback(async () => {
        const res = await getallYouthForum({});
        setYouth(res.resdata);
      }, []);
      useEffect(() => {
        if (isMounted) {
          getallGallery2();
        }
        return () => (isMounted = false);
      }, []);

      const getallGallery3 = useCallback(async () => {
        const res = await getallSponsors({});
        setSponsor(res.resdata);
      }, []);
      useEffect(() => {
        if (isMounted) {
          getallGallery3();
        }
        return () => (isMounted = false);
      }, []);

      const getallGallery4 = useCallback(async () => {
        const res = await getallEvents({});
        setEvent(res.resdata);
      }, []);
      useEffect(() => {
        if (isMounted) {
          getallGallery4();
        }
        return () => (isMounted = false);
      }, []);

      const activeEvents = event.filter((event) => event.Status === "Active").map((event) => ({
      id: event.id,
      Eventname: event.Eventname,
      Date: event.Date,
      Activities: event.Activities,
      Image: event.Image,
    }));

  return (
    <div>
      <Dashboardcard board={board} activeEvents={activeEvents} youth={youth} sponsor={sponsor} />
    </div>
  );
}
