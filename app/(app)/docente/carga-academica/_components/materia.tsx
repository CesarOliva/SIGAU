import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const Materia = () => {
    return (
        <div className='bg-white rounded-2xl p-5 shadow-card border border-neutral-100 hover:shadow-soft transition-shadow group relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-[100px] -mr-8 -mt-8 z-0'></div>
            
            <div className='relative z-10'>
                <div className='flex justify-between items-start mb-4'>
                    <div className='w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 text-xl'>
                        <BookOpen className="size-8 text-[#800020]"/>
                    </div>
                    <div className='bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold border border-yellow-100'>
                        Grupo 202
                    </div>
                </div>
                
                <h3 className='text-lg font-bold text-neutral-900 mb-1'>Programación web</h3>
                <div className='flex items-center gap-2 text-sm text-neutral-500 mb-4'>
                    <span className='bg-neutral-100 px-2 py-0.5 rounded text-xs font-medium'>07:00-08:00</span>
                </div>

                <div className='flex items-center justify-between mt-6 pt-4 border-t border-neutral-100'>
                    <div className='flex items-center gap-2 w-full'>
                        <Link href="/docente/calificaciones" className="flex justify-end items-center w-full">
                            <p className='text-sm font-semibold text-neutral-900'>Ver calificaciones</p>
                            <ArrowRight className="size-6 ml-2 bg-neutral-300 rounded-full p-1 text-neutral-800"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Materia;