import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
    Mutation UpdateUserProfile($fullName: String!, $bio: String!, $image: Upload) {
        updateUserProfile(fullName: $fullName, bio: $bio, image: $image) {
            id
            fullName
            bio
            image
        }
    }
`