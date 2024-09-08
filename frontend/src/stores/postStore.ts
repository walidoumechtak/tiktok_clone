import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PostState {
    likedPosts: Array<{
        id: number;
        postId: number;
        userId: number;
    }>
    likePost: (post: { id: number; postId: number; userId: number }) => void;
    removeLike: (postId: number) => void;
}   

export const usePostStore = create<PostState>()(
    persist(
        (set) => ({
            likedPosts: [],
            likePost: (post) => {
                set((state) => {
                    return { likedPosts: [...state.likedPosts, post] }
                })
            },
            removeLike:(postId) =>
                set((state) => ({
                    likedPosts: state.likedPosts.filter((post) => post.postId !== postId),
                }))
        }),
        {
            name: "post-storage",
        }
    )
)
    
