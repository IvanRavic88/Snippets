"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({ where: { id }, data: { code } });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });

  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  //Check the user's inputs and make sure they are valid
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length <= 3) {
      return {
        message: "Please provide a title that is at least 3 characters long",
      };
    }

    if (typeof code !== "string" || code.length <= 10) {
      return {
        message: "Please provide a code that is at least 10 characters long",
      };
    }

    // Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Unknown error",
      };
    }
  }
  // Redirect the user to the root page
  redirect("/");
}
