import dayjs from "dayjs";

const dateHasAlreadyExpired = (dueDate: string) => {
    const now = dayjs().format("MM/YYYY");

    const date1 = dueDate.split("/");
    const date2 = now.split("/");

    if (date2[1] > date1[1]) {
        return true;
    } else if (date2[1] === date1[1]) {
        if (date2[0] > date1[0]) {
            return true;
        };
    };

    return false;
};

export {
    dateHasAlreadyExpired
};