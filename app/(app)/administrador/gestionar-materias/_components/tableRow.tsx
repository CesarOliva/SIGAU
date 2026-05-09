'use client';

import { Edit, Trash, Save, X, Pencil } from 'lucide-react';

export interface MateriaRowData {
    id: number;
    nombre: string;
    creditos: number | string;
    semestre: number | string;
    estado?: string;
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
    onDelete?: (id: number) => void;
    onEditChange?: (field: keyof MateriaRowData, value: string) => void;
    saving?: boolean;
    deleting?: boolean;
}

export const TableRow = ({ materia, isEditing = false, editDraft, onStartEdit, onCancelEdit, onSaveEdit, onDelete, onEditChange, saving = false, deleting = false }: TableRowProps) => {
    const current = editDraft ?? materia;

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

    if (isEditing) {
        return (
            <tr className="bg-blue-50/70 align-top">
                <td className="px-5 py-4 text-sm font-semibold text-gray-700">{materia.id}</td>
                <td className="px-5 py-4">{renderInput('nombre', String(current.nombre || ''))}</td>
                <td className="px-5 py-4 text-center">{renderInput('creditos', String(current.creditos ?? ''), 'number', 'w-24 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}</td>
                <td className="px-5 py-4 text-center">{renderInput('semestre', String(current.semestre ?? ''), 'number', 'w-24 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}</td>
                <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={onSaveEdit}
                            disabled={saving}
                            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={onCancelEdit}
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-700 border border-neutral-200 transition-colors hover:bg-neutral-50"
                        >
                            Cancelar
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <tr className="hover:bg-blue-50/30 transition-colors group align-top">
            <td className="px-5 py-4 text-sm font-semibold text-gray-700">{materia.id}</td>
            <td className="px-5 py-4 text-sm text-gray-900 font-medium">{materia.nombre}</td>
            <td className="px-5 py-4 text-center text-sm text-gray-700">{materia.creditos}</td>
            <td className="px-5 py-4 text-center text-sm text-gray-700">{materia.semestre}</td>
            <td className="px-5 py-4 text-center">
                <div className="flex items-center justify-center gap-2 transition-opacity">
                    <button onClick={onStartEdit} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 flex items-center justify-center transition-colors" title="Editar">
                        <Pencil className="size-5" />
                    </button>
                    <button onClick={() => onDelete?.(materia.id)} disabled={deleting} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50" title="Eliminar">
                        <Trash className="size-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
};