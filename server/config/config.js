// configuracion del puerto para produccion y desarrollo
PUERTO = process.env.PORT || 3000;

// configuracion del entorno
ENTORNO = process.env.NODE_ENV || 'dev';

let urlDB;

if (ENTORNO === 'dev') {
    urlDB = 'mongodb://localhost:27017/sigma-mean';
} else {
    urlDB = process.env.MONGO_URI;
}

RUTA = urlDB;

// vencimiento del token
CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || 60 * 60 * 24 * 30;

// seed del token
SEED = process.env.SEED || 'seed'