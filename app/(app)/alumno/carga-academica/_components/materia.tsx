import { BookOpen } from "lucide-react";

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
                        Calificación: 89
                    </div>
                </div>
                
                <h3 className='text-lg font-bold text-neutral-900 mb-1'>Programación web</h3>
                <div className='flex items-center gap-2 text-sm text-neutral-500 mb-4'>
                    <span className='bg-neutral-100 px-2 py-0.5 rounded text-xs font-medium'>Grupo 202</span>
                </div>

                <div className='flex items-center justify-between mt-6 pt-4 border-t border-neutral-100'>
                    <div className='flex items-center gap-2'>
                        <img src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg' className='w-8 h-8 rounded-full object-cover' alt='Teacher'/>
                        <div>
                            <p className='text-xs text-neutral-500'>Teacher</p>
                            <p className='text-sm font-semibold text-neutral-900'>Maria Garcia</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Materia;