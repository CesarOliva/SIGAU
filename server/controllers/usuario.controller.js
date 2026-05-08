//aqui esta llamando a al tabla de usuarios que creara eliab en la BD
const { error } = require('node:console');
const data = require('../data/usuarios');

//datos de los diferentes roles
const roles = {
    alumno:['nombres','apellidos','fNacimieto','curp','correo','telefono','direccion','matricula'],
    docente:['nombres','apellidos','fNacimieto','rfc','correo','telefono','direccion','descripcion','fIngreso','especialidad','matricula'], //si  este no lleva matricula hay que quitarla
    administrador:['nombres','apellidos','fNacimieto','curp','correo','telefono','direccion','matricula'] //aqui tambien le puse matricula
}

//valida que le rol exista
const validarCamposRol=(datos,rol)=>{
    const campos = roles[rol];
    if (!campos) return { valido: false, error: 'Rol no válido' };
    
    const faltantes = campos.filter(campo => !datos[campo] || datos[campo].trim() === '');
    
    if (faltantes.length > 0) {
        return { valido: false, error: `Faltan campos: ${faltantes.join(', ')}` };
    }
    return { valido: true };
}

// Obtener todos los usuarios
const getUsers = (req, res) => {
    try {
        const rol = req.query.rol;
        const usuarios = data.getAllUsers(rol);
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// Obtener usuario por ID
const getUserById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }
        
        const usuario = data.getUserById(id);
        
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

//crear usuarios
const createUsers = (req,res) =>{
    const {rol, ...datosUsuario}=req.body;

    //validamos que no haya campos vacios
    if(!rol || rol.trim()===''){
        return res.status(400).json({error:"Rol obligatorio"});
    }

    //valida el rol
    const validaciones=validarCamposRol(datosUsuario,rol);
    if(!validaciones.valido) return res.status(400).json({error:validaciones.error})


    // se crea el usuario
    const nuevoUsuario = {
        id: Date.now(), 
        rol,
        ...datosUsuario,
        estado: 'Activo',
        fechaCreacion: new Date().toISOString()
    };

    try {
        const usuarioCreado = data.addUser(nuevoUsuario);
        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: usuarioCreado
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar el usuario' });
    }
};


//eliminar usuario
const deleteUser=(req,res) =>{
    //se obtiene el id
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({
            error:"Id invalido"
        });
    }

    //este metodo lo debe de poner eli en la BD
    const usuario = data.getUserById(id);

    if(!usuario){
        return res.status(404).json({
            error:"Usuario no encontrado"
        });
    }

    //este metodo lo debe de poner eli en la BD
    data.deleteUser(id);
    res.json({mensaje:"Usuario eliminado correctamente"})
}


const editUser=(req,res)=>{
    const id =parseInt(req.params.id);
    const update = req.body;

    if(isNaN(id)){
        return res.status(400).json({
            error:"Id invalido"
        });
    }

    //verifica que tenga datos
    if(!update || Object.keys(update).length===0){
        return res.status(400).json({error:"No hay datos para actualizar"});
    }

    //este metodo lo debe de poner eli en la BD
    const usuario = data.getUserById(id);
    if(!usuario){
        return res.status(404).json({
            error:"Usuario no encontrado"
        });
    }

    if (update.rol && update.rol !== usuario.rol) {
        // Combinar datos existentes con las actualizaciones para validar
        const datosCombinados = { ...usuario, ...update };
        delete datosCombinados.estado;
        delete datosCombinados.fechaCreacion;
        
        const validacion = validarCamposRol(datosCombinados, update.rol);
        if (!validacion.valido) {
            return res.status(400).json({ error: validacion.error });
        }
    }

    //actualiza el usuario
    try {
        const usuarioActualizado = data.updateUser(id, update);
        res.status(200).json({ 
            message: "Usuario actualizado correctamente",
            usuario: usuarioActualizado 
        });
    } catch (error) {
        return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
}

module.exports={
    getUsers,
    getUserById,
    createUsers,
    deleteUser,
    editUser
}