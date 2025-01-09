import Address from "../database/models/Address";
import AddressRepository from "../repositories/AddressRepository";
import getCepService from "../services/getCepService";
import AddressCep from "../services/interfaces/AddreesCep";
import {Request, Response} from "express";

interface requestbodyAdress{
    cep: string,
    street: string,
    number: string
}

export default class AddressController {
    private adressRepository;

    constructor(addressRepository: AddressRepository){
        this.adressRepository = addressRepository;
    }

    async createAddress(req: Request, res: Response){
        const {cep, street, number} = req.body as requestbodyAdress;
        const userId = req.user?.userId
        
        const addressCep: AddressCep = await getCepService(cep);
        console.log(addressCep);
        

        const newAddress = new Address(addressCep.localidade, addressCep.estado, street, number, addressCep.logradouro);

        console.log("chegou aqui")

        const {succes, message} = await this.adressRepository.createAdress(Number(userId), newAddress);

        if(!succes){
            return res.status(404).json({error: message});
        }

        return res.sendStatus(204);
    }
}