const getItem = (item) => {
    return `
        <div class="boxItem">
            <div class="fixBoxItem itemProducto" data-id="${item.id}">
                <h3 class="typeo regular spacing-100">Producto: ${item.titulo}</h3>
                <p class="typeo semibold precio">Cantidad: ${item.cantidad}</p>
                <p class="typeo semibold precio">$ ${item.precio}</p>
                <p class="typeo regular sku">Subtotal: ${item.subto}</p>
            </div>
        </div>
    `;
}

module.exports = {
    getItem,
}