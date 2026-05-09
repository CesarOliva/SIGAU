import { Calendar, Camera, CircleCheck, GraduationCap, IdCard, Info, Lock, Mail, Phone, User, UserPen, Users } from "lucide-react";

const DatosPage = () => {
    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
                <div className="relative group">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Profile" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg"/>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-1">Alejandro Martínez López</h3>
                    <p className="text-neutral-600 mb-4">Ingeniería en Sistemas Computacionales<br/>5to Semestre</p>                    
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8">
                <div className="mb-6 pb-4 border-b border-neutral-300 flex items-center justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-neutral-800">Información Básica</h4>
                        <p className="text-sm text-neutral-600 mt-1">Actualiza tus datos de contacto y personales.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-sigau-gray flex items-center justify-center text-sigau-guindo">
                        <UserPen className="size-4"/>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-neutral-600">Nombre(s)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                                    <User className="size-4"/>
                                </div>
                                <input type="text" value="Alejandro" className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sigau-guindo/20 focus:border-sigau-guindo outline-none transition-all text-neutral-800 font-medium shadow-sm"/>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-neutral-600">Apellidos</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                                    <Users className="size-4"/>
                                </div>
                                <input type="text" value="Martínez López" className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sigau-guindo/20 focus:border-sigau-guindo outline-none transition-all text-neutral-800 font-medium shadow-sm"/>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-neutral-600 flex items-center gap-2">
                                Fecha de nacimiento
                                <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">No editable</span>
                            </label>
                            <div className="relative opacity-70">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Calendar className="size-4"/>
                                </div>
                                <input type="text" value="15 / 08 / 2002" className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed"/>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock className="size-4"/>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-neutral-600 flex items-center gap-2">
                                CURP
                                <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">No editable</span>
                            </label>
                            <div className="relative opacity-70">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <IdCard className="size-4"/>
                                </div>
                                <input type="text" value="MALA020815HDFRRN09" className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed uppercase tracking-wider"/>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock className="size-4"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-neutral-300">
                        <h4 className="text-md font-bold text-neutral-800 mb-4">Datos de Contacto</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-neutral-600">Correo Institucional</label>
                                <div className="relative opacity-70">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Mail className="size-4"/>
                                    </div>
                                    <input type="email" value="a.martinez@sigau.edu.mx" className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed"/>
                                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                        <Lock className="size-4"/>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-neutral-600">Teléfono Móvil</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                                        <Phone className="size-4"/>
                                    </div>
                                    <input type="tel" value="55 1234 5678" className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sigau-guindo/20 focus:border-sigau-guindo outline-none transition-all text-neutral-800 font-medium shadow-sm"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 border-t border-neutral-300 mt-8">
                        <button type="button" className="w-full sm:w-auto px-6 py-3 bg-white text-neutral-600 border border-neutral-300 rounded-xl font-semibold hover:bg-sigau-gray hover:text-neutral-800 transition-colors focus:ring-2 focus:ring-gray-200 outline-none">
                            Cancelar
                        </button>
                        <button type="button" className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-md shadow-sigau-guindo/20 focus:ring-2 focus:ring-sigau-guindo/50 outline-none flex items-center justify-center gap-2">
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default DatosPage;