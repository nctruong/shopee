import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentUser", (req: Request, res: Response) => {
    if (!req.session?.jwt) {
        res.send({currentUser: null})
        return;
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        res.send( {currentUser: payload})
    } catch (err) {
        res.status(401).send({ currentUser: null });
    }

})

export { router as currentUserRouter }
