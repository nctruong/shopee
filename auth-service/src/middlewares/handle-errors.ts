import { Request, Response, NextFunction } from 'express'
import {ValidationError, validationResult} from "express-validator";

export const handleErrors = (req: Request, res: Response, next: NextFunction) => {
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

    next()
}
