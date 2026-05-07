import Link from "next/link";

const Bienvenida = () => {
    return (
         <main className="p-6 flex justify-center items-center h-[80vh]">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl">
                <h2 className="text-3xl text-center font-semibold text-neutral-800 mb-8">
                    ¿Qué quieres hacer hoy?
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Link href='/administrador/gestionar-usuarios' className="bg-neutral-100 hover:bg-orange-50 transition rounded-xl p-6 text-left shadow cursor-pointer">
                        <h3 className="text-lg font-bold text-neutral-800">Gestionar usuarios</h3>
                    </Link>
                    
                    <Link href='/administrador/datos-personales' className="bg-neutral-100 hover:bg-orange-50 transition rounded-xl p-6 text-left shadow cursor-pointer">
                        <h3 className="text-lg font-bold text-neutral-800">Datos personales</h3>
                    </Link>
                    
                    <Link href='/administrador/gestionar-materias' className="bg-neutral-100 hover:bg-orange-50 transition rounded-xl p-6 text-left shadow cursor-pointer">
                        <h3 className="text-lg font-bold text-neutral-800">Gestionar Materias</h3>
                    </Link>
                    
                    <Link href='/administrador/asignar-materias' className="bg-neutral-100 hover:bg-orange-50 transition rounded-xl p-6 text-left shadow cursor-pointer">
                        <h3 className="text-lg font-bold text-neutral-800">Asignar Materias</h3>
                    </Link>

                    <Link href='/administrador/generar-reportes' className="bg-neutral-100 hover:bg-orange-50 transition rounded-xl p-6 text-left shadow cursor-pointer">
                        <h3 className="text-lg font-bold text-neutral-800">Generar Reportes</h3>
                    </Link>

                    <Link href='/' className="bg-neutral-100 hover:bg-red-100 transition rounded-xl p-6 text-left shadow cursor-pointer">
                        <h3 className="text-lg font-bold text-neutral-800">Cerrar Sesión</h3>
                    </Link>
                </div>
            </div>
        </main>
    );
}
 
export default Bienvenida;