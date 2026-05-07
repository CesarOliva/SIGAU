import { Pencil, Trash } from "lucide-react";

const TableRow = () => {
    return (
        <>
            <tr className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4 text-sm font-semibold text-gray-600">202</td>
                <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">Carlos Trevino</span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-center">
                        <div className="relative text-neutral-600 text-sm">
                            95
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 transition-opacity">
                        <Pencil className="w-5 text-neutral-500"/>
                        <span className="text-sm font-medium text-neutral-500">Editar</span>
                    </div>
                </td>
            </tr>

            <tr className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4 text-sm font-semibold text-gray-600">202</td>
                <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">Jorge Mendoza</span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-center">
                        <div className="relative text-neutral-600">
                            <input type="number" min="0" max="100" value="95" className="w-full text-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all read-only:bg-green-50 read-only:border-green-200 read-only:text-green-800"/>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 transition-opacity">
                        <button className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#e96d14] text-white px-4 py-2 rounded-xl font-medium transition-all shadow-md">
                            Aceptar
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}
 
export default TableRow;