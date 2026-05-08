// Base de datos en memoria para materias
let materias = [
  {
    id: 202,
    nombre: "Fundamentos de telecomunicaciones",
    creditos: 95,
    semestre: 1,
    estado: "Activo",
    descripcion: "Introducción a los conceptos básicos de telecomunicaciones",
    fechaCreacion: new Date().toISOString()
  },
  {
    id: 203,
    nombre: "Física Cuántica Avanzada",
    creditos: 85,
    semestre: 6,
    estado: "Activo",
    descripcion: "Estudio avanzado de mecánica cuántica",
    fechaCreacion: new Date().toISOString()
  },
  {
    id: 303,
    nombre: "Matemáticas Avanzadas",
    creditos: 90,
    semestre: 5,
    estado: "Activo",
    descripcion: "Análisis matemático avanzado y álgebra lineal",
    fechaCreacion: new Date().toISOString()
  },
  {
    id: 204,
    nombre: "Programación Web",
    creditos: 80,
    semestre: 3,
    estado: "Activo",
    descripcion: "Desarrollo de aplicaciones web modernas",
    fechaCreacion: new Date().toISOString()
  },
  {
    id: 205,
    nombre: "Bases de Datos",
    creditos: 75,
    semestre: 4,
    estado: "Activo",
    descripcion: "Diseño y gestión de bases de datos",
    fechaCreacion: new Date().toISOString()
  }
];

// Métodos para manipular materias
const addMateria = (materia) => {
  materias.push(materia);
  return materia;
};

const getMateriaById = (id) => {
  return materias.find(m => m.id === id);
};

const getAllMaterias = () => {
  return materias;
};

const getMateriasBySemestre = (semestre) => {
  return materias.filter(m => m.semestre === semestre);
};

const deleteMateria = (id) => {
  const index = materias.findIndex(m => m.id === id);
  if (index !== -1) {
    materias.splice(index, 1);
    return true;
  }
  return false;
};

const updateMateria = (id, updates) => {
  const materia = getMateriaById(id);
  if (materia) {
    const materiaActualizada = { ...materia, ...updates };
    const index = materias.findIndex(m => m.id === id);
    materias[index] = materiaActualizada;
    return materiaActualizada;
  }
  return null;
};

module.exports = {
  addMateria,
  getMateriaById,
  getAllMaterias,
  getMateriasBySemestre,
  deleteMateria,
  updateMateria
};
