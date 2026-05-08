// Base de datos en memoria para estadísticas y reportes
const estadisticas = {
  totalAlumnos: 2450,
  promedioGeneral: 8.4,
  tasaAprobacion: 87,
  materiasActivas: 142
};

const alumnosPorSemestre = [
  { semester: "1er", alumnos: 520 },
  { semester: "2do", alumnos: 475 },
  { semester: "3er", alumnos: 380 },
  { semester: "4to", alumnos: 360 },
  { semester: "5to", alumnos: 310 },
  { semester: "6to", alumnos: 250 }
];

const evolucionCalificaciones = [
  { month: "Ene 22", calificacion: 6.8 },
  { month: "Abr 22", calificacion: 7.2 },
  { month: "Jul 22", calificacion: 7.5 },
  { month: "Oct 22", calificacion: 7.9 },
  { month: "Ene 23", calificacion: 8.1 }
];

const rendimientoMaterias = [
  {
    id: 303,
    nombre: "Matemáticas Avanzadas",
    profesor: "Dr. Roberto Silva",
    cantidadAlumnos: 45,
    promedioCalificacion: 7.8,
    tasaAprobacion: 75,
    avatarProfesor: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
  },
  {
    id: 203,
    nombre: "Física Cuántica Avanzada",
    profesor: "Carlos Martinez Mendoza",
    cantidadAlumnos: 38,
    promedioCalificacion: 7.9,
    tasaAprobacion: 82,
    avatarProfesor: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
  },
  {
    id: 202,
    nombre: "Fundamentos de telecomunicaciones",
    profesor: "Carlos Macias Mendez",
    cantidadAlumnos: 52,
    promedioCalificacion: 7.6,
    tasaAprobacion: 79,
    avatarProfesor: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
  }
];

// Métodos para obtener estadísticas
const getDashboard = () => {
  return estadisticas;
};

const getAlumnosPorSemestre = () => {
  return alumnosPorSemestre;
};

const getEvolucionCalificaciones = () => {
  return evolucionCalificaciones;
};

const getRendimientoMaterias = () => {
  return rendimientoMaterias;
};

const getRendimientoMateria = (id) => {
  return rendimientoMaterias.find(m => m.id === id);
};

module.exports = {
  getDashboard,
  getAlumnosPorSemestre,
  getEvolucionCalificaciones,
  getRendimientoMaterias,
  getRendimientoMateria
};
