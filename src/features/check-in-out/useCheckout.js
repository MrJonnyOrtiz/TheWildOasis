import { useMutation, QueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
   const queryClient = new QueryClient();

   const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
      mutationFn: (bookingId) =>
         updateBooking(bookingId, {
            status: "checked-out",
         }),
      onSuccess: (data) => {
         toast.success(`Booking #${data.id} checked out successfully.`);
         queryClient.invalidateQueries({ active: true });
      },
      onError: (error) => toast.error(`Error checking out: ${error.message}.`),
   });

   return { checkout, isCheckingOut };
}
