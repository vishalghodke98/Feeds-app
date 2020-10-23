
// function that returns true if value is email, false otherwise
export const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRex.test(value);
};
// function that verifies if a string has a given length or not
export const verifyLength = (value, length) => {
    return value.length === length;
};

export const verifyAlpha = value => {
    var alphaRex = new RegExp('^[ A-Za-z]{1,250}$');
    return alphaRex.test(value);
};