const Promotion = require('./../models/promotion.model');

const model = "Promotion";
const data = [
    new Promotion({
        code: "01P1",
        name: "Spring Outlet",
        startDate: new Date(2022, 09, 21),
        endDate: new Date(2022, 10, 30),

    })
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
