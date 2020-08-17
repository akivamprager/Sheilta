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
async function logOut(user){
    return await axios.post(`/api/v1/users/${user}/logout`);
}