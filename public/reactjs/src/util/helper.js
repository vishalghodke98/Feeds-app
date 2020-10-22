/*Regex for validate the exact match*/
export const verifyAlpha = value => {
    var alphaRex = new RegExp('^[ A-Za-z]{1,250}$');
    return alphaRex.test(value);
};

export const verifyString = value => {
    const string = new RegExp('[-_ a-zA-Z0-9]{1,250}');
    return string.test(value);
};

