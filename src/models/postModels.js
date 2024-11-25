// ======== AULA 05 - SUBIR PARA CLOUD ==========
import 'dotenv/config';

// Conecta ao banco de dados
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabyte"
  const db = conexao.db("imersao-instabyte");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Executa uma consulta para encontrar todos os documentos na coleção e retorna como um array
  return colecao.find().toArray();
}

// =========== AULA 4 ============
export async function criarPost(novoPost) {
  const db = conexao.db("imersao-instabyte");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
}

// ============= AULA 05 ================

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabyte");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);

  return colecao.updateOne({ _id: new ObjectId(objID)}, {$set: novoPost});
}
