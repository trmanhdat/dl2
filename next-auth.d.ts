import 'next-auth';
import { VerifyChallengeSolanaJSONResponse, VerifyChallengeEvmJSONResponse } from '@moralisweb3/auth';

declare module 'next-auth' {
  interface Session {
    user: VerifyChallengeSolanaJSONResponse | VerifyChallengeEvmJSONResponse;
  }
}
// định nghĩa lại kiểu dữ liệu của phiên (session) trong framework Next.js để bao gồm thông tin của người dùng được xác thực bằng cách sử dụng hai loại phản hồi JSON 
//là VerifyChallengeSolanaJSONResponse và VerifyChallengeEvmJSONResponse từ thư viện @moralisweb3/auth.