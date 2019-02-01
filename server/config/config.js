// configuracion del puerto para produccion y desarrollo
PUERTO = process.env.PORT || 3000;

// configuracion del entorno
ENTORNO = process.env.NODE_ENV || 'dev';

let urlDB;

if (ENTORNO === 'dev') {
    urlDB = 'mongodb://localhost:27017/sigma-mean';
} else {
    urlDB = 'mongodb://crackgonzalez:cra180719@ds113495.mlab.com:13495/sigma-mean';
}

RUTA = urlDB;