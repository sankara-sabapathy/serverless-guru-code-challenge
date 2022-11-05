import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { DeleteItemInput, GetItemInput, PutItemInput, ScanInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb';
import { EventInput } from 'src/models/event.model';
export class EventService {
    tableName: string;
    dDbClient: AWS.DynamoDB.DocumentClient;

    constructor() {
        this.dDbClient = new AWS.DynamoDB.DocumentClient();
        this.tableName = process.env.EVENTS_TABLE ? process.env.EVENTS_TABLE : ''
    }

    public async addNewEvent(
        eventName: string,
        eventType: string,
        eventMode: string,
        lastDateToRegister: number,
        organisedBy: string
    ) {
        const event: EventInput = {
            id: uuidv4(),
            createdOn: Date.now(),
            eventName,
            eventType,
            eventMode,
            lastDateToRegister,
            organisedBy,
            updatedOn: Date.now()
        }
        const params: PutItemInput = {
            TableName: this.tableName,
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

    public async getEvent(id: string, organisedBy: string) {
        const params: GetItemInput = {
            TableName: this.tableName,
            Key: { id, organisedBy } as any
        };
        try {
            const eventDetails = await this.dDbClient.get(params).promise();
            return eventDetails;
        } catch (error) {
            console.log('Failed while getting event details', error);
            return false;
        }
    }

    public async getAllEvents() {
        const params: ScanInput = {
            TableName: this.tableName,
        };
        try {
            const eventDetails = await this.dDbClient.scan(params).promise();
            return eventDetails;
        } catch (error) {
            console.log('Failed while getting event details', error);
            return false;
        }
    }

    public async deleteEvent(id: string, organisedBy: string) {
        const params: DeleteItemInput = {
            TableName: this.tableName,
            Key: { id, organisedBy } as any
        };
        try {
            const eventDelete = await this.dDbClient.delete(params).promise();
            return eventDelete;
        } catch (error) {
            console.log('Failed while getting event details', error);
            return false;
        }
    }

    public async updateEvent(
        eventId: string,
        eventName: string,
        eventType: string,
        eventMode: string,
        lastDateToRegister: number,
        organisedBy: string
    ) {
        const updatedOn = Date.now();
        const params: UpdateItemInput = {
            TableName: this.tableName,
            Key: { id: eventId, organisedBy } as any,
            UpdateExpression: "set eventName = :n, eventType = :t, eventMode = :m, lastDateToRegister = :l, updatedOn = :u",
            ExpressionAttributeValues: {
                ":n": eventName as any,
                ":t": eventType as any,
                ":m": eventMode as any,
                ":l": lastDateToRegister as any,
                ":u": updatedOn as any
            },
            ReturnValues:"ALL_NEW"
        };
        try {
            const updateEvent = await this.dDbClient.update(params).promise();
            return updateEvent;
        } catch (error) {
            console.log('Failed while updating event', error);
            return false;
        }
    }
}