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

export const getAllCards = gql`
  query ($pipeId: ID!){
    allCards(pipeId: $pipeId) {
      edges {
        node {
          
          title
          done
          id
          
          current_phase {
            name
          }
          
          labels {
            name
          }
          
          due_date
          
          createdBy {
            name
          }
          
          updated_at
          
          assignees {
            name
          }
          
          createdAt
          
          fields {
            name
            value
            report_value
          }
          
          phases_history {
            phase {
              name
            }
            duration
            firstTimeIn
            lastTimeOut
          }

        }
      }
    }
  }
`
export const getPhases = gql`
query ($pipeId: ID!) {
  pipe(id: $pipeId) {
    start_form_fields {
      label
      type
    }
		phases {
      name
      fields {
        label
        type
      }
    }
  }
}
`