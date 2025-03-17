import { criandoProduto, mostrarProdutos, atualizandoProduto, deletandoProduto } from "../models/ProdutoModel.js";

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

export const readProduto = async (req,res) => {
    console.log('ProdutoController :: readProduto');

    try {
        const [status,resposta] = await mostrarProdutos();
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({mensagem: "ERRO ao mostrar produto"});
    }
}

export const updateProduto = async (req,res) =>{
    console.log('ProdutoController :: updateProduto');
    const id_produto = req.params.id_produto;
    const nome = req.body.nome;
    try {
        const [status,resposta] = await atualizandoProduto(id_produto,nome);
        res.status(status).json(resposta);
        } catch (error) {
            console.log(error);
            res.status(500).json({mensagem: "ERRO ao atualizar produto"});
            }
}

export const deleteProduto = async (req,res) => {
    const id_produto = req.params.id_produto;
    console.log('ProdutoController :: deleteProduto');
    try {
        const [status,resposta] = await deletandoProduto(id_produto);
        res.status(status).json(resposta);
        } catch (error) {
            console.log(error);
            res.status(500).json({mensagem: "ERRO ao deletar produto"});
            }
    
}