const jwttoken=require("jsonwebtoken");

const secreteKey="R@12#$45";



const mockUsers=[
    {
        id:1,
        email:'krishnaalphak9@gmail.com',
        password:'node@123'
    },
    {
        id:2,
        email:'flynnrider000@gmail.com',
        password:'node@234'
    },
    {
        id:3,
        email:'sample123@gamil.com',
        password:'node@567'
    }
];

module.exports=mockUsers;