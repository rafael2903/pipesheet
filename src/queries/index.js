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

export const getAllPipes = gql`
  query ($organizationId: ID!) {
    organization(id: $organizationId) {
      pipes {
        id
        name
      }
    }
  }
`
