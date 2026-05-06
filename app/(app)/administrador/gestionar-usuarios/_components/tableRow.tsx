const TableRow = () => {
    return (
        <>
            <tr className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4 text-sm font-semibold text-gray-600">Estudiante</td>
                <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">Fundamentos de telecomunicaciones</span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-center">
                        <div className="relative text-neutral-600 text-sm">
                            95
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Activo
                    </span>
                </td>
                <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 transition-opacity">
                        <button className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 flex items-center justify-center transition-colors tooltip-trigger" title="Editar">
                            <i data-fa-i2svg=""><svg className="svg-inline--fa fa-pen" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"></path></svg></i>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 flex items-center justify-center transition-colors tooltip-trigger" title="Eliminar">
                            <i data-fa-i2svg=""><svg className="svg-inline--fa fa-trash-can" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-can" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path></svg></i>
                        </button>
                    </div>
                </td>
            </tr>

            <tr className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4 text-sm font-semibold text-gray-600">Docente</td>
                <td className="px-6 py-4">
                    <input type="text" value='Carlos Macias Mendez' className="w-full text-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all read-only:bg-green-50 read-only:border-green-200 read-only:text-green-800"/>
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-center">
                        <div className="relative text-neutral-600">
                            <input type="number" min="0" max="9999999999" value="8120963333" className="w-full text-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all read-only:bg-green-50 read-only:border-green-200 read-only:text-green-800"/>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Activo
                    </span>
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