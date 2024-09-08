import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
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
import { GetCommentsByPostIdDocument, GetCommentsByPostIdQuery } from "../gql/graphql";
import { useUserStore } from "../stores/userStore";
import { usePostStore } from "../stores/postStore";
import { LIKE_POST } from "../graphql/mutations/LikePost";
import { UNLIKE_POST } from "../graphql/mutations/UnlikePost";

function Post() {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const [CreateComment, {data: commentData}] = useMutation(CREATE_COMMENT, {
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
    const [loeaded, setIsloeaded] = useState(false);
    const {data: postData, loading: loadingPost} = useQuery(GET_POST_BY_ID, {
        variables: {
            id: Number(id)
        },
        onCompleted: () => {
            setIsloeaded(true);
        }
    });
    const loopThroughPostsUp = () => {
        if (currentPostIndex === postData?.getPostsById.length - 1) {
            return;
        }
        setCurrentPostIndex(currentPostIndex + 1);
        const nextPostId = postData?.getPostsById.otherPostIds[currentPostIndex]
        navigate(`/post/${nextPostId}`);
    }

    const loopThroughPostsDown = () => {
        if (currentPostIndex === 0) {
            return;
        }
        setCurrentPostIndex(currentPostIndex - 1);
        const nextPostId = postData?.getPostsById.otherPostIds[currentPostIndex]
        navigate(`/post/${nextPostId}`);
    }

    return (  
        <div>
            <h1>Post</h1>
        </div>
    );
}

export default Post;