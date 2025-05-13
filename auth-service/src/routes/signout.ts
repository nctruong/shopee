import express from "express";
import { body } from "express-validator"

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
    const { email, password } = req.body

    if (!email || typeof email !== 'string') {
        res.status(400).send('invalid email')
    }
})

export { router as signoutRouter }