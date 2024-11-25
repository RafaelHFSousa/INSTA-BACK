import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import cors from "cors"
import {
  listarPosts,
  postarNovoPost,
  uploadImagem, atualizarNovoPost
} from "../controllers/postsController.js";

// =========== AULA 05 - PARTE DO FRONT ==========
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}
// =============== AULA 4 RECEITA DE BOLO ===============
// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, "uploads/"); // Substitua por seu caminho de upload desejado
  },
  filename: function (req, file, cb) {
 // Mantém o nome original do arquivo por simplicidade
 cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
}
});

// Cria uma instância do middleware Multer
const upload = multer({ dest: "./uploads", storage });

// Define as rotas usando o objeto Express app
const routes = (app) => {
  // Permite que o servidor interprete corpos de requisições no formato JSON
  app.use(express.json());
  // ==== AULA 05 parte do front =========
  app.use(cors(corsOptions))
  // Rota para buscar todos os posts
  app.get("/posts", listarPosts);

  // ========= aula 4 criando algo no bd ==========
  // rota para criar novo post
  app.post("/posts", postarNovoPost);
  
 // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
  app.post("/upload", upload.single("imagem"), uploadImagem);

  // =================== AULA 05 - PUT =================
  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;
