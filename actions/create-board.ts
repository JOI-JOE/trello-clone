"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: { title?: string[] };
  message: string;
};

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 letters is required",
  }),
});

export async function create(prevState: State, formData: FormData) {
  const valiedateFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!valiedateFields.success) {
    return {
      errors: valiedateFields.error.flatten().fieldErrors,
      message: "Missing fields",
    };
  }

  const { title } = valiedateFields.data;

  try {
    await prisma.board.create({
      data: {
        title: title.trim(),
      },
    });
  } catch (error) {
    return {
      message: `Database Error ${error}`,
    };
  }

  revalidatePath("/organization/org_2xkYfcE6W0b0Ty4kqHnpWeTls5G");
  redirect("/organization/org_2xkYfcE6W0b0Ty4kqHnpWeTls5G");
}
