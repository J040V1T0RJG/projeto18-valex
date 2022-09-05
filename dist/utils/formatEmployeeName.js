"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatEmployeeName = void 0;
const formatEmployeeName = (name) => {
    let formatName = "";
    let temporaryNameArray = name.split(" ");
    for (let i = 0; i < temporaryNameArray.length; i++) {
        if (i === 0) {
            formatName += temporaryNameArray[i] + " ";
        }
        else if (i === (temporaryNameArray.length - 1)) {
            formatName += temporaryNameArray[i];
        }
        else {
            if (temporaryNameArray[i].length >= 3) {
                formatName += temporaryNameArray[i][0] + " ";
            }
            ;
        }
        ;
    }
    ;
    return formatName;
};
exports.formatEmployeeName = formatEmployeeName;
