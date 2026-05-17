'use client';

import { useCallback, useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Docente {
    id: number;
    nombres: string;
    apellidos: string;
    especialidad: string;
    avatar?: string | null;
}

interface Materia {
    id: number;
    nombre: string;
    semestre: number;
    creditos: number;
    descripcion: string;
}

interface MateriaDoctente {
    id: number;
    materia_id: number;
    nombre: string;
    semestre: number;
    creditos: number;
    descripcion: string;
}

const AsignarPage = () => {
    const [docentes, setDocentes] = useState<Docente[]>([]);
    const [selectedDocente, setSelectedDocente] = useState<Docente | null>(null);
    const [materiasAsignadas, setMateriasAsignadas] = useState<MateriaDoctente[]>([]);
    const [materiasDisponibles, setMateriasDisponibles] = useState<Materia[]>([]);
    const [loading, setLoading] = useState(true);
    const [assigningId, setAssigningId] = useState<number | null>(null);
    const [removingId, setRemovingId] = useState<number | null>(null);
    const [searchDocente, setSearchDocente] = useState('');
    const [searchMateria, setSearchMateria] = useState('');

    // Cargar docentes
    const loadDocentes = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/usuarios?rol=docente');
            if (!response.ok) throw new Error('Error al cargar docentes');
            const data = await response.json();
            setDocentes(data);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Error al cargar docentes');
        } finally {
            setLoading(false);
        }
    }, []);

    // Cargar materias asignadas al docente seleccionado
    const loadMateriasAsignadas = useCallback(async (docenteId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/api/asignaciones/docente/${docenteId}`);
            if (!response.ok) throw new Error('Error al cargar materias asignadas');
            const data = await response.json();
            setMateriasAsignadas(data);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Error al cargar materias asignadas');
            setMateriasAsignadas([]);
        }
    }, []);

    // Cargar materias disponibles para el docente seleccionado
    const loadMateriasDisponibles = useCallback(async (docenteId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/api/asignaciones/disponibles/${docenteId}`);
            if (!response.ok) throw new Error('Error al cargar materias disponibles');
            const data = await response.json();
            setMateriasDisponibles(data);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Error al cargar materias disponibles');
            setMateriasDisponibles([]);
        }
    }, []);

    useEffect(() => {
        loadDocentes();
    }, [loadDocentes]);

    // Cuando se selecciona un docente, cargar sus materias
    const handleSelectDocente = (docente: Docente) => {
        setSelectedDocente(docente);
        loadMateriasAsignadas(docente.id);
        loadMateriasDisponibles(docente.id);
    };

    // Asignar materia a docente
    const handleAsignMateria = async (materiaId: number) => {
        if (!selectedDocente) return;

        setAssigningId(materiaId);
        try {
            const response = await fetch('http://localhost:3001/api/asignaciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    docenteId: selectedDocente.id,
                    materiaId
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error al asignar materia');
            }

            toast.success('Materia asignada exitosamente');
            loadMateriasAsignadas(selectedDocente.id);
            loadMateriasDisponibles(selectedDocente.id);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Error al asignar materia');
        } finally {
            setAssigningId(null);
        }
    };

    // Desasignar materia de docente
    const handleDesasignarMateria = async (asignacionId: number) => {
        if (!selectedDocente) return;

        setRemovingId(asignacionId);
        try {
            const response = await fetch(`http://localhost:3001/api/asignaciones/${asignacionId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error al desasignar materia');
            }

            toast.success('Materia desasignada exitosamente');
            loadMateriasAsignadas(selectedDocente.id);
            loadMateriasDisponibles(selectedDocente.id);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Error al desasignar materia');
        } finally {
            setRemovingId(null);
        }
    };

    // Filtrar docentes por búsqueda
    const docentesFiltrados = docentes.filter((docente) =>
        `${docente.nombres} ${docente.apellidos}`.toLowerCase().includes(searchDocente.toLowerCase())
    );

    // Filtrar materias disponibles por búsqueda
    const materiasFiltradas = materiasDisponibles.filter((materia) =>
        materia.nombre.toLowerCase().includes(searchMateria.toLowerCase())
    );

    return (
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                <section id="docente-selection" className="bg-white rounded-2xl p-6 shadow-card border border-neutral-50">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-neutral-800">Asignar materias</h2>
                            <p className="text-sm text-neutral-600 mt-1">Busque y seleccione un docente para gestionar sus materias.</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <i className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" data-fa-i2svg=""><svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
                            <input 
                                type="text" 
                                placeholder="Nombre del docente..." 
                                value={searchDocente}
                                onChange={(e) => setSearchDocente(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-[#f4f5f6] border border-transparent focus:border-neutral-200 rounded-xl text-sm focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="w-full flex-col mt-6 max-h-40 overflow-auto">
                        {selectedDocente ? (
                            <div key={selectedDocente.id} className="mt-2 border border-neutral-100 rounded-xl flex items-center justify-between flex-wrap gap-4 cursor-pointer">
                                <button className="cursor-pointer w-full p-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors text-left flex items-center gap-3">
                                    <img src={selectedDocente.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCzxivJXCZk0Kk8HsHujTO3Olx0ngytPrWw&s"} alt={selectedDocente.nombres} className="w-8 h-8 rounded-full object-cover"/>
                                    <span className="text-sm font-medium text-neutral-800">{selectedDocente.nombres} {selectedDocente.apellidos}</span>
                                </button>
                            </div>
                        ): (
                            docentesFiltrados.map((docente) => (
                                <div key={docente.id} className="mt-2 border border-neutral-100 rounded-xl flex items-center justify-between flex-wrap gap-4 cursor-pointer">
                                    <button className="cursor-pointer w-full p-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors text-left flex items-center gap-3" onClick={() => handleSelectDocente(docente)}>
                                        <img src={docente.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCzxivJXCZk0Kk8HsHujTO3Olx0ngytPrWw&s"} alt={docente.nombres} className="w-8 h-8 rounded-full object-cover"/>
                                        <span className="text-sm font-medium text-neutral-800">{docente.nombres} {docente.apellidos}</span>
                                    </button>
                                </div>
                            ))
                        )}

                    </div>

                    {searchDocente && docentesFiltrados.length > 0 && (
                        <div className="mt-4 border border-neutral-100 rounded-xl max-h-48 overflow-y-auto">
                            {docentesFiltrados.map((doc) => (
                                <button
                                    key={doc.id}
                                    onClick={() => {
                                        setSelectedDocente(doc);
                                        setSearchDocente('');
                                    }}
                                    className="cursor-pointer w-full p-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors text-left flex items-center gap-3"
                                >
                                    <img src={doc.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCzxivJXCZk0Kk8HsHujTO3Olx0ngytPrWw&s"} alt={doc.nombres} className="w-8 h-8 rounded-full object-cover"/>
                                    <span className="text-sm font-medium text-neutral-800">{doc.nombres} {doc.apellidos}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">                    
                    <section id="materias-disponibles" className="bg-white rounded-2xl p-6 shadow-card border border-neutral-50 flex flex-col max-h-150 overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-800">Materias Disponibles</h2>
                                <p className="text-sm text-neutral-600 mt-1">Seleccione para asignar al docente</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            {loading ? (
                                <p className="text-center text-neutral-500">Cargando materias...</p>
                            ) : materiasFiltradas.length > 0 ? (
                                materiasFiltradas.map((materia) => (
                                    <div key={materia.id} className="p-4 border border-neutral-100 rounded-xl hover:border-neutral-300 transition-colors group bg-white">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-sm text-neutral-800">{materia.nombre}</h4>
                                            <button className="px-6 py-2.5 bg-[#1a1d1f] text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer" onClick={() => handleAsignMateria(materia.id)}>
                                                Asignar
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-neutral-600">
                                            <p>Id {materia.id}</p>
                                            <span className="flex items-center gap-1"><i data-fa-i2svg=""><svg className="svg-inline--fa fa-layer-group" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="layer-group" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"></path></svg></i> Semestre {materia.semestre}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-neutral-500">No hay materias disponibles</p>
                            )}
                        </div>
                    </section>

                    <section id="materias-asignadas" className="bg-white rounded-2xl p-6 shadow-card border border-neutral-50 flex flex-col max-h-150 overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-800">Materias Asignadas</h2>
                                <p className="text-sm text-neutral-600 mt-1">Carga actual del docente</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            {materiasAsignadas.length === 0 ? (
                                <div className="p-6 text-center text-neutral-500 text-sm">No hay materias asignadas</div>
                            ) : (
                                <div className="divide-y divide-neutral-100">
                                    {materiasAsignadas.map((materia) => (
                                        <div key={materia.id} className="p-4 hover:bg-orange-50 transition-colors flex justify-between items-start rounded-lg">
                                            <div className="flex-1">
                                                <div className="font-medium text-sm text-neutral-900">{materia.nombre}</div>
                                                <div className="text-xs text-neutral-600 mt-1">
                                                    Semestre {materia.semestre} • {materia.creditos} créditos
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDesasignarMateria(materia.id)}
                                                disabled={removingId === materia.id}
                                                className="cursor-pointer ml-2 p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-end">
                            <button className="px-6 py-2.5 bg-[#1a1d1f] text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
                                Guardar Cambios
                            </button>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
 
export default AsignarPage;