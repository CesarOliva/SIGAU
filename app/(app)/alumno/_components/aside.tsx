"use client";

import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Book, Clock, GraduationCap, Grid2X2, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
    };

    return (
        <aside id="sidebar" className={`${pathname === "/alumno" ? "hidden" : "w-70"} bg-white border-r border-neutral-200 flex flex-col min-h-screen shrink-0 transition-all duration-300`}>
            <div className="h-20 flex items-center px-8 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-[#800020] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
                        <GraduationCap className="size-8"/>
                    </div>
                    <span className="text-xl font-bold text-neutral-900 tracking-tight">SIGAU</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2">
                <p className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Menu</p>
                
                <Link href="/alumno/carga-academica" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/alumno/carga-academica' ? 'bg-orange-50 text-neutral-900' : 'text-neutral-600'} hover:bg-orange-50 hover:text-neutral-900 font-medium transition-colors`}>
                    <Grid2X2 className="w-5"/>
                    <span>Carga académica</span>
                </Link>
                            
                <Link href="/alumno/datos-personales" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/alumno/datos-personales' ? 'bg-orange-50 text-neutral-900' : 'text-neutral-600'} hover:bg-orange-50 hover:text-neutral-900 font-medium transition-colors`}>
                    <User className="w-5"/>
                    <span>Datos Personales</span>
                </Link>
                <Link href="/alumno/horario" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/alumno/horario' ? 'bg-orange-50 text-neutral-900' : 'text-neutral-600'} hover:bg-orange-50 hover:text-neutral-900 font-medium transition-colors`}>
                    <Clock className="w-5"/>
                    <span>Horario</span>
                </Link>
                <Link href="/alumno/inscripciones" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/alumno/inscripciones' ? 'bg-orange-50 text-neutral-900' : 'text-neutral-600'} hover:bg-orange-50 hover:text-neutral-900 font-medium transition-colors`}>
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="size-5 mb-2"/>
                    <span>Inscripciones</span>
                </Link>
                <Link href="/alumno/kardex" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/alumno/kardex' ? 'bg-orange-50 text-neutral-900' : 'text-neutral-600'} hover:bg-orange-50 hover:text-neutral-900 font-medium transition-colors`}>
                    <Book className="w-5"/>
                    <span>Kardex</span>
                </Link>
            </div>

            <div className="p-4 border-t border-neutral-100 flex flex-col gap-1">
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors">
                    <i className="w-5 text-center" data-fa-i2svg=""><svg className="svg-inline--fa fa-arrow-right-from-bracket" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right-from-bracket" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"></path></svg></i>
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}
 
export default Sidebar;