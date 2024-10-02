
// import modules and dependencies
import {v4 as Id} from "uuid"

const users = [
    {
        id: Id(),
        email: "daria@gmail.com",
        password: "loveCake",
    }
]

class User {
    static getByEmail(email) {
        return users.find((user => user.email === email))
    }
    static addUser(user) {
        const newUser = {
            id: Id(), 
            ...user
        }
        users.push(newUser)
        return newUser
    }
}

export default User;