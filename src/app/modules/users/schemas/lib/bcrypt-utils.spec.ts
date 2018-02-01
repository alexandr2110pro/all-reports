import { BcryptUtils } from './bcrypt-utils';

jest.setTimeout(15000);

describe('BcryptUtils', () => {

  describe('validatePassword(password, hash)', () => {

    it('should not throw', () => {
      expect(() => BcryptUtils.createPasswordHash('password')).not.toThrow();
    });

    it('should validate if the hash was created from the same password', async () => {
      const password = 'test-password';
      const hashedPassword: string = await BcryptUtils.createPasswordHash(password);

      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword.length).toBeGreaterThan(8);

      const isValid: Boolean = await BcryptUtils.validatePassword(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should not validate if the hash was created from the different password', async () => {
      const password = 'test-password';
      const hashedPassword: string = await BcryptUtils.createPasswordHash(password);

      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword.length).toBeGreaterThan(8);

      const isValid: Boolean = await BcryptUtils.validatePassword(password, hashedPassword);
      expect(isValid).toBe(true);
    });

  });

});
