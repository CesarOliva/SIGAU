const pool = require('./database');
const fs = require('fs');
const path = require('path');

/**
 * Sincroniza la base de datos ejecutando el script SQL
 * Útil para desarrollo y primeras ejecuciones
 */
const syncDatabase = async () => {
    try {
        console.log('🔄 Sincronizando base de datos...');
        
        const schemaPath = path.join(__dirname, 'schema.sql');
        const sqlScript = fs.readFileSync(schemaPath, 'utf8');
        
        // Dividir el script en declaraciones individuales
        const statements = sqlScript
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0);

        const connection = await pool.getConnection();

        for (const statement of statements) {
            try {
                await connection.query(statement);
                console.log('✅ Ejecutado:', statement.substring(0, 50) + '...');
            } catch (error) {
                // Ignorar errores de tablas que ya existen
                if (error.code === 'ER_TABLE_EXISTS_ERROR') {
                    console.log('⚠️  Tabla ya existe:', statement.substring(0, 30));
                } else {
                    console.error('❌ Error al ejecutar statement:', error.message);
                    throw error;
                }
            }
        }

        connection.release();
        console.log('✅ Base de datos sincronizada correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al sincronizar la base de datos:', error.message);
        throw error;
    }
};

module.exports = { syncDatabase };
