import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { EventService } from 'src/services/events.service';

const app: express.Express = express();
app.use(cors());
app.use(bodyParser.json({ strict: false }));


app.patch('/updateEvent', updateEvent);

async function updateEvent(req: any, res: any): Promise<any> {
    try {
        console.log('Received request body', req.body);
        const { eventId, eventName, eventType, eventMode, lastDateToRegister, organisedBy } = req.body;
        if (!eventId) {
            res.status(400).json({
                status: false,
                message: 'Missing request info.'
            });
            return;
        }
        const eventService: EventService = new EventService();
        const updateEventResult = await eventService.updateEvent(
            eventId,
            eventName,
            eventType,
            eventMode,
            lastDateToRegister,
            organisedBy
        );
        if (updateEventResult) {
            console.log('Event updated successfully.');
            res.status(200).json({
                status: true,
                message: 'Event updated successfully.',
                eventId: updateEventResult
            });
            return;
        } else {
            throw 'Error while updating event';
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