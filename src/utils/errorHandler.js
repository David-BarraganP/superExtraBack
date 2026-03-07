// Middleware de manejo de errores para la aplicación
const errorHandler = (error, _req, res, _next) => {
    // Maneja errores de validación de Sequelize (por ejemplo, campos obligatorios)
    if(error.name === 'SequelizeValidationError') {
        const errObj = {};
        error.errors.map(er => {
            errObj[er.path] = er.message;
        })
        return res.status(400).json(errObj);
    }
    // Maneja errores cuando falla una clave foránea en la base de datos
    if(error.name === 'SequelizeForeignKeyConstraintError'){
        return res.status(400).json({ 
            message: error.message,
            error: error.parent.detail
        });
    }
      // Maneja errores generales de base de datos
    if(error.name === 'SequelizeDatabaseError'){
        return res.status(400).json({ 
            message: error.message
        });
    }
    return res.status(500).json({
        message: error.message,
        error: error
    });
}

// Exporta el middleware para usarlo en la aplicación
module.exports = errorHandler;
