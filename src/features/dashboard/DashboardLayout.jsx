import styled from "styled-components";

import { useRecentBookings } from "./useRecentBookings.js";
import { useRecentStays } from "./useRecentStays.js";
import { useCabins } from "../cabins/useCabins.js";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   grid-template-rows: auto 34rem auto;
   gap: 2.4rem;
`;

export default function DashboardLayout() {
   const { bookings, isLoading } = useRecentBookings();

   const {
      stays,
      confirmedStays,
      isLoading: isLoadingStays,
      numDays,
   } = useRecentStays();

   const { cabins, isLoading: isLoadingCabins } = useCabins();

   if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

   return (
      <StyledDashboardLayout>
         <Stats
            bookings={bookings}
            confirmedStays={confirmedStays}
            numDays={numDays}
            cabinCount={cabins.length}
         />
         <TodayActivity />
         <DurationChart confirmedStays={confirmedStays} />
         <SalesChart bookings={bookings} numDays={numDays} />
      </StyledDashboardLayout>
   );
}
