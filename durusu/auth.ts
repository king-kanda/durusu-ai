
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({

  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [Google],
  pages: {
    signIn: "/", // Redirect to homepage after sign in
    // Or if you have a specific page:
    // signIn: "/login", 
    // error: "/auth/error", // Error page
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    // jwt({ token, trigger, session, account }) {
    //   if (trigger === "update") token.name = session.user.name
    //   if (account?.provider === "keycloak") {
    //     return { ...token, accessToken: account.access_token }
    //   }
    //   return token
    // },
    // async session({ session, token }) {
    //   if (token?.accessToken) session.accessToken = token.accessToken

    //   return session
    // },
  },
})