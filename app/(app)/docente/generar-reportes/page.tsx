import { Check, CircleCheck, CircleX, User } from "lucide-react";
import TableRow from "./_components/TableRow";

const ReportesPage = () => {
    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">            
            <div className="flex-1 overflow-y-auto p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-neutral-50 mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Reportes por materia</h2>
                        <p className="text-sm text-neutral-500 mt-1">Análisis de desempeño de alumnos</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <select className="bg-white border border-slate-200 text-sm font-medium text-neutral-800 rounded-lg pl-4 pr-10 py-2 focus:outline-none  shadow-sm cursor-pointer">
                                <option>Ingeniería de Software II</option>
                                <option>Bases de Datos Avanzadas</option>
                                <option>Estructuras de Datos</option>
                            </select>
                            <i className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-600 pointer-events-none" data-fa-i2svg=""><svg className="svg-inline--fa fa-chevron-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg></i>
                        </div>
                    </div>
                </div>

                <div className="max-w-300 mx-auto space-y-8">
                    <section id="kpi-metrics" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-neutral-600 mb-1">Alumnos Aprobados</p>
                                    <h3 className="text-4xl font-bold text-neutral-800 tracking-tight">42</h3>
                                    <div className="flex items-center gap-2 mt-3 text-sm">
                                        <span className="text-emerald-600">85% del total</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                                    <CircleCheck className="size-6"/>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-neutral-600 mb-1">Alumnos Reprobados</p>
                                    <h3 className="text-4xl font-bold text-neutral-800 tracking-tight">5</h3>
                                    <div className="flex items-center gap-2 mt-3 text-sm">
                                        <span className="text-red-500">5% del total</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shadow-sm">
                                    <CircleX className="size-6"/>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-neutral-600 mb-1">Alumnos Reprobados</p>
                                    <h3 className="text-4xl font-bold text-neutral-800 tracking-tight">5</h3>
                                    <div className="flex items-center gap-2 mt-3 text-sm">
                                        <span className="text-neutral-500">5% del total</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-600 shadow-sm">
                                    <User className="size-6"/>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="student-table" className="bg-neutral-50 rounded-2xl shadow-soft border border-neutral-300 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-white">
                            <div>
                                <h3 className="text-lg font-bold text-neutral-800">Lista de Alumnos</h3>
                                <p className="text-sm text-neutral-600 mt-1">Materia: Ingeniería de Software II</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="relative mb-4">
                                    <div className="relative flex-1">
                                        <i className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" data-fa-i2svg=""><svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
                                        <input type="text" placeholder="Buscar materia..." className="w-full pl-11 pr-4 py-3 bg-[#f4f5f6] border border-transparent focus:border-neutral-200 rounded-xl text-sm focus:outline-none transition-all"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Matricula</th>
                                    <th className="px-6 py-4">Nombre del alumno</th>
                                    <th className="px-6 py-4 text-center">Carrera</th>
                                    <th className="px-6 py-4 text-center">Generación</th>
                                    <th className="px-6 py-4 text-center">Calificación</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100" id="student-table-body">
                                <TableRow/>
                            </tbody>
                            </table>
                        </div>
                    </section>                    
                </div>
            </div>
        </main>
    );
}
 
export default ReportesPage;