import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    gql,
    Observable,
    ApolloLink,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';


async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
    try {
        const { data } = await client.mutate({
            mutation: gql`
                mutation RefreshToken {
                    accessToken
                }
            `,
        })
        const newAccessToken = data?.refreshToken;
        if (!newAccessToken) {
            throw new Error('new access token not received');
        }
    } catch(error) {
        throw new Error('Error geting new access token');
    }
}

let retryCount = 0;
const maxRetry = 3;

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            if (err.extensions?.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
                retryCount++;
                return new Observable((observer) => {
                    refreshToken(client)
                        .then((token) => {
                            operation.setContext((previousContext: any) => ({
                                headers: {
                                    ...previousContext.headers,
                                    authorization: token,
                                }
                            }));
                            const forward$ = forward(operation);
                            forward$.subscribe(observer)
                        })
                        .catch((error) => {
                            observer.error(error);
                        });
                })
            }
        }
    }
})

const uploadLink = createUploadLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include',
    headers: {
        "apollo-require-preflight": "true",
    }
});

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
    },
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getCommentsByPostId: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                },
            },
        },
    }),
});

export { client };