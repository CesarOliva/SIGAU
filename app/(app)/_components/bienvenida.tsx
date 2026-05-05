const Bienvenida = () => {
    return (
         <main className="p-6 flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl">
                <h2 className="text-lg font-semibold text-gray-700 mb-6">
                    ¿Qué quieres hacer hoy?
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <button className="bg-gray-100 hover:bg-blue-100 transition rounded-xl p-6 text-left shadow">
                        <h3 className="text-lg font-bold text-gray-800">Inicio</h3>
                    </button>
                    
                    <button className="bg-gray-100 hover:bg-blue-100 transition rounded-xl p-6 text-left shadow">
                    <h3 className="text-lg font-bold text-gray-800">Datos personales</h3>
                    </button>
                    
                    <button className="bg-gray-100 hover:bg-blue-100 transition rounded-xl p-6 text-left shadow">
                    <h3 className="text-lg font-bold text-gray-800">Gestionar Materias</h3>
                    </button>
                    
                    <button className="bg-gray-100 hover:bg-blue-100 transition rounded-xl p-6 text-left shadow">
                    <h3 className="text-lg font-bold text-gray-800">Asignar Materias</h3>
                    </button>

                    <button className="bg-gray-100 hover:bg-blue-100 transition rounded-xl p-6 text-left shadow">
                    <h3 className="text-lg font-bold text-gray-800">Generar Reportes</h3>
                    </button>
                </div>
            </div>
        </main>
    );
}
 
export default Bienvenida;