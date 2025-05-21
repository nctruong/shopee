import express, {Request, Response} from "express";
import {body} from "express-validator";
import jwt from "jsonwebtoken";
import {handleErrors} from "../middlewares/handle-errors";
import {User} from "../models/user";
import {validateRequest} from "../middlewares/validate-request";

const router = express.Router();

router.post("/api/users/signup",
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid')
            .custom(async email => {
                const user = await User.findOne({email});
                if (user) {
                    throw new Error("Email already exists");
                }
            }),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Pass must be between 4 and 20 chars'),
        body('username').notEmpty().withMessage('Username is required'),
        body('role').custom(async role => {
            if (role !== 'member') {
                throw new Error('Only members are allowed');
            }
        })
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password, username, role} = req.body
        const existingUser = await User.findOne({email});
        const user = User.build({email, password, username, role});
        await user.save()

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt,
        };

        res.status(201).send(user)
    })

export {router as signupRouter}
