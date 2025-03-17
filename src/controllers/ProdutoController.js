import { criandoProduto } from "../models/ProdutoModel.js";

//CRUD Produto
export const createProduto = async (req,res) => {
    console.log('ProdutoControlller :: createProduto')
    const nome = req.body.nome;

try {
    const [status,resposta] = await criandoProduto (nome);
        res.status(status).json(resposta);
} catch (error) {
    console.log(error);
    res.status(500).json({mensagem: "ERRO ao criar produto"})
}
}

const readProduto = async (req,res) => {

}

const updateProduto = async (req,res) =>{
    const id_produto = req.params.id;
    const nome = req.body.nome;
}

const deleteProduto = async (req,res) => {
    const id_produto = req.params.id;
}