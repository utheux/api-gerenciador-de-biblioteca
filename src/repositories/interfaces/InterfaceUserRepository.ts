import User from "../../database/models/User";

export default interface InterfaceUserRepository {
    createUser(user: User): Promise<void>;

    userList(): Promise<User[]>;

    updateUser(id: number, newUser: User): Promise<{success: boolean; message?: string}>;

    deleteUser(id: number): Promise<{success: boolean; message?: string}>;

}