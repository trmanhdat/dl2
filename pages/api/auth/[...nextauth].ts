// sử dụng MoralisNextAuthProvider làm nhà cung cấp xác thực cho phép người dùng đăng nhập bằng tài khoản MoralisWeb3.

import NextAuth from 'next-auth';
import { MoralisNextAuthProvider } from '@moralisweb3/next';

export default NextAuth({
  providers: [MoralisNextAuthProvider()],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      (session as { user: unknown }).user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});

// Callbacks: Các callback được cung cấp để thực hiện các hành động tùy chỉnh sau khi xác thực thành công.
// Callback jwt sẽ được gọi mỗi khi token JWT được tạo, và session callback sẽ được gọi mỗi khi phiên được tạo. 
// Cả hai callback này đều được sử dụng để định dạng lại thông tin người dùng và đưa vào trong token JWT hoặc phiên
