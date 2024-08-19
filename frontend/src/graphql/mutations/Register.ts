import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation RegisterUser(
        $email: String!
        $password: String!
        $fullName: String!
    ) {
        register(registerInput: {email: $email, password: $password, fullName: $fullName}) {
            user {
                id
                email
                fullName
            }
        }
    }
`