"use client";

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
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [editDraft, setEditDraft] = useState<Usuario | null>(null);

    const [error, setError] = useState<string | null>(null);

    const showErrorToast = (message: string | null) => { if (message) toast.error(message); };
    const showSuccessToast = (message: string) => { toast.success(message); };

    const loadUsuarios = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/usuarios');
            if (!response.ok) throw new Error('No se pudieron cargar los usuarios');
            const data = await response.json();
            setUsuarios(data);
        } catch (err) {
            showErrorToast(err instanceof Error ? err.message : 'Error desconocido');
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { loadUsuarios(); }, [loadUsuarios]);

    // 🔥 Obtener siguiente ID disponible para auto-incremento
    const fetchNextId = async (): Promise<number> => {
        try {
            const res = await fetch('http://localhost:3001/api/usuarios/next-id');
            const data = await res.json();
            return data.nextId;
        } catch {
            // Fallback: calcular localmente si falla la API
            const maxId = Math.max(0, ...usuarios.map(u => u.id));
            return maxId + 1;
        }
    };

    const handleCreateClick = async () => {
        setEditingId(null); setEditDraft(null); setShowCreateRow(true);
    };
    const handleCancelCreate = () => setShowCreateRow(false);
    const handleUserCreated = (usuario: Usuario) => {
        setUsuarios((prev) => [usuario, ...prev]);
        showSuccessToast('Usuario creado exitosamente');
    };
    const handleStartEdit = (usuario: Usuario) => {
        setShowCreateRow(false); setEditingId(usuario.id);
        setEditDraft({ ...usuario, contraseña: '', fNacimiento: usuario.fNacimiento || '', curp: usuario.curp || '', telefono: usuario.telefono || '', direccion: usuario.direccion || '', correo: usuario.correo || '', rfc: usuario.rfc || '', descripcion: usuario.descripcion || '', fIngreso: usuario.fIngreso || '', especialidad: usuario.especialidad || '', carrera: usuario.carrera ?? '', semestre: usuario.semestre ?? '' });
    };
    const handleCancelEdit = () => { setEditingId(null); setEditDraft(null); };
    const handleEditChange = (field: keyof Usuario, value: string) => { setEditDraft((prev) => prev ? { ...prev, [field]: value } : prev); };

    const validateEditDraft = () => {
        if (!editDraft) return 'No hay usuario en edición';
        const requiredByRole: Record<Usuario['rol'], Array<keyof Usuario>> = {
            administrador: ['id','nombres','apellidos','fNacimiento','curp','telefono','direccion','correo'],
            docente: ['id','nombres','apellidos','fNacimiento','rfc','telefono','direccion','correo','descripcion','fIngreso','especialidad'],
            alumno: ['id','nombres','apellidos','fNacimiento','curp','telefono','direccion','correo','carrera','semestre'],
        };
        const missing = requiredByRole[editDraft.rol].filter((field) => { const v = editDraft[field]; return v === '' || v === null || v === undefined; });
        if (missing.length > 0) return `Faltan campos requeridos: ${missing.join(', ')}`;
        if (editDraft.fNacimiento) { const f = new Date(editDraft.fNacimiento); const hoy = new Date(); hoy.setHours(0,0,0,0); if (f > hoy) return 'La fecha de nacimiento no puede ser futura'; }
        if (editDraft.curp && editDraft.rol !== 'docente' && editDraft.curp.length !== 18) return 'El CURP debe tener exactamente 18 caracteres';
        if (editDraft.telefono && (!/^\d+$/.test(editDraft.telefono) || editDraft.telefono.length !== 10)) return 'El teléfono debe tener exactamente 10 dígitos numéricos';
        if (editDraft.correo && !editDraft.correo.includes('@institucion.mx')) return 'El correo debe contener @institucion.mx';
        return null;
    };

    const normalizeDate = (date: string | null | undefined): string => {
        if (!date) return '';
        const d = String(date);
        if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
        if (/^\d{4}-\d{2}-\d{2}T/.test(d)) return d.split('T')[0];
        return '';
    };

    const handleSaveEdit = async () => {
        const err = validateEditDraft();
        if (err || !editDraft) { showErrorToast(err || 'No hay usuario en edición'); return; }
        setSavingEdit(true);
        const payload: Record<string, string | number> = {
            rol: editDraft.rol, contraseña: editDraft.contraseña || '', nombres: editDraft.nombres, apellidos: editDraft.apellidos,
            estado: editDraft.estado, fNacimiento: normalizeDate(editDraft.fNacimiento), curp: editDraft.curp || '',
            telefono: editDraft.telefono || '', direccion: editDraft.direccion || '', correo: editDraft.correo || '',
        };
        if (editDraft.rol === 'docente') { payload.rfc = editDraft.rfc || ''; payload.descripcion = editDraft.descripcion || ''; payload.fIngreso = normalizeDate(editDraft.fIngreso); payload.especialidad = editDraft.especialidad || ''; }
        if (editDraft.rol === 'alumno') { payload.carrera = String(editDraft.carrera ?? ''); payload.semestre = Number(editDraft.semestre); }
        try {
            const res = await fetch(`http://localhost:3001/api/usuarios/${editDraft.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'No se pudo actualizar el usuario');
            setUsuarios(prev => prev.map(u => u.id === editDraft!.id ? data.usuario : u));
            setEditingId(null); setEditDraft(null); showSuccessToast('Usuario actualizado correctamente');
        } catch (e) { showErrorToast(e instanceof Error ? e.message : 'Error desconocido'); }
        finally { setSavingEdit(false); }
    };

    // 🔄 DESACTIVAR: Cambia estado a 'Inactivo'
    const handleSoftDelete = async (id: number) => {
        setProcessingId(id); setError(null);
        try {
            const res = await fetch(`http://localhost:3001/api/usuarios/${id}/deactivate`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' } });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'No se pudo desactivar el usuario');
            setUsuarios(prev => prev.map(u => u.id === id ? { ...u, estado: 'Inactivo' } : u));
            showSuccessToast('Usuario desactivado');
        } catch (err) { const msg = err instanceof Error ? err.message : 'Error desconocido'; setError(msg); showErrorToast(msg); }
        finally { setProcessingId(null); }
    };

    // ↩️ REACTIVAR: Cambia estado a 'Activo'
    const handleReactivate = async (id: number) => {
        setProcessingId(id); setError(null);
        try {
            const res = await fetch(`http://localhost:3001/api/usuarios/${id}/activate`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' } });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'No se pudo reactivar el usuario');
            setUsuarios(prev => prev.map(u => u.id === id ? { ...u, estado: 'Activo' } : u));
            showSuccessToast('Usuario reactivado');
        } catch (err) { const msg = err instanceof Error ? err.message : 'Error desconocido'; setError(msg); showErrorToast(msg); }
        finally { setProcessingId(null); }
    };

    // 🗑️ ELIMINAR DEFINITIVAMENTE con motivo
    const handlePermanentDelete = async (id: number, reason: string) => {
        setProcessingId(id); setError(null);
        try {
            const res = await fetch(`http://localhost:3001/api/usuarios/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reason }) });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'No se pudo eliminar el usuario');
            setUsuarios(prev => prev.filter(u => u.id !== id));
            if (editingId === id) handleCancelEdit();
            showSuccessToast('Usuario eliminado permanentemente');
        } catch (err) { const msg = err instanceof Error ? err.message : 'Error desconocido'; setError(msg); showErrorToast(msg); }
        finally { setProcessingId(null); }
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-screen-2xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/95 backdrop-blur p-5 rounded-2xl shadow-sm border border-neutral-100">
                    <div><h2 className="text-lg font-semibold text-neutral-900">Listado de Usuarios</h2><p className="text-sm text-neutral-500 mt-1">Administra los usuarios activos e inactivos</p></div>
                    <button onClick={handleCreateClick} className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#e96d14] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md">
                        <Plus className="w-4 h-4"/><span>Crear Usuario</span>
                    </button>
                </div>
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto w-full">
                        <table className="w-max min-w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="px-5 py-4">ID</th><th className="px-5 py-4">Rol</th><th className="px-5 py-4">Contraseña</th><th className="px-5 py-4">Nombre</th><th className="px-5 py-4">Apellidos</th><th className="px-5 py-4">Estado</th><th className="px-5 py-4">Nacimiento</th><th className="px-5 py-4">CURP</th><th className="px-5 py-4">Teléfono</th><th className="px-5 py-4">Dirección</th><th className="px-5 py-4">Correo inst.</th><th className="px-5 py-4">RFC</th><th className="px-5 py-4">Desc. formación</th><th className="px-5 py-4">Ingreso</th><th className="px-5 py-4">Especialidad</th><th className="px-5 py-4">Carrera</th><th className="px-5 py-4">Semestre</th><th className="px-5 py-4 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <CreateUserRow visible={showCreateRow} onCancel={handleCancelCreate} onCreated={handleUserCreated} onFetchNextId={fetchNextId} />
                                {loading ? (<tr><td colSpan={18} className="px-6 py-8 text-center text-neutral-500">Cargando usuarios...</td></tr>) : usuarios.length === 0 ? (<tr><td colSpan={18} className="px-6 py-8 text-center text-neutral-500">No hay usuarios registrados.</td></tr>) : (
                                    usuarios.map((usuario) => (
                                        <TableRow key={usuario.id} usuario={usuario} isEditing={editingId === usuario.id} editDraft={editingId === usuario.id ? editDraft || undefined : undefined} onStartEdit={handleStartEdit} onCancelEdit={handleCancelEdit} onSaveEdit={handleSaveEdit} onSoftDelete={handleSoftDelete} onReactivate={handleReactivate} onPermanentDelete={handlePermanentDelete} onEditChange={handleEditChange} saving={savingEdit} deleting={processingId === usuario.id} />
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