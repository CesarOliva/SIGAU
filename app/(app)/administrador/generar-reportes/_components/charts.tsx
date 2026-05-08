'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

export const StudentsChart = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/estadisticas/alumnos-por-semestre');
                if (!response.ok) throw new Error('Error fetching data');
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error('Error:', err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-full text-neutral-500">Cargando gráfico...</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
                <XAxis dataKey="semester" stroke="rgb(100, 116, 139)" />
                <YAxis stroke="rgb(100, 116, 139)" />
                <Tooltip 
                    contentStyle={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px solid rgb(226, 232, 240)' }}
                    cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
                />
                <Bar 
                    dataKey="alumnos" 
                    fill="rgb(59, 130, 246)" 
                    isAnimationActive={true}
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export const GradesChart = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/estadisticas/evolucion-calificaciones');
                if (!response.ok) throw new Error('Error fetching data');
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error('Error:', err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-full text-neutral-500">Cargando gráfico...</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
                <XAxis dataKey="month" stroke="rgb(100, 116, 139)" />
                <YAxis domain={[6, 10]} stroke="rgb(100, 116, 139)" />
                <Tooltip 
                    contentStyle={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px solid rgb(226, 232, 240)' }}
                    cursor={{ stroke: 'rgb(79, 70, 229)', strokeWidth: 2 }}
                />
                <Line 
                    type="monotone" 
                    dataKey="calificacion" 
                    stroke="rgb(79, 70, 229)" 
                    dot={{ fill: 'rgb(79, 70, 229)', r: 4 }}
                    strokeWidth={3}
                    isAnimationActive={true}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};