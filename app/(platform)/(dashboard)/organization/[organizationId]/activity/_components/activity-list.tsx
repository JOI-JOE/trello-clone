import { ActivityItem } from "@/components/ui/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const ActivityList = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const auditLogs = await prisma.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
    </ol>
  );
};
