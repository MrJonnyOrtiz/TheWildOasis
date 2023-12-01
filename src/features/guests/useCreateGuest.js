import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createGuestApi } from "../../services/apiBookings";

export function useCreateGuest() {
   const queryClient = useQueryClient();

   const { mutate: createGuest, isLoading: isCreating } = useMutation({
      mutationFn: createGuestApi,
      onSuccess: () => {
         toast.success("New guest created successfully");
         queryClient.invalidateQueries({ queryKey: ["guests"] });
      },
      onError: (error) => toast.error(error.message),
   });

   return { createGuest, isCreating };
}
