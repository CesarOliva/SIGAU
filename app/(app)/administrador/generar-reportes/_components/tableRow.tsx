'use client';

import { useEffect, useState } from 'react';

interface RendimientoMateria {
    id: number;
    nombre: string;
    profesor: string;
    cantidadAlumnos: number;
    promedioCalificacion: number;
    tasaAprobacion: number;
    avatarProfesor: string;
}

const TableRow = () => {
    const [materias, setMaterias] = useState<RendimientoMateria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/reportes/rendimiento-materias');
                if (!response.ok) throw new Error('Error fetching data');
                const data = await response.json();
                setMaterias(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-neutral-500">
                    Cargando datos...
                </td>
            </tr>
        );
    }

    if (error) {
        return (
            <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-red-500">
                    Error: {error}
                </td>
            </tr>
        );
    }

    return (
        <>
            {materias.map((materia) => (
                <tr key={materia.id} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="font-medium text-neutral-800">{materia.nombre}</div>
                        <div className="text-xs text-neutral-600">Id {materia.id}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 flex items-center gap-2">
                        <img src={materia.avatarProfesor} alt={materia.profesor} className="w-6 h-6 rounded-full object-cover"/>
                        {materia.profesor}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-neutral-700">{materia.cantidadAlumnos}</td>
                    <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-900">
                            {materia.promedioCalificacion}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                        <div className="flex items-center gap-2 justify-center">
                            <span className="text-neutral-600">{materia.tasaAprobacion}%</span>
                            <div className="w-16 bg-neutral-200 rounded-full h-1.5">
                                <div 
                                    className="bg-orange-300 h-1.5 rounded-full" 
                                    style={{ width: `${materia.tasaAprobacion}%` }}
                                ></div>
                            </div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}
 
export default TableRow;