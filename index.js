import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import postRoutes from './routes/postsRoute.js';
import regRoute from './routes/registerRoute.js'
import authRoute from './routes/authRoute.js';
import refreshRoute from './routes/refreshRoute.js';
import logoutRoute from './routes/logutRoute.js'

import { config } from 'dotenv';
import { corsOption } from './config/corsOptions.js';
import { verifyJWT } from "./middleware/verifyJWT.js";
import { credentialMiddleware } from './middleware/credentials.js';
config()

const app = express();
const LIMIT = '15mb';

app.use(bodyParser.json({ limit: LIMIT, extended: true }));
app.use(bodyParser.urlencoded({ limit: LIMIT, extended: true }));
app.use(credentialMiddleware)
app.use(cors(corsOption));
app.use(cookieParser());

app.use('/register', regRoute);
app.use('/auth', authRoute);
app.use('/refresh', refreshRoute);
app.use('/logout', logoutRoute);

app.use(verifyJWT);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
.then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
.catch(({message}) => console.log(message));
