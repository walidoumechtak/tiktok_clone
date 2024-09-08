import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:3000/graphql',
    documents: ['src/graphql/**/*.ts'],
    generates: {
        "./src/gql/": {
            preset: "client",
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo"
            ]
        }
    },
}

export default config;