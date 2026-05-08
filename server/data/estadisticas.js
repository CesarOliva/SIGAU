const pool = require('../config/database');

const getDashboard = async () => {
    const [alumnosRows] = await pool.query(
        "SELECT COUNT(*) AS totalAlumnos FROM Usuarios WHERE rol_usuario = 'alumno'"
    );
    const [materiasRows] = await pool.query(
        "SELECT COUNT(*) AS materiasActivas FROM Materias WHERE estado = 'Activo'"
    );
    const [rendimientoRows] = await pool.query(
        `
        SELECT
            COALESCE(AVG(promedio_calificacion), 0) AS promedioGeneral,
            COALESCE(AVG(tasa_aprobacion), 0) AS tasaAprobacion
        FROM RendimientoMaterias
        `
    );

    return {
        totalAlumnos: Number(alumnosRows[0].totalAlumnos || 0),
        promedioGeneral: Number(Number(rendimientoRows[0].promedioGeneral || 0).toFixed(2)),
        tasaAprobacion: Number(Number(rendimientoRows[0].tasaAprobacion || 0).toFixed(2)),
        materiasActivas: Number(materiasRows[0].materiasActivas || 0)
    };
};

const getAlumnosPorSemestre = async () => {
    const [rows] = await pool.query(
        `
        SELECT
            CONCAT(a.semestre, 'to') AS semester,
            COUNT(*) AS alumnos
        FROM Alumnos a
        GROUP BY a.semestre
        ORDER BY a.semestre ASC
        `
    );

    return rows.map((row) => ({
        semester: row.semester,
        alumnos: Number(row.alumnos)
    }));
};

const getEvolucionCalificaciones = async () => {
    const [rows] = await pool.query(
        `
        SELECT
            etiqueta_mes AS month,
            calificacion
        FROM EvolucionCalificaciones
        ORDER BY orden ASC
        `
    );

    return rows.map((row) => ({
        month: row.month,
        calificacion: Number(row.calificacion)
    }));
};

const getRendimientoMaterias = async () => {
    const [rows] = await pool.query(
        `
        SELECT
            m.id,
            m.nombre,
            r.profesor,
            r.cantidad_alumnos AS cantidadAlumnos,
            r.promedio_calificacion AS promedioCalificacion,
            r.tasa_aprobacion AS tasaAprobacion,
            r.avatar_profesor AS avatarProfesor
        FROM RendimientoMaterias r
        INNER JOIN Materias m ON m.id = r.materia_id
        ORDER BY m.id ASC
        `
    );

    return rows.map((row) => ({
        id: Number(row.id),
        nombre: row.nombre,
        profesor: row.profesor,
        cantidadAlumnos: Number(row.cantidadAlumnos),
        promedioCalificacion: Number(row.promedioCalificacion),
        tasaAprobacion: Number(row.tasaAprobacion),
        avatarProfesor: row.avatarProfesor
    }));
};

const getRendimientoMateria = async (id) => {
    const [rows] = await pool.query(
        `
        SELECT
            m.id,
            m.nombre,
            r.profesor,
            r.cantidad_alumnos AS cantidadAlumnos,
            r.promedio_calificacion AS promedioCalificacion,
            r.tasa_aprobacion AS tasaAprobacion,
            r.avatar_profesor AS avatarProfesor
        FROM RendimientoMaterias r
        INNER JOIN Materias m ON m.id = r.materia_id
        WHERE m.id = ?
        `,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return {
        id: Number(rows[0].id),
        nombre: rows[0].nombre,
        profesor: rows[0].profesor,
        cantidadAlumnos: Number(rows[0].cantidadAlumnos),
        promedioCalificacion: Number(rows[0].promedioCalificacion),
        tasaAprobacion: Number(rows[0].tasaAprobacion),
        avatarProfesor: rows[0].avatarProfesor
    };
};

module.exports = {
    getDashboard,
    getAlumnosPorSemestre,
    getEvolucionCalificaciones,
    getRendimientoMaterias,
    getRendimientoMateria
};
