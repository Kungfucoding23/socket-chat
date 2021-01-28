const { io } = require('../server')

const { Usuarios } = require('../classes/usuarios')

const { crearMensaje } = require('../utils/utilidades')

const usuarios = new Usuarios()

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        //validacion para asegurarse de que venga el nombre
        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            })
        }

        let personas = usuarios.agregarPersona(client.id, data.nombre)

        client.broadcast.emit('listaPersona', usuarios.getPersonas())

        callback(personas)


    })

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje(persona, data.mensaje)
        client.broadcast.emit('crearMensaje', mensaje)
    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.deletePersona(client.id)

        //cuando una persona se va del chat, quiero que los demas se enteren
        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`))
        client.broadcast.emit('listaPersona', usuarios.getPersonas())
    })

})