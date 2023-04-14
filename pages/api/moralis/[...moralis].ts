//  MoralisNextApi là một function giúp kết nối ứng dụng với các API của Moralis.

import { MoralisNextApi } from '@moralisweb3/next';

export default MoralisNextApi({
  apiKey: process.env.MORALIS_API_KEY || '',
  authentication: {
    domain: 'ethereum-boilerplate.dapp',
    uri: process.env.NEXTAUTH_URL || '',
    timeout: 120,
  },
});


// apiKey: là API key được cung cấp bởi Moralis, cần để xác thực khi gọi đến các endpoint (url/1 điểm kết nối).
// authentication: là một object chứa thông tin xác thực (authentication) của người dùng, bao gồm:
// domain: là domain được sử dụng để xác thực.
// uri: là đường dẫn của ứng dụng Next.js (hoặc ứng dụng web khác) sử dụng để xác thực.
// timeout: là thời gian tối đa để thực hiện xác thực, được định dạng bằng giây.
