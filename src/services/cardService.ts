import * as cardRepository from "../repositories/cardRepository"
import { faker } from "@faker-js/faker";
import { formatEmployeeName } from "../utils/formatEmployeeName";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

const validateCardApiKey =  async (apiKey: string | undefined) => {
    if (!apiKey) {
        throw { code: "PaymentRequired", message: "ApiKey não recebida" };
    };

    const company = await cardRepository.findByApiKey(apiKey)

    if (!company){
        throw { code: "NotFound", message: "Empresa não encontrada" }
    };
};

const checkRegisteredEmployee = async (cpf: string) => {
    const employee = await cardRepository.findByEmproyee(cpf);

    if(!employee) {
        throw { code: "Unauthorized", message: "Somente empregados cadastrados podem ter cartões"}
    };

    return employee;
};

const checkIfAlreadyHaveThisCard = async (type: any, employeeId: number ) => {
    const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);

    if (card) {
        throw {code: "Conflict", message: "Empregado já tem esse cartão"}
    };
};

const createCard = async (employeeId: number, employeeName: string, type: any) => {
    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);
    const number: string = faker.finance.account(16);
    const securityCode: string = cryptr.encrypt(faker.finance.account(3));
    const cardholderName: string =  formatEmployeeName(employeeName);
    const expirationDate: string = dayjs().add(5, "years").format("MM/YYYY");

    const cardData = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: undefined,
        isVirtual: false,
        originalCardId: undefined,
        isBlocked: true,
        type,
    };

    await cardRepository.insert(cardData);
};

export {
    validateCardApiKey,
    checkRegisteredEmployee,
    checkIfAlreadyHaveThisCard,
    createCard
};