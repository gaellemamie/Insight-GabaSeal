import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const encryptPassword = async (password: string): Promise<string> => {
     try {
          const salt = await bcrypt.genSalt(saltRounds);
          const hashedPassword = await bcrypt.hash(password, salt);
          return hashedPassword;
     } catch (error) {
          console.error("Error encrypting password:", error);
          throw new Error("Failed to encrypt password");
     }
 };

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
     try {
          return await bcrypt.compare(password, hashedPassword);
     } catch (error) {
          console.error("Error verifying password:", error);
          throw new Error("Failed to verify password");
     }
};