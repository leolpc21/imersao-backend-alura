// Importa o cliente MongoDB para interagir com o banco de dados
import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
  // Cria uma variável para armazenar a instância do cliente MongoDB
  let client;

  try {
    // Cria uma nova instância do cliente MongoDB usando a string de conexão fornecida
    client = new MongoClient(stringConexao);
    console.log('Conectando ao banco de dados...'); // Mensagem de log para indicar o início da conexão

    // Conecta ao banco de dados de forma assíncrona
    await client.connect();
    console.log('Conectado ao banco de dados com sucesso!'); // Mensagem de log para indicar o sucesso da conexão

    // Retorna a instância do cliente para uso em outras partes da aplicação
    return client;
  } catch (error) {
    // Captura qualquer erro que possa ocorrer durante a conexão
    console.error('Falha ao conectar ao banco de dados:', error);

    // Fecha a conexão com o banco de dados, se ela tiver sido estabelecida
    if (client) {
      await client.close();
    }

    // Encerra o processo com código de erro 1 para indicar uma falha
    process.exit(1);
  }
}