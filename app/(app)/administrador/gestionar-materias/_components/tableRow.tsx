'use client';

import { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';

export interface MateriaRowData {
    id: number;
    nombre: string;
    creditos: number | string;
    semestre: number | string;
    estado?: 'activo' | 'inactivo' | string;
    descripcion?: string | null;
    fechaCreacion?: string | null;
}

interface TableRowProps {
    materia: MateriaRowData;
    isEditing?: boolean;
    editDraft?: Partial<MateriaRowData>;
    onStartEdit?: () => void;
    onCancelEdit?: () => void;
    onSaveEdit?: () => void;
    onSoftDelete?: (id: number) => void;
    onReactivate?: (id: number) => void;
    onPermanentDelete?: (id: number, reason: string) => void;
    onEditChange?: (field: keyof MateriaRowData, value: string) => void;
    saving?: boolean;
    deleting?: boolean;
}

export const TableRow = ({
    materia,
    isEditing = false,
    editDraft,
    onStartEdit,
    onCancelEdit,
    onSaveEdit,
    onSoftDelete,
    onReactivate,
    onPermanentDelete,
    onEditChange,
    saving = false,
    deleting = false,
}: TableRowProps) => {
    const current = editDraft ?? materia;
    const isInactive = materia.estado === 'inactivo';

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');

    const handlePermanentDelete = () => {
        if (deleteReason.trim()) {
            onPermanentDelete?.(materia.id, deleteReason.trim());
            setShowConfirmModal(false);
            setDeleteReason('');
        }
    };

    const renderInput = (
        field: keyof MateriaRowData,
        value: string | number | null | undefined,
        type: string = 'text',
        className = 'w-full min-w-32 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300'
    ) => (
        <input
            type={type}
            value={value ?? ''}
            onChange={(e) => onEditChange?.(field, e.target.value)}
            className={className}
        />
    );

    const rowClasses = isInactive
        ? 'bg-gray-100 align-top'
        : 'hover:bg-blue-50/30 transition-colors group align-top';

    const textBase = isInactive ? 'text-gray-400' : 'text-gray-700';
    const nameText = isInactive ? 'text-gray-400 font-medium' : 'text-gray-900 font-medium';

    if (isEditing) {
        return (
            <tr className="bg-blue-50/70 align-top">
                <td className="px-5 py-4 text-sm font-semibold text-gray-700">{materia.id}</td>
                <td className="px-5 py-4">{renderInput('nombre', String(current.nombre || ''))}</td>
                <td className="px-5 py-4 text-center">{renderInput('creditos', String(current.creditos ?? ''), 'number', 'w-24 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}</td>
                <td className="px-5 py-4 text-center">{renderInput('semestre', String(current.semestre ?? ''), 'number', 'w-24 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}</td>
                <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={onSaveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70">
                            Guardar
                        </button>
                        <button onClick={onCancelEdit} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-700 border border-neutral-200 transition-colors hover:bg-neutral-50">
                            Cancelar
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <>
            <tr className={rowClasses}>
                <td className={`px-5 py-4 text-sm font-semibold ${textBase}`}>{materia.id}</td>
                <td className={`px-5 py-4 text-sm ${nameText}`}>{materia.nombre}</td>
                <td className={`px-5 py-4 text-center text-sm ${textBase}`}>{materia.creditos}</td>
                <td className={`px-5 py-4 text-center text-sm ${textBase}`}>{materia.semestre}</td>
                <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        {!isInactive ? (
                            <>
                                <button onClick={onStartEdit} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 flex items-center justify-center transition-colors" title="Editar">
                                    <Pencil className="size-5" />
                                </button>
                                <button onClick={() => onSoftDelete?.(materia.id)} disabled={deleting} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50" title="Desactivar">
                                    <Trash className="size-5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => onReactivate?.(materia.id)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                                    Deshacer
                                </button>
                                <button onClick={() => setShowConfirmModal(true)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                                    Borrar
                                </button>
                            </>
                        )}
                    </div>
                </td>
            </tr>

            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Eliminación definitiva</h3>
                        <p className="text-sm text-gray-600 mb-4">Escriba el motivo por el cual está eliminando la materia permanentemente.</p>
                        <textarea
                            value={deleteReason}
                            onChange={(e) => setDeleteReason(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-4 resize-none focus:ring-2 focus:ring-red-300 outline-none"
                            rows={3}
                            placeholder="Motivo de eliminación..."
                            autoFocus
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => { setShowConfirmModal(false); setDeleteReason(''); }}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handlePermanentDelete}
                                disabled={!deleteReason.trim()}
                                className="px-4 py-2 rounded-lg bg-red-600 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};