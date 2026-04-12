export type StoredUser = {
    fullName: string
    email: string,
    password: string,
};

const USERS_KEY = "userSignUp";
const CURRENT_USER_KEY = "currentUser";

export function getStoredUser(): StoredUser[] {
    const data = localStorage.getItem(USERS_KEY);

    if(!data) return [];

    try{
        return JSON.parse(data) as StoredUser[];
    } catch {
        return []
    }
};

export function saveStoredUser(users: StoredUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
};

export function createUser(user: StoredUser) {
    const users = getStoredUser();

    const alreadyExists = users.some(
        (existingUser) => existingUser.email.trim().toLowerCase() === user.email.trim().toLocaleLowerCase());

   if(alreadyExists) {
    throw new Error("An account with this email already exists.")
   };

   users.push(user);
   saveStoredUser(users);
};

export function loginUser(email: string, password: string) {
    const users = getStoredUser();

    if(!users.length) {
        throw new Error("No account found. Please sign up first");
    };

    const foundUser = users.find(
        (user) => user.email.trim().toLowerCase() === email.trim().toLowerCase() && user.password === password
    );

    if(!foundUser) {
        throw new Error("Incorrect email or password.");
    };

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify({
            fullName: foundUser.fullName,
            email: foundUser.email,
        })
    );

    return foundUser;
};


export function getCurrentUser(): {fullName: string; email: string} | null {
    const data = localStorage.getItem(CURRENT_USER_KEY);

    if(!data) return null;

    try{
        return JSON.parse(data) as {fullName: string; email: string};
    } catch {
        return null;
    }
};


export function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}