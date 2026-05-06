'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GradesChart = () => {
    const data = [
        { month: 'Ene 22', calificacion: 6.8 },
        { month: 'Abr 22', calificacion: 7.2 },
        { month: 'Jul 22', calificacion: 7.5 },
        { month: 'Oct 22', calificacion: 7.9 },
        { month: 'Ene 23', calificacion: 8.1 },
    ];

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

const StudentsChart = () => {
    const data = [
        { semester: '1er', alumnos: 520 },
        { semester: '2do', alumnos: 475 },
        { semester: '3er', alumnos: 380 },
        { semester: '4to', alumnos: 360 },
        { semester: '5to', alumnos: 310 },
        { semester: '6to', alumnos: 250 },
    ];

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

const ReportesPage = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-medium text-neutral-600 mb-1">Total Alumnos</p>
                                <h3 className="text-2xl font-bold text-neutral-800">2,450</h3>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-inner">
                                <i data-fa-i2svg=""><svg className="svg-inline--fa fa-user-graduate" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-graduate" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128s-128-57.3-128-128V102.9L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z"></path></svg></i>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-medium text-neutral-600 mb-1">Promedio General</p>
                                <h3 className="text-2xl font-bold text-neutral-800">8.4<span className="text-lg text-neutral-400 font-normal">/10</span></h3>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-inner">
                                <i data-fa-i2svg=""><svg className="svg-inline--fa fa-star" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path></svg></i>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-medium text-neutral-600 mb-1">Tasa de Aprobación</p>
                                <h3 className="text-2xl font-bold text-neutral-800">87%</h3>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                                <i data-fa-i2svg=""><svg className="svg-inline--fa fa-circle-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg></i>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-50 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-medium text-neutral-600 mb-1">Materias Activas</p>
                                <h3 className="text-2xl font-bold text-neutral-800">142</h3>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-inner">
                                <i data-fa-i2svg=""><svg className="svg-inline--fa fa-layer-group" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="layer-group" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"></path></svg></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-neutral-800">Calificaciones Promedio</h3>
                                <p className="text-sm text-neutral-600">Evolución por semestre</p>
                            </div>
                            <button className="text-neutral-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-neutral-50">
                                <i data-fa-i2svg=""><svg className="svg-inline--fa fa-ellipsis-vertical" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-vertical" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" data-fa-i2svg=""><path fill="currentColor" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"></path></svg></i>
                            </button>
                        </div>
                        <div id="chart-grades" className="flex-1 w-full min-h-75 js-plotly-plot" style={{ flex: 1, width: '100%', minHeight: '300px' }}>
                            <GradesChart />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-neutral-800">Alumnos por Semestre</h3>
                                <p className="text-sm text-neutral-600">Distribución actual</p>
                            </div>
                        </div>
                        <div id="chart-students" className="flex-1 w-full min-h-75 js-plotly-plot" style={{ flex: 1, width: '100%', minHeight: '300px' }}>
                            <StudentsChart />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
                    <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-neutral-800">Rendimiento por Materia</h3>
                            <p className="text-sm text-neutral-600">Detalle de calificaciones y aprobados</p>
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <i className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" data-fa-i2svg=""><svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
                            <input type="text" placeholder="Buscar materia..." className="w-full sm:w-64 pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"/>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Materia</th>
                                    <th className="px-6 py-4 font-semibold">Profesor</th>
                                    <th className="px-6 py-4 font-semibold text-center">Alumnos</th>
                                    <th className="px-6 py-4 font-semibold text-center">Promedio</th>
                                    <th className="px-6 py-4 font-semibold text-center">Aprobación</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-neutral-100">
                                <tr className="hover:bg-neutral-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-neutral-800">Matemáticas Avanzadas</div>
                                        <div className="text-xs text-neutral-600">Id 303</div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-600 flex items-center gap-2">
                                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Prof" className="w-6 h-6 rounded-full"/>
                                        Dr. Roberto Silva
                                    </td>
                                    <td className="px-6 py-4 text-center font-medium text-neutral-700">45</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-900">
                                            7.8
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center gap-2 justify-center">
                                            <span className="text-neutral-600">75%</span>
                                            <div className="w-16 bg-neutral-200 rounded-full h-1.5">
                                                <div className="bg-orange-300 h-1.5 rounded-full w-[75%]"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-neutral-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-neutral-800">Física Cuántica</div>
                                        <div className="text-xs text-neutral-600">Id 402</div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-600 flex items-center gap-2">
                                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Prof" className="w-6 h-6 rounded-full"/>
                                        Dra. Elena Ramos
                                    </td>
                                    <td className="px-6 py-4 text-center font-medium text-neutral-700">32</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-900">
                                            8.9
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center gap-2 justify-center">
                                            <span className="text-neutral-600">92%</span>
                                            <div className="w-16 bg-neutral-200 rounded-full h-1.5">
                                                <div className="bg-orange-300 h-1.5 rounded-full w-[92%]"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-neutral-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-neutral-800">Historia Universal</div>
                                        <div className="text-xs text-neutral-600">Id 101</div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-600 flex items-center gap-2">
                                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="Prof" className="w-6 h-6 rounded-full"/>
                                        Lic. Carlos Mendoza
                                    </td>
                                    <td className="px-6 py-4 text-center font-medium text-neutral-700">60</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                                            6.5
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center gap-2 justify-center">
                                            <span className="text-neutral-600">60%</span>
                                            <div className="w-16 bg-neutral-200 rounded-full h-1.5">
                                                <div className="bg-orange-300 h-1.5 rounded-full w-[60%]"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ReportesPage;