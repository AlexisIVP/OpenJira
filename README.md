# Next.js OpenJira App

To run locally, the database is required

```
docker-compose up -d
```

* The -d, means __deteached__


*Local URL MongoDB

```
mongodb://localhost:27017/entriesdb
```
 
 ## Configurar las variables de entorno
 Renombrar el archivo __.env.template__ a __.env__

 ## LLenar la base de datos con información de pruebas.

 Llamará:

 ```
    http://localhost:3000/api/seed
 ```