import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://api.pipefy.com/graphql'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  authorization: 'Bearer ' + process.env.PIPEFY_PERSONAL_ACCESS_TOKEN,
}

export const client = new GraphQLClient(endpoint, { headers })
