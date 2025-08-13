import express from 'express';
import cors from 'cors';
import companiesRouter from './routes/companies';
import servicesRouter from './routes/services';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/companies', companiesRouter);
app.use('/services', servicesRouter);

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

export default app;
