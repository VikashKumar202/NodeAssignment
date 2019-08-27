const {validate}=require('../../models/user')

describe('validateUser',()=>{
    it('should return valid Data if Data is valid',()=>{
        data={
            name:"Vikash",
            email:"vk@gmail.com",
            password:"12345"
        }
        const result=validate(data);
        expect(result.value).toMatchObject({name:'Vikash',email:'vk@gmail.com',password:'12345'});
    });
});