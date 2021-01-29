var socket = io()

//leer por parametro lo que venga como nombre del usuario
var params = new URLSearchParams(window.location.search)

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'
    throw new Error('El nombre y la sala son necesarios')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor')
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp)
    })
})

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor')

})


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Alejandro',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp)
})

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje)

})

// Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {

    console.log(personas)

})

//Mensajes privados
socket.on('mensajePrivado', function(msg) {
    console.log('Mensaje Privado:', msg)
})