import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (email, password, role) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw { status: 400, message: "Usuario ya existe" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ email, password: hashedPassword, role });

    return { message: "Usuario registrado" };
};

export const loginUser = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw { status: 404, message: "Usuario no encontrado" };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw { status: 401, message: "Credenciales inválidas" };
    }

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return { token };
};
