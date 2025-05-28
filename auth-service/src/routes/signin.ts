import express, { Request, Response } from "express";
import {body} from "express-validator";
import {validateRequest} from "@willnguyen/shopee-common";
import { User } from "../models/user";
import { BadRequestError } from "@willnguyen/shopee-common"
import { PasswordService } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/users/signin",
    [
        body("email")
            .isEmail()
            .withMessage("Email is required"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError("User does not exist");
        }

        const passwordMatch = await PasswordService.compare(existingUser.password, password);

        if (!passwordMatch) {
            throw new BadRequestError("Passwords do not match");
        }

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt,
        };

        res.status(200).send(existingUser);
    })

export {router as signinRouter}
