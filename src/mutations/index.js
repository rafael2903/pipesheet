const { gql } = require('graphql-request')


export const createWebhookMutation = gql`
    mutation ($pipeId: ID!, $url: String!) {
        createWebhook(input: {
            name: "pipesheet sincronização com google planilhas"
            actions: ["card.create","card.move", "card.field_update"]
            url: $url
            pipe_id: $pipeId
        }) {
            webhook {
                id
            }
        }
    }
`;
