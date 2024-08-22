import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation RegisterUser(
        $email: String!
        $password: String!
        $fullName: String!
        $confirmPassword: String!
    ) {
        register(registerInput: {
            email: $email,
            password: $password,
            fullName: $fullName
            confirmPassword: $confirmPassword,
            })
             {
            user {
                id
                email
                fullName
            }
        }
    }
`