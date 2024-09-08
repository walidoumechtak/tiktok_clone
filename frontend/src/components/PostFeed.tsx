import { useEffect, useRef } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";
import { PostType } from "../gql/graphql";
import { Link } from "react-router-dom";
import { BiShareAlt } from "react-icons/bi";

function PostFeed({post}: {post: PostType}) {
    const video = useRef<HTMLVideoElement>(null);
    

    useEffect(() => {
        // console.log("------------------> ", post.video);
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
            <div className="pl-3 w-full px-4">
                <div className="flex items-center justify-between pb-0.5">
                    <Link to={`/profile/${post.user.id}`}>
                        <span className="font-bold hover:underline cursor-pointer">
                            User name
                        </span>
                        <span className="text-[13px] text-light text-gray-500 pl-1 cursor-pointer">
                            {post.user.fullName}
                        </span>
                    </Link>
                    <button className="border text-[15px] px-[21px] py-.5 border-[#F02C56]
                         text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
                        Follow
                    </button>
                </div>
                <div className="text-[15px] pb-0.5 break-words md:max-w-[480px] max-w-[300px]">
                    This some post caption...
                </div>
                <div className="text-[14px] text-gray-500 pb-0.5">
                    #food #science #tech
                </div>
                <div className="text-[14px] pb-0.5 flex items-center font-semibold">
                    <BsMusicNoteBeamed size={17} />
                    <div className="px-1">original - Awesome</div>
                    <AiFillHeart size={20}/>
                </div>
                {/* ----- this div is for video rendring ----- */}
                <div className="mt-2.5 flex">
                    <div className="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl">
                        <video 
                            ref={video}
                            src={"http://localhost:3000" + post.video}
                            loop
                            muted
                            className="rounded-xl object-cover mx-auto h-full"
                        />
                        <img 
                            className="absolute right-2 bottom-8"
                            width={90}
                            src="src/assets/images/tiktok-logo-white.png"
                        />
                    </div>
                    <div className="relative mr-[75px]">
                        <div className="absolute bottom-0 pl-2">
                            <button className="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <AiFillHeart size={25} />
                            </button>
                            <span className="text-xs text-gray-800 font-semibold">
                                {post.likes?.length}
                            </span>
                            <button className="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <BiShareAlt size={25} />
                            </button>
                            <span className="text-xs text-gray-800 font-semibold">
                                1337
                            </span>
                            <button className="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <IoChatbubbleEllipses size={25} />
                            </button>
                            <span className="text-xs text-gray-800 font-semibold">
                                {" "}
                                {/* {data?.getCommentsByPostId.length} */}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}
export default PostFeed;