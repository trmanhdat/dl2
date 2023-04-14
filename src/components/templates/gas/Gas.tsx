
import React from 'react';
import { Heading, VStack, List, ListIcon, ListItem, Center } from '@chakra-ui/react';

import { useEvmWalletTransactions } from '@moralisweb3/next'; //lấy thông tin các giao dịch của địa chỉ ví được cung cấp.
import { useSession } from 'next-auth/react'; //lấy thông tin phiên đăng nhập của người dùng
import { useEffect } from 'react'; //thực hiện các tác vụ sau khi component được render
import { getEllipsisTxt } from 'utils/format';
import { useNetwork } from 'wagmi'; //lấy thông tin chuỗi mạng hiện tại

//khai báo global trong TypeScript, được sử dụng để mở rộng các đối tượng toàn cục trong JavaScript
//khai báo rằng cửa sổ (window) sẽ có một thuộc tính mới được gọi là "TradingView"
//có kiểu dữ liệu là "any" (tức là có thể có bất kỳ kiểu dữ liệu nào)
declare global {
  interface Window {
    TradingView: any;
  }
}

const Gas = () => {

  useEffect(() => {
    const script = document.createElement('script'); //tạo element
    script.src = 'https://s3.tradingview.com/tv.js'; // gán đường dẫn
    script.async = true; //cho phép script được thực thi bất đồng bộ
    // gán callback cho sự kiện onload của script 
    //=> tạo một instance của TradingView widget thông qua window.TradingView.widget()
    script.onload = function () {
      const TradingView = window.TradingView;
      if (TradingView) {
        new TradingView.widget({
          container_id: 'tradingview-widget-container', //id của phần tử HTML chứa widget
          symbol: 'COINBASE:ETHUSD', //cặp tiền tệ hiển thị trên biểu đồ
          interval: 'D', //khung thời gian cho mỗi cây nến
          timezone: 'Etc/UTC', //múi giờ hiển thị
          theme: 'Dark',
          style: '1',
          locale: 'en',
          hide_side_toolbar: false,
          allow_symbol_change: true, //cho phép người dùng thay đổi cặp tiền tệ hiển thị
          hideideas: true,
          studies: ['RSI@tv-basicstudies', 'MASimple@tv-basicstudies', 'MACD@tv-basicstudies'],
        });
      } else {
        console.error('TradingView library is not loaded.');
      }
    };
    document.body.appendChild(script);
  
    return () => {
      // cleanup TradingView widget on unmount
      const container = document.getElementById('tradingview-widget-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div>
      <div id="tradingview-widget-container" style={{ height: '500px' }}></div>
      <Heading><Center>Live Chart of Ethereum Wallet Transactions</Center></Heading>
    </div>
  );
};


export default Gas;
