import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
   const { register, handleSubmit, reset, getValues, formState } = useForm();

   const { errors } = formState;

   const queryClient = useQueryClient();

   const { mutate, isLoading: isCreating } = useMutation({
      mutationFn: createCabin,
      onSuccess: () => {
         toast.success("New cabin created successfully");

         queryClient.invalidateQueries(["cabins"]);

         reset();
      },
      onError: (error) => toast.error(error.message),
   });

   function onSubmit(data) {
      console.log(data);
      mutate({ ...data, image: data.image[0] });
   }

   function onError(errors) {
      // console.log(errors);
   }

   return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
         <FormRow label="Cabin name" error={errors?.name?.message}>
            <Input
               type="text"
               id="name"
               disabled={isCreating}
               {...register("name", {
                  required: "This field is required.",
               })}
            />
         </FormRow>

         <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
            <Input
               type="number"
               id="maxCapacity"
               disabled={isCreating}
               {...register("maxCapacity", {
                  required: "This field is required.",
                  min: {
                     value: 1,
                     message: "Capacity should be at least 1.",
                  },
               })}
            />
         </FormRow>

         <FormRow label="Regular price" error={errors?.regPrice?.message}>
            <Input
               type="number"
               id="regPrice"
               disabled={isCreating}
               {...register("regPrice", {
                  required: "This field is required.",
                  min: {
                     value: 1,
                     message: "Minimum length is 1 character.",
                  },
               })}
            />
         </FormRow>

         <FormRow label="Discount" error={errors?.discount?.message}>
            <Input
               type="number"
               id="discount"
               disabled={isCreating}
               defaultValue={0}
               {...register("discount", {
                  required: "This field is required.",
                  validate: (value) =>
                     value < getValues().regPrice ||
                     "Discount should be less than the regular price",
               })}
            />
         </FormRow>

         <FormRow label="Description" error={errors?.description?.message}>
            <Textarea
               type="number"
               id="description"
               defaultValue=""
               disabled={isCreating}
               {...register("description", {
                  required: "This field is required.",
               })}
            />
         </FormRow>

         <FormRow label="Cabin photo">
            <FileInput
               id="image"
               accept="image/*"
               type="file"
               {...register("image", {
                  required: "This field is required.",
               })}
            />
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}
            <Button $variation="secondary" type="reset">
               Cancel
            </Button>
            {isCreating ? (
               <Button>Adding cabin...</Button>
            ) : (
               <Button>Add cabin</Button>
            )}
         </FormRow>
      </Form>
   );
}

export default CreateCabinForm;
