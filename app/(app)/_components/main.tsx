import { BookOpen, GraduationCap, Lock, User } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faChalkboardUser, faUserShield } from '@fortawesome/free-solid-svg-icons'

const Main = () => {
    return (
        <main className="grow flex items-center justify-center p-4 md:p-8 w-full relative overflow-hidden">
            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-150">
                <div className="hidden lg:flex w-1/2 bg-gray-50 h-full flex-col justify-center p-12 relative border-r border-gray-100">
                    <div className="absolute inset-0 z-0">
                        <img className="w-full h-full object-cover opacity-10" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/26bb7eb5a3-884f4982f4973a8e9486.png" alt="abstract modern educational pattern geometric shapes subtle light gray background"/>
                    </div>
                    <div className="relative z-10 max-w-md h-100 flex flex-col justify-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-gray-100">
                            <BookOpen className="size-12 text-[#800020]"/>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Bienvenido al <br/>Portal Académico</h2>
                        <p className="text-lg text-gray-600">Accede a tus calificaciones, horarios, trámites y recursos educativos en un solo lugar.</p>
                    </div>
                </div>

                <div id="login-form-section" className="w-full lg:w-1/2 p-8 sm:p-12">
                    <div className="max-w-md mx-auto w-full">                        
                        <div className="lg:hidden text-center mb-8">
                            <div className="size-12 bg-[#800020] rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-sm">
                                <GraduationCap className="size-10"/>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
                            <p className="text-sm text-gray-500 mt-1">Ingresa tus datos para continuar</p>
                        </div>

                        <form action="#" method="POST" className="space-y-6">
                            <div id="role-selection" className="space-y-3">
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="flex flex-col items-center justify-center p-3 border border-[#2563EB] rounded-xl hover:border-brand-blue transition-all bg-[#EFF6FF] shadow-sm text-center h-full">
                                        <FontAwesomeIcon icon={faUserGraduate} className="text-blue-600 size-6 mb-2"/>
                                        <span className="text-xs font-semibold text-blue-600">Estudiante</span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center p-3 border border-[#2563EB] rounded-xl hover:border-brand-blue transition-all bg-[#EFF6FF] shadow-sm text-center h-full">
                                        <FontAwesomeIcon icon={faChalkboardUser} className="text-blue-600 size-6 mb-2"/>
                                        <span className="text-xs font-semibold text-blue-600">Docente</span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center p-3 border border-[#2563EB] rounded-xl hover:border-brand-blue transition-all bg-[#EFF6FF] shadow-sm text-center h-full">
                                        <FontAwesomeIcon icon={faUserShield} className="text-blue-600 size-6 mb-2"/>
                                        <span className="text-xs font-semibold text-blue-600">Administrador</span>
                                    </div>
                                    
                                </div>
                            </div>

                            <div id="user-input-group" className="space-y-1">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="size-4 text-gray-400"/>
                                    </div>
                                    <input type="text" id="username" name="username" placeholder="Matrícula / No. Empleado" className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl sm:text-sm bg-gray-50 transition-colors" required={true}/>
                                </div>
                            </div>

                            <div id="password-input-group" className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="size-4 text-gray-400"/>
                                    </div>
                                    <input type="password" id="password" name="password" placeholder="••••••••" className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl sm:text-sm bg-gray-50 transition-colors" required={true}/>
                                </div>
                            </div>

                            <p className="ml-2 block text-sm font-medium text-red-500">Usuario o contraseña incorrecta</p>

                            <button type="button" className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 cursor-pointer">
                                Iniciar sesión
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-500">¿Problemas para acceder? Contacta a soporte técnico</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default Main;