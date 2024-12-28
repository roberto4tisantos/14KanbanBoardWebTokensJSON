import { Ticket } from '../models/ticket.js';
import { User } from '../models/user.js';
// GET /tickets
// @ts-ignore
export const getAllTickets = async (_req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [
                {
                    model: User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        res.json(tickets);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
};
// GET /tickets/:id
// @ts-ignore
export const getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        if (ticket) {
            res.json(ticket);
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
};
// POST /tickets
// @ts-ignore
export const createTicket = async (req, res) => {
    const { name, status, description, assignedUserId } = req.body;
    try {
        const newTicket = await Ticket.create({ name, status, description, assignedUserId });
        res.status(201).json(newTicket);
    }
    catch (error) {
        // @ts-ignore
        res.status(400).json({ message: error.message });
    }
};
// PUT /tickets/:id
// @ts-ignore
export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { name, status, description, assignedUserId } = req.body;
    try {
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            // @ts-ignore
            ticket.name = name;
            // @ts-ignore
            ticket.status = status;
            // @ts-ignore
            ticket.description = description;
            // @ts-ignore
            ticket.assignedUserId = assignedUserId;
            await ticket.save();
            res.json(ticket);
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(400).json({ message: error.message });
    }
};
// DELETE /tickets/:id
// @ts-ignore
export const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            await ticket.destroy();
            res.json({ message: 'Ticket deleted' });
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
};
