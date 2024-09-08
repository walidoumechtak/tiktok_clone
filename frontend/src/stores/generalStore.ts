import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface GeneralState {
    isLoginOpen: boolean;
    isEditProfileOpen: boolean;
    selectedPosts: null;
    ids: null;
    posts: null;
}

export interface GeneralActions {
    setLoginIsOpen: (isOpen: boolean) => void;
    setIsEditProfileOpen: () => void;
}

export const useGeneralStore = create<GeneralState& GeneralActions>()(
    devtools(
        persist(
            (set) => (
                {
                    isLoginOpen: false,
                    isEditProfileOpen: false,
                    selectedPosts: null,
                    ids: null,
                    posts: null,
                    setLoginIsOpen: (isOpen: boolean) => set({ isLoginOpen: isOpen }),
                    setIsEditProfileOpen: () => {
                        return set((state) => ({
                            isEditProfileOpen: !state.isEditProfileOpen
                        }))
                    },

                }
            ),
            {
                name: "general-store"
            }
        )
    )
)