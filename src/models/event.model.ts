export interface EventInput {
    id: string,
    createdOn: number,
    eventName: string, 
    eventType: string, 
    eventMode: string, 
    lastDateToRegister: number,
    organisedBy: string,
    updatedOn: number
}

export interface UpdateEventInput {
    id: string,
    eventName: string, 
    eventType: string, 
    eventMode: string, 
    lastDateToRegister: number,
    organisedBy: string,
    updatedOn: number
}