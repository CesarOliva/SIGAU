// server/controllers/usuario.controller.js
const data = require('../data/usuarios');

//datos de los diferentes roles
const roles = {
    alumno: ['nombres', 'apellidos', 'fNacimiento', 'curp', 'correo', 'telefono', 'direccion', 'matricula'],
    docente: ['nombres', 'apellidos', 'fNacimiento', 'rfc', 'correo', 'telefono', 'direccion', 'descripcion', 'fIngreso', 'especialidad'],
    administrador: ['nombres', 'apellidos', 'fNacimiento', 'curp', 'correo', 'telefono', 'direccion']
};

//valida que le rol exista
const validarCamposRol = (datos, rol) => {
    const campos = roles[rol];
    if (!campos) return { valido: false, error: 'Rol no válido' };
    
    const faltantes = campos.filter(campo => !datos[campo] || datos[campo].trim() === '');
    
    if (faltantes.length > 0) {
        return { valido: false, error: `Faltan campos: ${faltantes.join(', ')}` };
    }
    return { valido: true };
}

//crear usuarios
const createUsers = (req, res) => {
    const { rol, ...datosUsuario } = req.body;

    //verifica el rol no este vacio
    if (!rol || rol.trim() === '') {
        return res.status(400).json({ error: "Rol obligatorio" });
    }

    //valida los roles
    const validaciones = validarCamposRol(datosUsuario, rol);
    if (!validaciones.valido) return res.status(400).json({ error: validaciones.error });

    //crea el nuevo usuario, con su estado activo, y fecha de creacion actual
    const nuevoUsuario = {
        id: Date.now(),
        rol,
        ...datosUsuario,
        estado: 'Activo',
        fechaCreacion: new Date().toISOString()
    };


    try {
                            //metodo que debe de hacer eli
        const usuarioCreado = data.addUser(nuevoUsuario);
        //mensaje de usario creado 
        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: usuarioCreado
        });
    } catch (error) {
        //catch en caso de error al guardar usuario
        return res.status(500).json({ error: 'Error al guardar el usuario' });
    }
};

//mostrar usuarios por su id
const showUsers = (req, res) => {
            //metodo que debe de hacer eli 
    res.json(data.getUsers());
}

//mostrar usuario especifico (id)
const showUser = (req, res) => {
    const id = parseInt(req.params.id);

    //si no es un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID invalido" });
    }
    
    //variable que es igual al usuario por si id
                    //metodo que debe de hacer eli
    const usuario = data.getUserById(id);

    //si es diferente al usuario
    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
}

//eliminar usuario por su id
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    //si no es numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Id invalido" });
    }

                    //metodo que debe de hacer eli
    const usuario = data.getUserById(id);

    //si es diferente al usuario
    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    //eliminar usuario
    //metood que debe de hacer eli en BD
    data.deleteUser(id);
    res.json({ mensaje: "Usuario eliminado correctamente" });
}

//editar usuario (CORREGIDO)
const editUser = (req, res) => {
    const id = parseInt(req.params.id);
    const update = req.body;  // variable se llama "update"

    //si no es un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Id invalido" });
    }

    //si update es diferente o no hay datos
    if (!update || Object.keys(update).length === 0) {
        return res.status(400).json({ error: "No hay datos para actualizar" });
    }

    //metodo que debe de hacer eli en BD
    const usuario = data.getUserById(id);  // variable se llama "usuario"
    
    //si es diferente al usuario
    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Si actualiza el rol y es diferente al actual
    if (update.rol && update.rol !== usuario.rol) {
        //se actualizan los datos y se eliminan el estado, feche y id
        const datosCombinados = { ...usuario, ...update };
        delete datosCombinados.id;
        delete datosCombinados.estado;
        delete datosCombinados.fechaCreacion;
        
        // se validan los campos viejos y nuevos
        const validacion = validarCamposRol(datosCombinados, update.rol);
        //si es diferente a validacion
        if (!validacion.valido) {
            return res.status(400).json({ error: validacion.error });
        }
    }

    try {
        // mensaje de usuario actualizado
        const usuarioActualizado = data.updateUser(id, update);
        res.status(200).json({
            message: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });
    } catch (error) {
        //mensaje en caso de error
        return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
}

//exportamos los metodos
module.exports = {
    createUsers,
    showUser,
    showUsers,
    deleteUser,
    editUser
}