import { Repository } from "typeorm";
import Address from "../database/models/Address";
import User from "../database/models/User";

export default class AddressRepository {
    private addressRepository;
    private userRepository;

    constructor(addressRepository: Repository<Address>, userRepository: Repository<User>){
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;

    }

    async createAdress(id: number, address: Address): Promise<{succes:boolean, message?: string}>{
        const user = await this.userRepository.findOne({where: {id}});
        const newAddress = await this.addressRepository.save(address);

        if(!user){
            return {
                succes: false,
                message: 'User not found'
            }
        }

        user.address = newAddress;
        await this.userRepository.save(user);

        return {succes: true};


    }


}