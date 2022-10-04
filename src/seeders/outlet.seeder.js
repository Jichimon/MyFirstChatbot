const Outlet = require('./../models/outlet.model');
const Product = require('./../models/product.model');
const Promotion = require('./../models/promotion.model');

const model = "Outlet";


loadSeed = async () => {

    const data = [
        new Outlet({
            stock: 50,
            product: await Product.findByCode("0015BG1"),
            promotion: await Promotion.findByCode("01P1"),
        }),
        new Outlet({
            stock: 12,
            product: await Product.findByCode("0017BG3"),
            promotion: await Promotion.findByCode("01P1"),
        })
    ];


    loadData(data);
}


loadData = (data) => {
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