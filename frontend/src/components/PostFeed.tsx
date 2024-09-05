import { useEffect, useRef } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";
import { PostType } from "../gql/graphql";
import { Link } from "react-router-dom";

function PostFeed({post}: {post: PostType}) {
    const video = useRef<HTMLVideoElement>(null);
    

    useEffect(() => {
        video.current?.play();
    })
    return (
        <div
            id="PostFeed"
            className="flex border-b py-6"
        >
            <div className="cursor-pointer">
                <img
                    width="60"
                    src={post?.user?.image ? post.user.image : "https://www.picsum.photos/200/400"}
                    className="rounded-full max-h-[60px]"
                />
                    
            </div>
        </div>  
    )
}
export default PostFeed;