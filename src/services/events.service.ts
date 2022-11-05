import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { GetItemInput, PutItemInput } from 'aws-sdk/clients/dynamodb';
import { EventInput } from 'src/models/event.model';
export class EventService {
    dDbClient: AWS.DynamoDB.DocumentClient;
    constructor() {
        this.dDbClient = new AWS.DynamoDB.DocumentClient();
    }

    public async addNewEvent(eventName: string, eventType: string, eventMode: string, lastDateToRegister: number) {
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
            TableName: 'event-management-service-prod-events',//process.env.EVENTS_TABLE ? process.env.EVENTS_TABLE : '',
            Item: event as any
        };
        try {
            await this.dDbClient.put(params).promise();
            return event.id;
        } catch (error) {
            console.log('Failed while adding new event', error);
            return false;
        }
    }

    public async getEventById(id: string) {
        const params: GetItemInput = {
            TableName: 'event-management-service-prod-events', //process.env.EVENTS_TABLE ? process.env.EVENTS_TABLE : '',
            Key: {
                id: id  
            }as any
        };
        try {
            const eventDetails = await this.dDbClient.get(params).promise();
            return eventDetails;
        } catch (error) {
            console.log('Failed while getting event details', error);
            return false;
        }
    }
}