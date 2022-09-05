import * as businessRepository from "../repositories/businessRepository";
import * as cardService from "../services/cardService";
import * as paymentRepository from "../repositories/paymentRepository";

const isLock = async (card: any) => {
    if (card.isBlocked) {
        throw { code: "Unauthorized", message: "Cartão está bloqueado" }
    };
};

const checkBusiness = async (businessId: number) => {
    const business = await businessRepository.findById(businessId);

    if (!business) {
        throw { code: "NotFound", message: "Estabelecimento não encontrado" }
    };

    return business;
};

const checkTypes = async (cardType: string, businessType: string) => {
    if (cardType !== businessType) {
        throw { code: "NotAcceptable", message: "Tipo de cartão imcompartivel com o tipo do estabelecimento" }
    };
};

const checkBalance = async (cardId: number, amount: number) => {
    const { balance } = await cardService.balanceCard(cardId)

    if (amount > balance) {
        throw { code: "NotAcceptable", message: "Saldo insuficiente" }
    };
};

const purchase = async (payment: paymentRepository.PaymentInsertData) => {
    await paymentRepository.insert(payment);
};

export {
    isLock,
    checkBusiness,
    checkTypes,
    checkBalance,
    purchase
};