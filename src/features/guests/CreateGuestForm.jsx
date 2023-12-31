import { useCreateGuest } from "./useCreateGuest.js";
import { useCountries } from "./useCountries.js";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import Spinner from "../../ui/Spinner";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function CreateGuestForm({
   onCloseModal,
   guest,
   handleGuest,
   handleIsGuestFound,
}) {
   const { isCreating, createGuest } = useCreateGuest();

   const { countries, isLoading, error } = useCountries();

   const { register, handleSubmit, formState, control, reset } = useForm();

   const { errors } = formState;

   if (isLoading) return <Spinner />;

   const countryOptions = countries
      ?.map((country) => {
         return {
            value: country.name.common,
            label: country.name.common,
         };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

   const onSubmit = function (data) {
      const nationality = data.nationality.value;
      const countryFlag = countries.find(
         (country) => country.name.common === nationality
      ).flags.svg;

      createGuest(
         { ...data, nationality, countryFlag },
         {
            onSuccess: (data) => {
               handleGuest(data);
               reset();
               handleIsGuestFound((isGuestFound) => !isGuestFound);
            },
         }
      );
   };

   return (
      <Form
         type={onCloseModal ? "modal" : "regular"}
         onSubmit={handleSubmit(onSubmit)}
      >
         <FormRow label="Full name" error={errors?.fullName?.message}>
            <Input
               type="text"
               id="fullName"
               disabled={isCreating}
               defaultValue={guest?.fullName}
               {...register("fullName", { required: "This field is required" })}
            />
         </FormRow>

         <FormRow label="Email address" error={errors?.email?.message}>
            <Input
               type="email"
               id="email"
               disabled={isCreating}
               {...register("email", {
                  required: "Email address is required",
                  pattern: {
                     // google: email regex JavaScript
                     value: /\S+@\S+\.\S+/,
                     message: "Please specify a valid email",
                  },
               })}
            />
         </FormRow>

         <div
            style={{
               display: "grid",
               gridTemplateColumns: "26.5rem 1fr 1fr",
               paddingTop: "1.2rem",
               paddingBottom: "1.2rem",
            }}
         >
            <label htmlFor="nationality">Nationality</label>
            <Controller
               name="nationality"
               control={control}
               render={({ field: { onChange, value, ref } }) => (
                  <span style={{ color: "black" }}>
                     <Select
                        options={countryOptions}
                        onChange={onChange}
                        value={value}
                        inputRef={ref}
                        id="nationality"
                        error={!!errors.nationality}
                     />
                  </span>
               )}
               rules={{ required: true }}
            />
            {errors.nationality && (
               <p style={{ color: "red", paddingLeft: "1rem" }}>
                  This field is required.
               </p>
            )}
         </div>

         <FormRow label="National ID" error={errors?.nationalID?.message}>
            <Input
               type="text"
               disabled={isCreating}
               id="nationalID"
               {...register("nationalID", {
                  required: "This field is required",
               })}
            />
         </FormRow>

         <FormRow>
            <Button
               $variation="secondary"
               type="reset"
               disabled={isCreating}
               onClick={() => onCloseModal?.()}
            >
               Cancel
            </Button>
            <Button disabled={isCreating}>Add new guest</Button>
         </FormRow>
      </Form>
   );
}

export default CreateGuestForm;
