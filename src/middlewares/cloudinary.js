const cloudinary = require('cloudinary').v2;

const BASE_PATH = "appauth";

cloudinary.config({
    cloud_name: 'reratos',
    api_key: '328258922149422',
    api_secret: '3pWuKOi0B2axHo2_bfPMh_abOxU'
})

function uploadBuffer(req, res, next){
    console.info('Upload de arquivo em buffer...');
    const { userid } = req.query;
    const file = req.file;

    if(file.buffer){
        const tipo = file.mimetype.substring(file.mimetype.indexOf('/') + 1);
        const imgname = userid + '-' + Date.now().toString();
    
        cloudinary.uploader.upload_stream({
            public_id: `${BASE_PATH}/${userid}/${imgname}`,
        }, (error, result) => {
            if (error) {
                console.error('Falha no upload do arquivo.');
                next(error, result);
            } else {
                console.info('Sucesso no upload do arquivo.');
                next(null, result);
            }
        }).end(file.buffer);
    } else {
        console.error(`Arquivo não carregado no buffer\n${file}`);
        next(new Error(`Arquivo não carregado no buffer\n${file}\n`), null);
    }
}

function uploadFile(req, res, next){
    console.info('Upload de arquivo em disco...');
    const { userid } = req.query;

    const path = req.file.path
    const imgname = req.file.filename;
    
    cloudinary.uploader.upload(
        path,
        {
            public_id: `${BASE_PATH}/${userid}/${imgname}`,
        }, // directory and tags are optional

        function(err, image) {
            if (err) {
                next(err, image);
                // return res.send(err)
            }

            // remove file from server
            if(path){
                const fs = require('fs')
                fs.unlinkSync(path)
            }

            next(null, image);
            // return res.send(image);
        }
    )
}

module.exports = {
    upload(req, res, next){
        // uploadFile(req, res, next);
        uploadBuffer(req, res, next);
    },

    getById(req, res, next){
        console.log(req);
        res.json({error: 'Não implementado ainda.'});
    },

    clearFolder(req, res, next){
        cloudinary.uploader.destroy()
        console.log(req);
        res.json({error: 'Não implementado ainda.'});
    }

}

