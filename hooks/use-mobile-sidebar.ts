import { create } from "zustand";

///  quản lý trạng thái (state) và vòng đời (lifecycle) của component một cách đơn giản, dễ tái sử dụng,
//  không cần dùng class. 

type MobileSidebarStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMobileSideBar = create<MobileSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
