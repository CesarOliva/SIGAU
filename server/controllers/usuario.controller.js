const data = require('../data/usuarios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const roles = {
    alumno: ['nombres', 'apellidos', 'fNacimiento', 'curp', 'correo', 'telefono', 'direccion'],
    docente: ['nombres', 'apellidos', 'fNacimiento', 'rfc', 'correo', 'telefono', 'direccion', 'descripcion', 'fIngreso', 'especialidad'],
    administrador: ['nombres', 'apellidos', 'fNacimiento', 'curp', 'correo', 'telefono', 'direccion']
};

const validarCamposRol = (datos, rol) => {
    const campos = roles[rol];
    if (!campos) return { valido: false, error: 'Rol no válido' };
    const faltantes = campos.filter(campo => !datos[campo] || (typeof datos[campo] === 'string' && datos[campo].trim() === ''));
    if (faltantes.length > 0) return { valido: false, error: `Faltan campos: ${faltantes.join(', ')}` };
    return { valido: true };
};

const validarFormatoFecha = (fecha) => {
    if (!fecha) return { valido: false, error: 'La fecha es obligatoria' };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return { valido: false, error: 'Formato de fecha debe ser YYYY-MM-DD' };
    const fechaObj = new Date(fecha), hoy = new Date(); hoy.setHours(0,0,0,0);
    if (fechaObj > hoy) return { valido: false, error: 'La fecha no puede ser futura' };
    return { valido: true };
};
const validarCURP = (curp) => { if (!curp) return { valido: false, error: 'El CURP es obligatorio' }; if (curp.length !== 18) return { valido: false, error: 'El CURP debe tener exactamente 18 caracteres' }; return { valido: true }; };
const validarTelefono = (telefono) => { if (!telefono) return { valido: false, error: 'El teléfono es obligatorio' }; if (!/^\d+$/.test(telefono)) return { valido: false, error: 'El teléfono solo debe contener números' }; if (telefono.length !== 10) return { valido: false, error: 'El teléfono debe tener exactamente 10 dígitos' }; return { valido: true }; };
const validarCorreo = (correo) => { if (!correo) return { valido: false, error: 'El correo es obligatorio' }; if (!correo.includes('@institucion.mx')) return { valido: false, error: 'El correo debe contener @institucion.mx' }; return { valido: true }; };

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const rol = req.query.rol;
        const usuarios = await data.getAllUsers(rol);
        return res.status(200).json(usuarios);
    } catch (error) { console.error(error); return res.status(500).json({ error: 'Error al obtener usuarios' }); }
};

const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Id inválido" });
        const usuario = await data.getUserById(id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        return res.status(200).json(usuario);
    } catch (error) { console.error(error); return res.status(500).json({ error: 'Error al obtener el usuario' }); }
};

const createUsers = async (req, res) => {
    const { rol, ...datosUsuario } = req.body;
    if(!rol || (typeof rol === 'string' && rol.trim()==='') || !['alumno','docente','administrador'].includes(rol)) return res.status(400).json({error:"Rol obligatorio y debe ser: alumno, docente o administrador"});
    const validaciones = validarCamposRol(datosUsuario, rol);
    if (!validaciones.valido) return res.status(400).json({ error: validaciones.error });
    const fechaValidacion = validarFormatoFecha(datosUsuario.fNacimiento); if (!fechaValidacion.valido) return res.status(400).json({ error: fechaValidacion.error });
    if (rol !== 'docente') { const curpValidacion = validarCURP(datosUsuario.curp); if (!curpValidacion.valido) return res.status(400).json({ error: curpValidacion.error }); }
    const telefonoValidacion = validarTelefono(datosUsuario.telefono); if (!telefonoValidacion.valido) return res.status(400).json({ error: telefonoValidacion.error });
    const correoValidacion = validarCorreo(datosUsuario.correo); if (!correoValidacion.valido) return res.status(400).json({ error: correoValidacion.error });
    if (rol === 'docente' && datosUsuario.fIngreso) { const fechaIngresoValidacion = validarFormatoFecha(datosUsuario.fIngreso); if (!fechaIngresoValidacion.valido) return res.status(400).json({ error: fechaIngresoValidacion.error }); }
    const idExistente = await data.getUserById(parseInt(datosUsuario.id)); if (idExistente) return res.status(400).json({ error: "El ID ya está en uso" });
    const nuevoUsuario = { id: parseInt(datosUsuario.id), rol, ...datosUsuario, estado: 'Activo', fechaCreacion: new Date().toISOString() };
    try { const usuarioCreado = await data.addUser(nuevoUsuario); return res.status(201).json({ message: 'Usuario creado exitosamente', usuario: usuarioCreado }); }
    catch (error) { console.error(error); return res.status(500).json({ error: 'Error al guardar el usuario' }); }
};

const showUsers = async (req, res) => {
    try {
        const rol = req.query.rol;
        if (rol && !['alumno', 'docente', 'administrador'].includes(rol)) return res.status(400).json({ error: 'Rol inválido. Debe ser: alumno, docente o administrador' });
        const usuarios = await data.getUsers(rol || null); res.json(usuarios);
    } catch (error) { console.error(error); res.status(500).json({ error: 'Error al obtener usuarios' }); }
};

const showUser = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalido" });
    try { const usuario = await data.getUserById(id); if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" }); res.json(usuario); }
    catch (error) { console.error(error); res.status(500).json({ error: 'Error al obtener usuario' }); }
};

// Eliminar usuario DEFINITIVAMENTE
const deleteUser = async (req,res) =>{
    const id = parseInt(req.params.id);
    if(isNaN(id)) return res.status(400).json({ error:"Id invalido" });
    try {
        const usuario = await data.getUserById(id);
        if(!usuario) return res.status(404).json({ error:"Usuario no encontrado" });
        // ✅ Guardar motivo en auditoría si se envía
        if (req.body.reason) await data.logAudit(id, req.body.reason);
        await data.deleteUser(id);
        return res.json({mensaje:"Usuario eliminado correctamente"});
    } catch (error) { console.error(error); return res.status(500).json({ error: 'Error al eliminar el usuario: ' + error.message }); }
};

const editUser = async (req,res)=>{
    const id = parseInt(req.params.id); const update = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "ID invalido" });
    if(!update || Object.keys(update).length===0) return res.status(400).json({error:"No hay datos para actualizar"});
    const usuario = await data.getUserById(id); if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    if (update.fNacimiento) { const fechaValidacion = validarFormatoFecha(update.fNacimiento); if (!fechaValidacion.valido) return res.status(400).json({ error: fechaValidacion.error }); }
    if (update.curp && usuario.rol !== 'docente') { const curpValidacion = validarCURP(update.curp); if (!curpValidacion.valido) return res.status(400).json({ error: curpValidacion.error }); }
    if (update.telefono) { const telefonoValidacion = validarTelefono(update.telefono); if (!telefonoValidacion.valido) return res.status(400).json({ error: telefonoValidacion.error }); }
    if (update.correo) { const correoValidacion = validarCorreo(update.correo); if (!correoValidacion.valido) return res.status(400).json({ error: correoValidacion.error }); }
    if (update.rol && update.rol !== usuario.rol) { const datosCombinados = { ...usuario, ...update }; delete datosCombinados.id; delete datosCombinados.estado; delete datosCombinados.fechaCreacion; const validacion = validarCamposRol(datosCombinados, update.rol); if (!validacion.valido) return res.status(400).json({ error: validacion.error }); }
    try { const usuarioActualizado = await data.updateUser(id, update); return res.status(200).json({ message: "Usuario actualizado correctamente", usuario: usuarioActualizado }); }
    catch (error) { console.error(error); return res.status(500).json({ error: "Error al actualizar el usuario: " + error.message }); }
};

const getNextId = async (req, res) => {
    try {
        const usuarios = await data.getUsers();
        let maxId = 0;
        usuarios.forEach(usuario => { if (usuario.id > maxId) maxId = usuario.id; });
        return res.status(200).json({ nextId: maxId + 1 });
    } catch (error) { console.error(error); return res.status(500).json({ error: 'Error al obtener el siguiente ID' }); }
};

// 🔄 DESACTIVAR usuario (borrado suave)
const deactivateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Id inválido" });
        const usuario = await data.getUserById(id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        const usuarioActualizado = await data.updateUser(id, { estado: 'Inactivo' });
        return res.status(200).json({ message: "Usuario desactivado correctamente", usuario: usuarioActualizado });
    } catch (error) { console.error(error); return res.status(500).json({ error: 'Error al desactivar el usuario' }); }
};

// ↩️ REACTIVAR usuario
const activateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Id inválido" });
        const usuario = await data.getUserById(id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        const usuarioActualizado = await data.updateUser(id, { estado: 'Activo' });
        return res.status(200).json({ message: "Usuario reactivado correctamente", usuario: usuarioActualizado });
    } catch (error) { console.error(error); return res.status(500).json({ error: 'Error al reactivar el usuario' }); }
};

const login = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) return res.status(400).json({ error: 'Usuario, contraseña y rol son requeridos' });
    try {
        const usuarios = await data.getAllUsers(role);
        const usuario = usuarios.find(u => u.id == username);
        if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });
        const isValidPassword = password === usuario.contraseña;
        if (!isValidPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });
        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '24h' });
        return res.status(200).json({ message: 'Login exitoso', token, user: { id: usuario.id, nombres: usuario.nombres, apellidos: usuario.apellidos, rol: usuario.rol } });
    } catch (error) { console.error(error); return res.status(500).json({ error: 'Error en el login' }); }
};

module.exports = {
    getUsers, getUserById, createUsers, showUser, showUsers, deleteUser, editUser, getNextId, login,
    deactivateUser, activateUser
};