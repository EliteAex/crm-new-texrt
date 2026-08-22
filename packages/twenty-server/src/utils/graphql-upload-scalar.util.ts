// graphql-upload ships ESM-only (.mjs); a static `import` compiles to require()
// under this package's CommonJS output and crashes at runtime with ERR_REQUIRE_ESM.
// Resolvers reference this live binding inside `type: () => GraphQLUpload` thunks,
// which the GraphQL schema builder only evaluates after bootstrap awaits
// `graphqlUploadScalarReady` (see main.ts), so the binding is populated by then.
export let GraphQLUpload: typeof import('graphql-upload/GraphQLUpload.mjs').default;

export const graphqlUploadScalarReady = import(
  'graphql-upload/GraphQLUpload.mjs'
).then((module) => {
  GraphQLUpload = module.default;
});
