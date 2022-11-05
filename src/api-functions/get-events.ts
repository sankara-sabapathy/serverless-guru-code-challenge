import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { EventService } from 'src/services/events.service';

const app: express.Express = express();
app.use(cors());
app.use(bodyParser.json({ strict: false }));


app.get('/getEvent', getEvent);

async function getEvent(req: any, res: any): Promise<any> {
    try {
        console.log('Received get event request', req.query);
        const { eventId, organiser } = req.query;
        const eventService: EventService = new EventService();
        if (eventId === '*') {
            const getAllEventsResult = await eventService.getAllEvents();
            if (getAllEventsResult) {
                res.status(200).json({
                    status: true,
                    message: 'Event info retrieved successfully.',
                    eventDetails: getAllEventsResult.Items
                });
                return;
            }
        }
        if (!eventId || !organiser) {
            res.status(400).json({
                status: false,
                message: 'Missing request info.'
            });
            return;
        }
        const getEventByIdResult = await eventService.getEvent(eventId, organiser);
        if (getEventByIdResult) {
            res.status(200).json({
                status: true,
                message: 'Event info retrieved successfully.',
                eventDetails: getEventByIdResult.Item
            });
            return;
        } else {
            throw 'Error while getting event details';
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