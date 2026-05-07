const express = require("express");
const cors = require('cors');
const usuarioRoutes = require('./routes/usuario.routes')

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api',usuarioRoutes);

// Manejo de errores global (opcional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});