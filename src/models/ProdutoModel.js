import db from '../Conexao.js';
import mysql from 'mysql2/promise'

//criando conexão com a database New
const conexao = mysql.createPool(db);

//Criando Produto
export const criandoProduto = async (nomeProduto) =>{
    console.log('ProdutoModel :: criandoProduto');
    
    //sql de inserção
    const sql = `INSERT INTO 
                    produto (nome_produto)
                    VALUES (?)`;
    //parametros de inserção
    const params = [nomeProduto];

    try {
        const [resposta] = await conexao.query(sql,params);
        return [201,{mensagem:"Produto cadastrado com sucesso"}];
    } catch (error) {
        return[500,{
            mensagem:'Erro Servidor',
            code:error.code,
            sql:error.sqlMensage
        }]
        //console.error(error);
    }

}
//mostrando produtos da Tabela produto
const mostrarProdutos = async () =>{
    console.log('ProdutoModel :: mostrarProdutos');
    
    //SQL para realizar consulta
    const sql = 'SELECT * FROM produto';

    try{
        //pegando primeiro array de resposta
        const [resposta] = await conexao.query(sql);
        console.log(resposta)
    } catch (error){
        console.error(error);
    }
}


const atualizandoProduto = async(id_produto,nomeProduto)=>{
    console.log('ProdutoModel :: atualizandoProduto');

    //SQL Update produto
    const sql = `UPDATE produto 
                    SET nome_produto = ?
                    WHERE id_produto = ?`;
    const params = [nomeProduto, id_produto];

    try {
        const [resposta] = await conexao.query(sql, params);
        console.log(resposta);
    } catch (error) {
        console.error(error);
    }
}

const deletandoProduto = async(id_produto) =>{
    console.log('produtoModel :: deletandoProduto');

    //SQL UpdateProduto 
    const sql = `DELETE FROM produto 
                    WHERE id_produto =?`;

    const params = [id_produto];

    try {
        const [resposta] = await conexao.query (sql,params);
        console.log (resposta);
        if (resposta.affectedRows < 1){
            return [404, {mensagem: 'Produto não encontrado'}]
        }else{
            return [200, {mensagem: 'Produto deletado com sucesso'}]
        }
    } catch (error) {
        console.error (error);     
        return [500, {
            mensagem: 'Error Servidor', 
            code:error.code,
            sql:error.sqlMensage
        }]   
    }
}

//console.log(await deletandoProduto(8));
//atualizandoProduto(7,'laranja');
//criandoProduto('ameixa');
//mostrarProdutos();