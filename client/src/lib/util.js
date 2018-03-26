export const toCurrency = function (num) {
    return Number(num).toLocaleString("en-CA", { style: "currency", currency: "CAD" });
};
