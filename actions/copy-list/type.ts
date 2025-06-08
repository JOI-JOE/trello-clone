import { z } from "zod";
import { CopyList } from "./schema";
import { List } from "@/prisma/generated/prisma-client";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType, List>;
