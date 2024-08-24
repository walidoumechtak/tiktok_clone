import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query GetUsers {
        getUsers {
            id
            fullName
            email
            image
        }
    }
`