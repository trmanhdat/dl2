import { InjectedConnector } from 'wagmi/connectors/injected';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { Button, Text, HStack, Avatar, useToast } from '@chakra-ui/react';
import { getEllipsisTxt } from 'utils/format';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';

//định nghĩa một component ConnectButton sử dụng các hook (các hàm đặt biệt) của một số thư viện

const ConnectButton = () => {
  const { connectAsync } = useConnect({ connector: new InjectedConnector() }); //để kết nối đến một ví tiền ảo thông qua một trình kết nối (connector) là InjectedConnector, đại diện cho một ví tiền ảo được kết nối thông qua Metamask 
  const { disconnectAsync } = useDisconnect(); //đăng xuất khỏi một ví tiền ảo đã được kết nối trước đó.
  const { isConnected } = useAccount();  //sử dụng để lấy thông tin tài khoản ví tiền ảo hiện đang được kết nối.
  const { signMessageAsync } = useSignMessage();  //sử dụng để ký một thông điệp sử dụng khóa riêng tư của ví tiền ảo hiện đang được kết nối.
  const toast = useToast();  //hiển thị các thông báo
  const { data } = useSession(); //lấy thông tin phiên làm việc của người dùng gồm các thông tin liên quan đến đăng nhập và xác thực
  const { requestChallengeAsync } = useAuthRequestChallengeEvm(); //yêu cầu một thử thách (challenge) xác thực từ một ứng dụng EVM (Ethereum Virtual Machine).

  //hàm đăng nhập

  const handleAuth = async () => {  //kiểm tra ng dùng kn chưa
    if (isConnected) {
      await disconnectAsync(); // nếu kn rồi thì dùng hàm disconnec để ngắt kết nối
    }
    try {
      const { account, chain } = await connectAsync(); //sau đó hàm lấy challenge để ng dùng ký xác nhận bằng hàm connecAsy 
                                                      //Challenge là một yêu cầu ký số được tạo bởi một entity 
      const challenge = await requestChallengeAsync({ address: account, chainId: chain.id }); //chain:đại diện chuỗi blockchain đang đc kn

      if (!challenge) { 
        throw new Error('No challenge received');
      }

      const signature = await signMessageAsync({ message: challenge.message }); //hàm gọi phương thức signMessageAsync() để tạo chữ ký số cho challenge bằng cách sử dụng khóa bí mật của người dùng.

      await signIn('moralis-auth', { message: challenge.message, signature, network: 'Evm', redirect: false });//hàm gọi phương thức signIn() để xác thực người dùng với máy chủ Moralis
    } catch (e) { //truyền vào thông điệp thử thách, chữ ký số, mạng (EVM) và chuyển hướng (false) làm tham số
      toast({  //xuất lỗi
        title: 'Oops, something went wrong...',
        description: (e as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    } 
  };


// hàm đăng xuất
  const handleDisconnect = async () => {
    await disconnectAsync();
    signOut({ callbackUrl: '/' });
  };

  //hàm hiển thị tên ng dùng khi đã đăng nhập
  if (data?.user) {
    return (
      <HStack onClick={handleDisconnect} cursor={'pointer'}>
        <Avatar size="xs" />
        <Text fontWeight="medium">{getEllipsisTxt(data.user.address)}</Text>
      </HStack>
    );
  }

  return (
    <Button size="sm" onClick={handleAuth} colorScheme="blue">
      Connect Wallet
    </Button>
  );
};

export default ConnectButton;
