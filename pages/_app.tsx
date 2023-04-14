import { ChakraProvider } from '@chakra-ui/react';
import { createClient, WagmiConfig } from 'wagmi';
import { configureChains } from '@wagmi/core';
import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  fantom,
  fantomTestnet,
  foundry,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
} from '@wagmi/core/chains';
import { extendTheme } from '@chakra-ui/react';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

//sử dụng một chức năng có tên là configureChains để định cấu hình nhà cung cấp cho các mạng chuỗi khối khác nhau
//được sử dụng để tương tác với các mạng chuỗi khối tương ứng thông qua API, chẳng hạn như gửi giao dịch hoặc truy vấn dữ liệu.
const { provider, webSocketProvider } = configureChains(
  [
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet,
    fantom,
    fantomTestnet,
    foundry,
    goerli,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    sepolia,
  ],
  [publicProvider()],
);

//tạo một đối tượng máy khách, được sử dụng để tương tác với các mạng chuỗi khối đã được định cấu hình trong đoạn mã trước đó
const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

// chế dộ sáng tối
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

//myapp 1 functional component trong React nhận 2 props để render ra một component tương ứng với trang web hoặc ứng dụng.
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;

// ChakraProvider: Là một component cung cấp chủ đề (theme) và các đặc tính CSS của Chakra UI cho các thành phần con trong ứng dụng. resetCSS được sử dụng để đảm bảo rằng các đặc tính CSS được thiết lập đúng nhất định cho các thành phần của Chakra UI.
// WagmiConfig: Là một component đóng vai trò như một bao bọc (wrapper) cho các thành phần khác trong ứng dụng, cung cấp cho chúng dữ liệu từ client. Điều này giúp cho ứng dụng có thể sử dụng dữ liệu từ API của Wagmi.
// SessionProvider: Là một component cung cấp session (phiên làm việc) cho ứng dụng, với giá trị được lấy từ pageProps. refetchInterval được thiết lập là 0, nghĩa là phiên làm việc sẽ không được tự động cập nhật.