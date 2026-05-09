'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import type { MateriaRowData } from './tableRow';

interface Props {
    visible: boolean;
    onCancel: () => void;
    onCreated: (m: MateriaRowData) => void;
    onError: (msg: string | null) => void;
}

const emptyDraft = () => ({ id: '', nombre: '', creditos: '', semestre: '', estado: 'Activo', descripcion: '' });

const CreateMateriaRow = ({ visible, onCancel, onCreated, onError }: Props) => {
    const [draft, setDraft] = useState(emptyDraft());
    const [saving, setSaving] = useState(false);

    const handleChange = (field: keyof typeof draft, value: string) => setDraft((p) => ({ ...p, [field]: value }));

    const validateDraft = () => {
        const requiredFields: Array<{ field: keyof typeof draft; label: string }> = [
            { field: 'nombre', label: 'nombre' },
            { field: 'creditos', label: 'creditos' },
            { field: 'semestre', label: 'semestre' },
        ];

        const missing = requiredFields.find(({ field }) => {
            const value = draft[field];
            return value === '' || value === null || value === undefined || String(value).trim() === '';
        });

        const id = Number(draft.id);
        const creditos = Number(draft.creditos);
        const semestre = Number(draft.semestre);

        if (missing) return `Falta completar el campo: ${missing.label}`;
        if (draft.id && (Number.isNaN(id) || !Number.isInteger(id) || id <= 0)) return 'El ID debe ser un numero entero positivo';
        if (Number.isNaN(creditos) || creditos <= 0) return 'Creditos debe ser un numero positivo';
        if (Number.isNaN(semestre) || !Number.isInteger(semestre) || semestre <= 0) return 'Semestre debe ser un numero entero positivo';
        if (String(draft.nombre).trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
        return null;
    };

    const handleSave = async () => {
        const v = validateDraft();
        if (v) { onError(v); toast.error(v); return; }
        setSaving(true); onError(null);

        const payload: Record<string, string | number> = {
            nombre: draft.nombre,
            creditos: Number(draft.creditos),
            semestre: Number(draft.semestre),
            estado: draft.estado,
            descripcion: draft.descripcion || ''
        };

        if (draft.id) payload.id = Number(draft.id);

        try {
            const res = await fetch('http://localhost:3001/api/materias', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'No se pudo crear la materia');
            onCreated(data.materia);
            onCancel();
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Error desconocido';
            onError(msg);
            toast.error(msg);
        } finally { setSaving(false); }
    };

    if (!visible) return null;

    return (
        <tr className="bg-blue-50/70 align-top">
            <td className="px-5 py-4">
                <input
                    type="number"
                    value={draft.id}
                    onChange={(e) => handleChange('id', e.target.value)}
                    placeholder="ID"
                    className="w-24 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    placeholder="Nombre"
                    className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4 text-center">
                <input
                    value={draft.creditos}
                    onChange={(e) => handleChange('creditos', e.target.value)}
                    type="number"
                    placeholder="Créditos"
                    className="w-25 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-center outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4 text-center">
                <input
                    value={draft.semestre}
                    onChange={(e) => handleChange('semestre', e.target.value)}
                    placeholder="Semestre"
                    type="number"
                    className="w-25 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-center outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4 flex items-center gap-2 justify-center">
                <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70">
                    {saving ? 'Guardando' : 'Crear'}
                </button>
                <button onClick={onCancel} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-700 border border-neutral-200 transition-colors hover:bg-neutral-50">
                    <X className="w-4 h-4"/>Cancelar
                </button>
            </td>
        </tr>
    );
};

export default CreateMateriaRow;
