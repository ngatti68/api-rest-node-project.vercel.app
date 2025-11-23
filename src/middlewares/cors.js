import cors from 'cors';

const corsMiddleware = cors({
    origin: process.env.FRONTEND_URL || '*'
});

export default corsMiddleware;