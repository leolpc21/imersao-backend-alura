// Importa o módulo Express para criar a aplicação web.
import express from "express";
// Importa as funções controladoras para posts do arquivo postsController.js
import { listarPosts, criarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
// Importa o módulo multer para lidar com uploads de arquivos
import multer from "multer";
import cors from "cors";

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define a pasta "uploads" como destino
  },
  // Define o nome do arquivo carregado usando o nome original
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware JSON para analisar requisições no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts (caminho: "/posts")
  app.get("/posts", listarPosts);
  // Rota POST para criar um novo post (caminho: "/posts")
  app.post("/posts", criarNovoPost);
  // Rota POST para upload de imagens (caminho: "/upload")
  // Utiliza o middleware multer para processar o upload do arquivo "imagem"
  app.post("/upload", upload.single("imagem"), uploadImagem);
  
  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para ser utilizada na aplicação principal
export default routes;