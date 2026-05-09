"use client";

import { Calendar, IdCard, Mail, Phone, User, UserPen, Users, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type UsuarioPerfil = {
    id: number;
    rol: string;
    nombres: string;
    apellidos: string;
    fNacimiento: string;
    curp: string;
    correo: string;
    telefono: string;
    direccion: string;
};

type UsuarioLocalStorage = {
    id?: number | string;
    nombres?: string;
    apellidos?: string;
    rol?: string;
};

const emptyPerfil: UsuarioPerfil = {
    id: 0,
    rol: "administrador",
    nombres: "",
    apellidos: "",
    fNacimiento: "",
    curp: "",
    correo: "",
    telefono: "",
    direccion: "",
};

const normalizeDate = (date: string | null | undefined): string => {
    if (!date) return "";
    const value = String(date);
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) return value.split("T")[0];
    return "";
};

const DatosPage = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [perfil, setPerfil] = useState<UsuarioPerfil>(emptyPerfil);
    const [draft, setDraft] = useState<UsuarioPerfil>(emptyPerfil);

    useEffect(() => {
        try {
            const userRaw = localStorage.getItem("user");
            if (!userRaw) {
                toast.error("No se encontró sesión activa");
                setLoading(false);
                return;
            }

            const user = JSON.parse(userRaw) as UsuarioLocalStorage;
            const parsedId = Number(user?.id);

            if (!parsedId || Number.isNaN(parsedId)) {
                toast.error("No se pudo obtener el ID del usuario en sesión");
                setLoading(false);
                return;
            }

            setUserId(parsedId);
        } catch {
            toast.error("La sesión local está corrupta");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        const loadPerfil = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/api/usuarios/${userId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.error || "No se pudieron cargar los datos del usuario");
                }

                const perfilApi: UsuarioPerfil = {
                    id: data.id,
                    rol: data.rol || "administrador",
                    nombres: data.nombres || "",
                    apellidos: data.apellidos || "",
                    fNacimiento: normalizeDate(data.fNacimiento),
                    curp: data.curp || "",
                    correo: data.correo || "",
                    telefono: data.telefono || "",
                    direccion: data.direccion || "",
                };

                setPerfil(perfilApi);
                setDraft(perfilApi);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Error al cargar datos personales");
            } finally {
                setLoading(false);
            }
        };

        loadPerfil();
    }, [userId]);

    const hasChanges = useMemo(() => JSON.stringify(draft) !== JSON.stringify(perfil), [draft, perfil]);

    const handleChange = (field: keyof UsuarioPerfil, value: string) => {
        setDraft((prev) => ({ ...prev, [field]: value }));
    };

    const validateDraft = () => {
        const required: Array<keyof UsuarioPerfil> = [
            "nombres",
            "apellidos",
            "fNacimiento",
            "curp",
            "correo",
            "telefono",
            "direccion",
        ];

        const missing = required.filter((field) => !String(draft[field] ?? "").trim());
        if (missing.length > 0) {
            return `Faltan campos requeridos: ${missing.join(", ")}`;
        }

        if (!/^\d{10}$/.test(draft.telefono)) {
            return "El teléfono debe tener exactamente 10 dígitos numéricos";
        }

        if (draft.curp.length !== 18) {
            return "El CURP debe tener exactamente 18 caracteres";
        }

        if (!draft.correo.includes("@institucion.mx")) {
            return "El correo debe contener @institucion.mx";
        }

        const fechaNacimiento = new Date(draft.fNacimiento);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        if (fechaNacimiento > hoy) {
            return "La fecha de nacimiento no puede ser futura";
        }

        return null;
    };

    const handleCancel = () => {
        setDraft(perfil);
    };

    const handleSave = async () => {
        if (!userId) return;

        const validationError = validateDraft();
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setSaving(true);
        try {
            const payload = {
                rol: draft.rol,
                nombres: draft.nombres,
                apellidos: draft.apellidos,
                fNacimiento: normalizeDate(draft.fNacimiento),
                curp: draft.curp.toUpperCase(),
                correo: draft.correo,
                telefono: draft.telefono,
                direccion: draft.direccion,
            };

            const response = await fetch(`http://localhost:3001/api/usuarios/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.error || "No se pudo guardar la información");
            }

            const updatedPerfil: UsuarioPerfil = {
                id: data.usuario.id,
                rol: data.usuario.rol || draft.rol,
                nombres: data.usuario.nombres || draft.nombres,
                apellidos: data.usuario.apellidos || draft.apellidos,
                fNacimiento: normalizeDate(data.usuario.fNacimiento || draft.fNacimiento),
                curp: data.usuario.curp || draft.curp,
                correo: data.usuario.correo || draft.correo,
                telefono: data.usuario.telefono || draft.telefono,
                direccion: data.usuario.direccion || draft.direccion,
            };

            setPerfil(updatedPerfil);
            setDraft(updatedPerfil);

            try {
                const userRaw = localStorage.getItem("user");
                if (userRaw) {
                    const user = JSON.parse(userRaw) as UsuarioLocalStorage;
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            ...user,
                            id: updatedPerfil.id,
                            nombres: updatedPerfil.nombres,
                            apellidos: updatedPerfil.apellidos,
                            rol: updatedPerfil.rol,
                        })
                    );
                }
            } catch {
                // No bloquea el guardado si falla actualizar localStorage.
            }

            toast.success("Datos actualizados correctamente");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Error al actualizar los datos");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
                <div className="relative group">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCzxivJXCZk0Kk8HsHujTO3Olx0ngytPrWw&s" alt="Profile" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg" />
                </div>

                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-1">{loading ? "Cargando..." : `${draft.nombres} ${draft.apellidos}`.trim()}</h3>
                    <p className="text-neutral-600 mb-1">ID: {draft.id || "-"}</p>
                    <p className="text-neutral-600 capitalize">Rol: {draft.rol || "administrador"}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8">
                <div className="mb-6 pb-4 border-b border-neutral-300 flex items-center justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-neutral-800">Informacion Basica</h4>
                        <p className="text-sm text-neutral-600 mt-1">Actualiza tus datos de contacto y personales.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-sigau-gray flex items-center justify-center text-sigau-guindo">
                        <UserPen className="size-4" />
                    </div>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-neutral-600">Nombre(s)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                                    <User className="size-4" />
                                </div>
                                <input
                                    type="text"
                                    value={draft.nombres}
                                    onChange={(e) => handleChange("nombres", e.target.value)}
                                    disabled={loading || saving}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sigau-guindo/20 focus:border-sigau-guindo outline-none transition-all text-neutral-800 font-medium shadow-sm disabled:bg-neutral-100"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-neutral-600">Apellidos</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                                    <Users className="size-4" />
                                </div>
                                <input
                                    type="text"
                                    value={draft.apellidos}
                                    onChange={(e) => handleChange("apellidos", e.target.value)}
                                    disabled={loading || saving}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sigau-guindo/20 focus:border-sigau-guindo outline-none transition-all text-neutral-800 font-medium shadow-sm disabled:bg-neutral-100"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-600">Fecha de nacimiento</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                                    <Calendar className="size-4" />
                                </div>
                                <input
                                    type="date"
                                    value={draft.fNacimiento}
                                    onChange={(e) => handleChange("fNacimiento", e.target.value)}
                                    disabled={loading || saving}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sigau-guindo/20 focus:border-sigau-guindo outline-none transition-all text-neutral-800 font-medium shadow-sm disabled:bg-neutral-100"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-600">CURP</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                                    <IdCard className="size-4" />
                                </div>
                                <input
                                    type="text"
                                    value={draft.curp}
                                    onChange={(e) => handleChange("curp", e.target.value.toUpperCase())}
                                    disabled={loading || saving}
                                    maxLength={18}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sigau-guindo/20 focus:border-sigau-guindo outline-none transition-all text-neutral-800 font-medium shadow-sm disabled:bg-neutral-100 uppercase tracking-wider"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-neutral-300">
                        <h4 className="text-md font-bold text-neutral-800 mb-4">Datos de Contacto</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-neutral-600">Correo Institucional</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                                        <Mail className="size-4" />
                                    </div>
                                    <input
                                        type="email"
                                        value={draft.correo}
                                        onChange={(e) => handleChange("correo", e.target.value)}
                                        disabled={loading || saving}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sigau-guindo/20 focus:border-sigau-guindo outline-none transition-all text-neutral-800 font-medium shadow-sm disabled:bg-neutral-100"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-neutral-600">Telefono Movil</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                                        <Phone className="size-4" />
                                    </div>
                                    <input
                                        type="tel"
                                        value={draft.telefono}
                                        onChange={(e) => handleChange("telefono", e.target.value)}
                                        disabled={loading || saving}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sigau-guindo/20 focus:border-sigau-guindo outline-none transition-all text-neutral-800 font-medium shadow-sm disabled:bg-neutral-100"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="block text-sm font-semibold text-neutral-600">Direccion</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 flex items-center pointer-events-none text-neutral-600">
                                        <MapPin className="size-4" />
                                    </div>
                                    <textarea
                                        value={draft.direccion}
                                        onChange={(e) => handleChange("direccion", e.target.value)}
                                        disabled={loading || saving}
                                        rows={3}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sigau-guindo/20 focus:border-sigau-guindo outline-none transition-all text-neutral-800 font-medium shadow-sm disabled:bg-neutral-100 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 border-t border-neutral-300 mt-8">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading || saving || !hasChanges}
                            className="cursor-pointer w-full sm:w-auto px-6 py-3 bg-white text-neutral-600 border border-neutral-300 rounded-xl font-semibold hover:bg-sigau-gray hover:text-neutral-800 transition-colors focus:ring-2 focus:ring-gray-200 outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={loading || saving || !hasChanges}
                            className="cursor-pointer w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-md shadow-sigau-guindo/20 focus:ring-2 focus:ring-sigau-guindo/50 outline-none flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {saving ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DatosPage;