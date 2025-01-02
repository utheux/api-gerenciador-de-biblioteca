import { createHash } from "crypto";


const hashPasswordService = (password: string) => {
   const hash = createHash("sha256");
   hash.update(password);
   return hash.digest("hex");
}

export default hashPasswordService;