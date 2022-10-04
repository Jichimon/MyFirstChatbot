const Prospect = require('./../models/prospect.model');

const model = "Prospect";
const data = [
    new Prospect({
        name: "Ginno Arteaga",
        email: "ginnoam12198@hotmail.com",
        phone: "76341285",

    }),
    new Prospect({
        name: "Miguel Peinado",
        email: "user2@gmail.com",
        phone: "79995256",

    }),
    new Prospect({
        name: "Miguel Despeinado",
        email: "user1@gmail.com",
        phone: "78446954",

    }),
    new Prospect({
        name: "Luis Antelo",
        email: "choquin64@gmail.com",
        phone: "75328268",

    }),
];


loadSeed = () => {
    data.map(
        async (p, index) => 
        {
            await p.save(
                (err, result) => 
                {
                    if (err) {
                        console.log("Hubo un error al cargar el seed de " + model + ": ");
                        console.log(err.name);
                        console.log(err.message);
                        console.log(err.stack);
                    }
    
                    if (index === data.length -1) {
                        console.log(model + " seeded on db");
                    }
                }
            );
        });
}

module.exports = { loadSeed };
