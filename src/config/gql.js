export const endpoint = 'https://api.pipefy.com/graphql'

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  authorization: 'Bearer ' + process.env.PERSONAL_ACCESS_TOKEN,
}
