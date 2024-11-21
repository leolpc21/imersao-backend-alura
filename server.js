import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Inicializa o servidor Express
const app = express();
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});


// const posts = [
//   {
//     id: 1,
//     descricao: "Primeiro post",
//     imagem: "https://placecats.com/millie/300/150"
//   },
//   {
//     id: 2,
//     descricao: "Segundo post",
//     imagem: "https://placecats.com/millie_neo/300/200"
//   },
//   {
//     id: 3,
//     descricao: "Terceiro post",
//     imagem: "https://placecats.com/cat/300/200"
//   },
//   {
//     id: 4,
//     descricao: "Quarto post",
//     imagem: "https://placecats.com/kitten/200/300"
//   },
//   {
//     id: 5,
//     descricao: "Quinto post",
//     imagem: "https://placecats.com/cute/150/150"
//   }
// ];

// /**
//  * Busca um post pelo seu id.
//  * @param {number} id - o id do post
//  * @returns {object|null} o post encontrado ou null se n o encontrado
//  */
// function buscarPostPorId(id) {
//   const index = posts.findIndex((post) => post.id === Number(id));
//   return posts[index];
// }

// app.get("/posts/:id", (req, res) => {
//   const post = buscarPostPorId(req.params.id);
//   if (post) {
//     res.status(200).json(post);
//   } else {
//     res.status(404).json({ message: "Post não encontrado" });
//   }
// });