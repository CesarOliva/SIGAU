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
    
    const faltantes = campos.filter(campo => !datos[campo] || (typeof datos[campo] === 'string' && datos[campo].trim() === ''));
    
    if (faltantes.length > 0) {
        return { valido: false, error: `Faltan campos: ${faltantes.join(', ')}` };
    }
    return { valido: true };
};

//validaciones especificas de formato
const validarFormatoFecha = (fecha) => {
    if (!fecha) return { valido: false, error: 'La fecha es obligatoria' };
    
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fecha)) {
        return { valido: false, error: 'Formato de fecha debe ser YYYY-MM-DD' };
    }
    
    const fechaObj = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaObj > hoy) {
        return { valido: false, error: 'La fecha no puede ser futura' };
    }
    
    return { valido: true };
};

const validarCURP = (curp) => {
    if (!curp) return { valido: false, error: 'El CURP es obligatorio' };
    if (curp.length !== 18) return { valido: false, error: 'El CURP debe tener exactamente 18 caracteres' };
    return { valido: true };
};

const validarTelefono = (telefono) => {
    if (!telefono) return { valido: false, error: 'El teléfono es obligatorio' };
    if (!/^\d+$/.test(telefono)) return { valido: false, error: 'El teléfono solo debe contener números' };
    if (telefono.length !== 10) return { valido: false, error: 'El teléfono debe tener exactamente 10 dígitos' };
    return { valido: true };
};

const validarCorreo = (correo) => {
    if (!correo) return { valido: false, error: 'El correo es obligatorio' };
    if (!correo.includes('@institucion.mx')) return { valido: false, error: 'El correo debe contener @institucion.mx' };
    return { valido: true };
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const rol = req.query.rol;
        const usuarios = await data.getAllUsers(rol);
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }
        
        const usuario = await data.getUserById(id);
        
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        return res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

//crear usuarios
const createUsers = async (req, res) => {
    const { rol, ...datosUsuario } = req.body;

    //validamos que no haya campos vacios
    if(!rol || (typeof rol === 'string' && rol.trim()==='') || !['alumno','docente','administrador'].includes(rol)){
        return res.status(400).json({error:"Rol obligatorio y debe ser: alumno, docente o administrador"});
    }

    //valida los roles
    const validaciones = validarCamposRol(datosUsuario, rol);
    if (!validaciones.valido) return res.status(400).json({ error: validaciones.error });
    
    //validaciones especificas por campo
    const fechaValidacion = validarFormatoFecha(datosUsuario.fNacimiento);
    if (!fechaValidacion.valido) return res.status(400).json({ error: fechaValidacion.error });
    
    if (rol !== 'docente') {
        const curpValidacion = validarCURP(datosUsuario.curp);
        if (!curpValidacion.valido) return res.status(400).json({ error: curpValidacion.error });
    }
    
    const telefonoValidacion = validarTelefono(datosUsuario.telefono);
    if (!telefonoValidacion.valido) return res.status(400).json({ error: telefonoValidacion.error });
    
    const correoValidacion = validarCorreo(datosUsuario.correo);
    if (!correoValidacion.valido) return res.status(400).json({ error: correoValidacion.error });
    
    if (rol === 'docente' && datosUsuario.fIngreso) {
        const fechaIngresoValidacion = validarFormatoFecha(datosUsuario.fIngreso);
        if (!fechaIngresoValidacion.valido) return res.status(400).json({ error: fechaIngresoValidacion.error });
    }
    
    //verificar que el ID no exista ya
    const idExistente = await data.getUserById(parseInt(datosUsuario.id));
    if (idExistente) {
        return res.status(400).json({ error: "El ID ya está en uso" });
    }

    //crea el nuevo usuario, con su estado activo, y fecha de creacion actual
    const nuevoUsuario = {
        id: parseInt(datosUsuario.id),
        rol,
        ...datosUsuario,
        estado: 'Activo',
        fechaCreacion: new Date().toISOString()
    };

    try {
        const usuarioCreado = await data.addUser(nuevoUsuario);
        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: usuarioCreado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al guardar el usuario' });
    }
};

//mostrar usuarios
const showUsers = async (req, res) => {
    try {
        const usuarios = await data.getUsers();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
}

//mostrar usuario especifico (id)
const showUser = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID invalido" });
    }

    try {
        const usuario = await data.getUserById(id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
}

//eliminar usuario
const deleteUser = async (req,res) =>{
    //se obtiene el id
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({
            error:"Id invalido"
        });
    }

    try {
        const usuario = await data.getUserById(id);

        if(!usuario){
            return res.status(404).json({
                error:"Usuario no encontrado"
            });
        }

        await data.deleteUser(id);
        return res.json({mensaje:"Usuario eliminado correctamente"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar el usuario: ' + error.message });
    }
}

const editUser = async (req,res)=>{
    const id = parseInt(req.params.id);
    const update = req.body;

    //si no es un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID invalido" });
    }
    
    if(!update || Object.keys(update).length===0){
        return res.status(400).json({error:"No hay datos para actualizar"});
    }

    const usuario = await data.getUserById(id);

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    //validaciones especificas si se actualizan ciertos campos
    if (update.fNacimiento) {
        const fechaValidacion = validarFormatoFecha(update.fNacimiento);
        if (!fechaValidacion.valido) return res.status(400).json({ error: fechaValidacion.error });
    }
    
    if (update.curp && usuario.rol !== 'docente') {
        const curpValidacion = validarCURP(update.curp);
        if (!curpValidacion.valido) return res.status(400).json({ error: curpValidacion.error });
    }
    
    if (update.telefono) {
        const telefonoValidacion = validarTelefono(update.telefono);
        if (!telefonoValidacion.valido) return res.status(400).json({ error: telefonoValidacion.error });
    }
    
    if (update.correo) {
        const correoValidacion = validarCorreo(update.correo);
        if (!correoValidacion.valido) return res.status(400).json({ error: correoValidacion.error });
    }

    // Si actualiza el rol y es diferente al actual
    if (update.rol && update.rol !== usuario.rol) {
        const datosCombinados = { ...usuario, ...update };
        delete datosCombinados.id;
        delete datosCombinados.estado;
        delete datosCombinados.fechaCreacion;
        
        const validacion = validarCamposRol(datosCombinados, update.rol);
        if (!validacion.valido) {
            return res.status(400).json({ error: validacion.error });
        }
    }

    try {
        const usuarioActualizado = await data.updateUser(id, update);
        return res.status(200).json({ 
            message: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al actualizar el usuario: " + error.message });
    }
}

//obtener el siguiente ID disponible
const getNextId = async (req, res) => {
    try {
        const usuarios = await data.getUsers();
        let maxId = 0;
        usuarios.forEach(usuario => {
            if (usuario.id > maxId) maxId = usuario.id;
        });
        const nextId = maxId + 1;
        return res.status(200).json({ nextId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el siguiente ID' });
    }
};

//exportamos los metodos
module.exports = {
    getUsers,
    getUserById,
    createUsers,
    showUser,
    showUsers,
    deleteUser,
    editUser,
    getNextId
};