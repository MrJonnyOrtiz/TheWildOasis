import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditBooking } from "../../services/apiBookings";

export function useCreateBooking() {
   const queryClient = useQueryClient();

   const { mutate: createBooking, isLoading: isCreating } = useMutation({
      mutationFn: createEditBooking,
      onSuccess: (data) => {
         toast.success(`New booking created successfully, $${data.totalPrice}`);
         queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },
      onError: (error) => toast.error(error.message),
   });

   return { createBooking, isCreating };
}
