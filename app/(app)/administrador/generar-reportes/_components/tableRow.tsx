const TableRow = () => {
    return (
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
    );
}
 
export default TableRow;