import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { EventService } from 'src/services/events.service';

const app: express.Express = express();
app.use(cors());
app.use(bodyParser.json({ strict: false }));


app.post('/registerEvent', registerNewEvent);

async function registerNewEvent(req: any, res: any): Promise<any> {
    try {
        console.log('Received request body', req.body);
        const { eventName, eventType, eventMode, lastDateToRegister } = req.body;
        if (!eventName || !eventType || !eventMode || !lastDateToRegister) {
            res.status(400).json({
                status: false,
                message: 'Missing request info.'
            });
            return;
        }
        const eventService: EventService = new EventService();
        const addNewEventResult = await eventService.addNewEvent(eventName, eventType, eventMode, lastDateToRegister);
        if(addNewEventResult) {
            console.log('Event registered successfully.');
            res.status(200).json({
                status: true,
                message: 'Event registered successfully.',
                eventId: addNewEventResult
            });
            return;
        } else {
            throw 'Error while adding new event';
        }
        
    } catch (error) {
        console.log('Internal Server Error', error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        });
        return;
    }
}

module.exports.handler = serverless(app);