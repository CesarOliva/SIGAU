const KardexPage = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <section id="record-table" className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
                    <div className="p-5 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
                        <h3 className="font-semibold text-neutral-800">Kardex</h3>
                        
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500 font-semibold border-b border-neutral-100">
                                    <th className="p-4 pl-6 w-32">Semestre</th>
                                    <th className="p-4">Asignatura</th>
                                    <th className="p-4 w-24 text-center">Creditos</th>
                                    <th className="p-4 w-32 text-center">Calificación</th>
                                    <th className="p-4 pr-6 w-32 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 text-sm">
                                <tr className="bg-neutral-50/30">
                                    <td colSpan={5} className="p-3 pl-6 text-xs font-semibold text-neutral-500 bg-neutral-50">AGO-DIC 2023</td>
                                </tr>
                                <tr className="hover:bg-neutral-50 transition-colors">
                                    <td className="p-4 pl-6 text-neutral-500">AGO-DIC 2023</td>
                                    <td className="p-4 font-semibold text-neutral-800">
                                        Id: 108 - Matemáticas Discretas
                                    </td>
                                    <td className="p-4 text-center text-neutral-600">4</td>
                                    <td className="p-4 text-center font-semibold text-neutral-900">90</td>
                                    <td className="p-4 pr-6 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Aprobada
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>            
                </section>
            </div>
        </div>
    );
}
 
export default KardexPage;