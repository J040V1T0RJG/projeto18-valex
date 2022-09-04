import * as cardRepository from "../repositories/cardRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import { faker } from "@faker-js/faker";
import { formatEmployeeName } from "../utils/formatEmployeeName";
import { dateHasAlreadyExpired } from "../utils/compareDates";
import { validateFormatPassword } from "../schemas/cardSchemas";
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
        throw { code: "Unauthorized", message: "Somente empregados cadastrados podem ter cartões" }
    };

    return employee;
};

const checkIfAlreadyHaveThisCard = async (type: any, employeeId: number ) => {
    const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);

    if (card) {
        throw {code: "Conflict", message: "Empregado já tem esse cartão" }
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

const checkIfCardIsRegistered = async (id: number) => {
    const card = await cardRepository.findById(id);
    
    if (!card) {
        throw { code: "NotFound", message: "Cartão não encontrado" }
    };

    return card;
};

const checkIfCardIsExpired = async (card: any) => {
    const dateExpired = dateHasAlreadyExpired(card.expirationDate);

    if (dateExpired) {
        throw { code: "Unauthorized", message: "Cartão expirado" }
    };
};

const checkIfCardIsActivated = async (card: any) => {
    if (card.password) {
        throw {code: "Unauthorized", message: "Cartão já está ativado" }
    };
};

const checkCardCVC = async (card: any, cvc: string) => {
    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);
    const cvcDecrypt = cryptr.decrypt(card.securityCode);

    if (cvcDecrypt !== cvc) {
        throw {code: "Unauthorized", message: "SecurityCode invalido" }
    };
};

const validateFormatPasswordAndEncrypts = async (password: string) => {
    const { error } = validateFormatPassword.validate({password}, { abortEarly: false })

    if (error) {
        throw { code: "UnprocessableEntity", message: "Campo password invalido" }
    };

    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);
    const passwordEncrypt = cryptr.encrypt(password);

    return passwordEncrypt;
};

const activateCard = async (id: number, card: any, passwordEncrypt: string) => {
    card.password = passwordEncrypt;

    await cardRepository.update(id, card);
};

const balanceCard = async (id: number) => {
    let amount = 0;
    const payments = await paymentRepository.findByCardId(id);
    const recharges = await rechargeRepository.findByCardId(id);

    payments.map((payment) => {
        amount -= payment.amount
    });
    recharges.map((recharge) => {
        amount += recharge.amount
    });

    const result = {
        balance: amount,
        transactions: payments,
        recharges: recharges
    };

    return result;
};

const checkCardLock = async (isLock: boolean, card: any) => {
    let message;
    const blockedOrNot = (isLock === card.isBlocked);
    
    {isLock? message = "Cartão já está bloqueado" : message = "Cartão já está desbloqueado"};

    if (blockedOrNot) {
        throw { code: "NotAcceptable", message }
    };
};

const checkPassword = async (password: string, card: any) => {
    const cryptr = new Cryptr(`${process.env.SECRET_PASSWORD}`);
    const passwordDecrypt = cryptr.decrypt(card.password);

    if (passwordDecrypt !== password) {
        throw { code: "Unauthorized", message: "Password invalido" }
    };
};

const lockCardOrUnlock = async (id: number, card: any, isLock: boolean) => {
    card.isBlocked = isLock;
    console.log("isLock: ", isLock, "card.isBlocked: ", card.isBlocked);

    await cardRepository.update(id, card);
};

export {
    validateCardApiKey,
    checkRegisteredEmployee,
    checkIfAlreadyHaveThisCard,
    createCard,
    checkIfCardIsRegistered,
    checkIfCardIsExpired,
    checkIfCardIsActivated,
    checkCardCVC,
    validateFormatPasswordAndEncrypts,
    activateCard,
    balanceCard,
    checkCardLock,
    checkPassword,
    lockCardOrUnlock
};