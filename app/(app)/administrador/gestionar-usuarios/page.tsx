import { Plus } from "lucide-react";
import TableRow from "./_components/tableRow";

const UsuariosPage = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-neutral-50">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Listado de Usuarios</h2>
                        <p className="text-sm text-neutral-500 mt-1">Administra los usuarios activos e inactivos</p>
                    </div>
                    <button className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#e96d14] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md">
                        <Plus className="w-4 h-4"/>
                        <span>Crear Usuario</span>
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-150">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Rol</th>
                                    <th className="px-6 py-4">Nombre del usuario</th>
                                    <th className="px-6 py-4 text-center">Telefono</th>
                                    <th className="px-6 py-4 text-center">Estado</th>
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
 
export default UsuariosPage;