import { z } from "zod";
import { CopyCard } from "./schema";
import { Card } from "@/prisma/generated/prisma-client";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>;
