"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
  await prisma.board.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organization/org_2xkYfcE6W0b0Ty4kqHnpWeTls5G");
}
