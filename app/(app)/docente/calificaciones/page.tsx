import { Plus } from "lucide-react";
import TableRow from "./_components/tableRow";

const CalificacionesPage = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-neutral-100 bg-neutral-50/50 flex flex-col">
                        <h3 className="font-semibold text-neutral-800">Programacion web</h3>
                        <p className="text-sm text-neutral-500">Ago-Dic 2025</p>
                    </div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-150">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Matricula</th>
                                    <th className="px-6 py-4">Nombre del alumno</th>
                                    <th className="px-6 py-4 text-center">calificacion</th>
                                    <th className="px-6 py-4 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100" id="student-table-body">
                                <TableRow/>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CalificacionesPage;