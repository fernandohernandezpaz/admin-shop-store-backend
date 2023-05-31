import * as bcrypt from 'bcrypt';

export class Encrypter {
  private readonly saltOrRound: number = 10;

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRound);
  }
}
