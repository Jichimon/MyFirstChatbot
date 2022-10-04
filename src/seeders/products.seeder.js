const Product = require('./../models/product.model');

const products = [
    new Product({
        code: "0015BG1",
        name: "Mochila BG-1",
        price: 36.60,
        description: "Mochila color negro especial para viajeros",
        productType: 1,
        size: 12,
        weight: 1.42,
        capacity: 11,
        images: []
    }),
    new Product({
        code: "0018BG2",
        name: "Mochila BG-2",
        price: 50.00,
        description: "Mochila color amarillo especial para trabajadores",
        productType: 1,
        size: 6,
        weight: 0.82,
        capacity: 4,
        images: []
    }),
    new Product({
        code: "0017BG3",
        name: "Mochila BG-3",
        price: 72.60,
        description: "Mochila color negro especial para portatiles de 15.6 pulgadas",
        productType: 1,
        size: 10,
        weight: 1.12,
        capacity: 7,
        images: []
    }),
    new Product({
        code: "0016BG4",
        name: "Mochila BG-4",
        price: 54.00,
        description: "Mochila color negro especial para colegio",
        productType: 1,
        size: 8,
        weight: 1.63,
        capacity: 9,
        images: []
    }),
];


loadSeed = () => {
    products.map(
        async (p, index) => 
        {
            await p.save(
                (err, result) => 
                {
                    if (err) {
                        console.log("Hubo un error al cargar el seed de productos: ");
                        console.log(err.name);
                        console.log(err.message);
                        console.log(err.stack);
                    }
    
                    if (index === products.length -1) {
                        console.log("Products seeded on db");
                    }
                }
            );
        });
}

module.exports = { loadSeed };
