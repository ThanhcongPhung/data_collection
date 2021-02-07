const INTENT = [

]

// Kiểm tra = check status
const ACTION = ['Bật', 'Tắt', 'Đặt', "Tăng", "Giảm", "Kiểm tra"]
const ACTION_NO_SCALE = ['Tắt', "Kiểm tra"]
const DEVICE = ['Quạt', 'Quạt thông gió', 'Ti vi', 'Loa', 'Đèn bàn', 'Đèn trần', 'Bình nóng lạnh', 'Điều hòa', 'Lò sưởi', 'Cổng', 'Lò nướng', 'Bếp']
// const DEVICE_LEVEL = ['Quạt', 'Ti vi', 'Loa', 'Đèn bàn', 'Điều hòa', 'Lò sưởi', 'Cổng', 'Lò nướng', 'Bếp']
// const DEVICE_PERCENTAGE
const DEVICE_NO_SCALE = ['Quạt thông gió', 'Bình nóng lạnh', 'Cổng', 'Lò sưởi']
const SCALE = ['Màu', 'Âm lượng', 'Mức', 'Kênh', 'Nhiệt độ', 'Thời gian']
const ROOM = ['Phòng khách', 'Phòng ăn', 'Phòng ngủ', 'Phòng vệ sinh', 'Vườn', 'Phòng làm việc', 'Sân thượng', 'Ban công']
// FLOOR - 1 - 5
// LEVEL - 1 - 10 - "all"

module.exports = {
    ACTION, ACTION_NO_SCALE, DEVICE, DEVICE_NO_SCALE, SCALE, ROOM
}