import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const REGION = "us-west-1"; 

const ddbClient = new DynamoDBClient({ 
    region: REGION,
    credentials: {
        accessKeyId: process.env.PIPESHEET_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.PIPESHEET_AWS_SECRET_ACCESS_KEY,
  }, });

export default ddbClient;