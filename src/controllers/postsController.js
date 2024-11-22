// Importa as funções para obter todos os posts e criar um novo post do módulo 'postsModel.js'.
// Importa o módulo 'fs' para realizar operações com o sistema de arquivos.
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/serviceGimini.js";

// Função assíncrona para listar todos os posts.
// Retorna uma resposta JSON com status 200 e os posts como corpo da resposta.
export async function listarPosts(req, res) {
  // Chama a função getTodosPosts para obter os dados dos posts do banco de dados.
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post.
// Utiliza um bloco try-catch para tratar possíveis erros durante a criação do post.
export async function criarNovoPost(req, res) {
  // Extrai os dados do novo post do corpo da requisição.
  const novoPost = req.body;

  try {
    // Chama a função criarPost para inserir o novo post no banco de dados.
    const postCriado = await criarPost(novoPost);
    // Retorna uma resposta JSON com status 200 e o post criado como corpo da resposta.
    res.status(200).json(postCriado);
    // Captura qualquer erro que possa ocorrer durante a criação do post.
  } catch (error) {
    // Loga a mensagem de erro no console para facilitar o debug.
    console.error(error.message);
    // Retorna uma resposta JSON com status 500 (Erro interno do servidor) e uma mensagem de erro genérica.
    res.status(500).json({ "error": "Falha no servidor." });
  }
}

// Função assíncrona para realizar o upload de uma imagem e criar um novo post.
// Utiliza um bloco try-catch para tratar possíveis erros durante o processo de upload.
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome original do arquivo da imagem.
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  try {
    // Chama a função criarPost para inserir o novo post no banco de dados.
    const postCriado = await criarPost(novoPost);
    // Constrói o novo nome do arquivo da imagem com base no ID do post inserido.
    const imgAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Utiliza a função fs.renameSync para renomear o arquivo da imagem para o novo nome.
    fs.renameSync(req.file.path, imgAtualizada);
    // Retorna uma resposta JSON com status 200 e o post criado como corpo da resposta.
    res.status(200).json(postCriado);
    // Captura qualquer erro que possa ocorrer durante o processo de upload da imagem.
  } catch (error) {
    // Loga a mensagem de erro no console para facilitar o debug.
    console.error(error.message);
    // Retorna uma resposta JSON com status 500 (Erro interno do servidor) e uma mensagem de erro genérica.
    res.status(500).json({ "error": "Falha no servidor." });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImg = `http://localhost:3000/${id}.png`;

  try {
    const imgBuffer = fs.readFileSync(`./uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      descricao: descricao,
      imgUrl: urlImg,
      alt: req.body.alt
    }
    const postNovo = await atualizarPost(id, post);
    // Retorna uma resposta JSON com status 200 e o post criado como corpo da resposta.
    res.status(200).json(postNovo);
    // Captura qualquer erro que possa ocorrer durante a criação do post.
  } catch (error) {
    // Loga a mensagem de erro no console para facilitar o debug.
    console.error(error.message);
    // Retorna uma resposta JSON com status 500 (Erro interno do servidor) e uma mensagem de erro genérica.
    res.status(500).json({ "error": "Falha no servidor." });
  }
}