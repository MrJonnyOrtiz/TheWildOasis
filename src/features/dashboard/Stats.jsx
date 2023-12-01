import {
   HiOutlineBriefcase,
   HiOutlineBanknotes,
   HiOutlineCalendarDays,
   HiOutlineChartBar,
} from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";

import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
   // 1. number of bookings
   const numBookings = bookings.length;

   // 2. number of confirmed stays
   const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

   // 3. total checkins
   const numCheckins = confirmedStays?.length;

   // 4. occupancy rate
   const occupancyRate =
      confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount);

   return (
      <>
         <Stat
            title="Bookings"
            color="blue"
            icon={<HiOutlineBriefcase />}
            value={numBookings}
         />
         <Stat
            title="Sales"
            color="green"
            icon={<HiOutlineBanknotes />}
            value={formatCurrency(sales)}
         />
         <Stat
            title="Check ins"
            color="indigo"
            icon={<HiOutlineCalendarDays />}
            value={numCheckins}
         />
         <Stat
            title="Occupancy rate"
            color="yellow"
            icon={<HiOutlineChartBar />}
            value={Math.round(occupancyRate * 100) + "%"}
         />
      </>
   );
}

export default Stats;
