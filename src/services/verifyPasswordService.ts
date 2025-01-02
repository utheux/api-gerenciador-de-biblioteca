import hashPasswordService from "./hashPasswordService"

const verifyPassword = (inputPassword: string, storedHash: string): boolean => {
    const inputPasswordHash = hashPasswordService(inputPassword);
    return inputPasswordHash === storedHash;
}

export default verifyPassword;