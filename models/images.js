var sharp = require('sharp');

const resizeImage = (ruta, name, ancho, alto) => {
    sharp(ruta+name)
    .resize(ancho, alto, {
        kernel: sharp.kernel.nearest,
        fit: 'cover',
        position: 'center',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .toFile(ruta+'resized_'+name)
    .then(() => {
        return;
    });
};

module.exports = {
    resizeImage
};