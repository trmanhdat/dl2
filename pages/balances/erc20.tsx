import { Default } from 'components/layouts/Default';
import { ERC20Balances } from 'components/templates/balances/ERC20';


//Định nghĩa một functional component tên là ERC20, không có tham số đầu vào, 
//được sử dụng để tạo trang web hiển thị thông tin về các số dư
// truyền vào pageName để hiển thị thông tin về số dư
const ERC20 = () => {
  return (
    <Default pageName="ERC20 Balances"> 
      <ERC20Balances />
    </Default>
  );
};

export default ERC20;

//đoạn mã JavaScript sử dụng React để tạo một trang web hiển thị thông tin về các số dư của các token ERC20
