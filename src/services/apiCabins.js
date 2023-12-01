import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
   const { data, error } = await supabase.from("cabins").select("*");

   if (error) {
      console.log(error);
      throw new Error("Cabins could not be retrieved.");
   }

   return data;
}

export async function createEditCabin(newCabin, id) {
   // sample image URL: https://dsqtriwwhcghewiejevj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
   );

   const imagePath = hasImagePath
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

   // 1. create / edit cabin
   let query = supabase.from("cabins");

   // create
   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

   // edit
   if (id)
      query = query
         .update({ ...newCabin, image: imagePath })
         .eq("id", id)
         .select();

   const { data, error } = await query.select().single();

   if (error) {
      console.log(error);
      throw new Error("Cabin could not be created.");
   }

   // 2. upload image to storage
   if (hasImagePath) return data; // guard clause if image is already uploaded to storage

   const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

   // 3. delete cabin if there was an upload error
   if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error(
         "Cabin image could not be uploaded and cabin not created."
      );
   }
}

export async function deleteCabin(id) {
   const { error } = await supabase.from("cabins").delete().eq("id", id);

   if (error) {
      console.log(error);
      throw new Error("Cabin could not be deleted.");
   }
}
