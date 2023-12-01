import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
   const queryClient = useQueryClient();

   const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
      mutationFn: deleteCabinApi,
      // mutationFn: (id) => deleteCabin(id),
      onSuccess: () => {
         toast.success("Cabin deleted successfully");

         queryClient.invalidateQueries({
            queryKey: ["cabins"],
         });
      },
      onError: (error) => toast.error(error.message),
   });

   return { isDeleting, deleteCabin };
}
