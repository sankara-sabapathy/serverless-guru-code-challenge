import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { EventService } from 'src/services/events.service';

const app: express.Express = express();
app.use(cors());
app.use(bodyParser.json({ strict: false }));


app.delete('/deleteEvent', deleteEvent);

async function deleteEvent(req: any, res: any): Promise<any> {
    try {
        console.log('Received delete event request', req.query);
        const { eventId, organiser } = req.query;
        if (!eventId || !organiser) {
            res.status(400).json({
                status: false,
                message: 'Missing request info.'
            });
            return;
        }
        const eventService: EventService = new EventService();
        const deleteEventResult = await eventService.deleteEvent(eventId, organiser);
        if (deleteEventResult) {
            res.status(200).json({
                status: true,
                message: 'Event deleted successfully.',
                eventDetails: deleteEventResult
            });
            return;
        } else {
            throw 'Error while deleting event';
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