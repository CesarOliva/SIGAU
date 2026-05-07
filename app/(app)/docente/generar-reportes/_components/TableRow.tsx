const TableRow = () => {
    return (
        <tr className="transition-colors bg-white">
            <td className="py-4 px-6 text-sm font-medium text-neutral-800">A01234567</td>
            <td className="py-4 px-6">
                <span className="text-sm font-medium text-neutral-800">Ana Rodríguez López</span>
            </td>
            <td className="py-4 px-6 text-sm text-neutral-600">Ing. Sistemas</td>
            <td className="py-4 px-6 text-sm text-neutral-600">2023</td>
            <td className="py-4 px-6 text-right">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    95
                </span>
            </td>
        </tr>
    );
}
 
export default TableRow;