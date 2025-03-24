import { criandoFoto, mostrandoFoto } from "../models/FotoModel.js";
import path from 'path';
import url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const createFoto = async (req,res) =>{
    console.log('FotoController :: createFoto');
    // const caminho = req.body.caminho;
    const {alternativo} = req.body;
    // o ou representado pelo '||' faz com que se não receber arquivo receba um '{}' que é objeto vazio 
    const {foto} = req.files;
    //const [caminho,alternativo] = req.body;

    if(!alternativo || !foto){
        return res.status(400).json({mensagem:'A imagem e a descrição são obrigatórios'})
    }
    const nomeFoto = foto.name;
    const extensao = path.extname(nomeFoto).toLocaleLowerCase();
    const caminho = `${Date.now()}${extensao}`
    try {
        await foto.mv(path.join(__dirname,'..','..','public','img',caminho));
        const [status,resposta] = await criandoFoto(caminho,alternativo);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem:"erro ao criar foto"});
    }
}

export const readFoto = async(rec, res) =>{
    console.log('FotoController :: readFoto');
    try {
        const [status, resposta] = await mostrandoFoto();
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem:"erro ao mostrar fotos"});
    }
}