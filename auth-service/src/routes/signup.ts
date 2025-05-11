import express, { Request, Response } from "express";
import {body, query, validationResult} from "express-validator";
import {ValidationError} from "express-validator";

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
                console.log('role', role);
                throw new Error('Only members are allowed');
            }
        })
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map((err: ValidationError) => {
                console.log(JSON.stringify(err));
                if (err.type === 'field') {
                    return { message: err.msg, field: err.path };
                }
                return { message: err.msg };
            });
            res.status(400).send({ errors: formattedErrors });
            return
        }
        const {email, password, username} = req.body

        res.send({email, password, username})
    })

export {router as signupRouter}
