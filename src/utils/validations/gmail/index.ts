import { EmailSchema } from "./gmail.models";

export function validateEmail(email: string): boolean {
  try {
    EmailSchema.parse(email);
    console.log("correct email format");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
