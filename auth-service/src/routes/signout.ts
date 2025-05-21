import express, {Request, Response} from "express";
import {body} from "express-validator"

const router = express.Router();

router.post("/api/users/signout",
    (req: Request, res: Response) => {
        req.session = null
        res.send( {currentUser: null})
    }
)

export {router as signoutRouter}
