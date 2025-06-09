import { create } from "zustand";

///  quản lý trạng thái (state) và vòng đời (lifecycle) của component một cách đơn giản, dễ tái sử dụng,
//  không cần dùng class.

type CardModalStore = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
