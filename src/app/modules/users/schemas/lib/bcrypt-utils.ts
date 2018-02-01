import { genSalt, hash, compare } from 'bcrypt';

export class BcryptUtils {

  static async createPasswordHash(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  static async validatePassword(password, passwordHash): Promise<Boolean> {
    return compare(password, passwordHash);
  }

}
