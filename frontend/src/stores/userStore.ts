import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
    id?: number;
    fullName: string;
    email?: string;
    bio?: string;
    image?: string;
}

export interface UserActions {
    setUser: (user: User) => void; // login
    logout: () => void; // logout
}


export const useUserStore = create<User & UserActions>()(
    devtools(
        persist(
            (set) => (
                {
                    id: undefined,
                    fullName: "",
                    email: "",
                    bio: "",
                    image: "",
                    setUser: (user: User) => set(user),
                    logout: () => set(
                        {
                            id: undefined,
                            fullName: "",
                            email: "",
                            bio: "",
                            image: "",
                        }),
                }
            ),
            {
                name: "user-store"
            }
        )
    )
)