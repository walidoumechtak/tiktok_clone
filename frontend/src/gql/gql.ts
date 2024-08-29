/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreatePost($text: String!, $video: Upload!) {\n    createPost(text: $text, video: $video) {\n      id\n      text\n      video\n    }\n  }": types.CreatePostDocument,
    "\n    mutation LoginUser($email: String!, $password: String!) {\n        login(loginInput: {email: $email, password: $password}) {\n            user {\n                id\n                email\n                fullName\n            }\n        }\n    }   \n": types.LoginUserDocument,
    "\n    mutation LogoutUser {\n        logout\n    }\n": types.LogoutUserDocument,
    "\n    mutation RegisterUser(\n        $email: String!\n        $password: String!\n        $fullName: String!\n        $confirmPassword: String!\n    ) {\n        register(registerInput: {\n            email: $email,\n            password: $password,\n            fullName: $fullName\n            confirmPassword: $confirmPassword,\n            })\n             {\n            user {\n                id\n                email\n                fullName\n            }\n        }\n    }\n": types.RegisterUserDocument,
    "\n    query GetUsers {\n        getUsers {\n            id\n            fullName\n            email\n            image\n        }\n    }\n": types.GetUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($text: String!, $video: Upload!) {\n    createPost(text: $text, video: $video) {\n      id\n      text\n      video\n    }\n  }"): (typeof documents)["\n  mutation CreatePost($text: String!, $video: Upload!) {\n    createPost(text: $text, video: $video) {\n      id\n      text\n      video\n    }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation LoginUser($email: String!, $password: String!) {\n        login(loginInput: {email: $email, password: $password}) {\n            user {\n                id\n                email\n                fullName\n            }\n        }\n    }   \n"): (typeof documents)["\n    mutation LoginUser($email: String!, $password: String!) {\n        login(loginInput: {email: $email, password: $password}) {\n            user {\n                id\n                email\n                fullName\n            }\n        }\n    }   \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation LogoutUser {\n        logout\n    }\n"): (typeof documents)["\n    mutation LogoutUser {\n        logout\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RegisterUser(\n        $email: String!\n        $password: String!\n        $fullName: String!\n        $confirmPassword: String!\n    ) {\n        register(registerInput: {\n            email: $email,\n            password: $password,\n            fullName: $fullName\n            confirmPassword: $confirmPassword,\n            })\n             {\n            user {\n                id\n                email\n                fullName\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation RegisterUser(\n        $email: String!\n        $password: String!\n        $fullName: String!\n        $confirmPassword: String!\n    ) {\n        register(registerInput: {\n            email: $email,\n            password: $password,\n            fullName: $fullName\n            confirmPassword: $confirmPassword,\n            })\n             {\n            user {\n                id\n                email\n                fullName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetUsers {\n        getUsers {\n            id\n            fullName\n            email\n            image\n        }\n    }\n"): (typeof documents)["\n    query GetUsers {\n        getUsers {\n            id\n            fullName\n            email\n            image\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;