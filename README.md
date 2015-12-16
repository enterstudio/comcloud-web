# comcloud-web

## Despliegue

- Clonar este repo

```
git clone https://github.com/wtelecom/comcloud-web
```

- Instalar dependencias de bower

```
cd public/vendor, bower install
```

- Instalar dependencias de node

```
cd public/vendor, npm install
```

- Levantar redis

```
service redis-server start
```

- Levantar mongo

```
service mongo start
```

- Arrancar aplicación

```
nodemon app.js
```

Una vez arrancado, debería estar disponible en el puerto 8000

# Configuración del portal

- Entrar al portal
- Registrar al primer usuario (será el administrador)
- Ir a 'control panel' -> 'modules' y habilitar 'descargas' y 'crea tu configuración'
- Ir a 'highlights' y arrastrar el módulo 'Crea tu configuración' al primer hueco de los pequeños:

```
                 ___________________________________________________
                 |__________________________________________________|
                 ___________________________  ______________________
                 |__Crea_tu_configuracion___| |_____________________|
                 ___________________________  ______________________
                 |__________________________| |_____________________|
```

- Pulsar en 'Home' y 'Comenzar'. Seguir el asistente.


NOTA: en el paso 3 del asistente, finalizar, donde se indica el dominio, hay que ponerlo con http:// delante, en caso contrario no funcionará.
