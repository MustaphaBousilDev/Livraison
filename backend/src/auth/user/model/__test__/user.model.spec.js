const User=require('../user.model')

afterEach(()=>{
    jest.resetAllMocks()
})

beforeEach(()=>{
    jest.resetAllMocks()
})
describe("User Model",()=>{
    it('should throw validation error for required fields',async()=>{
        const user=new User()
        console.log(user)
        console.log('---------')
        
        try{
            //user.validate() is a 
            await user.validate()
            console.log(user.validate())
        }catch(error){
             expect(error.errors.email).toBeDefined()
             expect(error.errors.password).toBeDefined()
             expect(error.errors.username).toBeDefined()

        }
    })
    it("should create a new user",()=>{
        const user= new User({
            username: "John Doe",
            email: "mugi@gmail.com",
            password: "123456789",
            role: "user",
            picture:""
        })
        console.log(user)
        expect(user).toHaveProperty("_id")
    })
})