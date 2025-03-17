import express from 'express';
import { createProduto } from './controllers/ProdutoController.js';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('API Funcionando');
});

//CRUD produto
app.post('/produto', createProduto);
app.listen(port,()=>{
    console.log(`API Rodando na Porta ${port}`)
});