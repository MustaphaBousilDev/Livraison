const { createUser, login } =require("../auth.controller");
const bcrypt=require('bcryptjs');
const User=require('../user/model/user.model');
const {generateToken} = require('../../../config/jwtToken');
const {
    EmailValidator,PasswordValidator,
} = require('../../../helper/validations');
//const generate = require("../../../config/refreshToken");
//refreshtoken=require('../../../config/refreshToken')



beforeEach(() => {
    // Reset all modules before each test
    jest.resetModules();
  });

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



//login

describe('Login User',()=>{
    it("should invalid password",async ()=>{
        jest.spyOn(User,'findOne').mockResolvedValueOnce(true)
        jest.spyOn(bcrypt,'compare').mockResolvedValueOnce(false)
        const mockReq=(mockRequest().body={body:userLogin})
        const mockRes=mockResponse()
        await login(mockReq,mockRes)
        expect(mockRes.status).toHaveBeenCalledWith(401)
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Invalid email or password",
        })

    })
    it("should log in a user with valid credentials", async()=>{
        jest.spyOn(bcrypt,'compare').mockResolvedValueOnce(true)
        jest.spyOn(User,'findOne').mockResolvedValueOnce(true)
        jest.spyOn(User,'findByIdAndUpdate').mockResolvedValueOnce(true)
        // i want to mock  findUser.incrementLoginCount();
        //jest.spyOn(User.ic,'findById').mockResolvedValueOnce(true)

        const mockReq=(mockRequest().body={body:userLogin})
        const mockRes=mockResponse()

          await login(mockReq, mockRes)

          expect(mockRes.status).toHaveBeenCalledWith(201);
          expect(User.findOne).toHaveBeenCalledWith({email: userLogin.email})
    })
})



//register
describe('Register User',()=>{
    it('should register a new user',async ()=>{
        jest.spyOn(bcrypt,'hashSync').mockResolvedValueOnce('hashedPassword')
        jest.spyOn(bcrypt,'genSaltSync').mockResolvedValueOnce('salt')
        jest.spyOn(User,'create').mockResolvedValueOnce(mockUser)
        jest.spyOn(User,'findOne').mockResolvedValueOnce(null)
        const mockReq=mockRequest()
        const mockRes=mockResponse()
        await createUser(mockReq,mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(201)
        expect(bcrypt.hashSync).toHaveBeenCalledWith(mockReq.body.password,'salt')
        expect(User.findOne).toHaveBeenCalledWith({email: mockReq.body.email})
        expect(User.create).toHaveBeenCalledWith({
            username: mockReq.body.username,
            email: mockReq.body.email,
            password: 'hashedPassword',
            picture: mockReq.body.picture,
            role:"6530e3c6b66fead76cb05923",
        })
    })

    it('should return error if email already exist',async ()=>{
        //Resolvedvalue is a value that will be returned when the mocked function is called
        jest.spyOn(User,'findOne').mockResolvedValueOnce(mockUser)
        const mockReq=mockRequest()
        const mockRes=mockResponse()
        await createUser(mockReq,mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(User.findOne).toHaveBeenCalledWith({email: mockReq.body.email})
        expect(mockRes.json).toHaveBeenCalledWith({
            msg: 'This email is already exists',
        })
    })
})