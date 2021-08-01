const { gql } = require('graphql-request')

export const getPipe = gql`
  query ($pipeId: ID!) {
    pipe(id: $pipeId) {
      name
      phases {
        id
        name
      }
    }
  }
`
