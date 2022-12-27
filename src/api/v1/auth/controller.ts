import { fastify, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { appConfig } from '../../../config';
import { User } from '../../../models/User';
import { serverInstance } from '../../../server.js';
import { AuthService } from './service';
const { scryptSync, randomBytes } = require("crypto");

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

            const existingUser = await AuthService.getUserByEmail(email);
            if(existingUser == null) {
                return reply.status(404).send({status: 404, message: "There is no account linked to the given email.", data: null});
            }
            const passwordHash = AuthService.getPasswordHash(password, existingUser.passwordSalt);
            if(passwordHash !== existingUser.passwordHash) {
                return reply.status(401).send({status: 401, message: "The entered password was incorrect."})
            }
            const token = serverInstance.jwt.sign({
                username: existingUser.username,
                email: existingUser.email
            });

            return reply.status(201).send({status: 201, message: null, data: token});
        }
        catch (e) {
            reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function logout(request : FastifyRequest, reply : FastifyReply) {
        try {
            await User.deleteMany();
        }
        catch (e) {
            reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function register(request : RegisterRequest, reply : FastifyReply) {
        try {
            const {username, email, password} = request.body;

            const existingUser = await AuthService.getUserByEmail(email);
            if(existingUser != null) {
                //user already exists
                return reply.status(409).send({status: 409, message: 'This email is already in-use.', data: null});
            }

            const passwordSalt = AuthService.getSalt();
            const passwordHash = AuthService.getPasswordHash(password, passwordSalt);

            console.log(`passwordHash: ${passwordHash}`);

            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.passwordHash = passwordHash;
            newUser.passwordSalt = passwordSalt;
            await newUser.save();
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