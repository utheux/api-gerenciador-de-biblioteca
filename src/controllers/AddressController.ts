import Address from "../database/models/Address";
import AddressRepository from "../repositories/AddressRepository";
import adapterAdressService from "../services/adapterAdressService";
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
        
        const newAddress = await adapterAdressService(cep, street, number);
        const {succes, message} = await this.adressRepository.createAdress(Number(userId), newAddress);

        if(!succes){
            return res.status(404).json({error: message});
        }

        return res.sendStatus(204);
    }
}