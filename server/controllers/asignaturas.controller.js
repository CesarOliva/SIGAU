// server/controllers/asignaturas.controller.js
const data = require('../data/asignaturas');

//definimos los datos de la asignatura
const datosAsignatura = ['nombre', 'creditos', 'semestre', 'hora'];

//validamos los campos que se debe de llenar
const validarCampos = (datos) => {
    //filtra los campos que no estan llenados
    const faltantes = datosAsignatura.filter(campo => 
        !datos[campo] || datos[campo].toString().trim() === ''
    );
    
    //si hay campos que faltan
    if (faltantes.length > 0) {
        return { 
            valido: false, 
            error: `Faltan campos: ${faltantes.join(', ')}` 
        };
    }

    // si los creditos son diferentes, si no son un numero y si son numeros negativos
    if (!datos.creditos || isNaN(datos.creditos) || datos.creditos <= 0) {
        return { valido: false, error: "Los créditos deben ser un número positivo" };
    }

    //si semestre es diferente, no es un numero y no esta entre 1 y 12
    if (!datos.semestre || isNaN(datos.semestre) || datos.semestre < 1 || datos.semestre > 12) {
        return { valido: false, error: "El semestre debe ser entre 1 y 12" };
    }

    //si todo bien es valido
    return { valido: true };
}

//crear asignatura
const createAsignatura = (req, res) => {
    const { nombre, creditos, semestre, hora } = req.body;

    // se crea la asignatura
    const nuevaAsignaturaData = {
        nombre,
        creditos: Number(creditos),
        semestre: Number(semestre),
        hora
    };

    //se validan lso campos
    const validacion = validarCampos(nuevaAsignaturaData);
    if (!validacion.valido) {
        return res.status(400).json({ error: validacion.error });
    }

    // se le pone el id la fecha de creacion y el estado
    const nuevaAsignatura = {
        id: Date.now(),
        ...nuevaAsignaturaData,  // 
        fechaCreacion: new Date().toISOString(),
        estado: 'Activa'
    };
    
    try {
        //mensaje de exito
        const asignaturaCreada = data.addAsignatura(nuevaAsignatura);
        return res.status(201).json({
            message: 'Asignatura creada exitosamente',
            asignatura: asignaturaCreada
        });
    } catch (error) {
        //mensaje en caso de error 
        return res.status(500).json({ error: 'Error al guardar la asignatura' });
    }
};


//mostrar asignaturas
const getAsignaturas = (req, res) => {
    res.json(data.getAsignaturas());
}


//eliminar asignatura por id
const deleteAsignatura = (req, res) => {
    const id = parseInt(req.params.id);

    //si no es un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID invalido" });
    }

                //metodo que debe de tener elii en BD
    const asignatura = data.getAsignaturaById(id);

    //si es diferente a asignatura
    if (!asignatura) {
        return res.status(404).json({ error: "Asignatura no encontrada" });
    }

    //elimina la asigatura
    //metodo que debe de tener eli en BD
    data.deleteAsignatura(id);
    res.json({ mensaje: "Asignatura eliminada correctamente" });
};


//editar asignatura por id
const editAsignatura = (req, res) => {
    const id = parseInt(req.params.id);
    //datos que se editaran
    const updates = req.body;
    
    //si no es un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    
    //si es diferente a updates o no hay datos
    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ 
            error: "No hay datos para actualizar" 
        });
    }
    
    //vlaiable que es igual a buscar la asignatura por id
                                //metodo que debe de tener eli en BD
    const asignaturaExistente = data.getAsignaturaById(id);
    //si es difetente 
    if (!asignaturaExistente) {
        return res.status(404).json({ error: "Asignatura no encontrada" });
    }
    
    //campos que puede editar
    const camposPermitidos = ['nombre', 'creditos', 'semestre', 'hora'];
    const updatesValidos = {};
    

    for (const [key, value] of Object.entries(updates)) {
        if (camposPermitidos.includes(key)) {
            if (value && value.toString().trim() !== '') {
                updatesValidos[key] = key === 'creditos' || key === 'semestre' ? Number(value) : value;
            } else {
                return res.status(400).json({ 
                    error: `El campo ${key} no puede estar vacío` 
                });
            }
        }
    }
    
    //si edita los creditos
    if (updatesValidos.creditos) {
        //si no es un numero o son numeros negativos
        if (isNaN(updatesValidos.creditos) || updatesValidos.creditos <= 0) {
            return res.status(400).json({ error: "Los créditos deben ser un número positivo" });
        }
    }
    
    //si edita el semestre
    if (updatesValidos.semestre) {
        //si no es un numero o es un numero que no esta entre 1 y 12
        if (isNaN(updatesValidos.semestre) || updatesValidos.semestre < 1 || updatesValidos.semestre > 12) {
            return res.status(400).json({ error: "El semestre debe ser entre 1 y 12" });
        }
    }
    
    try {
        //mensaje de actualilzada coorectamente
                            //metodo que debe de tener eli en BD
        const asignaturaActualizada = data.updateAsignatura(id, updatesValidos);
        res.status(200).json({
            message: "Asignatura actualizada correctamente",
            asignatura: asignaturaActualizada
        });
        //ms de error
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la asignatura" });
    }
};

//exportar metodos
module.exports = {
    createAsignatura,
    getAsignaturas,
    deleteAsignatura,
    editAsignatura
}