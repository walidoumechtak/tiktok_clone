import { gql } from "@apollo/client";


export const GET_COMMENTS_BY_POST_ID = gql`
    query GetCommentsByPostId($postId: Float!) {
        getCommentsByPostId(postId: $postId) {
            id
            text
            createdAt
            user {
                id
                fullName
                email
            }
            post {
                id
                text
                video
            }
        }
    }
`