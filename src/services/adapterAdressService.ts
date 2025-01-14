import Address from "../database/models/Address";
import getCepService from "./getCepService";
import AddressCep from "./interfaces/AddreesCep";

const adapterAdressService = async (cep: string, street: string, number: string) => {
    const addressCep: AddressCep = await getCepService(cep);  

        const newAddress = new Address(addressCep.localidade, addressCep.estado, street, number, addressCep.logradouro);

        return newAddress;

}

export default adapterAdressService;