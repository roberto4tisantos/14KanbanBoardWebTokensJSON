import { User } from '../models/user.js';
// GET /Users
// @ts-ignore
export const getAllUsers = async (_req, res) => {
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
// @ts-ignore
export const getUserById = async (req, res) => {
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
// @ts-ignore
export const createUser = async (req, res) => {
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
// @ts-ignore
export const updateUser = async (req, res) => {
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
// @ts-ignore
export const deleteUser = async (req, res) => {
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
