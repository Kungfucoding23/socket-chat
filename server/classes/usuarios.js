class Usuarios {

    constructor() {
        //inicializa cada una de las personas conectadas al chat
        this.personas = []
    }

    agregarPersona(id, nombre) {

        let persona = { id, nombre }

        this.personas.push(persona)

        return this.personas

    }

    //obtener persona por id
    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0] //filter regresa un nuevo arreglo, por lo cual si encuentra a alguien solo quiero un primer registro por eso va el [0]

        //si encuentra la persona voy a tener un objeto, sino un undefined o null
        return persona
    }

    //obtiene todas las personas del chat
    getPersonas() {
        return this.personas
    }

    getPersonasPorSala(sala) {
        // ....
    }

    //eliminar una persona
    deletePersona(id) {

        //antes de sacarla del arreglo la busco para despues retornar la persona borrada
        let personaBorrada = this.getPersona(id)

        //si encuentra el id quedaria esa persona afuera y guardo el arreglo nuevo sin esa persona
        this.personas = this.personas.filter(persona => persona.id != id)

        return personaBorrada
    }

}




module.exports = {
    Usuarios
}