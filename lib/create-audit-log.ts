import { ACTION, ENTITY_TYPE } from "@/prisma/generated/prisma-client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { use } from "react";
import { prisma } from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = await auth();
    const user = await currentUser();

    if (!use || !orgId) {
      throw new Error("User not found!");
    }

    const { entityId, entityType, entityTitle, action } = props;

    await prisma.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user?.id,
        userImage: user?.imageUrl ?? "",
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
