import { Board } from "@/lib/generated/prisma";
import { BoardTitleForm } from "./board-title";
import { BoardOptions } from "./board-option";

interface BoardNavBarProps {
  data: Board;
}

export const BoardNavbar = async ({ data }: BoardNavBarProps) => {
  // const { orgId } = await auth();

  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};
