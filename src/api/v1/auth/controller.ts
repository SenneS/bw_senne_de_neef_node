import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { RefreshToken } from '../../../models/RefreshToken';
import { IUserJWT, User } from '../../../models/User';
import { AuthService } from './service';

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


    export async function login(this : FastifyInstance, request : LoginRequest, reply : FastifyReply) {
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

            const payload = {
                username: existingUser.username,
                email: existingUser.email
            };

            const refreshTokenJti = crypto.randomUUID();

            const newRefreshToken = new RefreshToken();
            newRefreshToken._userId = existingUser._id;
            newRefreshToken.jti = refreshTokenJti;
            await newRefreshToken.save();


            const accessToken = this.jwt.sign(payload, {expiresIn: '1h', sub: existingUser._id });
            const refreshToken = this.jwt.sign(payload, {expiresIn: '1d', sub: existingUser._id, jti: refreshTokenJti});

            return reply.setCookie('refreshToken', refreshToken, {
                path: '/api/v1/auth/refresh',
                secure: false,
                httpOnly: true,
                sameSite: 'strict',
                signed: true,
                //documentation says a number in milliseconds -> according to my browser this is actually in seconds bc my cookie somehow ended up being valid till 2025
                maxAge: (24 * 60 * 60)
            }).status(201).send({status: 201, message: null, data: {accessToken: accessToken}});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function logout(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {
            const user = request.user as IUserJWT;
            console.log(request.user);

            const res = await RefreshToken.find({_userId: user.sub});
            console.log(res);
            await RefreshToken.deleteMany({_userId: user.sub});
            //RefreshToken.deleteMany({_userId: user})
            //await User.deleteMany();
            return reply.status(200).send({status: 200, message: null, data: null});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function register(this : FastifyInstance, request : RegisterRequest, reply : FastifyReply) {
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

            return reply.status(200).send({status: 200, message: null, data: null});
        }
        catch (e) {
            console.log(e);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function deleteMe(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {
            await User.deleteMany();
            return reply.status(200).send({status: 200, message: null, data: request.user});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function googleCallback(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {
            const token = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
            console.log(token);
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function refresh(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {
            const { refreshToken } = request.cookies;
            const unsignedRefreshToken = request.unsignCookie(refreshToken);
            if(unsignedRefreshToken.valid) {
                try {
                    const payload : IUserJWT = this.jwt.verify(unsignedRefreshToken.value);

                    const res = await RefreshToken.findOne({_userId: payload.sub, jti: payload.jti});
                    if(!res) {
                        return reply.status(401).send({status: 401, message: 'invalid refreshToken.', data:null});
                    }

                    const newToken : IUserJWT = {
                        username: payload.username,
                        email: payload.email
                    };

                    const accessToken = this.jwt.sign(newToken, {expiresIn: '1h', sub: payload.sub});

                    return reply.status(201).send({status: 201, message: null, data: {accessToken: accessToken}});

                } catch (e) {
                    return reply.status(401).send({status: 401, message: 'invalid refreshToken.', data:null});
                }
            }
            return reply.status(401).send({status: 401, message: 'invalid refreshToken cookie.', data:null});

        } catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

}

export function installAPIv1Auth(server : FastifyInstance) {
    server.register((instance, opts, done) => {
        instance.post('/register', AuthController.register);
        instance.post('/login', AuthController.login);
        instance.post('/logout', {onRequest: instance.authenticate}, AuthController.logout);
        instance.post('/refresh', AuthController.refresh);
        instance.get('/delete', {onRequest: instance.authenticate}, AuthController.deleteMe);
        instance.get('/google/callback', AuthController.googleCallback);
        done();
    }, {prefix: '/auth'});
}

/*
    export async function xxxxxx(request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }
 */