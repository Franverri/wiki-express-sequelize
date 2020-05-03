# Sequelize Blog Homework

## Descripción

En esta homework vamos a construir un Blog al estilo Wikipedia en el cual podremos crear nuevas páginas con su contenido asociado y luego consultarlas, modificarlas o eliminarlas. Adicionalmente se mantendrá un registro de todos aquellos usuarios que hayan creado alguna página en el Blog.

## Configuración inicial

1. Ejecutar `npm install` desde la carpeta "XXXXX"
2. Configurar la base de datos de postgres para poder correr el proyecto correctamente:

  * Verificar que se encuentre instalado postgres en su máquina
  * Crear la base de datos denominada `henryblog` que se utilizará en esta homework ejecutando el siguiente comando: `createdb henryblog`


3. Ejecutar `npm start` para correr el servidor y acceder a `http://localhost:1337/` para visualizar el Blog

## Instrucciones

### Creación de modelos de Sequelize

Dentro del modelo de la base de datos que vamos a utilizar en este ejercicio debemos generar las entidades `Page` y `User` descriptas debajo.

#### Page

La entidad `Page` hace referencia a cada una de las páginas que van a crear los usuarios para cargar contenido, por lo que las mismas deberían contener los siguientes campos:

  * __title__*: El título de la página
  * __urlTitle__*: La URL que vamos a utilizar para acceder a la información de una página a través de los links (Debe ser una URL válida).
  * __content__*: El contenido de la página
  * __status__: Estado actual de la página (Puede ser `open` o `closed`)

#### User

La entidad `User` va a correponder a aquellos usuarios que participen del Blog generando nuevas páginas, por lo que tendrán que contener los siguientes campos:

  * __name__*: Nombre completo del usuario
  * __email__*: Email del usuario (Debe ser único)

##### Esquema

Para llevar adelante esta tarea será necesario modificar el archivo `index.js` de la carpeta `models`:

  ```js
  const Page = db.define('page', {
    // Tu código acá:

  });

  const User = db.define('users', {
    // Tu código acá:

  })
  ```

Dentro de `Page` y `User` deberán incluirse los campos correspondientes para cada uno identificando su tipo de dato. En este [link](https://sequelize.org/v3/docs/models-definition/) podrán encontrar un ejemplo de cómo definir los esquemas y la variedad de tipos de datos aceptados por Sequelize.

*Los campos que contienen un asterísco deben ser obligatorios, por lo que será necesario la utilización de la opción `allowNull` en dichos casos*

##### Hooks

Es importante aclarar que el campo `urlTitle` debería ser una versión válida de URL para el campo `title` por lo que deberías hacer que se genere automáticamente a partir del título ingresado por el usuario. Por ejemplo si el usuario ingresa como título de la página: "Henry Sequelize Example", el `urlTitle` debería generarse sólo como "Henry_Sequelize_Example".

Por lo tanto deben realizarse las siguientes validaciónes para el campo `urlTitle`:

  * No debe contener caracteres no alfanuméricos
  * Los espacios deben ser sustituidos por guiones bajos

Para eso deberán utilizar `regexes` y el método `replace` de Strings.

Implementar está función a partir de un `beforeValidate hook` en el archivo `index.js` de la carpeta `models` para la entidad `Page`. [Acá](https://sequelize.org/master/manual/hooks.html) pueden encontrar información sobre cómo implementar los hooks.

##### Vinculación

Luego de haber creado los campos para cada entidad de la base de datos tenemos que relacionarlos entre sí, ya que cada usuario (`User`) va a poder crear una o más páginas (`Page`). Por lo tanto dentro del mismo archivo `index.js` de la carpeta `models` también debemos agregar como se realcionan estas dos entidades.

Las distintas opciones que ofrece Sequelize para ello son:

  * hasOne
  * belongsTo
  * hasMany
  * belongsToMany

Para más detalles sobre cada una de ellas pueden consultar el siguiente [link](https://sequelize.org/v3/api/associations/)

En nuestro caso, las que corresponden utilizar son:

  * Page.belongsTo: ya que cada página estará asociada a un usuario en particular
  * User.hasMany: ya que cada usuario puede crear múltiples páginas

##### Route getter

Adicionalmente necesitamos definir una ruta para cada página que se cree en el Blog para poder acceder luego a su contenido. Para ello queremos que se genere dicha ruta concatenando `/wiki/` con el campo `urlTitle` de cáda página.
Por ejemplo una `Page` cuyo `urlTitle` sea 'henry-Prep' debería tener una ruta asociada igual a `/wiki/henry-Prep`.

Para estos casos Sequelize tiene getters los cuales nos permiten crear campos virtuales que no son almacenados en la base de datos sino que se crean cada vez que realizamos una consulta.

[Aquí](https://sequelize.org/v3/docs/models-definition/#getters-setters) podrán encontrar detalles de cómo implementarlos. En nuestro caso debemos hacerlo dentro del campo que hemos definido como `urlTitle`.

### Routes

Ahora necesitaremos modificar las rutas de Express para manejar los request tanto de creación como obtención de datos desde nuestro esquema:

  * GET /wiki/: Obtiene todas las páginas creadas
  * POST /wiki/: Agrega una nueva página a la base de datos
  * GET /wiki/add: Obtiene el template del formulario para crear una nueva página
  * GET /users/: Obtiene todos los usuarios
  * GET /users/123: Obtiene los datos del usuario '123'

*Los template de las rutas ya se encuentran creados dentro de la carpeta `routes` solo es necesario modificarlos donde se indica*

TO-DO: Explicar con mayor detalle que hacer en cada ruta
