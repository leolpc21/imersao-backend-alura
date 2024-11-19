import express from "express";

const posts = [
  {
    id: 1,
    descricao: "Primeiro post",
    imagem: "https://placecats.com/millie/300/150"
  },
  {
    id: 2,
    descricao: "Segundo post",
    imagem: "https://placecats.com/millie_neo/300/200"
  },
  {
    id: 3,
    descricao: "Terceiro post",
    imagem: "https://placecats.com/cat/300/200"
  },
  {
    id: 4,
    descricao: "Quarto post",
    imagem: "https://placecats.com/kitten/200/300"
  },
  {
    id: 5,
    descricao: "Quinto post",
    imagem: "https://placecats.com/cute/150/150"
  }
];

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

function buscarPostPorId(id) {
  return posts.findIndex((post) => post.id === Number(id));
}

app.get("/posts/:id", (req, res) => {
  const index = buscarPostPorId(req.params.id);
  res.status(200).json(posts[index]);
});