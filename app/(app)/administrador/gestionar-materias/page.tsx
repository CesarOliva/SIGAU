"use client";

import { useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { TableRow, type MateriaRowData } from './_components/tableRow';
import CreateMateriaRow from './_components/createMateriaRow';

const MateriasPage = () => {
    const [materias, setMaterias] = useState<MateriaRowData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editDraft, setEditDraft] = useState<MateriaRowData | null>(null);
    const [saving, setSaving] = useState(false);
    const [processingId, setProcessingId] = useState<number | null>(null);

    const showErrorToast = (message: string | null) => { if (message) toast.error(message); };
    const showSuccessToast = (message: string) => { toast.success(message); };

    const loadMaterias = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:3001/api/materias');
            if (!res.ok) throw new Error('No se pudieron cargar las materias');
            const data = await res.json();
            setMaterias(data);
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Error desconocido';
            setError(msg);
            showErrorToast(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadMaterias(); }, [loadMaterias]);

    const handleCreateClick = () => { setShowCreate(true); setEditingId(null); setEditDraft(null); setError(null); };
    const handleCancelCreate = () => setShowCreate(false);
    const handleCreated = (m: MateriaRowData) => { setMaterias((prev) => [m, ...prev]); setShowCreate(false); showSuccessToast('Materia creada exitosamente'); };
    const handleStartEdit = (m: MateriaRowData) => { setEditingId(m.id); setEditDraft({ ...m }); setShowCreate(false); };
    const handleEditChange = (field: keyof MateriaRowData, value: string) => { setEditDraft((prev) => prev ? { ...prev, [field]: value } : prev); };
    const handleCancelEdit = () => { setEditingId(null); setEditDraft(null); };

    const handleSaveEdit = async () => {
        if (!editDraft) { setError('No hay materia en edición'); return; }
        setSaving(true); setError(null);
        const payload: Record<string, string | number> = {
            nombre: editDraft.nombre,
            creditos: Number(editDraft.creditos),
            semestre: Number(editDraft.semestre),
            estado: editDraft.estado || 'activo',
            descripcion: editDraft.descripcion || ''
        };
        try {
            const res = await fetch(`http://localhost:3001/api/materias/${editDraft.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'No se pudo actualizar la materia');
            setMaterias((prev) => prev.map((mm) => (mm.id === editDraft.id ? data.materia : mm)));
            setEditingId(null); setEditDraft(null);
            showSuccessToast('Materia actualizada correctamente');
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Error desconocido';
            setError(msg); showErrorToast(msg);
        } finally { setSaving(false); }
    };

    // 🔄 DESACTIVAR: Cambia estado a 'inactivo'
    const handleSoftDelete = async (id: number) => {
        setProcessingId(id); setError(null);
        try {
            const res = await fetch(`http://localhost:3001/api/materias/${id}/deactivate`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'No se pudo desactivar la materia');
            setMaterias((prev) => prev.map((m) => m.id === id ? { ...m, estado: 'inactivo' } : m));
            showSuccessToast('Materia desactivada');
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Error desconocido';
            setError(msg); showErrorToast(msg);
        } finally { setProcessingId(null); }
    };

    // ↩️ REACTIVAR: Cambia estado a 'activo'
    const handleReactivate = async (id: number) => {
        setProcessingId(id); setError(null);
        try {
            const res = await fetch(`http://localhost:3001/api/materias/${id}/activate`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'No se pudo reactivar la materia');
            setMaterias((prev) => prev.map((m) => m.id === id ? { ...m, estado: 'activo' } : m));
            showSuccessToast('Materia reactivada');
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Error desconocido';
            setError(msg); showErrorToast(msg);
        } finally { setProcessingId(null); }
    };

    // 🗑️ ELIMINAR DEFINITIVAMENTE con motivo
    const handlePermanentDelete = async (id: number, reason: string) => {
        setProcessingId(id); setError(null);
        try {
            const res = await fetch(`http://localhost:3001/api/materias/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reason }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'No se pudo eliminar la materia');
            setMaterias((prev) => prev.filter((m) => m.id !== id));
            if (editingId === id) handleCancelEdit();
            showSuccessToast('Materia eliminada permanentemente');
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Error desconocido';
            setError(msg); showErrorToast(msg);
        } finally { setProcessingId(null); }
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-neutral-50">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Listado de Materias</h2>
                        <p className="text-sm text-neutral-500 mt-1">Administra las asignaturas del programa académico</p>
                    </div>
                    <button onClick={handleCreateClick} className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#e96d14] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md">
                        <Plus className="w-4 h-4"/>
                        <span>Crear Materia</span>
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Id</th>
                                    <th className="px-6 py-4">Nombre de la Materia</th>
                                    <th className="px-6 py-4 text-center">Créditos</th>
                                    <th className="px-6 py-4 text-center">Semestre</th>
                                    <th className="px-6 py-4 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {showCreate && <CreateMateriaRow visible onCancel={handleCancelCreate} onCreated={handleCreated} onError={setError} />}
                                {loading ? (
                                    <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Cargando materias...</td></tr>
                                ) : materias.length === 0 ? (
                                    <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay materias registradas</td></tr>
                                ) : (
                                    materias.map((m) => (
                                        <TableRow
                                            key={m.id}
                                            materia={m}
                                            isEditing={editingId === m.id}
                                            editDraft={editingId === m.id ? editDraft ?? undefined : undefined}
                                            onStartEdit={() => handleStartEdit(m)}
                                            onCancelEdit={handleCancelEdit}
                                            onSaveEdit={handleSaveEdit}
                                            onSoftDelete={handleSoftDelete}
                                            onReactivate={handleReactivate}
                                            onPermanentDelete={handlePermanentDelete}
                                            onEditChange={handleEditChange}
                                            saving={saving}
                                            deleting={processingId === m.id}
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

export default MateriasPage;