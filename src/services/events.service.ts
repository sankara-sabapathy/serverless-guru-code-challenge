import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';
import { EventInput } from 'src/models/event.model';
export class EventService {
    dDbClient: AWS.DynamoDB.DocumentClient;
    constructor() {
        this.dDbClient = new AWS.DynamoDB.DocumentClient();
    }

    async addNewEvent(eventName: string, eventType: string, eventMode: string, lastDateToRegister: number) {
        const event: EventInput = {
            id: uuidv4(),
            createdOn: Date.now(),
            eventName,
            eventType,
            eventMode,
            lastDateToRegister,
            updatedOn: Date.now()
        }
        const params: PutItemInput = {
            TableName: process.env.EVENTS_TABLE ? process.env.EVENTS_TABLE : '',
            Item: event as any
        };
        try {
            await this.dDbClient.put(params).promise();
            return;
        } catch (error) {
            console.log('Failed while adding new event', error);
            throw 'Failed while adding new event';
        }
    }
}