"use server";
import { redirect } from "next/navigation";
import { db } from "@/db";
export async function createSnippet(formData: FormData) {
  //This need to be server action

  //Check the user's inputs and make sure they are valid

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  // Create a new record in the database
  const snippet = await db.snippet.create({
    data: { title, code },
  });
  console.log(snippet);
  // Redirect the user to the root page
  redirect("/");
}
