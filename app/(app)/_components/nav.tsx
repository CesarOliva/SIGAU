import { GraduationCap } from "lucide-react";

const Nav = () => {
    return (
        <header id="header" className="w-full bg-white border-b border-gray-200 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="size-10 bg-[#800020] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
                    <GraduationCap className="size-8"/>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark tracking-tight">SIGAU</h1>
                    <p className="text-sm text-neutral-500 hidden sm:block font-medium">Sistema Integral de Gestión Académica Universitaria</p>
                </div>
            </div>
        </header>
    );
}
 
export default Nav;