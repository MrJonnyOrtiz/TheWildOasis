import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
   const queryClient = useQueryClient();

   const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
      mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
      onSuccess: () => {
         toast.success("Cabin updated successfully");
         queryClient.invalidateQueries({ queryKey: ["cabins"] });
      },
      onError: (error) => toast.error(error.message),
   });

   return { updateCabin, isUpdating };
}
