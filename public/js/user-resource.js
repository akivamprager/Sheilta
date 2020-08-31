// all of the functions regarding user accounts in Discourse
async function createNewUser(name, email, password, username) {
    const user = {
        "name": name,
        "email": email,
        "password": password,
        "username": username,
        "active": true,
        "approved": true
    }
    return await axios.post(`/api/v1/users`, user);
}
async function createNewUserWithoutEmail(name) {
    const username = name.replace(/\s+/g, '');
    const password = generatePassword();
    const email = `akivaraspi+${username}@gmail.com`;
    const user = {
        "name": name,
        "email": email,
        "password": password,
        "username": username,
        "active": true,
        "approved": true
    }
    return await axios.post(`/api/v1/users`, user);
}

async function logOut(user) {
    return await axios.post(`/api/v1/users/${user}/logout`);
}
//util
function generatePassword() {
    var length = 12,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
