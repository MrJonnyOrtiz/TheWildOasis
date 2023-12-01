import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin.js";
import { useUpdateCabin } from "./useUpdateCabin.js";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateUpdateCabinForm({ cabinToUpdate = {}, onCloseModal }) {
   const { isCreating, createCabin } = useCreateCabin();
   const { isUpdating, updateCabin } = useUpdateCabin();

   const { id: editId, ...editValues } = cabinToUpdate;
   const isEditSession = Boolean(editId);

   const { register, handleSubmit, reset, getValues, formState } = useForm({
      defaultValues: isEditSession ? editValues : {},
   });

   const { errors } = formState;

   const isWorking = isCreating || isUpdating;

   function onSubmit(data) {
      const image = typeof data.image === "string" ? data.image : data.image[0];

      if (isEditSession)
         updateCabin(
            { newCabinData: { ...data, image }, id: editId },
            {
               onSuccess: (data) => {
                  reset();
                  onCloseModal?.();
               },
            }
         );
      else
         createCabin(
            { ...data, image: image },
            {
               onSuccess: (data) => {
                  reset();
                  onCloseModal?.();
               },
            }
         );
   }

   function onError(errors) {
      console.log(errors);
   }

   return (
      <Form
         onSubmit={handleSubmit(onSubmit, onError)}
         type={onCloseModal ? "modal" : "regular"}
      >
         <FormRow label="Cabin name" error={errors?.name?.message}>
            <Input
               type="text"
               id="name"
               disabled={isWorking}
               {...register("name", {
                  required: "This field is required.",
               })}
            />
         </FormRow>

         <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
            <Input
               type="number"
               id="maxCapacity"
               disabled={isWorking}
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
               disabled={isWorking}
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
               disabled={isWorking}
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
               disabled={isWorking}
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
                  required: isEditSession ? false : "This field is required.",
               })}
            />
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}
            <Button
               $variation="secondary"
               type="reset"
               onClick={() => onCloseModal?.()}
            >
               Cancel
            </Button>
            <Button disabled={isWorking}>
               {isEditSession ? "Edit cabin" : "Add cabin"}
            </Button>
         </FormRow>
      </Form>
   );
}

export default CreateUpdateCabinForm;
