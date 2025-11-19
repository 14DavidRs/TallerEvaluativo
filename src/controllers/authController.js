import prisma from '../config/prisma.js'; 
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const { email, password } = req.body; 

    try {
        
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword }
        });

        
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword); 

    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};