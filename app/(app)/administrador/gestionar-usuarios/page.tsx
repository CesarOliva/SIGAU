'use client';

import { useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import CreateUserRow from './_components/createUserRow';
import TableRow, { type UsuarioRowData } from './_components/tableRow';

type Usuario = UsuarioRowData;

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateRow, setShowCreateRow] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editDraft, setEditDraft] = useState<Usuario | null>(null);

    const showErrorToast = (message: string | null) => {
        if (message) {
            toast.error(message);
        }
    };

    const showSuccessToast = (message: string) => {
        toast.success(message);
    };

    const loadUsuarios = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/usuarios');
            if (!response.ok) {
                throw new Error('No se pudieron cargar los usuarios');
            }

            const data = await response.json();
            setUsuarios(data);
        } catch (err) {
            showErrorToast(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUsuarios();
    }, [loadUsuarios]);

    const handleCreateClick = () => {
        setEditingId(null);
        setEditDraft(null);
        setShowCreateRow(true);
    };

    const handleCancelCreate = () => {
        setShowCreateRow(false);
    };

    const handleUserCreated = (usuario: Usuario) => {
        setUsuarios((prev) => [usuario, ...prev]);
        showSuccessToast('Usuario creado exitosamente');
    };

    const handleStartEdit = (usuario: Usuario) => {
        setShowCreateRow(false);
        setEditingId(usuario.id);
        setEditDraft({
            ...usuario,
            contraseña: '',
            fNacimiento: usuario.fNacimiento || '',
            curp: usuario.curp || '',
            telefono: usuario.telefono || '',
            direccion: usuario.direccion || '',
            correo: usuario.correo || '',
            rfc: usuario.rfc || '',
            descripcion: usuario.descripcion || '',
            fIngreso: usuario.fIngreso || '',
            especialidad: usuario.especialidad || '',
            carrera: usuario.carrera ?? '',
            semestre: usuario.semestre ?? '',
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditDraft(null);
    };

    const handleEditChange = (field: keyof Usuario, value: string) => {
        setEditDraft((prev) => {
            if (!prev) return prev;
            return { ...prev, [field]: value };
        });
    };

    const validateEditDraft = () => {
        if (!editDraft) {
            return 'No hay usuario en edición';
        }

        const requiredByRole: Record<Usuario['rol'], Array<keyof Usuario>> = {
            administrador: ['id', 'nombres', 'apellidos', 'fNacimiento', 'curp', 'telefono', 'direccion', 'correo'],
            docente: ['id', 'nombres', 'apellidos', 'fNacimiento', 'rfc', 'telefono', 'direccion', 'correo', 'descripcion', 'fIngreso', 'especialidad'],
            alumno: ['id', 'nombres', 'apellidos', 'fNacimiento', 'curp', 'telefono', 'direccion', 'correo', 'carrera', 'semestre'],
        };

        const missing = requiredByRole[editDraft.rol].filter((field) => {
            const value = editDraft[field];
            return value === '' || value === null || value === undefined;
        });

        if (missing.length > 0) {
            return `Faltan campos requeridos: ${missing.join(', ')}`;
        }

        if (editDraft.fNacimiento) {
            const fecha = new Date(editDraft.fNacimiento);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            if (fecha > hoy) {
                return 'La fecha de nacimiento no puede ser futura';
            }
        }

        if (editDraft.curp && editDraft.rol !== 'docente') {
            if (editDraft.curp.length !== 18) {
                return 'El CURP debe tener exactamente 18 caracteres';
            }
        }

        if (editDraft.telefono) {
            if (!/^\d+$/.test(editDraft.telefono)) {
                return 'El teléfono solo debe contener números';
            }
            if (editDraft.telefono.length !== 10) {
                return 'El teléfono debe tener exactamente 10 dígitos';
            }
        }

        if (editDraft.correo && !editDraft.correo.includes('@institucion.mx')) {
            return 'El correo debe contener @institucion.mx';
        }

        return null;
    };

    const normalizeDate = (date: string | null | undefined): string => {
        if (!date) return '';
        const dateStr = String(date);
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        if (/^\d{4}-\d{2}-\d{2}T/.test(dateStr)) return dateStr.split('T')[0];
        return '';
    };

    const handleSaveEdit = async () => {
        const validationError = validateEditDraft();
        if (validationError || !editDraft) {
            showErrorToast(validationError || 'No hay usuario en edición');
            return;
        }

        setSavingEdit(true);

        const payload: Record<string, string | number> = {
            rol: editDraft.rol,
            contraseña: editDraft.contraseña || '',
            nombres: editDraft.nombres,
            apellidos: editDraft.apellidos,
            estado: editDraft.estado,
            fNacimiento: normalizeDate(editDraft.fNacimiento),
            curp: editDraft.curp || '',
            telefono: editDraft.telefono || '',
            direccion: editDraft.direccion || '',
            correo: editDraft.correo || '',
        };

        if (editDraft.rol === 'docente') {
            payload.rfc = editDraft.rfc || '';
            payload.descripcion = editDraft.descripcion || '';
            payload.fIngreso = normalizeDate(editDraft.fIngreso);
            payload.especialidad = editDraft.especialidad || '';
        }

        if (editDraft.rol === 'alumno') {
            payload.carrera = Number(editDraft.carrera);
            payload.semestre = Number(editDraft.semestre);
        }

        try {
            const response = await fetch(`http://localhost:3001/api/usuarios/${editDraft.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || 'No se pudo actualizar el usuario');
            }

            setUsuarios((prev) => prev.map((usuario) => (usuario.id === editDraft.id ? data.usuario : usuario)));
            setEditingId(null);
            setEditDraft(null);
            showSuccessToast('Usuario actualizado correctamente');
        } catch (err) {
            showErrorToast(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setSavingEdit(false);
        }
    };

    const handleDeleteUser = async (id: number) => {
        const confirmed = window.confirm('¿Seguro que deseas eliminar este usuario?');
        if (!confirmed) return;

        setDeletingId(id);

        try {
            const response = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || 'No se pudo eliminar el usuario');
            }

            setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));

            if (editingId === id) {
                handleCancelEdit();
            }
            showSuccessToast('Usuario eliminado correctamente');
        } catch (err) {
            showErrorToast(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-screen-2xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/95 backdrop-blur p-5 rounded-2xl shadow-sm border border-neutral-100">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Listado de Usuarios</h2>
                        <p className="text-sm text-neutral-500 mt-1">Administra los usuarios activos e inactivos</p>
                    </div>
                    <div className="flex w-full sm:w-auto gap-3">
                        <button
                            onClick={handleCreateClick}
                            className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#e96d14] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Crear Usuario</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto w-full">
                        <table className="w-max min-w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="px-5 py-4">ID</th>
                                    <th className="px-5 py-4">Rol</th>
                                    <th className="px-5 py-4">Contraseña</th>
                                    <th className="px-5 py-4">Nombre</th>
                                    <th className="px-5 py-4">Apellidos</th>
                                    <th className="px-5 py-4">Estado</th>
                                    <th className="px-5 py-4">Nacimiento</th>
                                    <th className="px-5 py-4">CURP</th>
                                    <th className="px-5 py-4">Teléfono</th>
                                    <th className="px-5 py-4">Dirección</th>
                                    <th className="px-5 py-4">Correo inst.</th>
                                    <th className="px-5 py-4">RFC</th>
                                    <th className="px-5 py-4">Desc. formación</th>
                                    <th className="px-5 py-4">Ingreso</th>
                                    <th className="px-5 py-4">Especialidad</th>
                                    <th className="px-5 py-4">Carrera</th>
                                    <th className="px-5 py-4">Semestre</th>
                                    <th className="px-5 py-4 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <CreateUserRow
                                    visible={showCreateRow}
                                    onCancel={handleCancelCreate}
                                    onCreated={handleUserCreated}
                                />

                                {loading ? (
                                    <tr>
                                        <td colSpan={18} className="px-6 py-8 text-center text-neutral-500">
                                            Cargando usuarios...
                                        </td>
                                    </tr>
                                ) : usuarios.length === 0 ? (
                                    <tr>
                                        <td colSpan={18} className="px-6 py-8 text-center text-neutral-500">
                                            No hay usuarios registrados.
                                        </td>
                                    </tr>
                                ) : (
                                    usuarios.map((usuario) => (
                                        <TableRow
                                            key={usuario.id}
                                            usuario={usuario}
                                            isEditing={editingId === usuario.id}
                                            editDraft={editingId === usuario.id ? editDraft || undefined : undefined}
                                            onStartEdit={handleStartEdit}
                                            onCancelEdit={handleCancelEdit}
                                            onSaveEdit={handleSaveEdit}
                                            onDelete={handleDeleteUser}
                                            onEditChange={handleEditChange}
                                            saving={savingEdit}
                                            deleting={deletingId === usuario.id}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsuariosPage;