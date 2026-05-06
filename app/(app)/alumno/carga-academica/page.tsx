const CargaPage = () => {
    return (
            <main className='flex-1 flex flex-col h-screen overflow-hidden bg-neutral-50/50 relative'>
                <div className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8'>
                    <div className='max-w-7xl mx-auto space-y-6'>
                        <section id='academic-subjects' className='space-y-4'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-xl font-bold text-neutral-900'>Carga academica</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                <div className='bg-white rounded-2xl p-5 shadow-card border border-neutral-100 hover:shadow-soft transition-shadow group relative overflow-hidden'>
                                    <div className='absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-bl-[100px] -mr-8 -mt-8 z-0'></div>
                                    
                                    <div className='relative z-10'>
                                        <div className='flex justify-between items-start mb-4'>
                                            <div className='w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue text-xl'>
                                                <i className='fa-solid fa-calculator'></i>
                                            </div>
                                            <div className='bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-xs font-bold border border-brand-100'>
                                                Grade: A
                                            </div>
                                        </div>
                                        
                                        <h3 className='text-lg font-bold text-neutral-900 mb-1'>Advanced Mathematics</h3>
                                        <div className='flex items-center gap-2 text-sm text-neutral-500 mb-4'>
                                            <span className='bg-neutral-100 px-2 py-0.5 rounded text-xs font-medium'>Science Group</span>
                                        </div>

                                        <div className='flex items-center justify-between mt-6 pt-4 border-t border-neutral-100'>
                                            <div className='flex items-center gap-2'>
                                                <img src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg' className='w-8 h-8 rounded-full object-cover' alt='Teacher'/>
                                                <div>
                                                    <p className='text-xs text-neutral-500'>Teacher</p>
                                                    <p className='text-sm font-semibold text-neutral-900'>Dr. Sarah Jenkins</p>
                                                </div>
                                            </div>
                                            <button className='w-8 h-8 rounded-full bg-neutral-50 text-neutral-400 group-hover:bg-accent-blue group-hover:text-white transition-colors flex items-center justify-center'>
                                                <i className='fa-solid fa-arrow-right text-xs'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-white rounded-2xl p-5 shadow-card border border-neutral-100 hover:shadow-soft transition-shadow group relative overflow-hidden'>
                                    <div className='absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 rounded-bl-[100px] -mr-8 -mt-8 z-0'></div>
                                    
                                    <div className='relative z-10'>
                                        <div className='flex justify-between items-start mb-4'>
                                            <div className='w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple text-xl'>
                                                <i className='fa-solid fa-atom'></i>
                                            </div>
                                            <div className='bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-xs font-bold border border-brand-100'>
                                                Grade: A-
                                            </div>
                                        </div>
                                        
                                        <h3 className='text-lg font-bold text-neutral-900 mb-1'>Quantum Physics</h3>
                                        <div className='flex items-center gap-2 text-sm text-neutral-500 mb-4'>
                                            <span className='bg-neutral-100 px-2 py-0.5 rounded text-xs font-medium'>Science Group</span>
                                        </div>

                                        <div className='flex items-center justify-between mt-6 pt-4 border-t border-neutral-100'>
                                            <div className='flex items-center gap-2'>
                                                <img src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg' className='w-8 h-8 rounded-full object-cover' alt='Teacher'/>
                                                <div>
                                                    <p className='text-xs text-neutral-500'>Teacher</p>
                                                    <p className='text-sm font-semibold text-neutral-900'>Prof. Robert Chen</p>
                                                </div>
                                            </div>
                                            <button className='w-8 h-8 rounded-full bg-neutral-50 text-neutral-400 group-hover:bg-accent-purple group-hover:text-white transition-colors flex items-center justify-center'>
                                                <i className='fa-solid fa-arrow-right text-xs'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-white rounded-2xl p-5 shadow-card border border-neutral-100 hover:shadow-soft transition-shadow group relative overflow-hidden'>
                                    <div className='absolute top-0 right-0 w-32 h-32 bg-accent-orange/5 rounded-bl-[100px] -mr-8 -mt-8 z-0'></div>
                                    
                                    <div className='relative z-10'>
                                        <div className='flex justify-between items-start mb-4'>
                                            <div className='w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center text-accent-orange text-xl'>
                                                <i className='fa-solid fa-book-open'></i>
                                            </div>
                                            <div className='bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold border border-yellow-100'>
                                                Grade: B+
                                            </div>
                                        </div>
                                        
                                        <h3 className='text-lg font-bold text-neutral-900 mb-1'>World Literature</h3>
                                        <div className='flex items-center gap-2 text-sm text-neutral-500 mb-4'>
                                            <span className='bg-neutral-100 px-2 py-0.5 rounded text-xs font-medium'>Arts Group</span>
                                        </div>

                                        <div className='flex items-center justify-between mt-6 pt-4 border-t border-neutral-100'>
                                            <div className='flex items-center gap-2'>
                                                <img src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg' className='w-8 h-8 rounded-full object-cover' alt='Teacher'/>
                                                <div>
                                                    <p className='text-xs text-neutral-500'>Teacher</p>
                                                    <p className='text-sm font-semibold text-neutral-900'>Emma Watson</p>
                                                </div>
                                            </div>
                                            <button className='w-8 h-8 rounded-full bg-neutral-50 text-neutral-400 group-hover:bg-accent-orange group-hover:text-white transition-colors flex items-center justify-center'>
                                                <i className='fa-solid fa-arrow-right text-xs'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-white rounded-2xl p-5 shadow-card border border-neutral-100 hover:shadow-soft transition-shadow group relative overflow-hidden'>
                                    <div className='absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-[100px] -mr-8 -mt-8 z-0'></div>
                                    
                                    <div className='relative z-10'>
                                        <div className='flex justify-between items-start mb-4'>
                                            <div className='w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-500 text-xl'>
                                                <i className='fa-solid fa-flask'></i>
                                            </div>
                                            <div className='bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-xs font-bold border border-brand-100'>
                                                Grade: A
                                            </div>
                                        </div>
                                        
                                        <h3 className='text-lg font-bold text-neutral-900 mb-1'>Organic Chemistry</h3>
                                        <div className='flex items-center gap-2 text-sm text-neutral-500 mb-4'>
                                            <span className='bg-neutral-100 px-2 py-0.5 rounded text-xs font-medium'>Science Group</span>
                                        </div>

                                        <div className='flex items-center justify-between mt-6 pt-4 border-t border-neutral-100'>
                                            <div className='flex items-center gap-2'>
                                                <img src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg' className='w-8 h-8 rounded-full object-cover' alt='Teacher'/>
                                                <div>
                                                    <p className='text-xs text-neutral-500'>Teacher</p>
                                                    <p className='text-sm font-semibold text-neutral-900'>Dr. Alan Turing</p>
                                                </div>
                                            </div>
                                            <button className='w-8 h-8 rounded-full bg-neutral-50 text-neutral-400 group-hover:bg-teal-500 group-hover:text-white transition-colors flex items-center justify-center'>
                                                <i className='fa-solid fa-arrow-right text-xs'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-white rounded-2xl p-5 shadow-card border border-neutral-100 hover:shadow-soft transition-shadow group relative overflow-hidden'>
                                    <div className='absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-[100px] -mr-8 -mt-8 z-0'></div>
                                    
                                    <div className='relative z-10'>
                                        <div className='flex justify-between items-start mb-4'>
                                            <div className='w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 text-xl'>
                                                <i className='fa-solid fa-landmark'></i>
                                            </div>
                                            <div className='bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold border border-yellow-100'>
                                                Grade: B
                                            </div>
                                        </div>
                                        
                                        <h3 className='text-lg font-bold text-neutral-900 mb-1'>Modern History</h3>
                                        <div className='flex items-center gap-2 text-sm text-neutral-500 mb-4'>
                                            <span className='bg-neutral-100 px-2 py-0.5 rounded text-xs font-medium'>Arts Group</span>
                                        </div>

                                        <div className='flex items-center justify-between mt-6 pt-4 border-t border-neutral-100'>
                                            <div className='flex items-center gap-2'>
                                                <img src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg' className='w-8 h-8 rounded-full object-cover' alt='Teacher'/>
                                                <div>
                                                    <p className='text-xs text-neutral-500'>Teacher</p>
                                                    <p className='text-sm font-semibold text-neutral-900'>Maria Garcia</p>
                                                </div>
                                            </div>
                                            <button className='w-8 h-8 rounded-full bg-neutral-50 text-neutral-400 group-hover:bg-rose-500 group-hover:text-white transition-colors flex items-center justify-center'>
                                                <i className='fa-solid fa-arrow-right text-xs'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-white rounded-2xl p-5 shadow-card border border-neutral-100 hover:shadow-soft transition-shadow group relative overflow-hidden'>
                                    <div className='absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[100px] -mr-8 -mt-8 z-0'></div>
                                    
                                    <div className='relative z-10'>
                                        <div className='flex justify-between items-start mb-4'>
                                            <div className='w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 text-xl'>
                                                <i className='fa-solid fa-laptop-code'></i>
                                            </div>
                                            <div className='bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-xs font-bold border border-brand-100'>
                                                Grade: A+
                                            </div>
                                        </div>
                                        
                                        <h3 className='text-lg font-bold text-neutral-900 mb-1'>Data Structures</h3>
                                        <div className='flex items-center gap-2 text-sm text-neutral-500 mb-4'>
                                            <span className='bg-neutral-100 px-2 py-0.5 rounded text-xs font-medium'>Tech Group</span>
                                        </div>

                                        <div className='flex items-center justify-between mt-6 pt-4 border-t border-neutral-100'>
                                            <div className='flex items-center gap-2'>
                                                <img src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg' className='w-8 h-8 rounded-full object-cover' alt='Teacher'/>
                                                <div>
                                                    <p className='text-xs text-neutral-500'>Teacher</p>
                                                    <p className='text-sm font-semibold text-neutral-900'>David Kumar</p>
                                                </div>
                                            </div>
                                            <button className='w-8 h-8 rounded-full bg-neutral-50 text-neutral-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors flex items-center justify-center'>
                                                <i className='fa-solid fa-arrow-right text-xs'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
    );
}
 
export default CargaPage;