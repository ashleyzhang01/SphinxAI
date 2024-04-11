const getUser = async (id: string) => {
    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return user.json();
}

const getAllUsers = async () => {
    const users = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return users.json();
}

export {getUser, getAllUsers};