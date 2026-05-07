const AsignarPage = () => {
    return (
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                <section id="docente-selection" className="bg-white rounded-2xl p-6 shadow-card border border-neutral-50">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-neutral-800">Asignar materias</h2>
                            <p className="text-sm text-neutral-600 mt-1">Busque y seleccione un docente para gestionar sus materias.</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <i className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" data-fa-i2svg=""><svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
                            <input type="text" placeholder="Nombre del docente..." className="w-full pl-11 pr-4 py-3 bg-[#f4f5f6] border border-transparent focus:border-neutral-200 rounded-xl text-sm focus:outline-none transition-all"/>
                        </div>
                    </div>

                    <div className="mt-6 p-4 border border-neutral-100 rounded-xl bg-neutral-50 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Docente" className="w-12 h-12 rounded-full object-cover"/>
                            <h3 className="font-semibold text-neutral-800">Carlos Martinez Mendoza</h3>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">                    
                    <section id="materias-disponibles" className="bg-white rounded-2xl p-6 shadow-card border border-neutral-50 flex flex-col max-h-150 overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-800">Materias Disponibles</h2>
                                <p className="text-sm text-neutral-600 mt-1">Seleccione para asignar al docente</p>
                            </div>
                        </div>

                        <div className="relative mb-4">
                            <div className="relative flex-1">
                                <i className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" data-fa-i2svg=""><svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
                                <input type="text" placeholder="Buscar materia..." className="w-full pl-11 pr-4 py-3 bg-[#f4f5f6] border border-transparent focus:border-neutral-200 rounded-xl text-sm focus:outline-none transition-all"/>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            <div className="p-4 border border-neutral-100 rounded-xl hover:border-neutral-300 transition-colors group bg-white">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-sm text-neutral-800">Física Cuántica Avanzada</h4>
                                    <button className="px-6 py-2.5 bg-[#1a1d1f] text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
                                        Asignar
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-neutral-600">
                                    <p>Id 202</p>
                                    <span className="flex items-center gap-1"><i data-fa-i2svg=""><svg className="svg-inline--fa fa-layer-group" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="layer-group" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"></path></svg></i> Semestre 6</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="materias-asignadas" className="bg-white rounded-2xl p-6 shadow-card border border-neutral-50 flex flex-col max-h-150 overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-800">Materias Asignadas</h2>
                                <p className="text-sm text-neutral-600 mt-1">Carga actual del docente</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            <div className="p-4 border border-neutral-100 rounded-xl hover:border-neutral-300 transition-colors group bg-white">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-sm text-neutral-800">Física Cuántica Avanzada</h4>
                                    <button className="w-8 h-8 rounded-full bg-white text-red-500 hover:bg-neutral-300 border border-red-100 transition-colors flex items-center justify-center shadow-sm">
                                        <i className="text-sm" data-fa-i2svg=""><svg className="svg-inline--fa fa-minus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path></svg></i>
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-neutral-600">
                                    <p>Id 202</p>
                                    <span className="flex items-center gap-1"><i data-fa-i2svg=""><svg className="svg-inline--fa fa-layer-group" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="layer-group" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"></path></svg></i> Semestre 6</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-end">
                            <button className="px-6 py-2.5 bg-[#1a1d1f] text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
                                Guardar Cambios
                            </button>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
 
export default AsignarPage;