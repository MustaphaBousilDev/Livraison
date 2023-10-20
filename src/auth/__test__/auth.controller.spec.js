import { createUser, login } from "./authController";
import bcrypt from "bcryptjs";
import User from "../user/model/user.model";
import { generateToken } from "../../../config/jwtToken";

jest.mock('../utils/helpers',()=>({
    //mocking getJwtToken function
    //"jwt_token" is the value that will be returned when getJwtToken is called
    getJwtToken: jest.fn(()=>"jwt_token")
}))

const mockRequest = ()=>{
    return {
        body: {
            username: "John Doe",
            email: "mugi@gmail.com",
            password: "123456789",
            picture: "picture",
        }
    }
}

const mockResponse = ()=>{
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    }
}

const mockUser={
    _id:"6368dadd983d6c4b181e37c1",
    username: "John Doe",
    email: "mugi@gmail.com",
    password: "hashedPassword",
    picture: "picture",
}

const userLogin={
    email: "mugi@gmail.com",
    password: "123456789"
}

afterEach(()=>{
    //restore the spy created with spyOn
    jest.restoreAllMocks()//restore all mocks created with jest.spyOn in other words restore all mocks created in this file
})


//register
describe('Register User',()=>{
    it('should register a new user',async ()=>{
        jest.spyOn(bcrypt,'hash').mockResolvedValueOnce('hashedPassword')
        jest.spyOn(User,'create').mockResolvedValueOnce(mockUser)
        const mockReq=mockRequest()
        const mockRes=mockResponse()
        await createUser(mockReq,mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(201)
        expect(bcrypt.hash).toHaveBeenCalledWith('123456789',10)
        expect(User.create).toHaveBeenCalledWith({
            username: "John Doe",
            email: "mugi@gmail.com",
            password: "hashedPassword"
        })
    })

    it('should throw validation error',async ()=>{
        const mockReq=mockRequest().body={body:{}}//empty body
        const mockRes=mockResponse()

        //console.log(mockReq)

        await createUser(mockReq,mockRes)
        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Please enter all values",
        })
    })


    it('should throw duplicate email entered error',async ()=>{
        jest.spyOn(bcrypt,'hash').mockResolvedValueOnce('hashedPassword')
        jest.spyOn(User,'create').mockRejectedValueOnce({code: 11000})

        const mockReq=mockRequest()
        const mockRes=mockResponse()

        await createUser(mockReq,mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Duplicate email",
        })
    })
})


//login
describe('Login User',()=>{
    it('should throw missing email or password error',async ()=>{
        const mockReq=mockRequest().body={body:{}}//empty body
        const mockRes=mockResponse()

        await login(mockReq,mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Please enter email & Password",
        })
    })
    //
    it('should throw Invalid email  error',async ()=>{
        jest.spyOn(User,'findOne').mockImplementationOnce(()=>({
            select: jest.fn().mockResolvedValueOnce(null)
        }))

        const mockReq=(mockRequest().body={body:userLogin})
        const mockRes=mockResponse()

        await login(mockReq,mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(401)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Invalid Email or Password",
        })
    })
    it('should throw Invalid password  error',async ()=>{
        jest.spyOn(User,'findOne').mockImplementationOnce(()=>({
            select: jest.fn().mockResolvedValueOnce(mockUser),
        }))

        jest.spyOn(bcrypt,'compare').mockResolvedValueOnce(false)

        const mockReq=(mockRequest().body={body:userLogin})
        const mockRes=mockResponse()

        await login(mockReq,mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(401)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Invalid Email or Password",
        })
    })

    it('valid login and create token',async ()=>{
        jest.spyOn(User,'findOne').mockImplementationOnce(()=>({
            select: jest.fn().mockResolvedValueOnce(mockUser)
        }))

        jest.spyOn(bcrypt,'compare').mockResolvedValueOnce(true)  
        const mockReq=(mockRequest().body={body:userLogin})
        const mockRes=mockResponse()  

        await login(mockReq,mockRes)
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.json).toHaveBeenCalledWith({
            token: "jwt_token",
        })

    })
})