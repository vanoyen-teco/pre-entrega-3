const productService = require("../services/productService");

const getAllProducts = (req, res) => {
    let section;
    if(req.params.section){
        section = req.params.section;
    }else{
        section = 'new';
    }
    const allProducts = productService.getAllProducts(section);
    allProducts.then((prods)=>{
        res.render("productos", {
            pageTitle: "Productos",
            productos: prods,
            loggedIn: true,
            signUp: false,
            isCart: false
        });
    })
    
};

const getProductById = (req, res) => {
    const productByID = productService.getProductById(req.params.id);
    productByID.then( (ref) => {
        (ref)
        ?res.status(200).send({ status: "OK", data: ref })
        :res.status(400).send({ status: "FAILED", data: {error: "El producto no existe"} });
    }) 
};

const getProducts = (req, res) => {
    if(!req.params.id){
        getAllProducts(req, res);
    }else{
        getProductById(req, res);
    }
};

const createNewProduct = (req, res) => {
    const { body } = req;
    if (
        !body.nombre ||
        !body.descripcion ||
        !body.codigo ||
        !body.foto ||
        !body.precio ||
        !body.stock
    ) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const newProduct = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        codigo: body.codigo,
        foto: body.foto,
        precio: body.precio,
        stock: body.stock,
    };
    const createdProduct = productService.createNewProduct(newProduct);
    (createdProduct)
    ?res.status(201).send({ status: "OK", data: createdProduct })
    :res.status(400).send({ status: "FAILED", data: {error: "Lo sentimos, no pudimos agregar el elemento."} });
    
};

const updateOneProduct = (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    if (
        !body.nombre ||
        !body.descripcion ||
        !body.codigo ||
        !body.foto ||
        !body.precio ||
        !body.stock ||
        !id
    ) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const updatedProduct = productService.updateOneProduct(id, body);
    (updatedProduct)
    ?res.status(201).send({ status: "OK", data: updatedProduct })
    :res.status(400).send({ status: "FAILED", data: {error: "Lo sentimos, no pudimos actualizar el elemento."} });
};

const deleteOneProduct = (req, res) => {
    if(!req.params.id){
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const deletedProduct = productService.deleteOneProduct(req.params.id);
    deletedProduct.then((del)=>{
        (del)
        ?res.status(200).send({ status: "OK", data: del })
        :res.status(404).send({ status: "NOT FOUND", data: {error: "Lo sentimos, no encontramos el producto."} })
    })
};

module.exports = {
    getProducts,
    createNewProduct,
    updateOneProduct,
    deleteOneProduct,
};