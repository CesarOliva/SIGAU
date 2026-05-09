-- Tabla base: Usuarios
CREATE TABLE Usuarios (
    num_control INT PRIMARY KEY,
    contraseña VARCHAR(255) NOT NULL,
    rol_usuario VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE,
    curp VARCHAR(18) UNIQUE NOT NULL,
    num_telefono VARCHAR(15),
    direccion VARCHAR(255),
    CONSTRAINT chk_rol_usuario CHECK (rol_usuario IN ('administrador', 'docente', 'alumno'))
);

-- Tabla especializada: Administradores
CREATE TABLE Administrador (
    correo_instit VARCHAR(100) PRIMARY KEY,
    num_control INT UNIQUE NOT NULL,
    CONSTRAINT fk_admin_usuario 
        FOREIGN KEY (num_control) REFERENCES Usuarios(num_control)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla especializada: Docentes
CREATE TABLE Docentes (
    correo_instit VARCHAR(100) PRIMARY KEY,
    num_control INT UNIQUE NOT NULL,
    rfc VARCHAR(13) UNIQUE,
    desc_formacion TEXT,
    fecha_ingreso DATE,
    especialidad VARCHAR(100),
    CONSTRAINT fk_docente_usuario 
        FOREIGN KEY (num_control) REFERENCES Usuarios(num_control)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla especializada: Alumnos
CREATE TABLE Alumnos (
    correo_instit VARCHAR(100) PRIMARY KEY,
    num_control INT UNIQUE NOT NULL,
    carrera VARCHAR(100),
    semestre INT,
    CONSTRAINT fk_alumno_usuario 
        FOREIGN KEY (num_control) REFERENCES Usuarios(num_control)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_semestre CHECK (semestre BETWEEN 1 AND 12)
);

-- Tabla: Materias
CREATE TABLE Materias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    creditos INT NOT NULL,
    semestre INT NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'Activo',
    descripcion TEXT,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_materias_creditos CHECK (creditos BETWEEN 1 AND 100),
    CONSTRAINT chk_materias_semestre CHECK (semestre BETWEEN 1 AND 12)
);

-- Tabla: Evolucion de calificaciones (para reportes historicos)
CREATE TABLE EvolucionCalificaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    etiqueta_mes VARCHAR(20) NOT NULL,
    calificacion DECIMAL(4,2) NOT NULL,
    orden INT NOT NULL,
    CONSTRAINT chk_calificacion_rango CHECK (calificacion BETWEEN 0 AND 10),
    CONSTRAINT uq_evolucion_orden UNIQUE (orden)
);

-- Tabla: Rendimiento por materia
CREATE TABLE RendimientoMaterias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    materia_id INT NOT NULL,
    profesor VARCHAR(150) NOT NULL,
    cantidad_alumnos INT NOT NULL,
    promedio_calificacion DECIMAL(4,2) NOT NULL,
    tasa_aprobacion DECIMAL(5,2) NOT NULL,
    avatar_profesor VARCHAR(255),
    CONSTRAINT fk_rendimiento_materia FOREIGN KEY (materia_id) REFERENCES Materias(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_rendimiento_materia UNIQUE (materia_id),
    CONSTRAINT chk_rendimiento_alumnos CHECK (cantidad_alumnos >= 0),
    CONSTRAINT chk_rendimiento_promedio CHECK (promedio_calificacion BETWEEN 0 AND 10),
    CONSTRAINT chk_rendimiento_tasa CHECK (tasa_aprobacion BETWEEN 0 AND 100)
);

-- Tabla: Asignación de materias a docentes
CREATE TABLE DocenteMaterias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    docente_id INT NOT NULL,
    materia_id INT NOT NULL,
    fecha_asignacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL DEFAULT 'Activo',
    CONSTRAINT fk_docente_materia FOREIGN KEY (docente_id) REFERENCES Usuarios(num_control)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_materia_docente FOREIGN KEY (materia_id) REFERENCES Materias(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_docente_materia UNIQUE (docente_id, materia_id)
);
