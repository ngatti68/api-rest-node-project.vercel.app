const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        error: 'Ruta no encontrada: ' + req.originalUrl
    });
};

export default notFoundMiddleware;