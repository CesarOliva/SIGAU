const data = require('../data/materias');

// Obtener todas las materias
const getAllMaterias = async (req, res) => {
    try {
        const materias = await data.getAllMaterias();
        return res.status(200).json(materias);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener materias' });
    }
};

// Obtener materia por ID
const getMateriaById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }
        
        const materia = await data.getMateriaById(id);
        
        if (!materia) {
            return res.status(404).json({ error: "Materia no encontrada" });
        }
        
        return res.status(200).json(materia);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener la materia' });
    }
};

// Obtener materias por semestre
const getMateriasBySemestre = async (req, res) => {
    try {
        const semestre = parseInt(req.params.semestre);
        
        if (isNaN(semestre)) {
            return res.status(400).json({ error: "Semestre inválido" });
        }
        
        const materias = await data.getMateriasBySemestre(semestre);
        return res.status(200).json(materias);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener materias por semestre' });
    }
};

// Crear materia
const createMateria = async (req, res) => {
    try {
        const { id, nombre, creditos, semestre, estado, descripcion } = req.body;
        
        if (!nombre || creditos === undefined || semestre === undefined) {
            return res.status(400).json({ error: "Faltan campos requeridos: nombre, creditos, semestre" });
        }
        
        const creditosNumerico = parseInt(creditos);
        const semestreNumerico = parseInt(semestre);

        let idNumerico;
        if (id !== undefined && id !== null && id !== '') {
            idNumerico = parseInt(id);
            if (isNaN(idNumerico)) {
                return res.status(400).json({ error: 'id debe ser numérico' });
            }
        }

        if (isNaN(creditosNumerico) || isNaN(semestreNumerico)) {
            return res.status(400).json({ error: 'creditos y semestre deben ser numéricos' });
        }
        
        const nuevaMateria = {
            nombre,
            creditos: creditosNumerico,
            semestre: semestreNumerico,
            estado: estado || "Activo",
            descripcion: descripcion || null
        };

        if (idNumerico !== undefined) {
            nuevaMateria.id = idNumerico;
        }
        
        const materiaCreada = await data.addMateria(nuevaMateria);
        return res.status(201).json({
            message: 'Materia creada exitosamente',
            materia: materiaCreada
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear la materia: ' + error.message });
    }
};

// Actualizar materia
const updateMateria = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const update = req.body;
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }
        
        if (!update || Object.keys(update).length === 0) {
            return res.status(400).json({ error: "No hay datos para actualizar" });
        }
        
        const materia = await data.getMateriaById(id);
        if (!materia) {
            return res.status(404).json({ error: "Materia no encontrada" });
        }

        if (update.creditos !== undefined) {
            update.creditos = parseInt(update.creditos);
            if (isNaN(update.creditos)) {
                return res.status(400).json({ error: 'creditos debe ser numérico' });
            }
        }

        if (update.semestre !== undefined) {
            update.semestre = parseInt(update.semestre);
            if (isNaN(update.semestre)) {
                return res.status(400).json({ error: 'semestre debe ser numérico' });
            }
        }
        
        const materiaActualizada = await data.updateMateria(id, update);
        return res.status(200).json({
            message: "Materia actualizada correctamente",
            materia: materiaActualizada
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar la materia' });
    }
};

// Eliminar materia
const deleteMateria = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }
        
        const materia = await data.getMateriaById(id);
        if (!materia) {
            return res.status(404).json({ error: "Materia no encontrada" });
        }
        
        await data.deleteMateria(id);
        return res.json({ mensaje: "Materia eliminada correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar la materia' });
    }
};

module.exports = {
    getAllMaterias,
    getMateriaById,
    getMateriasBySemestre,
    createMateria,
    updateMateria,
    deleteMateria
};
