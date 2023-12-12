import { EmailSchema } from "./gmail.models";

export function validateEmail(email: string): boolean {
  try {
    EmailSchema.parse(email);
    return true;
  } catch (error) {
    return false;
  }
}
