import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida pelo ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts da coleção "posts"
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabyte"
  const db = conexao.db("imersao-instabyte");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna como um array
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados.
export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabyte".
  const db = conexao.db("imersao-instabyte");
  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");
  // Insere o novo post na coleção e retorna o resultado da operação.
  return colecao.insertOne(novoPost);
}