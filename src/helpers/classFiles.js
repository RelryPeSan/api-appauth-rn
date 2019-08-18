
class classFiles {

    async createDir(path, cb) {
        var fs = require('fs');

        if(path) {

            if(fs.existsSync(path)){
                console.log(`Não foi possivel criar a pasta, pois a mesma já existe.\n\tPATH : ${path}`);
                return;
            }

            try {
                fs.mkdirSync(path);
                console.log(`Pasta criada com sucesso.\n\tPATH: ${path}`);
            } catch (error) {
                console.log(error);
            }

        } else {
            console.log(new Error(`O path deve ser informado.`));
        }
    }

    async deleteDir(path, deletePath = false, cb){
        var fs = require('fs');
        var files = [];
        var curPath = '';

        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);

            files.forEach(function(file,index){
                curPath = path + '/' + file;

                if (fs.lstatSync(curPath).isDirectory())
                    deleteDirR(curPath, cb);
                else
                    fs.unlinkSync(curPath);
            });

            if(deletePath === true){
                fs.rmdirSync(path);
                console.log(`Pasta excluida com sucesso.\n\tPATH: ${path}`);
            } else {
                console.log(`Os arquivos contidos na pasta foram excluidos com sucesso.\n\tPATH: ${path}`);
            }
            
            //cb(null);
        } else {
            console.log(`O path informado, não existe.\n\tPATH: ${path}`);
            //cb(new Error(`O path informado, não existe.\nPATH: ${path}`));
        }
    }

    clearDir(path, cb){
        this.deleteDir(path, false);
    }
}

module.exports = new classFiles;