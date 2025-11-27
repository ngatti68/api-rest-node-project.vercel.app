import { registerUser, loginUser } from '../services/auth.service.js';

export const register = async (req, res) => {
    const { email, password, role = 'user' } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y password son requeridos' });
    }

    try {
        const result = await registerUser(email, password, role);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y password son requeridos' });
    }

    try {
        const result = await loginUser(email, password);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};