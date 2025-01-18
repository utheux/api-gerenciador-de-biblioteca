import AddressController from "../controllers/AddressController";
import AuthController from "../controllers/AuthController";
import BookController from "../controllers/BookController";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import DataSourceSingleton from "../database/DataSourceSingleton";
import Address from "../database/models/Address";
import Book from "../database/models/Book";
import Role from "../database/models/Role";
import User from "../database/models/User";
import BookNotifier from "../observer/BookNotifier";
import UserNotifier from "../observer/UserNotifier";
import AddressRepository from "../repositories/AddressRepository";
import BookRepository from "../repositories/BookRepository";
import RoleRepository from "../repositories/RoleRespository";
import UserRepository from "../repositories/UserRepository";

 
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ControllerFactory {
    private static myDataSource = DataSourceSingleton.getInstance();

    private static configureNotifiers() {
        const bookNotifier = new BookNotifier();
        const userNotifier = new UserNotifier();
        bookNotifier.attach(userNotifier);
        return { bookNotifier, userNotifier };
    }

    static createBookController() {
        const { bookNotifier } = ControllerFactory.configureNotifiers();
        const bookRepository = new BookRepository(ControllerFactory.myDataSource.getRepository(Book));
        return new BookController(bookRepository, bookNotifier);
    }

    static createUserController() {
        const userRepository = new UserRepository(ControllerFactory.myDataSource.getRepository(User), ControllerFactory.myDataSource.getRepository(Role));
        return new UserController(userRepository);
    }

    static createAuthController() {
        const userRepository = new UserRepository(ControllerFactory.myDataSource.getRepository(User), ControllerFactory.myDataSource.getRepository(Role));
        return new AuthController(userRepository);
    }

    static createRoleController() {
        const roleRepository = new RoleRepository(ControllerFactory.myDataSource.getRepository(Role));
        return new RoleController(roleRepository);
    }

    static createAddressController() {
        const addressRepository = new AddressRepository(ControllerFactory.myDataSource.getRepository(Address), ControllerFactory.myDataSource.getRepository(User));
        return new AddressController(addressRepository);
    }
}

export default ControllerFactory;
