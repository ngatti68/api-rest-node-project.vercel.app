import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes.js';
import authRoutes from './routes/auth.routes.js';
import rootRoutes from './routes/root.routes.js';
import bodyParserMiddleware from './middlewares/bodyParser.js';
import corsMiddleware from './middlewares/cors.js';
import notFoundMiddleware from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(bodyParserMiddleware);
app.use(corsMiddleware);

app.use('/api/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/', rootRoutes);

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;