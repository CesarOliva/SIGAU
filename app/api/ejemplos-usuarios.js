// Ejemplos de cómo llamar los endpoints desde el frontend (Next.js/React)

// ============================================
// 1. OBTENER TODOS LOS USUARIOS
// ============================================
export const getAllUsers = async (rol = null) => {
    try {
        const query = rol ? `?rol=${rol}` : '';
        const response = await fetch(`http://localhost:3001/api/usuarios${query}`);
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Uso:
// const usuarios = await getAllUsers();
// const docentes = await getAllUsers('docente');


// ============================================
// 2. OBTENER USUARIO POR ID
// ============================================
export const getUserById = async (numControl) => {
    try {
        const response = await fetch(`http://localhost:3001/api/usuarios/${numControl}`);
        
        if (!response.ok) throw new Error('Usuario no encontrado');
        
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Uso:
// const usuario = await getUserById(12345);


// ============================================
// 3. CREAR NUEVO USUARIO (DOCENTE)
// ============================================
export const createDocente = async (datosDocente) => {
    try {
        const response = await fetch('http://localhost:3001/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: datosDocente.numControl,  // Usar num_control como id
                nombres: datosDocente.nombres,
                apellidos: datosDocente.apellidos,
                contraseña: datosDocente.contraseña, // Debe estar hasheada
                rol: 'docente',
                fNacimiento: datosDocente.fechaNacimiento,
                curp: datosDocente.curp,
                telefono: datosDocente.telefono,
                direccion: datosDocente.direccion,
                correo: datosDocente.correo,
                rfc: datosDocente.rfc,
                descripcion: datosDocente.descripcion,
                fIngreso: datosDocente.fechaIngreso,
                especialidad: datosDocente.especialidad
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al crear docente');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Uso:
// const nuevoDocente = await createDocente({
//     numControl: 12345,
//     nombres: 'Juan',
//     apellidos: 'García López',
//     contraseña: 'hashedPassword',
//     fechaNacimiento: '1985-05-15',
//     curp: 'GALJ850515HDFRZN09',
//     telefono: '8120963333',
//     direccion: 'Calle Principal 123',
//     correo: 'juan.garcia@sigau.edu.mx',
//     rfc: 'GALJ850515XXX',
//     descripcion: 'Especialista en Ingeniería',
//     fechaIngreso: '2015-01-20',
//     especialidad: 'Ingeniería en Sistemas'
// });


// ============================================
// 4. CREAR NUEVO USUARIO (ALUMNO)
// ============================================
export const createAlumno = async (datosAlumno) => {
    try {
        const response = await fetch('http://localhost:3001/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: datosAlumno.numControl,
                nombres: datosAlumno.nombres,
                apellidos: datosAlumno.apellidos,
                contraseña: datosAlumno.contraseña,
                rol: 'alumno',
                fNacimiento: datosAlumno.fechaNacimiento,
                curp: datosAlumno.curp,
                telefono: datosAlumno.telefono,
                direccion: datosAlumno.direccion,
                correo: datosAlumno.correo,
                carrera: datosAlumno.carrera,
                semestre: datosAlumno.semestre
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al crear alumno');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Uso:
// const nuevoAlumno = await createAlumno({
//     numControl: 54321,
//     nombres: 'María',
//     apellidos: 'López García',
//     contraseña: 'hashedPassword',
//     fechaNacimiento: '2000-03-10',
//     curp: 'LOGM000310HDFRZN09',
//     telefono: '8129876543',
//     direccion: 'Avenida Secundaria 456',
//     correo: 'maria.lopez@sigau.edu.mx',
//     carrera: 1,
//     semestre: 5
// });


// ============================================
// 5. CREAR NUEVO USUARIO (ADMINISTRADOR)
// ============================================
export const createAdministrador = async (datosAdmin) => {
    try {
        const response = await fetch('http://localhost:3001/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: datosAdmin.numControl,
                nombres: datosAdmin.nombres,
                apellidos: datosAdmin.apellidos,
                contraseña: datosAdmin.contraseña,
                rol: 'administrador',
                fNacimiento: datosAdmin.fechaNacimiento,
                curp: datosAdmin.curp,
                telefono: datosAdmin.telefono,
                direccion: datosAdmin.direccion,
                correo: datosAdmin.correo
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al crear administrador');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


// ============================================
// 6. ACTUALIZAR USUARIO
// ============================================
export const updateUser = async (numControl, datosActualizacion) => {
    try {
        const response = await fetch(`http://localhost:3001/api/usuarios/${numControl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosActualizacion)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al actualizar usuario');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Uso:
// const usuarioActualizado = await updateUser(12345, {
//     nombres: 'Juan Carlos',
//     especialidad: 'Ingeniería Avanzada'
// });


// ============================================
// 7. ELIMINAR USUARIO
// ============================================
export const deleteUser = async (numControl) => {
    try {
        const response = await fetch(`http://localhost:3001/api/usuarios/${numControl}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al eliminar usuario');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Uso:
// const resultado = await deleteUser(12345);


// ============================================
// HOOK PERSONALIZADO (React)
// ============================================
import { useState, useCallback } from 'react';

export const useUsuarios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async (rol = null) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllUsers(rol);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createNewUser = useCallback(async (usuario) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3001/api/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error);
            }

            return await response.json();
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, fetchUsers, createNewUser };
};

// Uso en componente React:
// const { loading, error, fetchUsers } = useUsuarios();
// useEffect(() => {
//     fetchUsers('docente').then(docentes => console.log(docentes));
// }, []);
