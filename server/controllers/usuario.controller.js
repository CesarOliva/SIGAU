//aqui esta llamando a al tabla de usuarios que creara eliab en la BD
const { error } = require('node:console');
const data = require('../data/usuarios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//datos de los diferentes roles
const roles = {
    alumno:['nombres','apellidos','fNacimiento','curp','correo','telefono','direccion'],
    docente:['nombres','apellidos','fNacimiento','rfc','correo','telefono','direccion','descripcion','fIngreso','especialidad'],
    administrador:['nombres','apellidos','fNacimiento','curp','correo','telefono','direccion']
}

//valida que le rol exista
const validarCamposRol=(datos,rol)=>{
    const campos = roles[rol];
    if (!campos) return { valido: false, error: 'Rol no válido' };
    
    const faltantes = campos.filter(campo => !datos[campo] || (typeof datos[campo] === 'string' && datos[campo].trim() === ''));
    
    if (faltantes.length > 0) {
        return { valido: false, error: `Faltan campos: ${faltantes.join(', ')}` };
    }
    return { valido: true };
}

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
const createUsers = async (req,res) =>{
    const {rol, ...datosUsuario}=req.body;

    //validamos que no haya campos vacios
    if(!rol || (typeof rol === 'string' && rol.trim()==='') || !['alumno','docente','administrador'].includes(rol)){
        return res.status(400).json({error:"Rol obligatorio y debe ser: alumno, docente o administrador"});
    }

    //valida el rol
    const validaciones=validarCamposRol(datosUsuario,rol);
    if(!validaciones.valido) return res.status(400).json({error:validaciones.error})

    // se crea el usuario
    const nuevoUsuario = {
        rol,
        ...datosUsuario
    };

    try {
        const usuarioCreado = await data.addUser(nuevoUsuario);
        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: usuarioCreado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al guardar el usuario: ' + error.message });
    }
};


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

    if(isNaN(id)){
        return res.status(400).json({
            error:"Id invalido"
        });
    }

    //verifica que tenga datos
    if(!update || Object.keys(update).length===0){
        return res.status(400).json({error:"No hay datos para actualizar"});
    }

    try {
        const usuario = await data.getUserById(id);
        if(!usuario){
            return res.status(404).json({
                error:"Usuario no encontrado"
            });
        }

        //actualiza el usuario
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

// Función de login
const login = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ error: 'Usuario, contraseña y rol son requeridos' });
    }

    try {
        // Buscar usuario por num_control (username) y rol
        const usuarios = await data.getAllUsers(role);
        const usuario = usuarios.find(u => u.id == username);

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        // Verificar contraseña (temporalmente texto plano, cambiar a bcrypt en producción)
        const isValidPassword = password === usuario.contraseña;

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: 'Login exitoso',
            token,
            user: {
                id: usuario.id,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el login' });
    }
};

module.exports={
    getUsers,
    getUserById,
    createUsers,
    deleteUser,
    editUser,
    login
}