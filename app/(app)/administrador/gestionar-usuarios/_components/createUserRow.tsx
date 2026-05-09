'use client';

import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import type { UsuarioRowData } from './tableRow';

type Rol = UsuarioRowData['rol'];

type DraftUsuario = {
    id: string;
    contraseña: string;
    rol: Rol;
    nombres: string;
    apellidos: string;
    estado: string;
    fNacimiento: string;
    curp: string;
    telefono: string;
    direccion: string;
    correo: string;
    rfc: string;
    descripcion: string;
    fIngreso: string;
    especialidad: string;
    carrera: string;
    semestre: string;
};

const emptyDraft = (): DraftUsuario => ({
    id: '',
    contraseña: '',
    rol: 'administrador',
    nombres: '',
    apellidos: '',
    estado: 'Activo',
    fNacimiento: '',
    curp: '',
    telefono: '',
    direccion: '',
    correo: '',
    rfc: '',
    descripcion: '',
    fIngreso: '',
    especialidad: '',
    carrera: 'Sistemas Computacionales',
    semestre: '',
});

interface CreateUserRowProps {
    visible: boolean;
    onCancel: () => void;
    onCreated: (usuario: UsuarioRowData) => void;
}

const CreateUserRow = ({ visible, onCancel, onCreated }: CreateUserRowProps) => {
    const [draft, setDraft] = useState<DraftUsuario>(emptyDraft());
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (visible) {
            setDraft(emptyDraft());
        }
    }, [visible]);

    const roleRequiredFields = useMemo(() => {
        switch (draft.rol) {
            case 'docente':
                return ['id', 'contraseña', 'nombres', 'apellidos', 'fNacimiento', 'rfc', 'correo', 'telefono', 'direccion', 'descripcion', 'fIngreso', 'especialidad'];
            case 'alumno':
                return ['id', 'contraseña', 'nombres', 'apellidos', 'fNacimiento', 'curp', 'correo', 'telefono', 'direccion', 'carrera', 'semestre'];
            default:
                return ['id', 'contraseña', 'nombres', 'apellidos', 'fNacimiento', 'curp', 'correo', 'telefono', 'direccion'];
        }
    }, [draft.rol]);

    const handleChange = (field: keyof DraftUsuario, value: string) => {
        setDraft((prev) => ({ ...prev, [field]: value }));
    };

    const validateDraft = () => {
        const missing = roleRequiredFields.filter((field) => {
            const value = draft[field as keyof DraftUsuario];
            return value === '' || value === null || value === undefined;
        });

        if (missing.length > 0) {
            return `Faltan campos requeridos: ${missing.join(', ')}`;
        }

        if (isNaN(Number(draft.id))) return 'El ID debe ser numérico';
        if (draft.rol === 'alumno' && draft.semestre && isNaN(Number(draft.semestre))) return 'Semestre debe ser numérico';

        // Validar fecha de nacimiento (no futura)
        if (draft.fNacimiento) {
            const fecha = new Date(draft.fNacimiento);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            if (fecha > hoy) {
                return 'La fecha de nacimiento no puede ser futura';
            }
        }

        // Validar CURP (exactamente 18 caracteres)
        if (draft.rol !== 'docente' && draft.curp) {
            if (draft.curp.length !== 18) {
                return 'El CURP debe tener exactamente 18 caracteres';
            }
        }

        // Validar teléfono (10 dígitos, solo números)
        if (draft.telefono) {
            if (!/^\d+$/.test(draft.telefono)) {
                return 'El teléfono solo debe contener números';
            }
            if (draft.telefono.length !== 10) {
                return 'El teléfono debe tener exactamente 10 dígitos';
            }
        }

        // Validar correo (debe contener @institucion.mx)
        if (draft.correo && !draft.correo.includes('@institucion.mx')) {
            return 'El correo debe contener @institucion.mx';
        }

        // Validar contraseña (mínimo 6 caracteres)
        if (draft.contraseña && draft.contraseña.length < 6) {
            return 'La contraseña debe tener al menos 6 caracteres';
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

    const handleSaveUser = async () => {
        if (saving) return;

        const validationError = validateDraft();
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setSaving(true);

        const payload: Record<string, string | number> = {
            id: Number(draft.id),
            contraseña: draft.contraseña,
            rol: draft.rol,
            nombres: draft.nombres,
            apellidos: draft.apellidos,
            fNacimiento: normalizeDate(draft.fNacimiento),
            curp: draft.curp,
            correo: draft.correo,
            telefono: draft.telefono,
            direccion: draft.direccion,
        };

        if (draft.rol === 'docente') {
            payload.rfc = draft.rfc;
            payload.descripcion = draft.descripcion;
            payload.fIngreso = normalizeDate(draft.fIngreso);
            payload.especialidad = draft.especialidad;
        }

        if (draft.rol === 'alumno') {
            payload.carrera = draft.carrera;
            payload.semestre = Number(draft.semestre);
        }

        try {
            const response = await fetch('http://localhost:3001/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || 'No se pudo crear el usuario');
            }

            onCreated(data.usuario);
            onCancel();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setSaving(false);
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <tr className="bg-blue-50/70 align-top">
            <td className="px-5 py-4">
                <input
                    type="number"
                    value={draft.id}
                    onChange={(e) => handleChange('id', e.target.value)}
                    placeholder="1001"
                    className="w-24 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <select
                    value={draft.rol}
                    onChange={(e) => handleChange('rol', e.target.value as Rol)}
                    className="w-36 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <option value="administrador">Administrador</option>
                    <option value="docente">Docente</option>
                    <option value="alumno">Alumno</option>
                </select>
            </td>
            <td className="px-5 py-4">
                <input
                    type="password"
                    value={draft.contraseña}
                    onChange={(e) => handleChange('contraseña', e.target.value)}
                    placeholder="Contraseña"
                    className="w-40 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.nombres}
                    onChange={(e) => handleChange('nombres', e.target.value)}
                    placeholder="Nombre"
                    className="w-36 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.apellidos}
                    onChange={(e) => handleChange('apellidos', e.target.value)}
                    placeholder="Apellidos"
                    className="w-44 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.estado}
                    className="w-28 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                    disabled
                />
            </td>
            <td className="px-5 py-4">
                <input
                    type="date"
                    value={draft.fNacimiento}
                    onChange={(e) => handleChange('fNacimiento', e.target.value)}
                    className="w-40 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.curp}
                    onChange={(e) => handleChange('curp', e.target.value.toUpperCase())}
                    placeholder="CURP"
                    maxLength={18}
                    className="w-44 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.telefono}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                    placeholder="Teléfono"
                    maxLength={10}
                    className="w-36 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.direccion}
                    onChange={(e) => handleChange('direccion', e.target.value)}
                    placeholder="Dirección"
                    className="w-56 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.correo}
                    onChange={(e) => handleChange('correo', e.target.value)}
                    placeholder="correo@institucion.mx"
                    className="w-52 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.rfc}
                    onChange={(e) => handleChange('rfc', e.target.value.toUpperCase())}
                    placeholder="RFC"
                    className="w-40 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.descripcion}
                    onChange={(e) => handleChange('descripcion', e.target.value)}
                    placeholder="Descripción"
                    className="w-56 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    type="date"
                    value={draft.fIngreso}
                    onChange={(e) => handleChange('fIngreso', e.target.value)}
                    className="w-40 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <input
                    value={draft.especialidad}
                    onChange={(e) => handleChange('especialidad', e.target.value)}
                    placeholder="Especialidad"
                    className="w-48 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4">
                <select
                    value={draft.carrera}
                    onChange={(e) => handleChange('carrera', e.target.value)}
                    className="w-52 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <option value="Sistemas Computacionales">Sistemas Computacionales</option>
                    <option value="Gestion Empresarial">Gestion Empresarial</option>
                    <option value="Mecatronica">Mecatronica</option>
                </select>
            </td>
            <td className="px-5 py-4">
                <input
                    type="number"
                    value={draft.semestre}
                    onChange={(e) => handleChange('semestre', e.target.value)}
                    placeholder="Semestre"
                    className="w-28 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
            </td>
            <td className="px-5 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={handleSaveUser}
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {saving ? 'Guardando' : 'Guardar'}
                    </button>
                    <button
                        onClick={onCancel}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-700 border border-neutral-200 transition-colors hover:bg-neutral-50"
                    >
                        <X className="h-4 w-4" />
                        Cancelar
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CreateUserRow;