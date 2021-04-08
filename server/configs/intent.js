const INTENT = [
  {
    name: "Cấp lại mật khẩu",
    slot: ["digital_bank"],
  },
  {
    name: "Chương trình ưu đãi",
    slot: ["card_type"],
  },
  {
    name: "Điều kiện vay vốn",
    slot: ["loan_purpose", "loan_type"],
  },
  {
    name: "Điểm đặt ATM",
    slot: ["city", "district"],
  },
  {
    name: "Điểm giao dịch",
    slot: ["city", "district"],
  },
  {
    name: "Hồ sơ phát hành thẻ",
    slot: ["card_type", "card_usage"],
  },
  {
    name: "Hồ sơ vay vốn",
    slot: ["loan_purpose", "loan_type"],
  },
  {
    name: "Hủy chi tiêu thẻ",
    slot: ["name", "cmnd", "four_last_digits"],
  },
  {
    name: "Hướng dẫn mở thẻ",
    slot: ["card_activation_type"],
  },
  {
    name: "Khái niệm sản phẩm",
    slot: ["card_type", "card_usage"],
  },
  {
    name: "Kích hoạt thẻ tự động",
    slot: ["name", "cmnd", "four_last_digits"],
  },
  {
    name: "Khóa thẻ khẩn cấp",
    slot: ["name", "cmnd", "four_last_digits"],
  },
  {
    name: "Kích hoạt chi tiêu thẻ",
    slot: ["name", "cmnd", "four_last_digits"],
  },
  {
    name: "Phí chuyển tiền",
    slot: ["digital_bank"],
  },
  {
    name: "Phương thức hủy dịch vụ NHĐT",
    slot: ["digital_bank"],
  },
  {
    name: "Tính năng dịch vụ NHĐT",
    slot: ["digital_bank"],
  },
  {
    name: "Tra cứu số dư",
    slot: ["name", "cmnd", "four_last_digits"],
  },
  {
    name: "Thay đổi hạn mức chi tiêu thẻ",
    slot: ["name", "cmnd", "four_last_digits"],
  },
];

const SLOT_LABEL = [
  {
    name: "Mục đích cho vay",
    tag: "LOAN_PURPOSE",
  },
  {
    name: "Hình thức cho vay",
    tag: "LOAN_TYPE",
  },
  {
    name: "Nhóm thẻ",
    tag: "CARD_TYPE",
  },
  {
    name: "Hình thức thẻ",
    tag: "CARD_USAGE",
  },
  {
    name: "Ngân hàng điện tử",
    tag: "DIGITAL_BANK",
  },
  {
    name: "Tính chất mở",
    tag: "CARD_ACTIVATION_TYPE",
  },
  {
    name: "Quận",
    tag: "DISTRICT",
  },
  {
    name: "Tỉnh thành",
    tag: "CITY",
  },
  {
    name: "Họ và tên",
    tag: "NAME",
  },
  {
    name: "CMND",
    tag: "CMND",
  },
  {
    name: "4 số cuối tài khoản",
    tag: "FOUR_LAST_DIGITS",
  },
];

const LOAN_PURPOSE = [
  {
    name: "Vay mua xe",
    tag: "vay_mua_xe",
    hint: "mua xe, mua ô tô, mua xe ô tô",
  },
  {
    name: "Vay mua bất động sản",
    tag: "vay_mua_bds",
    hint: "mua nhà, mua văn hộ, mua chung cư, mua nhà đất, mua bất động sản",
  },
  {
    name: "Vay kinh doanh",
    tag: "vay_kinh_doanh",
    hint: "kinh doanh, làm ăn",
  },
  {
    name: "Vay tiêu dùng",
    tag: "vay_tieu_dung",
    hint: "tiêu dùng",
  },
];

const LOAN_TYPE = [
  {
    name: "Vay thế chấp",
    tag: "vay_the_chap",
    hint: "thế chấp, có tài sản đảm bảo",
  },
  {
    name: "Vay tín chấp",
    tag: "vay_tin_chap",
    hint: "tín chấp, không tài sản đảm bảo",
  },
  {
    name: "Vay cầm cố giấy tờ có giá",
    tag: "vay_cam_co_GTCG",
    hint: "cầm cố giấy tờ có giá, có giấy tờ có giá",
  },
];

const CARD_TYPE = [
  {
    name: "Quốc tế",
    tag: "quoc_te",
    hint: "quốc tế, nước ngoài",
  },
  {
    name: "Nội địa",
    tag: "noi_dia",
    hint: "nội địa, trong nước",
  },
  {
    name: "Mastercard",
    tag: "master",
    hint: "master card, master, master quốc tế, quốc tế mastercard",
  },
  {
    name: "Visa",
    tag: "visa",
    hint: "visa, visa card, visa quốc tế, quốc tế visa, visa card quốc tế",
  },
  {
    name: "Amex",
    tag: "amex",
    hint: "amex, american express, amex quốc tế",
  },
  {
    name: "JCB",
    tag: "jcb",
    hint: "jcb, quốc tế jcb, jcb quốc tế",
  },
  {
    name: "UnionPay",
    tag: "unionpay",
    hint: "unionpay, quốc tế union pay, union pay quốc tế",
  },
];

const CARD_USAGE = [
  {
    name: "Ghi nợ",
    tag: "ghi_no",
    hint: "ghi nợ, debit",
  },
  {
    name: "Tín dụng",
    tag: "tin_dung",
    hint: "tín dụng, credit",
  },
];

const DIGITAL_BANK = [
  {
    name: "SMS Banking",
    tag: "SMS Banking",
    hint: "sms banking, sms",
  },
  {
    name: "Internet Banking",
    tag: "Internet Banking",
    hint: "ibanking, internet banking, eb, ib",
  },
  {
    name: "Mobile Banking",
    tag: "Mobile Banking",
    hint: "mobile banking, MB",
  },
  {
    name: "Phone Banking",
    tag: "Phone Banking",
    hint: "phone banking",
  },
  {
    name: "VCBPAY",
    tag: "VCBPAY",
    hint: "VCBPay, VCB Pay",
  },
];

const CARD_ACTIVATION_TYPE = [
  {
    name: "Mở mới",
    tag: "mo_moi",
    hint: "mở mới, lần đầu, mở thẻ mới, làm thẻ mới, phát hành mới",
  },
  {
    name: "Cấp lại",
    tag: "cap_lai",
    hint: "cấp lại, làm lại, phát lại, mở lại, phát hành lại",
  },
];

const CITY = [
  'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái', 'Phú Yên'
];

const DISTRICT = {
  'Hà Nội': ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa', 'Tây Hồ', 'Cầu Giấy', 'Thanh Xuân', 'Hoàng Mai', 'Long Biên', 'Bắc Từ Liêm', 'Thanh Trì', 'Gia Lâm', 'Đông Anh', 'Sóc Sơn', 'Hà Đông', 'Sơn Tây', 'Ba Vì', 'Phúc Thọ', 'Thạch Thất', 'Quốc Oai', 'Chương Mỹ', 'Đan Phượng', 'Hoài Đức', 'Thanh Oai', 'Mỹ Đức', 'Ứng Hòa', 'Thường Tín', 'Phú Xuyên', 'Mê Linh', 'Nam Từ Liêm'],
  'Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Gò Vấp', 'Tân Bình', 'Tân Phú', 'Bình Thạnh', 'Phú Nhuận', 'Thủ Đức', 'Bình Tân', 'Bình Chánh', 'Củ Chi', 'Hóc Môn', 'Nhà Bè', 'Cần Giờ'],
  'Đà Nẵng': ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu', 'Hòa Vang', 'Cẩm Lệ', 'Hoàng Sa'],
  'Hải Phòng': ['Hồng Bàng', 'Lê Chân', 'Ngô Quyền', 'Kiến An', 'Hải An', 'Đồ Sơn', 'An Lão', 'Kiến Thụy', 'Thủy Nguyên', 'An Dương', 'Tiên Lãng', 'Vĩnh Bảo', 'Cát Hải', 'Bạch Long Vĩ', 'Dương Kinh'],
  'Cần Thơ': ['Ninh Kiều', 'Bình Thủy', 'Cái Răng', 'Ô Môn', 'Phong Điền', 'Cờ Đỏ', 'Vĩnh Thạnh', 'Thốt Nốt', 'Thới Lai'],
  'An Giang': ['Long Xuyên', 'Châu Đốc', 'An Phú', 'Tân Châu', 'Phú Tân', 'Tịnh Biên', 'Tri Tôn', 'Châu Phú', 'Chợ Mới', 'Châu Thành', 'Thoại Sơn'],
  'Bà Rịa - Vũng Tàu': ['Vũng Tàu', 'Bà Rịa', 'Xuyên Mộc', 'Long Điền', 'Côn Đảo', 'Tân Thành', 'Châu Đức', 'Đất Đỏ'],
  'Bắc Giang': ['Bắc Giang', 'Yên Thế', 'Lục Ngạn', 'Sơn Đông', 'Lục Nam', 'Tân Yên', 'Hiệp Hòa', 'Lạng Giang', 'Việt Yên', 'Yên Dũng'],
  'Bắc Kạn': ['Bắc Kạn', 'Chợ Đồn', 'Bạch Thông', 'Na Rì', 'Ngân Sơn', 'Ba Bể', 'Chợ Mới', 'Pác Nặm'],
  'Bạc Liêu': ['Bạc Liêu', 'Vĩnh Lợi', 'Hồng Dân', 'Giá Rai', 'Phước Long', 'Đông Hải', 'Hòa Bình'],
  'Bắc Ninh': ['Bắc Ninh', 'Yên Phong', 'Quế Võ', 'Tiên Du', 'Từ Sơn', 'Thuận Thành', 'Gia Bình', 'Lương Tài'],
  'Bến Tre': ['Bến Tre', 'Châu Thành', 'Chợ Lách', 'Mỏ Cày Bắc', 'Giồng Trôm', 'Bình Đại', 'Ba Tri', 'Thạnh Phú', 'Mỏ Cày Nam'],
  'Bình Định': ['Quy Nhơn', 'An Lão', 'Hoài Ân', 'Hoài Nhơn', 'Phù Mỹ', 'Phù Cát', 'Vĩnh Thạnh', 'Tây Sơn', 'Vân Canh', 'An Nhơn', 'Tuy Phước'],
  'Bình Dương': ['Thủ Dầu Một', 'Bến Cát', 'Tân Uyên', 'Thuận An', 'Dĩ An', 'Phú Giáo', 'Dầu Tiếng', 'Bắc Tân Uyên', 'Bàu Bàng', 'Phú Giáo'],
  'Bình Phước': ['Đồng Xoài', 'Đồng Phú', 'Chơn Thành', 'Bình Long', 'Lộc Ninh', 'Bù Đốp', 'Phước Long', 'Bù Đăng', 'Hớn Quản', 'Bù Gia Mập', 'Phú Riềng'],
  'Bình Thuận': ['Phan Thiết', 'Tuy Phong', 'Bắc Bình', 'Hàm Thuận Bắc', 'Hàm Thuận Nam', 'Hàm Tân', 'Đức Linh', 'Tánh Linh', 'Phú Quý', 'La Gi'],
  'Cà Mau': ['Cà Mau', 'Thới Bình', 'U Minh', 'Trần Văn Thời', 'Cái Nước', 'Đầm Dơi', 'Ngọc Hiển', 'Năm Căn', 'Phú Tân'],
  'Cao Bằng': ['Cao Bằng', 'Bảo Lạc', 'Thông Nông', 'Hà Quảng', 'Trà Lĩnh', 'Trùng Khánh', 'Nguyên Bình', 'Hòa An', 'Quảng Uyên', 'Thạch An', 'Quảng Uyên', 'Thạch An', 'Hạ Lang', 'Bảo Lâm', 'Phục Hòa', 'Hòa An'],
  'Đắk Lắk': ['Buôn Ma Thuột', "Ea H'Leo", 'Krông Buk', 'Krông Năng', 'Ea Súp', "Cư M'gar", 'Krông Pắc', 'Ea Kar', "M'Đrắk", 'Krông Ana', 'Krông Bông', 'Lắk', 'Buôn Đôn', 'Cư Kuin', 'Buôn Hồ'],
  'Đắk Nông': ['Gia Nghĩa', "Đăk R'Lấp", 'Đăk Mil', 'Cư Jút', 'Đăk Song', 'Krông Nô', 'Đăk GLong', 'Tuy Đức'],
  'Điện Biên': ['Điện Biên Phủ', 'Mường Lay', 'Điện Biên', 'Tuần Giáo', 'Mường Chà', 'Tủa Chùa', 'Điện Biên Đông', 'Mường Nhé', 'Mường ảng', 'Nậm Pồ'],
  'Đồng Nai': ['Biên Hòa', 'Vĩnh Cửu', 'Tân Phú', 'Định Quán', 'Thống Nhất', 'Long Khánh', 'Xuân Lộc', 'Long Thành', 'Nhơn Trạch', 'Trảng Bom', 'Cẩm Mỹ'],
  'Đồng Tháp': ['Châu Thành', 'Lai Vung', 'Lấp Vò', 'Sa Đéc', 'Cao Lãnh', 'Tháp Mười', 'Tam Nông', 'Thanh Bình', 'Hồng Ngự', 'Tân Hồng'],
  'Gia Lai': ['Pleiku', 'Chư Păh', 'Mang Yang', 'KBang', 'An Khê', 'Kông Chro', 'Đức Cơ', 'Chư Prông', 'Chư Sê', 'Ayun Pa', 'Krông Pa', 'Ia Grai', 'Đak Đoa', 'Ia Pa', 'Đak Pơ', 'Phú Thiện', 'Chư Pưh'],
  'Hà Giang': ['Hà Giang', 'Đồng Văn', 'Mèo Vạc', 'Yên Minh', 'Quản Bạ', 'Vị Xuyên', 'Bắc Mê', 'Hoàng Su Phì', 'Xín Mần', 'Bắc Quang', 'Quang Bình', 'Bắc Mê'],
  'Hà Nam': ['Phủ Lý', 'Duy Tiên', 'Kim Bảng', 'Lý Nhân', 'Thanh Liêm', 'Bình Lục'],
  'Hà Tĩnh': ['Hà Tĩnh', 'Hồng Lĩnh', 'Hương Sơn', 'Đức Thọ', 'Nghi Xuân', 'Can Lộc', 'Hương Khê', 'Thạch Hà', 'Cẩm Xuyên', 'Kỳ Anh', 'Vũ Quang', 'Lộc Hà', 'Kỳ Anh'],
  'Hải Dương': ['Hải Dương', 'Chí Linh', 'Nam Sách', 'Kinh Môn', 'Gia Lộc', 'Tứ Kỳ', 'Thanh Miện', 'Ninh Giang', 'Cẩm Giàng', 'Thanh Hà', 'Kim Thành', 'Bình Giang'],
  'Hậu Giang': ['Vị Thanh', 'Vị Thủy', 'Long Mỹ', 'Phụng Hiệp', 'Châu Thành', 'Châu Thành A', 'Ngã Bảy', 'Long Mỹ'],
  'Hòa Bình': ['Hòa Bình', 'Đà Bắc', 'Mai Châu', 'Tân Lạc', 'Lạc Sơn', 'Kỳ Sơn', 'Lương Sơn', 'Kim Bôi', 'Lạc Thủy', 'Yên Thủy', 'Cao Phong'],
  'Hưng Yên': ['Hưng Yên', 'Kim Động', 'Ân Thi', 'Khóai Châu', 'Yên Mỹ', 'Tiên Lữ', 'Phù Cừ', 'Mỹ Hào', 'Văn Lâm', 'Văn Giang'],
  'Khánh Hòa': ['Nha Trang', 'Vạn Ninh', 'Ninh Hòa', 'Diên Khánh', 'Khánh Vĩnh', 'Cam Ranh', 'Khánh Sơn', 'Trường Sa', 'Cam Lâm'],
  'Kiên Giang': ['Rạch Giá', 'Hà Tiên', 'Kiên Lương', 'Hòn Đất', 'Tân Hiệp', 'Châu Thành', 'Giồng Riềng', 'Gò Quao', 'An Biên', 'An Minh', 'Vĩnh Thuận', 'Phú Quốc', 'Kiên Hải', 'U Minh Thượng', 'Giang Thành'],
  'Kon Tum': ['Kon Tum', 'ĐĂK GLEI', 'Ngọc Hồi', 'Đăk Tô', 'Sa Thầy', 'Kon Plông', 'Đăk Hà', 'Kon Rẫy', 'Tu Mơ Rông', "IA H'DRAI"],
  'Lai Châu': ['Lai Châu', 'Tam Đường', 'Phong Thổ', 'Sìn Hồ', 'Mường Tè', 'Than Uyên', 'Tân Uyên', 'Nậm Nhùn'],
  'Lâm Đồng': ['Đà Lạt', 'Bảo Lộc', 'Đức Trọng', 'Di Linh', 'Đơn Dương', 'Lạc Dương', 'Đạ Huoai', 'Đạ Tẻh', 'Cát Tiên', 'Lâm Hà', 'Bảo Lâm', 'Đam Rông'],
  'Lạng Sơn': ['Lạng Sơn', 'Tràng Định', 'Bình Gia', 'Văn Lãng', 'Bắc Sơn', 'Văn Quan', 'Cao Lộc', 'Lộc Bình', 'Chi Lăng', 'Đình Lập', 'Hữu Lũng'],
  'Lào Cai': ['Bảo Thắng', 'Bảo Yên', 'Bát Xát', 'Bắc Hà', 'Lào Cai', 'Mường Khương', 'Sa Pa', 'Si Ma Cai', 'Văn Bàn'],
  'Long An': ['Tân An', 'Vĩnh Hưng', 'Mộc Hóa', 'Tân Thạnh', 'Thạnh Hóa', 'Đức Huệ', 'Đức Hòa', 'Bến Lức', 'Thủ Thừa', 'Châu Thành', 'Tân Trụ', 'Cần Đước', 'Cần Giuộc', 'Tân Hưng', 'Kiến Tường'],
  'Nam Định': ['Nam Định', 'Mỹ Lộc', 'Xuân Trường', 'Giao Thủy', 'ý Yên', 'Vụ Bản', 'Nam Trực', 'Trực Ninh', 'Nghĩa Hưng', 'Hải Hậu'],
  'Nghệ An': ['Vinh', 'Cửa Lò', 'Quỳ Châu', 'Quỳ Hợp', 'Nghĩa Đàn', 'Quỳnh Lưu', 'Kỳ Sơn', 'Tương Dương', 'Con Cuông', 'Tân Kỳ', 'Yên Thành', 'Diễn Châu', 'Anh Sơn', 'Đô Lương', 'Thanh Chương', 'Nghi Lộc', 'Nam Đàn', 'Hưng Nguyên', 'Quế Phong', 'Thái Hòa', 'Hoàng Mai'],
  'Ninh Bình': ['Ninh Bình', 'Tam Điệp', 'Nho Quan', 'Gia Viễn', 'Hoa Lư', 'Yên Mô', 'Kim Sơn', 'Yên Khánh'],
  'Ninh Thuận': ['Phan Rang -Tháp Chàm', 'Ninh Sơn', 'Ninh Hải', 'Ninh Phước', 'Bác Ái', 'Thuận Bắc', 'Thuận Nam'],
  'Phú Thọ': ['Việt Trì', 'Phú Thọ', 'Đoan Hùng', 'Thanh Ba', 'Hạ Hòa', 'Cẩm Khê', 'Yên Lập', 'Thanh Sơn', 'Phù Ninh', 'Lâm Thao', 'Tam Nông', 'Thanh Thủy', 'Tân Sơn'],
  'Quảng Bình': ['Đồng Hới', 'Tuyên Hóa', 'Minh Hóa', 'Quảng Trạch', 'Bố Trạch', 'Quảng Ninh', 'Lệ Thủy', 'Ba Đồn'],
  'Quảng Nam': ['Tam Kỳ', 'Hội An', 'Duy Xuyên', 'Điện Bàn', 'Đại Lộc', 'Quế Sơn', 'Hiệp Đức', 'Thăng Bình', 'Núi Thành', 'Tiên Phước', 'Bắc Trà My', 'Đông Giang', 'Nam Giang', 'Phước Sơn', 'Nam Trà My', 'Tây Giang', 'Phú Ninh', 'Nông Sơn'],
  'Quảng Ngãi': ['Bình Sơn', 'Sơn Tịnh', 'Quảng Ngãi', 'Tư Nghĩa', 'Nghĩa Hành', 'Mộ Đức', 'Đức phổ', 'Ba Tơ', 'Minh Long', 'Sơn Hà', 'Sơn Tây', 'Trà Bồng', 'Tây Trà', 'Lý Sơn'],
  'Quảng Ninh': ['Hạ Long', 'Cẩm Phả', 'Uông Bí', 'Móng Cái', 'Bình Liêu', 'Đầm Hà', 'Hải Hà', 'Tiên Yên', 'Ba Chẽ', 'Đông Triều', 'Quảng Yên', 'Hoành Bồ', 'Vân Đồn', 'Cô Tô'],
  'Quảng Trị': ['Đông Hà', 'Quảng Trị', 'Vĩnh Linh', 'Gio Linh', 'Cam Lộ', 'Triệu Phong', 'Hải Lăng', 'Hướng Hóa', 'Đakrông', 'Cồn Cỏ'],
  'Sóc Trăng': ['Sóc Trăng', 'Kế Sách', 'Mỹ Tú', 'Mỹ Xuyên', 'Thạnh Trị', 'Long Phú', 'Vĩnh Châu', 'Cù Lao Dung', 'Ngã Năm', 'Châu Thành', 'Trần Đề'],
  'Sơn La': ['Sơn La', 'Quỳnh Nhai', 'Mường La', 'Thuận Châu', 'Bắc Yên', 'Phù Yên', 'Mai Sơn', 'Yên Châu', 'Sông Mã', 'Mộc Châu', 'Sốp Cộp', 'Vân Hồ'],
  'Tây Ninh': ['Tây Ninh', 'Tân Biên', 'Tân Châu', 'Dương Minh Châu', 'Châu Thành', 'Hòa Thành', 'Bến Cầu', 'Gò Dầu', 'Trảng Bàng'],
  'Thái Bình': ['Thái Bình', 'Quỳnh Phụ', 'Hưng Hà', 'Đông Hưng', 'Vũ Thư', 'Kiến Xương', 'Tiền Hải', 'Thái Thụy'],
  'Thái Nguyên': ['Thái Nguyên', 'Sông Công', 'Định Hóa', 'Phú Lương', 'Võ Nhai', 'Đại Từ', 'Đồng Hỷ', 'Phú Bình', 'Phổ Yên'],
  'Thanh Hóa': ['Thanh Hóa', 'Bỉm Sơn', 'Sầm Sơn', 'Quan Hóa', 'Quan Sơn', 'Mường Lát', 'Bá Thước', 'Thường Xuân', 'Như Xuân', 'Như Thanh', 'Lang Chánh', 'Ngọc Lặc', 'Thạch Thành', 'Cẩm Thủy', 'Thọ Xuân', 'Vĩnh Lộc', 'Thiệu Hóa', 'Triệu Sơn', 'Nông Cống', 'Đông Sơn', 'Hà Trung', 'Hoằng Hóa', 'Nga Sơn', 'Hậu Lộc', 'Quảng Xương', 'Tĩnh Gia', 'Yên Định'],
  'Thừa Thiên Huế': ['Huế', 'Phong Điền', 'Quảng Điền', 'Hương Trà', 'Phú Vang', 'Hương Thủy', 'Phú Lộc', 'Nam Đông', 'A Lưới'],
  'Tiền Giang': ['Mỹ Tho', 'Gò Công', 'Cái Bè', 'Cai Lậy', 'Châu Thành', 'Chợ Gạo', 'Công Tây', 'Công Đông', 'Tân Phước', 'Tân Phú Đông', 'Cai Lậy'],
  'Trà Vinh': ['Trà Vinh', 'Càng Long', 'Cầu Kè', 'Tiểu Cần', 'Châu Thành', 'Trà Cú', 'Cầu Ngang', 'Duyên Hải'],
  'Tuyên Quang': ['Tuyên Quang', 'Lâm Bình', 'Na Hang', 'Chiêm Hóa', 'Hàm Yên', 'Yên Sơn', 'Sơn Dương'],
  'Vĩnh Long': ['Vĩnh Long', 'Long Hồ', 'Mang Thít', 'Bình Minh', 'Tam Bình', 'Trà Ôn', 'Vũng Liêm', 'Bình Tân'],
  'Vĩnh Phúc': ['Vĩnh Yên', 'Tam Dương', 'Lập Thạch', 'Vĩnh Tường', 'Yên Lạc', 'Bình Xuyên', 'Sông Lô', 'Phúc Yên', 'Tam Đảo'],
  'Yên Bái': ['Yên Bái', 'Nghĩa Lộ', 'Văn Yên', 'Yên Bình', 'Mù Cang Chải', 'Văn Chấn', 'Trấn Yên', 'Trạm Tấu', 'Lục Yên'],
  'Phú Yên': ['Tuy Hòa', 'Đồng Xuân', 'Sông Cầu', 'Tuy An', 'Sơn Hòa', 'Sông Hinh', 'Đông Hòa', 'Phú Hòa', 'Tây Hòa'],
};

const GENERIC_INTENT = [
  "Chào hỏi",
  "Bot làm được gì?",
  "Khen",
  "Chê",
  "Tạm biệt",
  "Câu hỏi thông thường khác",
]

module.exports = {
  INTENT,
  SLOT_LABEL,
  LOAN_PURPOSE,
  LOAN_TYPE,
  CARD_TYPE,
  CARD_USAGE,
  DIGITAL_BANK,
  CARD_ACTIVATION_TYPE,
  CITY,
  DISTRICT,
  GENERIC_INTENT,
}