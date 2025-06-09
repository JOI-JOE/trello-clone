import { z } from "zod";
import { DeleteCard } from "./schema";
import { Card } from "@/prisma/generated/prisma-client";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionState<InputType, Card>;
