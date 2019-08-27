const {User}=require('../../models/user');
const request=require('supertest');

let server;

describe('/api/users',()=>{
    beforeEach(()=>{server=require('../../index');})
    afterEach(async()=>{
        server.close();
        await User.remove({});
    });

    describe('GET /',()=>{
        it('should return all users',async()=>{
           await User.collection.insertMany([
                {name:'user1'}      
            ]);
            const res=await request(server).get('/api/users');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body.some(u=>u.name==='user1')).toBeTruthy();
        });
    });

    // describe('GET /:id',()=>{
    //     it('should return a user if valid is passed',async()=>{
    //          const user=new User({name:'Vikash',email:'vk@gmail.com',password:'12345'});
    //         await user.save(); 
    //      /*  const user=  await User.collection.insertMany([
    //             {name:'user1',email:'vk@gmail.com',password:'12345'}      
    //         ]); */
    //         console.log(user)
    //         const res=await request(server).get('/api/users/'+ user._id);
    //         console.log(res);
    //         expect(res.status).toBe(200);
    //         expect(res.body).toHaveProperty('name',user.name);
    //     });
    // });
});


