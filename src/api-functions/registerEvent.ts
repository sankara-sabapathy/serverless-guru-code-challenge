import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: express.Express = express();
app.use(cors());
app.use(bodyParser.json({ strict: false }));


app.post('/registerEvent', registerNewEvent)
async function registerNewEvent(req: any, res: any, three: any) {
    console.log('Received request body', req.body);
    console.log('Response object', res);
    console.log('third', three);
}


module.exports.handler = serverless(app);