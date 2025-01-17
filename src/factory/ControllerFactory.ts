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

class ControllerFactory {
    private static createRepository(model: any, additionalModel?: any) {
        const myDataSource = DataSourceSingleton.getInstance();
        if (additionalModel) {
            return new model(myDataSource.getRepository(model), myDataSource.getRepository(additionalModel));
        }
        return new model(myDataSource.getRepository(model));
    }

    private static configureNotifiers() {
        const bookNotifier = new BookNotifier();
        const userNotifier = new UserNotifier();
        bookNotifier.attach(userNotifier);
        return { bookNotifier, userNotifier };
    }

    static createBookController() {
        const { bookNotifier } = ControllerFactory.configureNotifiers();
        const bookRepository = ControllerFactory.createRepository(Book);
        return new BookController(bookRepository, bookNotifier);
    }

    static createUserController() {
        const userRepository = ControllerFactory.createRepository(User, Role);
        return new UserController(userRepository);
    }

    static createAuthController() {
        const authRepository = ControllerFactory.createRepository(User, Role);
        return new AuthController(authRepository);
    }

    static createRoleController() {
        const roleRepository = ControllerFactory.createRepository(Role);
        return new RoleController(roleRepository);
    }

    static createAddressController() {
        const addressRepository = ControllerFactory.createRepository(Address, User);
        return new AddressController(addressRepository);
    }
}

export default ControllerFactory;
