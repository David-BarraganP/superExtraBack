// Función que envuelve un controlador para manejar errores automáticamente
const catchError = controller => {
    return (req, res, next) => {
        controller(req, res, next)
            .catch(next);
    }
}

module.exports = catchError
