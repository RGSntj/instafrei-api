import { DiarioRepository, IDiario } from "../repository/diarioRepository.js";

export class DiarioService {
  constructor(private readonly diarioRepository: DiarioRepository) {}

  async criar(diario: IDiario, idUsuario: string) {
    const idDiarioCriado = await this.diarioRepository.criar(diario, idUsuario);

    return idDiarioCriado;
  }
}
