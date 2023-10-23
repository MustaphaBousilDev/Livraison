const jwt=require('jsonwebtoken')
const User=require('../../../src/auth/user/model/user.model')
const { authMiddleware} =require('../authMiddleware')

const mockRequest = ()=>{
    return {
        cookies:{
            token:'token'
        }
    }
}

const mockResponse = ()=>{
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    }
}
const mockNext=jest.fn()
const mockUser = {
    _id: "5d7a514b5d2c12c7449be045",
    username: "John Doe",
    email: "test@gmail.com",
    password: "hashedPassword",
    picture: "picture",
}

describe('Authentication Middleware',()=>{
    it('should throw missing authorization header error',async ()=>{
        const mockReq=mockRequest().cookies.token=null
        const mockRes=mockResponse()

        await authMiddleware(mockReq,mockRes,mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(401)
        //expect mockRes throws error with message
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Token Missing"
        })
    })

    it('should throw error if token is invalid',async ()=>{
        const mockReq=mockRequest()
        const mockRes=mockResponse()
        const mockNext=jest.fn()
        jest.spyOn(jwt,'verify').mockRejectedValueOnce(new Error('No user found with this id'))
        await authMiddleware(mockReq,mockRes,mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(401)
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Error Occured in Authentication ⚠️"
        })
    })

    it("success authentication", async () => {
        const mockReq = mockRequest().cookies.token='token';
        const mockRes = mockResponse();
      
        // Mock the jwt.verify to resolve with a token info
        //spyOn jwt verify to true sucees verify 
        jest.spyOn(jwt, 'verify').mockResolvedValueOnce(
            {
                id: mockUser._id,
            }
        );
      
        // Mock the User.findById to resolve with a mockUser
        jest.spyOn(User, 'findById').mockResolvedValueOnce(true);

        await authMiddleware(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled(true);
        });
      

})