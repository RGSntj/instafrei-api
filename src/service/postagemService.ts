import {
  IPostagem,
  PostagemRepository,
} from "../repository/postagemRepository.js";

export class PostagemService {
  constructor(private readonly postagemRepository: PostagemRepository) {}

  async criar(postagem: IPostagem, idUsuario: string) {
    const id = await this.postagemRepository.criar(postagem, idUsuario);

    return id;
  }

  async pegarTodasAsPostagens() {
    const postagens = await this.postagemRepository.pegarTodasAsPostagens();
    return postagens;
  }
}
