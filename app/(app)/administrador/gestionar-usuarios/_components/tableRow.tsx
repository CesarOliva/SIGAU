'use client';

import { useState } from 'react';

type Rol = 'administrador' | 'docente' | 'alumno';

export interface UsuarioRowData {
    id: number;
    nombres: string;
    apellidos: string;
    contraseña?: string;
    rol: Rol;
    estado: 'Activo' | 'Inactivo' | string;
    fNacimiento?: string | null;
    curp?: string | null;
    telefono?: string | null;
    direccion?: string | null;
    correo?: string | null;
    rfc?: string | null;
    descripcion?: string | null;
    fIngreso?: string | null;
    especialidad?: string | null;
    carrera?: string | null;
    semestre?: number | string | null;
}

interface TableRowProps {
    usuario: UsuarioRowData;
    isEditing?: boolean;
    editDraft?: Partial<UsuarioRowData>;
    onStartEdit?: (usuario: UsuarioRowData) => void;
    onCancelEdit?: () => void;
    onSaveEdit?: () => void;
    onSoftDelete?: (id: number) => void;
    onReactivate?: (id: number) => void;
    onPermanentDelete?: (id: number, reason: string) => void;
    onEditChange?: (field: keyof UsuarioRowData, value: string) => void;
    saving?: boolean;
    deleting?: boolean;
}

const roleLabel = (rol: Rol) => rol.charAt(0).toUpperCase() + rol.slice(1);

const TableRow = ({
    usuario,
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
    const current = editDraft ?? usuario;
    const isInactive = usuario.estado === 'Inactivo';

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');

    const handlePermanentDelete = () => {
        if (deleteReason.trim()) {
            onPermanentDelete?.(usuario.id, deleteReason.trim());
            setShowConfirmModal(false);
            setDeleteReason('');
        }
    };

    const renderInput = (
        field: keyof UsuarioRowData,
        value: string | number | null | undefined,
        placeholder: string,
        type: string = 'text',
        className = 'w-full min-w-32 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300'
    ) => (
        <input
            type={type}
            value={value ?? ''}
            onChange={(event) => onEditChange?.(field, event.target.value)}
            placeholder={placeholder}
            className={className}
        />
    );

    // 🎨 Estilos condicionales según estado
    const rowClasses = isInactive
        ? 'bg-gray-100 align-top'
        : 'hover:bg-blue-50/30 transition-colors group align-top';
    const textBase = isInactive ? 'text-gray-400' : 'text-gray-700';
    const nameText = isInactive ? 'text-gray-400 font-medium' : 'text-gray-900 font-medium';

    if (isEditing) {
        return (
            <tr className="bg-blue-50/70 align-center">
                <td className="px-5 py-4 text-sm font-semibold text-gray-700">{usuario.id}</td>
                <td className="px-5 py-4">
                    <select
                        value={(current.rol as Rol) || 'administrador'}
                        onChange={(event) => onEditChange?.('rol', event.target.value)}
                        className="w-36 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="administrador">Administrador</option>
                        <option value="docente">Docente</option>
                        <option value="alumno">Alumno</option>
                    </select>
                </td>
                <td className="px-5 py-4">
                    {renderInput('contraseña', current.contraseña || '', 'Nueva contraseña', 'password', 'w-40 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    {renderInput('nombres', current.nombres, 'Nombre', 'text', 'w-36 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    {renderInput('apellidos', current.apellidos, 'Apellidos', 'text', 'w-44 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    <select
                        value={current.estado || 'Activo'}
                        onChange={(event) => onEditChange?.('estado', event.target.value)}
                        className="w-28 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </td>
                <td className="px-5 py-4">
                    {renderInput('fNacimiento', current.fNacimiento || '', 'Nacimiento', 'date', 'w-40 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    {renderInput('curp', current.curp || '', 'CURP', 'text', 'w-44 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    {renderInput('telefono', current.telefono || '', 'Teléfono', 'text', 'w-36 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    {renderInput('direccion', current.direccion || '', 'Dirección', 'text', 'w-56 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    {renderInput('correo', current.correo || '', 'Correo institucional', 'text', 'w-52 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    {renderInput('rfc', current.rfc || '', 'RFC', 'text', 'w-40 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    {renderInput('descripcion', current.descripcion || '', 'Descripción', 'text', 'w-56 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    {renderInput('fIngreso', current.fIngreso || '', 'Ingreso', 'date', 'w-40 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    {renderInput('especialidad', current.especialidad || '', 'Especialidad', 'text', 'w-48 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
                <td className="px-5 py-4">
                    <select
                        value={current.carrera || 'Sistemas computacionales'}
                        onChange={(event) => onEditChange?.('carrera', event.target.value)}
                        className="w-56 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="Sistemas computacionales">Sistemas computacionales</option>
                        <option value="Gestión Empresarial">Gestión Empresarial</option>
                        <option value="Mecatronica">Mecatronica</option>
                    </select>
                </td>
                <td className="px-5 py-4">
                    {renderInput('semestre', current.semestre ?? '', 'Semestre', 'number', 'w-28 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300')}
                </td>
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
                <td className={`px-5 py-4 text-sm font-semibold ${textBase}`}>{usuario.id}</td>
                <td className={`px-5 py-4 text-sm font-semibold ${textBase}`}>{roleLabel(usuario.rol)}</td>
                <td className="px-5 py-4">••••••••</td>
                <td className={`px-5 py-4 text-sm ${nameText}`}>{usuario.nombres}</td>
                <td className={`px-5 py-4 text-sm ${nameText}`}>{usuario.apellidos}</td>
                <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        isInactive ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-800'
                    }`}>
                        {usuario.estado}
                    </span>
                </td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.fNacimiento?.split('T')[0] || '-'}</td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.curp || '-'}</td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.telefono || '-'}</td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.direccion || '-'}</td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.correo || '-'}</td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.rfc || '-'}</td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.descripcion || '-'}</td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.fIngreso?.split('T')[0] || '-'}</td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.especialidad || '-'}</td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.carrera ?? '-'}</td>
                <td className={`px-5 py-4 text-sm ${textBase}`}>{usuario.semestre ?? '-'}</td>
                <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        {!isInactive ? (
                            // 🔵 Estado ACTIVO: Editar + Desactivar
                            <>
                                <button onClick={() => onStartEdit?.(usuario)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 flex items-center justify-center transition-colors" title="Editar">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                </button>
                                <button onClick={() => onSoftDelete?.(usuario.id)} disabled={deleting} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50" title="Desactivar">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                </button>
                            </>
                        ) : (
                            // ⚪ Estado INACTIVO: Deshacer + Borrar definitivo
                            <>
                                <button onClick={() => onReactivate?.(usuario.id)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
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

            {/* 📦 Modal de confirmación para eliminación definitiva */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Eliminación definitiva</h3>
                        <p className="text-sm text-gray-600 mb-4">Escriba el motivo por el cual está eliminando al usuario permanentemente.</p>
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

export default TableRow;