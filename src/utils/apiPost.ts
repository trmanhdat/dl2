import axios from 'axios';

const apiPost = async (endpoint: string, params: Record<string, unknown>) => {
  const result = await axios.post(`/api${endpoint}`, params, {
    headers: {
      'content-type': 'application/json',
    },
  });
  return result.data;
};

export default apiPost;

// Đoạn mã trên định nghĩa một hàm apiPost để gửi yêu cầu POST đến một địa chỉ API được xác định bởi biến endpoint. Đối số params là một đối tượng chứa các tham số được gửi đến API.
// Hàm này sử dụng thư viện axios để thực hiện yêu cầu HTTP POST và trả về kết quả nhận được từ API dưới dạng dữ liệu JSON.
// Để thực hiện yêu cầu, hàm apiPost truyền ba đối số cho phương thức axios.post. Đối số đầu tiên là địa chỉ API được xác định bởi biến endpoint, đối số thứ hai là các tham số được gửi đến API được đóng gói trong đối tượng params, và đối số thứ ba là một đối tượng chứa các thông tin header được gửi cùng với yêu cầu.
// Trong trường hợp này, đối tượng header chỉ chứa một thông tin là content-type được đặt là application/json để chỉ định rằng dữ liệu gửi đi là JSON.
// Hàm apiPost được xuất ra để có thể được sử dụng trong các thành phần khác của ứng dụng.



