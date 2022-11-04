import AWS from 'aws-sdk';
export class EventService {
    constructor() {

    }

    async addNewEvent() {
        const ddbClient = new AWS.DynamoDB.DocumentClient({params: []});
    }
}