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

class ControllerFactory {
    static createController (controller: string) {
        const myDataSource = DataSourceSingleton.getInstance();
        
        switch (controller) {
            case "book":
                const bookNotifier = new BookNotifier()
                const userNotifier = new UserNotifier();
                
                bookNotifier.attach(userNotifier);
                   
                const bookRepository = new BookRepository(myDataSource.getRepository(Book));
                const bookController = new BookController(bookRepository, bookNotifier); 
                return bookController;

            case "user":
                const userRepository = new UserRepository(myDataSource.getRepository(User), myDataSource.getRepository(Role));
                const userController = new UserController(userRepository);
                return userController
            
            case "auth":
                const userRepository2 = new UserRepository(myDataSource.getRepository(User), myDataSource.getRepository(Role));
                const authController = new AuthController(userRepository2);
                return authController;
            
            case "role":
                const roleRepository = new RoleRepository(myDataSource.getRepository(Role));
                const roleController = new RoleController(roleRepository);
                return roleController;
            
            case "address":
                const adressRepository = new AddressRepository(myDataSource.getRepository(Address), myDataSource.getRepository(User));
                const adressController = new AddressController(adressRepository);

                return adressController;
            
            default:
                throw new Error(`Unknown controller: ${controller}`);
        }
    }
}

export default ControllerFactory;