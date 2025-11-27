export const errorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'JSON inválido en el body' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
};