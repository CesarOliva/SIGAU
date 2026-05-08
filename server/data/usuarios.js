// Base de datos en memoria para usuarios (será reemplazada por BD real)
let usuarios = [
  {
    id: 1,
    nombres: "Carlos",
    apellidos: "Macias Mendez",
    correo: "carlos.macias@sigau.edu.mx",
    telefono: "8120963333",
    rol: "docente",
    estado: "Activo",
    fNacimieto: "1985-05-15",
    rfc: "MAMC850515XXX",
    direccion: "Calle Principal 123",
    fIngreso: "2015-01-20",
    especialidad: "Ingeniería en Telecomunicaciones",
    descripcion: "Docente especializado en telecomunicaciones",
    matricula: "DOC001",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    fechaCreacion: new Date().toISOString()
  },
  {
    id: 2,
    nombres: "Carlos",
    apellidos: "Martinez Mendoza",
    correo: "carlos.martinez@sigau.edu.mx",
    telefono: "8121234567",
    rol: "docente",
    estado: "Activo",
    fNacimieto: "1988-03-20",
    rfc: "MARC880320XXX",
    direccion: "Avenida Secundaria 456",
    fIngreso: "2018-02-15",
    especialidad: "Física Avanzada",
    descripcion: "Docente de física cuántica",
    matricula: "DOC002",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    fechaCreacion: new Date().toISOString()
  },
  {
    id: 3,
    nombres: "Roberto",
    apellidos: "Silva",
    correo: "roberto.silva@sigau.edu.mx",
    telefono: "8129876543",
    rol: "docente",
    estado: "Activo",
    fNacimieto: "1982-07-10",
    rfc: "SILR820710XXX",
    direccion: "Calle Tertiary 789",
    fIngreso: "2010-08-01",
    especialidad: "Matemáticas",
    descripcion: "Dr. Roberto Silva - Especialista en matemáticas avanzadas",
    matricula: "DOC003",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    fechaCreacion: new Date().toISOString()
  }
];

// Métodos para manipular usuarios
const addUser = (usuario) => {
  usuarios.push(usuario);
  return usuario;
};

const getUserById = (id) => {
  return usuarios.find(u => u.id === id);
};

const getAllUsers = (rol = null) => {
  if (rol) {
    return usuarios.filter(u => u.rol === rol);
  }
  return usuarios;
};

const deleteUser = (id) => {
  const index = usuarios.findIndex(u => u.id === id);
  if (index !== -1) {
    usuarios.splice(index, 1);
    return true;
  }
  return false;
};

const updateUser = (id, updates) => {
  const usuario = getUserById(id);
  if (usuario) {
    const usuarioActualizado = { ...usuario, ...updates };
    const index = usuarios.findIndex(u => u.id === id);
    usuarios[index] = usuarioActualizado;
    return usuarioActualizado;
  }
  return null;
};

module.exports = {
  addUser,
  getUserById,
  getAllUsers,
  deleteUser,
  updateUser
};
