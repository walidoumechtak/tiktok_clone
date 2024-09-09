import { useEffect, useRef, useState } from "react";
import { ImCross, ImSpinner2 } from "react-icons/im";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { ImSpinner } from "react-icons/im";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsMusicNoteBeamed, BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHeart, AiFillPlayCircle } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GET_POST_BY_ID } from "../graphql/queries/GetPostById";
import { CREATE_COMMENT } from "../graphql/mutations/CreateComment";
import { GET_COMMENTS_BY_POST_ID } from "../graphql/queries/GetCommentsByPostId";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_COMMENT } from "../graphql/mutations/DeleteComment";
import { GetCommentsByPostIdDocument, GetCommentsByPostIdQuery, GetPostByIdQuery } from "../gql/graphql";
import { useUserStore } from "../stores/userStore";
import { usePostStore } from "../stores/postStore";
import { LIKE_POST } from "../graphql/mutations/LikePost";
import { UNLIKE_POST } from "../graphql/mutations/UnlikePost";
import { create } from "zustand";

function Post() {
    const { id } = useParams<{id: string}>();
    console.log("id =========> ", id);
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const [createComment, {data: commentData}] = useMutation(CREATE_COMMENT, {
        refetchQueries: [{
            query: GET_COMMENTS_BY_POST_ID,
            variables: {
                postId: Number(id),
                text: comment,
            }

        }]
    });
    const {data, loading: loadingComments, error} = useQuery<GetCommentsByPostIdQuery>(GET_COMMENTS_BY_POST_ID, {
        variables: {
            postId: Number(id)
        },
    });

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        update(cache, {data: { deleteComment }}) {
            const deleteCommentId = deleteComment.id;
            const existingComments = cache.readQuery<GetCommentsByPostIdQuery>({
                query: GET_COMMENTS_BY_POST_ID,
                variables: {
                    postId: Number(id)
                }
            });
            // Files out the deleted comment
            const newComments = existingComments?.getCommentsByPostId.filter(
                (comment) => comment.id !== deleteCommentId
            )
            cache.writeQuery({
                query: GET_COMMENTS_BY_POST_ID,
                data: { GetCommentsByPostId: newComments },
                variables: { postId: Number(id) }
            })
        }
    });

    const handleDeleteComment = async (commentId: number) => {
        await deleteComment({
            variables: {
                commentId
            }
        });
    }

    const [ currentPostIndex, setCurrentPostIndex ] = useState(0);
    const [loaded, setIsloaded] = useState(false);
    const {data: postData, loading: loadingPost} = useQuery(GET_POST_BY_ID, {
        variables: {
            id: Number(id)
        },
        onCompleted: () => {
            console.log("post data =========> " ,postData);
            setIsloaded(true);
        },
        onError: (error) => {
            console.log("error =========> ", error);
        }
    }); 
    const loopThroughPostsUp = () => {
        if (currentPostIndex === postData?.getPostById.otherPostIds?.length ? postData?.getPostById.otherPostIds?.length : 1 - 1) {
            return;
        }
        setCurrentPostIndex(currentPostIndex + 1);
        const nextPostId = postData?.getPostById?.otherPostIds ? postData?.getPostById?.otherPostIds[currentPostIndex] : null;
        navigate(`/post/${nextPostId}`);
    }

    const loopThroughPostsDown = () => {
        if (currentPostIndex === 0) {
            return;
        }
        setCurrentPostIndex(currentPostIndex - 1);
        const nextPostId = postData?.getPostById?.otherPostIds ? postData?.getPostById?.otherPostIds[currentPostIndex] : null;
        navigate(`/post/${nextPostId}`);
    }

    const addComment = async () => {
        await createComment({
            variables: {
                postId: Number(id),
                text: comment
            }
        });
        setComment("");
    }

    const video = useRef<HTMLVideoElement>(null);
    const [inputFocussed, setInputFocussed] = useState(false);

    useEffect(() => {
        const handleLoadedData = () => {
            video.current?.play();
            setTimeout(() => {
                setIsloaded(true);
            }, 300);
        }
        const videoRef = video.current;
        videoRef?.addEventListener("loadeddata", handleLoadedData);
        return () => {
            if (!videoRef) return;
            videoRef.removeEventListener("loadeddata", handleLoadedData);
            videoRef.pause();
            videoRef.currentTime = 0;
            videoRef.load();
        }
    }, [loaded, setIsloaded])

    const [isPlaying, setIsPlaying] = useState(false);

    const toggleVideoPlay = () => {
        if (video.current) {
            if (isPlaying)
                video.current.pause();
            else
                video.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const likedPosts = usePostStore((state) => state.likedPosts);
    const likePost = usePostStore((state) => state.likePost);
    const removeLike = usePostStore((state) => state.removeLike);
    const loggedInUserId = useUserStore((state) => state.id);

    const [likePostMutation] = useMutation(LIKE_POST, {
        variables: {
            postId: Number(id),
        },
        refetchQueries: [{
            query: GET_POST_BY_ID,
            variables: {
                id: Number(id),
            },
        }],
    });

    const [removeLikeMutation] = useMutation(UNLIKE_POST, {
        variables: {
            postId: Number(id),
        },
        refetchQueries: [{
            query: GET_POST_BY_ID,
            variables: {
                id: Number(id),
            },
        }],
    });

    const handleRemoveLike = async () => {
        if (loggedInUserId == postData?.getPostById.user.id) return; // User can't like their own post
        await removeLikeMutation();
        removeLike(Number(id));
    }

    const handleLikePost = async () => {
        if (loggedInUserId == postData?.getPostById.user.id) return; // User can't like their own post
        await likePostMutation();
        likePost({id: Math.random(), postId: Number(id), userId: Number(loggedInUserId)});
    }

    const isLiked = likedPosts.some((likedPost) => { // Check if the post is liked by the user or not [icon like red or black]
        if (!likedPost) return false;
        return likedPost.postId === Number(loggedInUserId)
    });

    return (  
        <div
            id="post"
            className="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto"
        >
            <div className="lg:w-[calc(100%-540px)] h-full relative">
                <Link
                    className="absolute z-20 m-5 rounded-full hover:bg-gray-800 bg-gray-700 p-1.5"
                    to="/">
                    {" "}
                    <ImCross size={25} color="#FFFFFF" />
                </Link>
                <button
                    className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full p-1.5 bg-gray-700 hover:bg-gray-800"
                >
                    <BiChevronUp size={25} color="#FFFFFF" onClick={loopThroughPostsUp} />
                </button>
                <button
                    className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full p-1.5 bg-gray-700 hover:bg-gray-800"
                >
                    <BiChevronDown size={25} color="#FFFFFF" onClick={loopThroughPostsDown} />
                </button>
                <img 
                    className="absolute top-[18px] left-[70px] max-w-[80px] rounded-full lg:mx-0 mx-auto"
                    src="/src/assets/images/tiktok-logo-small.png"
                />
            </div>
            { loadingPost ? (
            <div className="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[400px]">
                <ImSpinner2 className="animate-spin ml-1" size={"100"} color="#FFFFFF" />
            </div> ) : ( 
            <div 
                className="bg-black bg-opacity-90 lg:min-w-[480px]"
                onClick={toggleVideoPlay}
            >
                <video
                    ref={video}
                    src={"http://localhost:3000" + postData?.getPostById.video}
                    loop
                    muted
                    className="h-screen mx-auto"
                />
                <AiFillPlayCircle
                    size={"100"}
                    className="rounded-full z-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-balck cursor-pointer"
                />
            </div>
            )}
            <div 
                className="lg-max-w-[550px] relative w-full h-full bg-white"
                id="InfoSection"    
            >
                <div className="py-7"/>
                <div
                    className="flex items-center justify-between px-8"
                >
                    <div className="flex items-center">
                        <Link to="/">
                            <img 
                                width={"40"}
                                className="rounded-full lg:mx-0 mx-auto"
                                src={
                                    postData?.getPostById.user.image ?
                                        postData?.getPostById.user.image :
                                        "https://picsum.photos/id/237/200/300"
                                }
                            />
                        </Link>
                        <div className="ml-3 pt-0.5">
                            <div className="text-[17px] font-semibold">User name</div>
                            <div className="text-[13px] font-light -mt-5">
                                { postData?.getPostById?.user.fullName }
                                <span className="relative top-[6px] text-[30px] pr-0.5">•</span>
                                <span className="font-medium">
                                    { new Date(postData?.getPostById.createdAt).toLocaleDateString() }
                                </span>
                            </div>
                        </div>
                    </div>
                    <MdOutlineDeleteForever size={25} className="cursor-pointer" />
                </div>
                <div className="px-8 mt-4 text-sm"> {postData?.getPostById?.text} </div>
                <div className="px-8 mt-4 text-sm font-bold">
                    <BsMusicNoteBeamed size="17" />
                    Original sound - {postData?.getPostById?.user.fullName}
                </div>
                <div className="flex items-center px-8 mt-8">
                    <div className="pb-4 text-center flex items-center">
                        <button
                            disabled={postData?.getPostById?.user.id === loggedInUserId}
                            className="rounded-full bg-gray-200 p-2 cussor-pointer"
                            onClick={() => (isLiked ? handleRemoveLike() : handleLikePost())}
                        >
                            <AiFillHeart size={"25"} color={isLiked ? "red" : "black"}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;