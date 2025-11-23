import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'API de productos funcionando correctamente' });
});

router.get('/status', (req, res) => {
    const jwtStatus = process.env.JWT_SECRET ? 'OK' : 'FALTA';

    res.json({
        status: 'API activa',
        timestamp: new Date().toISOString(),
        jwtConfigured: jwtStatus
    });
});

export default router;