import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";

const DAY_IN_MS = 84_400_000;

export const checkSubsription = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await prisma.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubsciptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
