import * as rechargeRepository from "../repositories/rechargeRepository";

const recharge = async (id: number, amount: number) => {
    await rechargeRepository.insert({cardId: id, amount});
};

const checkIfCardIsActivated = async (card: any) => {
    if (!card.password) {
        throw {code: "Unauthorized", message: "Cartão não está ativado" }
    };
};

export {
    recharge,
    checkIfCardIsActivated
};