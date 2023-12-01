import { useMutation, QueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
   const queryClient = new QueryClient();

   const navigate = useNavigate();

   const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
      mutationFn: ({ bookingId, breakfast }) =>
         updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true,
            ...breakfast,
         }),
      onSuccess: (data) => {
         toast.success(`Booking #${data.id} checked in successfully.`);
         queryClient.invalidateQueries({ active: true });
         navigate("/");
      },
      onError: (error) => toast.error(`Error checking in: ${error.message}.`),
   });

   return { checkin, isCheckingIn };
}
