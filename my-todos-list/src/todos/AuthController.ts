import {Controller, Body, Post} from "@nestjs/common";
import {admin, auth} from "../firebase";
import {signInWithCustomToken} from "firebase/auth";

@Controller("auth")
export class AuthController {

    @Post()
    async CustomToken(@Body("uid") uid: string) {
        const customToken = await admin
            .auth()
            .createCustomToken(uid, {role: "student"});
        const userCredentials = await signInWithCustomToken(auth, customToken);
        return {
            access_token: await userCredentials.user.getIdToken(),
            refresh_token: userCredentials.user.refreshToken,
        };
    }
}