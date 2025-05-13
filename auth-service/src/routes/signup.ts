import express, {Request, Response} from "express";
import {body} from "express-validator";
import {handleErrors} from "../middlewares/handle-errors";

const router = express.Router();

router.post("/api/users/signup",
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Pass must be between 4 and 20 chars'),
        body('username').notEmpty().withMessage('Username is required'),
        body('role').custom (async role => {
            if (role !== 'member') {
                throw new Error('Only members are allowed');
            }
        })
    ],
    handleErrors,
    async (req: Request, res: Response) => {
        const {email, password, username} = req.body

        res.send({email, password, username})
    })

export {router as signupRouter}
