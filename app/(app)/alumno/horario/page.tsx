import Materia from "./_components/materia";

const horario = () => {
    return (
        <main className='flex-1 flex flex-col h-screen overflow-hidden bg-neutral-50/50 relative'>
            <div className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8'>
                <div className='max-w-7xl mx-auto space-y-6'>
                    <section id='academic-subjects' className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-xl font-bold text-neutral-900'>Horario</h2>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'>
                            <Materia/>
                            <Materia/>
                            <Materia/>
                            <Materia/>
                            <Materia/>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
 
export default horario;