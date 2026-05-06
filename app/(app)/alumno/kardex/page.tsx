const KardexPage = () => {
    return (
        <section id="record-table" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Course History</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Sort by:</span>
                    <select className="bg-transparent border-none text-gray-700 font-medium focus:ring-0 cursor-pointer">
                        <option>Semester (Newest)</option>
                        <option>Semester (Oldest)</option>
                        <option>Grade (Highest)</option>
                    </select>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100">
                            <th className="p-4 pl-6 w-32">Semester</th>
                            <th className="p-4">Subject Name</th>
                            <th className="p-4 w-24 text-center">Credits</th>
                            <th className="p-4 w-32 text-center">Grade</th>
                            <th className="p-4 pr-6 w-32 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        <tr className="bg-gray-50/30">
                            <td colSpan={5} className="p-3 pl-6 text-xs font-semibold text-gray-500 bg-gray-50">Fall 2023 (Current)</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 pl-6 text-gray-500">Fall 2023</td>
                            <td className="p-4 font-medium text-gray-800">
                                CS301: Advanced Algorithms
                                <p className="text-xs text-gray-400 font-normal mt-0.5">Prof. Sarah Jenkins</p>
                            </td>
                            <td className="p-4 text-center text-gray-600">4</td>
                            <td className="p-4 text-center font-semibold text-gray-900">-</td>
                            <td className="p-4 pr-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> In Progress
                                </span>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 pl-6 text-gray-500">Fall 2023</td>
                            <td className="p-4 font-medium text-gray-800">
                                CS305: Database Systems
                                <p className="text-xs text-gray-400 font-normal mt-0.5">Prof. Michael Chen</p>
                            </td>
                            <td className="p-4 text-center text-gray-600">3</td>
                            <td className="p-4 text-center font-semibold text-gray-900">-</td>
                            <td className="p-4 pr-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> In Progress
                                </span>
                            </td>
                        </tr>

                        <tr className="bg-gray-50/30">
                            <td colSpan={5} className="p-3 pl-6 text-xs font-semibold text-gray-500 bg-gray-50">Spring 2023</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 pl-6 text-gray-500">Spring 2023</td>
                            <td className="p-4 font-medium text-gray-800">
                                CS250: Data Structures
                            </td>
                            <td className="p-4 text-center text-gray-600">4</td>
                            <td className="p-4 text-center font-semibold text-gray-900">9.2</td>
                            <td className="p-4 pr-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                                    <i className="text-[10px]" data-fa-i2svg=""><svg className="svg-inline--fa fa-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg></i> Approved
                                </span>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 pl-6 text-gray-500">Spring 2023</td>
                            <td className="p-4 font-medium text-gray-800">
                                MATH201: Linear Algebra
                            </td>
                            <td className="p-4 text-center text-gray-600">3</td>
                            <td className="p-4 text-center font-semibold text-gray-900">8.5</td>
                            <td className="p-4 pr-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                                    <i className="text-[10px]" data-fa-i2svg=""><svg className="svg-inline--fa fa-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg></i> Approved
                                </span>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 pl-6 text-gray-500">Spring 2023</td>
                            <td className="p-4 font-medium text-gray-800">
                                ENG102: Technical Writing
                            </td>
                            <td className="p-4 text-center text-gray-600">3</td>
                            <td className="p-4 text-center font-semibold text-gray-900">5.8</td>
                            <td className="p-4 pr-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                                    <i className="text-[10px]" data-fa-i2svg=""><svg className="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></i> Failed
                                </span>
                            </td>
                        </tr>

                        <tr className="bg-gray-50/30">
                            <td colSpan={5} className="p-3 pl-6 text-xs font-semibold text-gray-500 bg-gray-50">Fall 2022</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 pl-6 text-gray-500">Fall 2022</td>
                            <td className="p-4 font-medium text-gray-800">
                                CS101: Intro to Programming
                            </td>
                            <td className="p-4 text-center text-gray-600">4</td>
                            <td className="p-4 text-center font-semibold text-gray-900">9.8</td>
                            <td className="p-4 pr-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                                    <i className="text-[10px]" data-fa-i2svg=""><svg className="svg-inline--fa fa-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg></i> Approved
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>            
        </section>
    );
}
 
export default KardexPage;