const getCepService = async (cep: string) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.json();
    return data;
} 

export default getCepService;