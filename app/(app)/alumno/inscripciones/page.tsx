import { Plus } from "lucide-react";

const InscripcionesPage = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-neutral-50">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Inscripciones</h2>
                        <p className="text-sm text-neutral-500 mt-1">Materias seleccionadas a cursar este periodo.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-150">
                            <thead>
                                <tr className="bg-neutral-50/80 border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                    <th className="px-6 py-4">Id</th>
                                    <th className="px-6 py-4">Nombre de la Materia</th>
                                    <th className="px-6 py-4">Docente</th>
                                    <th className="px-6 py-4 text-center">Créditos</th>
                                    <th className="px-6 py-4 text-center">Horario</th>
                                    <th className="px-6 py-4 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100" id="student-table-body">
                                <tr>
                                    <td className="px-6 py-4 font-semibold">1</td>
                                    <td className="px-6 py-4 font-semibold">Matemáticas Discretas</td>
                                    <td className="px-6 py-4 text-neutral-600">Dr. García</td>
                                    <td className="px-6 py-4 text-neutral-600">4</td>
                                    <td className="px-6 py-4 text-center text-neutral-600">Lunes - Jueves 10:00-11:30</td>
                                    <td className="px-6 py-4 text-center text-neutral-600">
                                        <button className="bg-orange-200 hover:bg-orange-300 text-neutral-800 py-2 px-4 rounded-md transition-colors cursor-pointer">
                                            Inscribirse
                                        </button>
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
 
export default InscripcionesPage;