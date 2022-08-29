import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

var user_credential = []

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "<Google Client Id",
            clientSecret: "<Google Client Secret>",
        }),
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            var user_token = token.token.account
            return token;
        },
        async session({ session, token, user }) {
            user_credential = {
                "provider": token.token.account.provider,
            }
            if (token.token.account.access_token) {
                user_credential["auth_token"] = token.token.account.access_token
            }
            if (token.token.account.id_token) {
                user_credential["auth_token"] = token.token.account.id_token
            }
            return user_credential
        }
    },
});