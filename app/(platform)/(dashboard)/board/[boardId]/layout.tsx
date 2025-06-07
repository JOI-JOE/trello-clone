import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-nav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ boardId: string }>; // Changed: Promise type
}) {
  const { orgId } = await auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const { boardId } = await params;

  const board = await prisma.board.findUnique({
    where: {
      id: boardId, // Use awaited boardId
      orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ boardId: string }>; // Changed: Promise type
}) => {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const { boardId } = await params;

  const board = await prisma.board.findUnique({
    where: {
      id: boardId, // Use awaited boardId
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10">
        <main className="relative pt-28 h-full">{children}</main>
      </div>
    </div>
  );
};

export default BoardIdLayout;
