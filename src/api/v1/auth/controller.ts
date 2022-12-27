import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../../../models/User';

namespace AuthController {

    type LoginRequest = FastifyRequest<{
        Body: {
            email : string;
            password : string;
        }
    }>

    type RegisterRequest = FastifyRequest<{
        Body: {
            username : string;
            email : string;
            password : string;
        }
    }>


    export async function login(request : LoginRequest, reply : FastifyReply) {
        try {
            const {email, password} = request.body;
            const user = await User.findOne({
                email: email
            });
            console.log(request.body);
            console.log(user);
        }
        catch (e) {
            reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function logout(request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function register(request : RegisterRequest, reply : FastifyReply) {
        try {
            const {username, email, password} = request.body;
            const user = await User.findOne({
                email: email
            });
/*
            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.passwordHash = 'nothing';
            await newUser.save();*/

            console.log(request.body);
            console.log(user);
        }
        catch (e) {
            reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }
}

export function installAPIv1Auth(server : FastifyInstance) {
    server.register((instance, opts, done) => {
        instance.post('/register', AuthController.register);
        instance.post('/login', AuthController.login);
        instance.post('/logout', AuthController.logout);
        done();
    }, {prefix: '/auth'});
}

/*
    export async function xxxxxx(request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }
 */