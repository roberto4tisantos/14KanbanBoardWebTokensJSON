import { User } from '../models/user.js';
// GET /Users
export const getAllUsers = async (/** @type {any} */ _req, /** @type {{ json: (arg0: User[]) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: any; }): void; new (): any; }; }; }} */ res) => {
    try {
        // @ts-ignore
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
};
// GET /Users/:id
export const getUserById = async (/** @type {{ params: { id: any; }; }} */ req, /** @type {{ json: (arg0: User) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: any; }): void; new (): any; }; }; }} */ res) => {
    const { id } = req.params;
    try {
        // @ts-ignore
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
};
// POST /Users
export const createUser = async (/** @type {{ body: { username: any; password: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: User): void; new (): any; }; }; }} */ res) => {
    const { username, password } = req.body;
    try {
        // @ts-ignore
        const newUser = await User.create({ username, password });
        res.status(201).json(newUser);
    }
    catch (error) {
        // @ts-ignore
        res.status(400).json({ message: error.message });
    }
};
// PUT /Users/:id
export const updateUser = async (/** @type {{ params: { id: any; }; body: { username: any; password: any; }; }} */ req, /** @type {{ json: (arg0: User) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: any; }): void; new (): any; }; }; }} */ res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        // @ts-ignore
        const user = await User.findByPk(id);
        if (user) {
            // @ts-ignore
            user.username = username;
            user.password = password;
            await user.save();
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(400).json({ message: error.message });
    }
};
// DELETE /Users/:id
export const deleteUser = async (/** @type {{ params: { id: any; }; }} */ req, /** @type {{ json: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: any; }): void; new (): any; }; }; }} */ res) => {
    const { id } = req.params;
    try {
        // @ts-ignore
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
};
