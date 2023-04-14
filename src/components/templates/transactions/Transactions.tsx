import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
//một React functional component được sử dụng để hiển thị danh sách các giao dịch được thực hiện trên một địa chỉ ví Ethereum
import { useEvmWalletTransactions } from '@moralisweb3/next'; //lấy thông tin các giao dịch của địa chỉ ví được cung cấp.
import { useSession } from 'next-auth/react'; //lấy thông tin phiên đăng nhập của người dùng
import { useEffect } from 'react'; //thực hiện các tác vụ sau khi component được render
import { getEllipsisTxt } from 'utils/format';
import { useNetwork } from 'wagmi'; //lấy thông tin chuỗi mạng hiện tại

//lấy ds giao dịch và hiển thị
const Transactions = () => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const { data } = useSession();
  const { chain } = useNetwork();
  const { data: transactions } = useEvmWalletTransactions({
    address: data?.user?.address,
    chain: chain?.id,
  });

  useEffect(() => console.log('transactions: ', transactions), [transactions]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Transactions
      </Heading>
      {transactions?.length ? (
        <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
          <TableContainer w={'full'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Hash</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Gas used</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions?.map((tx, key) => (
                  <Tr key={key} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                    <Td>{getEllipsisTxt(tx?.hash)}</Td>
                    <Td>{getEllipsisTxt(tx?.from.checksum)}</Td>
                    <Td>{getEllipsisTxt(tx?.to?.checksum)}</Td>
                    <Td>{tx.gasUsed.toString()}</Td>
                    <Td>{new Date(tx.blockTimestamp).toLocaleDateString()}</Td>
                    <Td isNumeric>{tx.receiptStatus}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Hash</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Gas used</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Status</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>Looks Like you do not have any transactions</Box>
      )}
    </>
  );
};

export default Transactions;
