import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  VStack,
  Heading,
  Box,
  Text,
  Avatar,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEvmWalletTokenBalances } from '@moralisweb3/next'; //hook lấy thông tin về số dư các token mà người dùng sở hữu trong ví
import { useSession } from 'next-auth/react'; //lấy thông tin về phiên đăng nhập hiện tại của người dùng
import { useEffect } from 'react';//hook cho phép ta thực hiện các tác vụ sau khi component đã được render.
import { getEllipsisTxt } from 'utils/format';//hook cho phép ta lấy thông tin về mạng hiện tại của người dùng trong ứng dụng.
import { useNetwork } from 'wagmi';

//chức năng React được sử dụng để hiển thị số dư token ERC20
const ERC20Balances = () => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const { data } = useSession(); //lấy thông tin phiên đn
  const { chain } = useNetwork(); // lấy thông tin chuỗi mạng
  const { data: tokenBalances } = useEvmWalletTokenBalances({ //lấy số dư
    address: data?.user?.address,
    chain: chain?.id,
  });

  useEffect(() => console.log('tokenBalances: ', tokenBalances), [tokenBalances]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        ERC20 Balances
      </Heading>
      {tokenBalances?.length ? (
        <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
          <TableContainer w={'full'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Token</Th>
                  <Th>Value</Th>
                  <Th isNumeric>Address</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tokenBalances?.map(({ token, value }, key) => (
                  <Tr key={`${token?.symbol}-${key}-tr`} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                    <Td>
                      <HStack>
                        <Avatar size="sm" src={token?.logo || ''} name={token?.name} />
                        <VStack alignItems={'flex-start'}>
                          <Text as={'span'}>{token?.name}</Text>
                          <Text fontSize={'xs'} as={'span'}>
                            {token?.symbol}
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td>{value}</Td>
                    <Td isNumeric>{getEllipsisTxt(token?.contractAddress.checksum)}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Token</Th>
                  <Th>Value</Th>
                  <Th isNumeric>Address</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>Looks Like you do not have any ERC20 tokens</Box>
      )}
    </>
  );
};

export default ERC20Balances;
