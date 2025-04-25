import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt", //Это позволяет приложению работать без хранения данных сессии на сервере, улучшая производительность и масштабируемость. JWT-токен легко передавать через API или хранить в куках
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // account передается только на этапе входа
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      // Кладем токен в сессию, чтобы был доступен в useSession()
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
