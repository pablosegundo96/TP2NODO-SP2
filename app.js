const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://Grupo-03:grupo03@cursadanodejs.ls9ii.mongodb.net/Node-js', {
    // useNewUrlParser: true,
     //useUnifiedTopology: true
 })
.then(()=> console.log('conexion exitosa a MongoDB'))
.catch (error => console.error('Error al conectar a MongoDB:', error));

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true},
    nombreReal:{ type: String, required: true},
    edad: { type: Number, min: 0},
    planetaOrigen:{type: String, default: 'Desconocido'},
    debilidad: [String],
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createAt: {type: Date, default: Date.now}
});

const SuperHero = mongoose.mode('SuperHero', superheroSchema);

async function insertSuperHero() {
    const hero = new SuperHero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactividad',
        poderes: ['trepar paredes', 'Sentido aracnido', 'Super Fuerza', 'Agilidad'],
        aliados: ['Iroman'],
        enemigos: ['Duende Verde']
    });
    await hero.save();
    console.log('Superheroe insertado:', hero);
}
insertSuperHero();

async function updateSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.updateOne(
        {nombreSuperHeroe: nombreSuperHeroe},
        { $set: {edad: 26}}
    );
    console.log('Resultado de la actualizacion:', result);
}

updateSuperHero('Spiderman');

async function deleteSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.deleteOne ({nombreSuperHeroe: nombreSuperHeroe});
    console.log('Superheroe eliminado:', result);
    
}
deleteSuperHero ('Spiderman');

async function findSuperHeroes() {
    const heroes = await SuperHero.find({planetaOrigen: 'Tierra'});
    console.log('SuperHeroes encontrados:', heroes);
}
findSuperHeroes();