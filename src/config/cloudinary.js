//importar cloudinary
const cloudinary = require('cloudinary').v2

//establecer variables de entorno
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});

//Crear el metodo para enviar la imagen a cloudinary
module.exports.uploadImage = async(filePath) => {
    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}

//Crear metodo para eliminar las imagenes de cloudinary
module.exports.deleteImage = async (publicId)=>{   
    return await cloudinary.uploader.destroy(publicId)
}