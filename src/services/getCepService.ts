import AddressCep from "./interfaces/AddreesCep";

const getCepService = async (cep: string) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data: AddressCep = await response.json() as AddressCep;
    return data;
} 

export default getCepService;