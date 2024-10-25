import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		httpOnly: true,                             // No accesible desde el frontend
		secure: process.env.NODE_ENV == "production", // Solo en HTTPS en producción
		sameSite: "None",                           // Permitir cross-origin
		maxAge: 15 * 24 * 60 * 60 * 1000,           // Expiración de 15 días
	});

	return token;
};

export default generateTokenAndSetCookie;
