import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwtGen.handle"
import { RequestExtended } from "../interfaces/reqExtended.interface"

const checkAuth = async (req: RequestExtended, res: Response, next: NextFunction) => {
    try {
        const reqJwtBearer = req.headers.authorization || ' '
        const reqJwt = reqJwtBearer.split(' ').pop()

        const tokenIsCorrect = verifyToken(`${reqJwt}`) as {userId:string}
        
        if(!tokenIsCorrect){
            res.status(401).send("INVALID_SESSION")
        } else {
            req.user = tokenIsCorrect;            
            next()
        }
        
    } catch (error) {
        res.status(400).send("NOT_VALID_AUTH")
    }    
}

export {
    checkAuth
} 