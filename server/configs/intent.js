const SCENARIO=[
  {
    name:"Khoá/mở khoá thẻ hoặc dịch vụ Ngân hàng điện tử",
    context:"Bạn bị mất ví và điện thoại, lo lắng thẻ ngân hàng và tài khoản\n" +
        "Mobile Banking trên điện thoại sẽ bị kẻ gian lợi dụng. Bạn yêu cầu ngân hàng khóa ngay thẻ hoặc dịch vụ NHĐT." +
        "Hơn nữa,về thủ tục làm lại thẻ có mất thời gian, bao lâu thì nhận được thẻ và mở khóa dịch vụ " +
        "NHĐT/Internet banking/Mobile banking",
    servant:"Hướng dẫn khách hàng mang CCCD hoặc CMTND đến chi nhánh gần nhất để làm lại thẻ và mở khóa dịch vụ." +
        "Thời gian cấp lại thẻ là 5-7 ngày, phí làm mới là 50kVND"
  }
  ,
  {
    name:"Mở thẻ",
    context:"Bạn đang muốn đăng ký thẻ tín dụng để có thể mua sắm trực tuyến(sử dụng những trang thương mai điện tử nước ngoài như amazon, r). Tuy\n" +
        "nhiên lại chưa rõ ngân hàng có những loại thẻ nào. Loại thẻ nào đáp ứng được nhu\n" +
        "cầu của bản thânvà để được phát hành loại thẻ đó",
    servant:"Hãy giới thiệu cho khách hàng có 2 loại thẻ tín dụng nội địa và quốc tế, thẻ có 2 loại là trả trước và trả sau." +
        "Thu nhập hàng tháng là bao nhiêu."+
        "Thông tin cơ bản của khách hàng(SĐT, nghề nghiệp, địa chỉ thường chú, " +
        "tình trạng hôn nhân). Hiện tại có các loại tài sản nào để đảm bảo(lương" +
        " hàng tháng, bất động sản, tài sản cá nhân có giá trị cao, etc). Có giấy tờ " +
        "chứng mình đối với các loại tài sản đó(in sao kê bản lương, sổ đỏ, etc). "
  },
  {
    name:"Gửi tiền",
    context:"Bạn có một số tiền tiết kiệm muốn gửi vào ngân hàng đề dành dụm cho sau này. Tuy nhiên bạn chưa hiểu rõ về lãi suất tiết kiệm và các chính sách ưu đãi của ngân hàng khi gửi tiền",
    servant:"Bạn có thể hỏi số tiền muốn gửi là bao nhiêu, gửi tiền VND hay ngoại hối, gửi tiền trong bao lâu. " +
        "Có thể giới thiệu cho khách hàng về các chính sách ưu đãi khi gửi tiền online hơn là phải ra quầy." +
        "Thủ tục mở thẻ khá đơn giản chỉ cần mang CMT hoặc CCCD đến chính nhánh gần nhất"
  },
  {
    name:"Vay vốn",
    context:"Bạn muốn vay vốn sử dụng cho các mục đích cá nhân. Ví dụ: vay mua nhà, " +
        "mua xe, vay tiêu dùng(du lịch, mua đồ) hay đầu tư kinh doanh. Nhưng hiện tại " +
        "chưa rõ làm thế nào để được ngân hàng giải ngân?",
    servant:"Mục đích vay là gì, vay bao lâu, vay bao nhiêu tiền. " +
        "Thu nhập hàng tháng là bao nhiêu."+
        "Thông tin cơ bản của khách hàng(SĐT, nghề nghiệp, địa chỉ thường chú, " +
        "tình trạng hôn nhân). Hiện tại có các loại tài sản nào để đảm bảo(lương" +
        " hàng tháng, bất động sản, tài sản cá nhân có giá trị cao, etc). Có giấy tờ " +
        "chứng mình đối với các loại tài sản đó(in sao kê bản lương, sổ đỏ, etc). " +
        "Sau khi đã đạt đủ điều kiện cơ bản," +
        " hẹn khách hàng đến chi nhánh gần nhất để tư vấn thêm"
  },
  {
    name:"Khiếu nại khi có sự cố",
    context:"Bạn gặp sự cố khi giao dịch(chuyển khoản\n" +
        "nhầm, không nhận được OTP, giao dịch bị lỗi,etc). Bạn cần báo cáo sự cố đến bộ phận\n" +
        "có thẩm quyền đồng thời cần được hướng dẫn để khắc phục sự cố",
    servant:"Chuyển khoản nhầm thì cần hỏi các thông tin về ngày giờ thực hiện giao dịch, ảnh chứng minh, và ." +
        "Nếu không nhận được mã OTP thì ngân hàng sẽ gửi lại mã OPT cho khách."+
        "Rút tiền mà bị nuốt thẻ hoặc rút tiền mà không ra tiền thì khác hàng nên gọi điện lên tổng đài của VCB để khóa thẻ và đến chi nhánh gần nhất để thông báo." +
        "Ngoài ra có thể đọc thêm thông tin ở thanh search để có bước giải quylýết hợp "
  },
]


const QA = [
  {
    scenario: 1,
    question:"Cách khóa thẻ",
    answer:"Tới chi nhánh gần nhất để yêu cầu dịch vụ"
  },
  {
    scenario: 1,
    question:"Cách khóa Mobile banking/Ngân hàng điện tử",
    answer:"Tới chi nhánh gần nhất để yêu cầu dịch vụ"
  },
  {
    scenario: 1,
    question:"Hướng dẫn hủy dịch vụ Mobile banking",
    answer:"Liên hệ với điểm giao dịch Vietcombank gần nhất để đăng ký ngừng sử dụng dịch" +
        " vụ VCB-Mobile B@nking* Hoặc, hủy dịch vụ VCB-Mobile B@nking qua kênh ngân hàng trên internet VCB – iB@nking"
  },
  {
    scenario: 1,
    question:"Hướng dẫn làm lại thẻ",
    answer:"Mang Chứng minh nhân dân/Căn cước hoặc Hộ chiếu đến phòng giao dịch Vietcombank" +
        " gần nhất* Và chuẩn bị 50000 VNĐ cho phí làm thẻ"
  },
  {
    scenario: 1,
    question:"Thời gian phát hành thẻ",
    answer:"Phát hành thẻ theo quy định là 5 - 7 ngày làm việc* Tuy nhiên việc in phôi thẻ được xử lý tập trung tại Hội sở chính nên thời gian cụ thể có thể kéo dài hơn*\n" +
        "Do đó, cân nhắc tình hình thực tế mà chi nhánh tiếp nhận phát hành sẽ hẹn ngày trả thẻ cụ thể phù hợp*" +
        "Thông thường, sau khi đăng ký phát hành thẻ thành công, chi nhánh Vietcombank sẽ ghi ngày lấy thẻ trong tờ giấy hẹn, " +
        "* Trường hợp chi nhánh không giao giấy hẹn lấy thẻ liên hệ với chi nhánh nơi đã tiếp nhận yêu cầu phát hành thẻ sau 5 - 7 ngày làm việc để kiểm tra đã có thẻ hay chưa"
  },
  {
    scenario: 1,
    question:"Hướng dẫn làm lại thẻ",
    answer:"Mang Chứng minh nhân dân/Căn cước hoặc Hộ chiếu đến phòng giao dịch Vietcombank" +
        " gần nhất để được hướng dẫn làm thủ tục cấp lại thẻ* Và chuẩn bị 50000 VNĐ cho phí làm thẻ"
  },
  {
    scenario: 1,
    question:"Hướng dẫn tải ứng dụng Mobile banking",
    answer:"Sau khi đăng ký dịch vụ thành công, quý khách sẽ nhận được tin nhắn SMS từ Vietcombank thông báo đăng ký thành công và có chứa link tải ứng dụng* \n" +
        "Sau khi kiểm tra kết nối internet từ điện thoại (3G/GPRS/Wifi), tùy thuộc vào loại điện thoại, quý khách thực hiện tải ứng dụng như sau:" +
        "*Với điện thoại hỗ trợ Java & điện thoại sử dụng hệ điều hành BlackBerry OS:  Nhấn vào link hoặc nhấp đường link vào trình duyệt điện thoại để truy cập đến máy chủ*" +
        "Với điện thoại với sử dụng điều hành Android: quý khách truy cập Google Play, gõ tìm kiếm tên ứng dụng “Vietcombank” và thực hiện tải và cài đặt ứng dụng về máy điện thoại*" +
        "Với điện thoại sử dụng hệ điều hành iOS (iPhone): quý khách truy cập AppStore, gõ tìm kiếm tên ứng dụng “Vietcombank” và thực hiện tải và cài đặt ứng dụng về máy điện thoại"
  },
  {
    scenario: 1,
    question:"Dịch vụ Internet Banking là gì",
    answer:"VCB-iB@nking là chương trình phần mềm ứng dụng do Vietcombank phát triển và cung cấp trên website để Quý khách có thể thực hiện các giao dịch với ngân hàng mọi lúc mọi nơi thông qua các thiết bị có kết nối Internet như máy tính, máy tính bảng, thiết bị di động, etc"

  },
  {
    scenario: 1,
    question:"Dịch vụ Mobile Banking là gì",
    answer:"Dịch vụ VCB-Mobile B@nking là dịch vụ cho phép khách hàng thực hiện các giao dịch tài chính với ngân hàng và các giao dịch phi tài chính  khác ngay trên ứng dụng VCB-Mobile B@nking cài đặt trên thiết bị di động"
  },
  {
    scenario: 1,
    question:"Dịch vụ SMS Banking là gì",
    answer:"Dịch vụ VCB-SMS B@nking là dịch vụ ngân hàng qua tin nhắn điện thoại di động cho phép khách hàng nhận các tin nhắn thông báo biến động số dư tài khoản tiền gửi thanh toán và chi tiêu hẻ tín dụng hoặc chủ động truy vấn thông tin, nạp tiền điện thoại thông qua việc gửi tin nhắn theo cú pháp đến đầu số 6167"
  },
  {
    scenario: 1,
    question:"Dịch vụ Phone Banking là gì",
    answer:"VCB-Phone B@nking là một dịch vụ ngân hàng của VCB thông qua đầu số điện thoại cố định khách hàng có thể giao dịch với ngân hàng cung ứng dịch vụ mà không cần phải đến ngân hàng. Các dịch vụ phổ biến hiện nay cung cấp trên Phone Banking bao gồm*" +
        "Truy vấn tài khoản, liệt kê giao dịch, thanh toán, chuyển tiền, tư vấn thông tin sản phẩm dịch vụ của ngân hàng, giải đáp thắc mắc, khiếu nại của khách hàng đối với Ngân hàng"
  },

  {
    scenario: 1,
    question:"Dịch vụ VCBPAY",
    answer:"VCBPAY là ứng dụng thứ cấp đầu tiên thuộc hệ sinh thái ứng dụng Mobile Banking, sử dụng chung tên đăng nhập và mật khẩu truy cập của ứng dụng VCB-Mobile B@nking* \n" +
        "Do đó, khi thay đổi mật khẩu một trong hai ứng dụng sẽ đồng thời thay đổi mật khẩu của ứng dụng còn lại*\n" +
        "VCBPAY là ứng dụng cài đặt trên thiết bị di động mang lại cho khách hàng trải nghiệm thanh toán P2P nhanh chóng và các tiện ích tuyệt vời"
  },
  {
    scenario: 1,
    question:"Hướng dẫn thay đổi số điện thoại đăng ký ngân hàng điện tử",
    answer:"Mang theo CMND/CCCD đến điểm giao dịch Vietcombank gần nhất để thực hiện thay đổi thông tin đăng ký"
  },
  {
    scenario: 1,
    question:"Hướng dẫn mở lại dịch vụ Ngân hàng điện tử",
    answer:"Không có thông tin"
  },
  {
    scenario: 2,
    question:"Các loại thẻ mà ngân hàng hỗ trợ",
    answer:"Hiện tại Vietcombank đang phát hành 3 loại thẻ chính bao gồm: \n" +
        "Ghi nợ nội địa, ghi nợ quốc tế, tín dụng quốc tế*\n" +
        "Đối với thẻ quốc tế, Vietcombank phát hành đa dạng với hầu hết các thương hiệu thẻ phổ biến như Visa, Mastercard, American Express, JCB, Unionpay \n"
  },
  {
    scenario: 2,
    question:"Thẻ JCB là thẻ gì",
    answer:"Thẻ JCB là cách mọi người gọi các thẻ thanh toán quốc tế (thẻ tín dụng, thẻ ghi nợ, và thẻ trả trước) mang thương hiệu JCB*" +
        "JCB là công ty cung cấp công nghệ thanh toán toàn cầu có trụ sở tại Nhật Bản* Công ty này thiết lập một mạng lưới thanh toán kết nối chủ thẻ, đơn vị chấp nhận thẻ (trung tâm thương mại, nhà hàng, spa, etc) và ngân hàng/tổ chức phát hành thẻ (phát hành thẻ và xử lý giao dịch), giúp các giao dịch hoàn tất nhanh chóng và dễ dàng"
  },
  {
    scenario: 2,
    question:"Thẻ Visa là thẻ gì",
    answer:"Thẻ Visa là loại thẻ thanh toán quốc tế do công ty Visa International Service Association có trụ sở tại San Francisco, California, Mỹ liên kết với các ngân hàng phát hành* Trên thẻ có biểu tượng VISA nằm ở góc bên phải"
  },
  {
    scenario: 2,
    question:"Thẻ Mastercard là thẻ gì",
    answer:"Thẻ MasterCard là loại thẻ thanh toán quốc tế do công ty MasterCard Worldwide có trụ sở ở Purchase, New York, Mỹ kết hợp với các ngân hàng phát hành* Trên thẻ có biểu tượng MasterCard nằm ở góc bên phải"
  },
  {
    scenario: 2,
    question:"Thẻ nội địa",
    answer:"Thẻ ATM là một loại thẻ theo chuẩn ISO 7810, dùng để thực hiện các giao dịch tự động như kiểm tra tài khoản, rút tiền hoặc chuyển khoản, thanh toán hóa đơn, mua thẻ điện thoại,etc từ máy rút tiền tự động ATM. Thẻ ATM bao gồm: Thẻ trả trước, thẻ ghi nợ và thẻ tín dụng*" +
        "Thẻ ATM nội địa (hay thẻ thanh toán nội địa) là loại thẻ ngân hàng thay cho tiền mặt, dùng để thanh toán hóa đơn ở siêu thị, cửa hàng, rút tiền thông qua ATM hoặc máy POS đều được* Khác với thẻ thanh toán quốc tế thì thẻ ATM nội địa chỉ có thể thanh toán trong quốc gia của bạn chứ không dùng được ở nước ngoài"
  },
  {
    scenario: 2,
    question:"Hướng dẫn mở thẻ",
    answer:"Quý khách có thể mở thẻ theo 2 cách sau: \n" +
        "*Cách 1: Mở thẻ online\n" +
        "*Truy cập đường dẫn sau: https://bit.ly/2QKDLTc\n" +
        "*Tích chọn đăng ký mở thẻ\n" +
        "*Điền đầy đủ thông tin theo yêu cầu của biểu mẫu (Họ và Tên, địa chỉ, nơi ở, hộ khẩu, ngày sinh, số CMND/Hộ chiếu, email, etc)\n" +
        "*Sau khi hoàn tất, quý khách sẽ nhận được cuộc gọi từ ngân hàng hướng dẫn xác minh thông tin cũng như cách nhận thẻ" +
        "*Cách 2: Mở thẻ tại điểm giao dịch Vietcombank\n" +
        "*Đem theo CMTND, thẻ căn cước đến điểm giao dịch Vietcombank gần nhất để giao dịch viên hỗ trợ trực tiếp"
  },
  {
    scenario: 2,
    question:"Điều kiện mở thẻ",
    answer:"Điều kiện phát hành đối với các loại thẻ của Vietcombank như sau:\n" +
        "*Cá nhân từ 15 tuổi trở lên, không bị mất hoặc hạn chế năng lực hành vi dân sự theo quy định của pháp luật\n" +
        "*Trường hợp đối tượng phát hành thẻ là người nước ngoài thì phải được phép cư trú tại Việt Nam với thời hạn từ 12 tháng trở lên\n" +
        "*Riêng đối với các loại thẻ tín dụng Vietcombank, để mở thẻ: Điều kiện lương chuyển khoản từ 5 triệu trở lên \n" +
        "*Nếu nhận lương qua tài khoản Vietcombank: Quý khách sẽ được miễn cung cấp giấy tờ chứng minh thu nhập \n" +
        "*Nếu không nhận lương qua tài khoản Vietcombank: Quý khách có thể lựa chọn 1 trong hai nhóm giấy tờ sau:\n" +
        "*Sao kê lương qua ngân hàng trong 03 tháng gần nhất và Hợp đồng lao động/Quyết định bổ nhiệm/Quyết định nâng lương/Quyết định tuyển dụng \n" +
        "*Xác nhận của cơ quan công tác theo mẫu Vietcombank quy định, nếu không muốn chứng minh thu nhập quý khách có thể thế chấp giấy tờ có giá (ví dụ như sổ tiết kiệm)"
  },
  {
    scenario: 2,
    question:"Thủ tục cấp lại thẻ",
    answer:"Tất cả các thông tin đều được lưu trữ trong hệ thống Vietcombank* " +
        "Do đó để làm lại thẻ quý khách chỉ cần một trong những giấy tờ sau: Chứng minh nhân dân (CMND) bản gốc; Thẻ căn cước công dân; Hộ chiếu; Chiếc thẻ ATM Vietcombank bị hỏng"
  },
  {
    scenario: 2,
    question:"Phí mở thẻ",
    answer:"Lần đầu phát hành thẻ miễn phí, tính phí từ lần tiếp theo phát hành phôi"
  },
  {
    scenario: 2,
    question:"Cách thanh toán thẻ",
    answer:"Hiện nay có 3 cách để thanh toán số dư trên tài khoản Thẻ tín dụng:" +
        "*Tự động trích nợ tài khoản thanh toán – Đăng ký dịch vụ trích nợ tự động từ tài khoản thanh toán của mình mở tại Vietcombank số tiền thanh toán tối thiểu hoặc toàn bộ dư nợ thẻ tín dụng hàng tháng. Quý khách chỉ cần kiểm tra xem mình có đủ tiền trong tài khoản thanh toán vào ngày đến hạn\n" +
        "*Chuyển khoản – Có thể chuyển khoản từ tài khoản Vietcombank sang tài khoản Thẻ tín dụng thông qua máy ATM của Vietcombank, hoặc dịch vụ ngân hàng trực tuyến, hoặc chuyển khoản từ ngân hàng khác\n" +
        "*Thanh toán tiền mặt/séc  – Quý khách cũng có thể nộp tiền mặt tại các máy ATM đa chức năng hoạt động 24/24, được đặt tại các chi nhánh/ phòng giao dịch của Vietcombank; hoặc nộp tiền mặt tại quầy giao dịch của Vietcombank trong các ngày làm việc"
  },
  {
    scenario: 2,
    question:"Hạn mức từng loại thẻ",
    answer:"Không có thông tin"
  },
  {
    scenario: 2,
    question:"Lãi suất khi sử dụng thẻ tín dụng",
    answer:"Hiện tại mức lãi suất đang áp dụng với các sản phẩm thẻ tín dụng của Vietcombank từ 9%/năm đến 18%/năm tùy theo sản phẩm thẻ và hình thức cấp tín dụng thẻ"
  },
  {
    scenario: 2,
    question:"Cách sử dụng thẻ",
    answer:"Quý khách có thể thanh toán tại điểm chấp nhận thanh toán thẻ như nhà hàng ăn nhanh, siêu thị, cửa hàng tiện lợi, cửa hàng café, cây xăng, nhà thuốc, hoặc các cửa hàng có máy POS"
  },
  {
    scenario: 2,
    question:"Tính năng thẻ",
    answer:"Khách hàng có thể sử dụng thẻ Vietcombank để:\n" +
        "*Giao dịch tại hàng triệu máy ATM và hệ thống các đơn vị chấp nhận thẻ của VCB trên khắp cả nước;\n" +
        "*Hưởng lãi không kỳ hạn trên số dư tài khoản của khách hàng;\n" +
        "*Thanh toán linh hoạt tại các đơn vị chấp nhận thẻ trên toàn quốc, thanh toán tiện lợi qua Internet và các ứng dụng di động như ví điện tử MOCA;\n" +
        "*Thanh toán linh hoạt tại hàng triệu đơn vị chấp nhận thẻ tại Việt Nam, bao gồm cả các điểm chấp nhận thẻ contactless;\n" +
        "*Thanh toán hóa đơn cho các dịch vụ điện nước, viễn thông, bảo hiểm, thanh toán vé máy bay online;\n" +
        "*Quản lý và kiểm soát chi tiêu thông qua các tiện ích gia tăng như VCB-iB@nking, VCB-Mobile banking, SMS Banking, VCB-Phone Banking;\n" +
        "*Các giao dịch được phép khác mà Vietcombank quy định\n" +
        "*Dịch vụ khách hàng 24/7 qua tổng đài của Trung tâm Hỗ trợ khách hàng 1900.54.54.13."
  },
  {
    scenario: 3,
    question:"Cách gửi tiết kiệm",
    answer:"Quý khách có thể đăng kí mở tài khoản thanh toán hoặc sổ tiết kiệm bằng cách:\n" +
        "*Tới địa điểm giao dịch:\n" +
        "*Khi đến vui lòng đem theo Giấy tờ xác minh thông tin của khách hàng (giấy chứng minh nhân dân hoặc Thẻ căn cước công dân hoặc Hộ chiếu còn thời hạn hiệu lực hoặc Giấy khai sinh của cá nhân chưa đủ 14 tuổi) để mở tài khoản theo sự hướng dẫn của GDV*\n" +
        "Trường hợp gửi thêm tiền vào TTK, người gửi tiền xuất trình thêm TTK khi gửi tiền*\n" +
        "Gửi tiết kiệm qua phương tiện điện tử: thực hiện theo quy định tại sản phẩm Tiền gửi trực tuyến"
  },
  {
    scenario: 3,
    question:"Các loại tiền có thể gửi tiết kiệm",
    answer:"Tùy sản phẩm, các loại ngoại tệ sẽ được quy định từng thời kì: \n" +
        "*Tài khoản tiền gửi và tiết kiệm trả lãi sau: các loại ngoại tệ quy định từng thời kì\n" +
        "*Tiết kiệm trả lãi trước hoặc lãi định kì: USD, EUR\n" +
        "*Tiết kiệm tự động: USD\n" +
        "*Tích lũy kiều hối: USD\n" +
        "*Riêng đối với loại tiền gửi trực tuyến, chỉ có thể gửi bằng loại tiền VND"
  },
  {
    scenario: 3,
    question:"Lãi suất tiết kiệm",
    answer:"Không có thông tin"
  },
  {
    scenario: 3,
    question:"Thời hạn gửi tiết kiệm",
    answer:"Không có thông tin"
  },
  {
    scenario: 3,
    question:"Cách mở khoản tiết kiệm",
    answer:"Quý khách có thể đăng kí mở tài khoản thanh toán hoặc sổ tiết kiệm bằng cách:\n" +
        "*Khi đến vui lòng đem theo Giấy tờ xác minh thông tin của khách hàng (giấy chứng minh nhân dân hoặc Thẻ căn cước công dân hoặc Hộ chiếu còn thời hạn hiệu lực hoặc Giấy khai sinh của cá nhân chưa đủ 14 tuổi) để mở tài khoản theo sự hướng dẫn của GDV.\n" +
        "*Trường hợp gửi thêm tiền vào TTK, người gửi tiền xuất trình thêm TTK khi gửi tiền\n" +
        "*Gửi tiết kiệm qua phương tiện điện tử: thực hiện theo quy định tại  sản phẩm Tiền gửi trực tuyến"
  },
  {
    scenario: 3,
    question:"Cách tất toán tài khoản tiết kiệm",
    answer:"Tài khoản tiết kiệm tất toán trước hạn được xử lý như sau:\n" +
        "*Tiền lãi được tính trên cơ sở số tiền gửi, số ngày gửi thực tế, hình thức trả lãi và mức lãi suất rút trước hạn tiền gửi tiết kiệm\n" +
        "*Đối với loại tiền gửi trả lãi trước hoặc trả lãi định kỳ, Vietcombank sẽ thu lại phần chênh lệch giữa số lãi đã lĩnh và số lãi khách hàng được hưởng (nếu có) khi trả gốc cho khách hàng"
  },
  {
    scenario: 3,
    question:"Thủ tục mở tài khoản",
    answer:"Quý khách có thể đăng kí mở tài khoản thanh toán hoặc sổ tiết kiệm bằng cách:\n" +
        "*Khi đến vui lòng đem theo Giấy tờ xác minh thông tin của khách hàng (giấy chứng minh nhân dân hoặc Thẻ căn cước công dân hoặc Hộ chiếu còn thời hạn hiệu lực hoặc Giấy khai sinh của cá nhân chưa đủ 14 tuổi) để mở tài khoản theo sự hướng dẫn của GDV\n" +
        "*Trường hợp gửi thêm tiền vào TTK, người gửi tiền xuất trình thêm TTK khi gửi tiền\n" +
        "*Gửi tiết kiệm qua phương tiện điện tử: thực hiện theo quy định tại  sản phẩm Tiền gửi trực tuyến"
  },
  {
    scenario: 3,
    question:"Giấy tờ mở tài khoản",
    answer:"Hồ sơ mở tài khoản tiền gửi ở VCB bao gồm: \n" +
        "*CMND/ CCCD/ Hộ chiếu còn hiệu lực\n" +
        "*Giấy Yêu cầu gửi tiền/Giấy đề nghị mở tài khoản cá nhân Vietcombank (mẫu ngân hàng)*\n" +
        "Riêng đối với sản phẩm tiết kiệm tự động bổ sung thêm Giấy đăng ký sử dụng sản phẩm Tiết kiệm tự động*\n" +
        "*Đối với tiền gửi trực tuyến, quý khách cần đăng ký dịch vụ VCB-SMS B@nking, dịch vụ Ngân hàng trực tuyến VCB - iB@nking hoặc VCB Mobile B@nking tại các điểm giao dịch của Vietcombank trên toàn quốc. Hồ sơ yêu cầu:\n" +
        "*CMND/CCCD/Hộ chiếu còn hiệu lực (bản gốc)\n" +
        "*Mẫu đăng ký dịch vụ Ngân hàng điện tử*  \n"
  },
  {
    scenario: 3,
    question:"Số tài khoản mỗi người có thể mở",
    answer:"Vietcombank quy định mỗi người chỉ được mở 1 tài khoản thanh toán tại ngân hàng"
  },
  {
    scenario: 3,
    question:"Điều kiện mở tài khoản",
    answer:"Điều kiện mở tài khoản tiết kiệm của Vietcombank khá đơn giản. Quý khách chỉ cần là một trong các đối tượng sau đây nhé:\n" +
        "*Công dân Việt Nam từ đủ 18 tuổi trở lên có năng lực hành vi dân sự đầy đủ theo quy định của pháp luật Việt Nam*\n" +
        "Công dân Việt Nam từ đủ 15 tuổi đến chưa đủ 18 tuổi không bị hạn chế năng lực hành vi dân sự hoặc không mất năng lực hành vi dân sự theo quy định của pháp luật*\n" +
        "Công dân Việt Nam bị hạn chế năng lực hành vi dân sự hoặc mất năng lực hành vi dân sự theo quy định của pháp luật hoặc chưa đủ 15 tuổi thực hiện giao dịch tiền gửi tiết kiệm thông qua người đại diện theo pháp luật; Công dân Việt Nam có khó khăn trong nhận thức, làm chủ hành vi theo quy định của pháp luật thực hiện giao dịch tiền gửi tiết kiệm thông qua người giám hộ"
  },
  {
    scenario: 3,
    question:"Phí mở tài khoản",
    answer:"Để thuận tiện hơn quý khách có thể tham khảo biểu phí dịch vụ tài khoản của VCB theo đường link dưới đây nhé: \n" +
        "https://bit.ly/3u8u7bj"
  },
  {
    scenario: 3,
    question:"phí dịch vụ ngân hàng",
    answer:"Biểu phí thông tin dịch vụ Ngân hàng điện tử như sau:\n" +
        "https://bit.ly/3e9qYlW"
  },
  {
    scenario: 4,
    question:"Mục đích vay vốn",
    answer:"Vay mua nhà, mua xe, vay tiêu dùng, vay kinh doanh"
  },
  {
    scenario: 4,
    question:"Điều kiện vay mua xe",
    answer:"Điều kiện vay mua ô tô như sau:" +
        "*Khách hàng có độ tuổi 18 đến 60" +
        "*Thu nhập ổn định từ 8 triệu/tháng trở lên" +
        "*Có tài sản đảm bảo là xe ô tô mới/ xe ô tô đã qua sử dụng hoặc bất động sản của bên vay/bên thứ ba (bố mẹ của bên vay)"
  },
  {
    scenario: 4,
    question:"Điều kiện vay kinh doanh",
    answer:"Điều kiện vay kinh doanh như sau:\n" +
        "*Khách hàng cá nhân (bao gồm cá nhân tự kinh doanh/thành viên hộ kinh doanh/chủ doanh nghiệp tư nhân) có đủ năng lực pháp luật dân sự và năng lực hành vi dân sự\n" +
        "*Có độ tuổi từ đủ 18 tuổi trở lên và không quá 65 tuổi (tại thời điểm đáo hạn khoản vay)\n" +
        "*Có Giấy chứng nhận đăng ký kinh doanh và/hoặc các giấy tờ có tính chất pháp lý tương đương\n" +
        "*Tài sản đảm bảo là giấy tờ có giá, bất động sản, tài sản hình thành từ vốn vay là ô tô mua mới"
  },
  {
    scenario: 4,
    question:"Ưu đãi thẻ VCB JCB",
    answer:"*Chi tiêu trước, trả tiền sau với thời gian miễn lãi lên tới 45 ngày"+
        "*Thanh toán tiện lợi qua Internet, ứng dụng di động, ví điện tử MOCA"+
        "*Trả góp lãi suất 0% tại các đối tác liên kết với Vietcombank"+
        "*Tận hưởng các ưu đãi mua sắm, ẩm thực, du lịch theo các chương trình của Vietcombank và JCB trong từng thời kỳ"
  },
  {
    scenario: 4,
    question:"Ưu đãi thẻ VCB Unipay",
    answer:"*Chi tiêu trước, trả tiền sau với thời gian miễn lãi lên tới 45 ngày"+
        "*Thanh toán tiện lợi qua Internet, ứng dụng di động, ví điện tử MOCA"+
        "*Trả góp lãi suất 0% tại các đối tác liên kết với Vietcombank"+
        "*Tận hưởng các ưu đãi mua sắm, ẩm thực, du lịch theo các chương trình của Vietcombank và JCB trong từng thời kỳ"
  },
  {
    scenario: 4,
    question:"Ưu đãi thẻ VCB Mastercard",
    answer:"*Chi tiêu trước, trả tiền sau với thời gian miễn lãi lên tới 45 ngày"+
        "*Thanh toán tiện lợi qua Internet, ứng dụng di động, ví điện tử MOCA"+
        "*Trả góp lãi suất 0% tại các đối tác liên kết với Vietcombank"+
        "*Tận hưởng các ưu đãi mua sắm, ẩm thực, du lịch theo các chương trình của Vietcombank và JCB trong từng thời kỳ"
  },
  {
    scenario: 4,
    question:"Ưu đãi thẻ VCB Amex(American Express)",
    answer:"*Chi tiêu trước, trả tiền sau với thời gian miễn lãi lên tới 50 ngày"+
        "*Thanh toán tiện lợi qua Internet, ứng dụng di động, ví điện tử MOCA"+
        "*Trả góp lãi suất 0% tại các đối tác liên kết với Vietcombank"+
        "*Tận hưởng các ưu đãi mua sắm, ẩm thực, du lịch theo các chương trình của Vietcombank và JCB trong từng thời kỳ"+
        "*Ưu đãi hoàn tiền và bảo hiểm: Tử vong, thương tật, chuyến đi bị trì hoãn, bảo hiểm hành lý cá nhân"
  },
  {
    scenario: 4,
    question:"Ưu đãi thẻ VCB quốc tế",
    answer:
        "*Ưu đãi hoàn tiền: Hoàn tiền 0.3% cho các giao dịch thanh toán bằng thẻ ghi nợ quốc tế"+
        "*Ưu đãi bảo hiểm: PVI sẽ là đơn vị cung cấp bảo hiểm với quyền lợi tối đa lên tới 11.65 tỷ VNĐ, tuy nhiên loại trừ bồi thường bảo hiểm đối với các sự kiện bảo hiểm phát sinh do Covid-19 (Coronavirus)"+
        "*Ưu đãi dịch vụ Golf: Ưu đãi phí gia nhập tại các câu lạc bộ Golf đẳng cấp tại Việt Nam và trên thế giới"+
        "*Ưu đãi dịch vụ cho chủ thẻ chính: Miễn phí phát hành, miễn phí rút tiền mặt tại ATM, etc"
  },
  {
    scenario: 4,
    question:"Ưu đãi thẻ VCB nội địa",
    answer:
        "*Chuyển tiền trong và ngoài hệ thống VCB"+
        "*Thanh toán hóa đơn các dịch vụ trả sau"+
        "*Hiệu lực thẻ vô thời hạn"+
        "*Số lượng thẻ phụ: 3 cái"
  },
  {
    scenario: 4,
    question:"Hồ sơ phát hành thẻ",
    answer:"*Người Việt: " +
        "*Bản gốc Đề nghị phát hành thẻ tín dụng quốc tế dành cho khách hàng cá nhân kiêm hợp đồng" +
        "*Bản sao CMND, CCCD,hộ chiếu còn hạn "+
        "*Giấy tờ chứng minh năng lực tài chính"+
        "*Người nước ngoài: " +
        "*Bản sao Giấy tờ chứng minh có cư trú ở VN"+
        "*Bản sao Giấy phép lao động hoặc hợp đồng lao động"+
        "*Bản gốc xác nhận của cơ quan công tác"
  },
  {
    scenario: 4,
    question:"Điều kiện vay tiêu dùng",
    answer:"Có 3 hình thức vay: Vay thế chấp, Vay tín chấp, Vay cầm cố giấy tờ có giá"
  },
  {
    scenario: 4,
    question:"Điều kiện vay tiêu dùng theo hình thức vay thế chấp",
    answer:"Vay thế chấp (vay có đảm bảo bằng tài sản như nhà, xe ô tô, xe máy etc):" +
        "*Khách hàng có độ tuổi từ 18 - 65 tính đến thời điểm đề nghị vay vốn;\n" +
        "*Khách hàng có nguồn thu nhập ổn định từ lương tối thiểu 05 triệu đồng trở lên;\n" +
        "*Khách hàng có tài sản thế chấp là bất động sản hoặc ô tô"
  },
  {
    scenario: 4,
    question:"Điều kiện vay tiêu dùng theo hình thức vay tín chấp",
    answer:"Vay tín chấp (vay không đảm bảo bằng tài sản):\n" +
        "*Khách hàng là cá nhân có độ tuổi không quá 55 với nữ và 60 với nam tại thời điểm kết thúc khoản vay\n" +
        "*Khách hàng có thu nhập ổn định từ lương tối thiểu từ 03 triệu đồng trở lên\n" +
        "*Xếp hạng tín dụng từ loại A trở lên theo Hệ thống xếp hạng tín dụng nội bộ của Vietcombank\n" +
        "*Kinh nghiệm công tác từ 12 tháng trở lên\n" +
        "*Được cơ quan công tác xác nhận thông tin cần thiết (mức lương, vị trí công tác"
  },
  {
    scenario: 4,
    question:"Điều kiện vay tiêu dùng theo hình thức vay cầm cố giấy tờ có giá",
    answer:"Vay cầm cố giấy tờ có giá (vay cầm cố các GTCG như tín phiếu kho bạc, trái phiếu Chính phủ):Điều kiện vay tiêu dùng bằng giấy tờ có giá như sau:" +
        "*GTCG được cầm cố: trái phiếu Chính phủ, tín phiếu kho bạc, kỳ phiếu, trái phiếu, sổ tiết kiệm, chứng chỉ tiền gửi, tài khoản tiền gửi có kỳ hạn do Vietcombank và các tổ chức tín dụng khác phát hành" +
        "*Mọi cá nhân có đủ năng lực pháp luật dân sự và năng lực hành vi dân sự vay vốn tại Vietcombank" +
        "*GTCG thuộc quyền sở hữu hợp pháp của khách hàng hoặc của bên thứ ba (nếu có)"
  },
  {
    scenario: 4,
    question:"Điều kiện vay mua nhà",
    answer:"Điều kiện vay mua bất động sản như sau:\n" +
        "*Mọi cá nhân có đủ năng lực pháp luật dân sự và năng lực hành vi dân sự vay vốn tại Vietcombank\n" +
        "*Khách hàng  có độ tuổi từ 18 tuổi trở lên và không quá 65 tuổi tính đến thời điểm đề nghị vay vốn\n" +
        "*Khách hàng có thu nhập tối thiểu 5 triệu đồng/tháng\n" +
        "*Khách hàng có Tài sản đảm bảo là: tài sản hình thành từ vốn vay/bất động sản khác/giấy tờ có giá (theo quy định của VCB)"
  },
  {
    scenario: 4,
    question:"Thủ tục vay thế chấp (vay có đảm bảo bằng tài sản như nhà, xe ô tô, xe máy ..)",
    answer:"Hồ sơ vay thế chấp tiêu dùng bao gồm các giấy tờ sau:" +
        "*Phương án sử dụng vốn (theo mẫu)\n" +
        "*Hồ sơ pháp lý: CMND/Căn cước công dân/hộ chiếu; Hộ khẩu thường trú/tạm trú dài hạn (KT3) của khách hàng hoặc của bên thứ ba có tài sản bảo đảm cho khoản vay; Giấy đăng ký kết hôn/Giấy chứng nhận độc thân của khách hàng;\n" +
        "*Hồ sơ chứng minh thu nhập;\n" +
        "*Hồ sơ về tài sản bảo đảm;\n" +
        "*Hồ sơ chứng minh mục đích sử dụng vốn"
  },
  {
    scenario: 4,
    question:"Thủ tục vay tín chấp (vay không đảm bảo bằng tài sản)",
    answer:"Hồ sơ vay tvín chấp tiêu dùng bao gồm các giấy tờ sau\n" +
        "*Phương án sử dụng vốn (theo mẫu)\n" +
        "*Hồ sơ pháp lý: CMND/ Căn cước công dân/Hộ chiếu; Hộ khẩu thường trú/tạm trú dài hạn (KT3) của Khách hàng;\n" +
        "*Hồ sơ chứng minh thu nhập: Hợp đồng lao động; Sao kê giao dịch tài khoản ngân hàng 06 tháng gần nhất (có xác nhận của ngân hàng phát hành); Giấy xác nhận của cơ quan công tác của Khách hàng về vị trí công tác, thu nhập của Khách hàng;\n" +
        "*Hồ sơ chứng minh thu nhập khác (nếu có);"
  },
  {
    scenario: 4,
    question:"Thủ tục vay cầm cố giấy tờ có giá (vay cầm cố các GTCG như tín phiếu kho bạc, trái phiếu Chính phủ)",
    answer:"Hồ sơ vay cầm cố GTCG cho mục đích tiêu dùng bao gồm các giấy tờ sau:\n" +
        "*Hồ sơ pháp lý: Bản sao CMND/Căn cước công dân/Hộ chiếu của khách hàng hoặc chủ sở hữu GTCG (nếu cầm cố GTCG của bên thứ ba).\n" +
        "*Bản gốc giấy tờ có giá;\n" +
        "*Phương án sử dụng vốn kiêm Hợp đồng cho vay kiêm Hợp đồng cầm cố kiêm giấy nhận nợ (theo mẫu của ngân hàng);\n" +
        "*Các hồ sơ khác (nếu có)\n" +
        "*Lưu ý: Khách hàng xuất trình bản chính để đối chiếu"
  },
  {
    scenario: 4,
    question:"hồ sơ vay mua xe",
    answer:"Hồ sơ vay mua xe sẽ bao gồm các giấy tờ sau:\n" +
        "*Phương án sử dụng vốn\n" +
        "*Hồ sơ pháp lý khách hàng: CMND/ Căn cước công dân/Hộ chiếu, Hộ khẩu thường trú/tạm trú dài hạn (KT3), Giấy đăng ký kết hôn/Giấy chứng nhận độc thân\n" +
        "*Hồ sơ chứng minh thu nhập: Hợp đồng lao động, sao kê tài khoản ngân hàng, etc" +
        "*Hồ sơ tài sản bảo đảm"
  },
  {
    scenario: 4,
    question:"Vay mua xe có gì nổi bật",
    answer:"Thời hạn vay tối đa 7 năm* Có thể vay bù đắp mua xe trong thời gian tối đa 3 tháng\n" +
        "*Số tiền cho vay 70% giá trị xe nếu thế chấp bằng chính chiếc xe mới mua\n" +
        "*Hoặc 100% giá trị xe nếu thế chấp tài sản đảm bảo khác"
  },
  {
    scenario: 4,
    question:"Hồ sơ vay kinh doanh",
    answer:"Với kinh doanh tài lộc, hồ sơ kinh doanh bao gồm:\n" +
        "*Phương án sử dụng vốn (theo mẫu)\n" +
        "*Hồ sơ pháp lý: Bản sao CMND/Căn cước công dân/Hộ chiếu; Hộ khẩu thường trú/tạm trú dài hạn (KT3); Giấy chứng nhận đăng ký kinh doanh và/hoặc các giấy tờ có tính chất pháp lý tương đương;\n" +
        "*Hồ sơ chứng minh hoạt động kinh doanh của khách hàng và/ hoặc Doanh nghiệp tư nhân do Khách hàng là chủ sở hữu;\n" +
        "*Hồ sơ tài sản bảo đảm: bản sao\n" +
        "*Với kinh doanh trung hạn, hồ sơ vay vốn bao gồm:\n" +
        "*Phương án sử dụng vốn\n" +
        "*Hồ sơ pháp lý của khách hàng: Bản sao CMND/ Căn cước công dân/Hộ chiếu; - Hộ khẩu thường trú/tạm trú dài hạn (KT3) Giấy đăng ký kết hôn/Giấy chứng nhận độc thân\n" +
        "*Hồ sơ chứng minh thu nhập: Bản sao Giấy chứng nhận đăng ký kinh doanh và/hoặc các giấy tờ có tính chất pháp lý tương đương; Hồ sơ chứng minh thu nhập khác (nếu có)\n" +
        "*Hồ sơ tài sản bảo đảm"
  },
  {
    scenario: 4,
    question:"hồ sơ vay mua nhà",
    answer:"Hồ sơ vay mua bất động sản như sau:\n" +
        "*Phương án sử dụng vốn.\n" +
        "*Hồ sơ pháp lý: Bản sao CMND/Hộ chiếu, Hộ khẩu thường trú/tạm trú dài hạn (KT3), Giấy đăng ký kết hôn/Giấy chứng nhận độc thân\n" +
        "*Hồ sơ chứng minh thu nhập: Hợp đồng lao động;  Sao kê tài khoản ngân hàng\n" +
        "*Hồ sơ về tài sản bảo đảm\n" +
        "*Riêng đối với Cho vay xây sửa nhà, khách hàng bổ sung thêm Hồ sơ chứng minh mục đích sử dụng vốn"
  },
  {
    scenario: 4,
    question:"Thời hạn vay",
    answer:"Cho vay tiêu dùng không bảo đảm bằng tài sản: Thời gian vay linh hoạt lên tới 60 tháng\n" +
        "*Cho vay tiêu dùng có bảo đảm bằng tài sản:Thời hạn cho vay lên đến 120 tháng\t\n" +
        "*Cho vay mua nhà dự án: Thời gian vay linh hoạt lên đến: 20 năm\n" +
        "*Cho vay xây sửa nhà: Thời gian vay linh hoạt lên đến 15 năm\n" +
        "*Cho vay mua nhà đất: Thời gian vay linh hoạt lên đến 15 năm\n" +
        "*Cho vay mua ô tô: Thời gian vay linh hoạt lên đến 60 tháng\n" +
        "*Cho vay Kinh doanh trung hạn: Thời gian vay linh hoạt lên đến 60 tháng\n" +
        "*Kinh doanh tài lộc: Thời gian vay linh hoạt tối đa lên đến 12 tháng"
  },
  {
    scenario: 4,
    question:"Có được vay online không",
    answer:"Vietcombank chưa hỗ trợ vay vốn trực tuyến mong quý khách thông cảm"
  },
  {
    scenario: 4,
    question:"Trả nợ trước hạn",
    answer:"Khách hàng được phép trả nợ trước hạn một phần hoặc toàn bộ khoản vay tại thời điểm bất kì trong thời hạn khoản vay và chịu phí phạt trả nợ trước theo quy định của Vietcombank*\n" +
        "Trường hợp khách hàng trả nợ trước một phần khoản vay, khách hàng có thể lập giấy đề nghị trả nợ trước hạn và nêu rõ mong muốn được cơ cấu lại khoản vay"
  },
  {
    scenario: 4,
    question:"Số tiền được vay",
    answer:"Số tiền được vay tùy thuộc vào tình hình tài chính và khả năng trả nợ của quý khách* Về thời gian vay, chúng tôi sẽ tư vấn thời gian vay phù hợp với nguồn tài chính của quý khách* \n" +
        "Với Vietcombank, quý khách có thể vay tối đa đến 70% giá trị của tài sản dự định mua. (Hãy liên hệ với chúng tôi để biết thêm chi tiết)"
  },
  {
    scenario: 5,
    question:"Chuyển khoản nhầm",
    answer: "*Trường hợp chuyển tiền trong cùng hệ thống:" +
        "*Quý khách vui lòng mang CMND (bản gốc, còn hiệu lực) đến điểm giao dịch bất kỳ của Ngân hàng làm yêu cầu tra soát" +
        "*Khi nhận được yêu cầu tra soát hợp lệ, Vietcombank sẽ hỗ trợ bằng cách liên hệ với người nhận chuyển nhầm để thông báo yêu cầu hoàn trả\n" +
        "*Chúng tôi xin lưu ý theo quy định của Ngân hàng Nhà nước và Vietcombank thì ngân hàng không có quyền được tự động khoanh giữ hoặc trích nợ tài khoản người nhận nếu chưa được người nhận đồng ý hoàn trả hoặc xác nhận hoàn trả" +
        "*Trong vòng tối đa 30 ngày kể từ ngày tiếp nhận hồ sơ tra soát của quý khách, chúng tôi sẽ thông báo đến quý khách kết quả tra soát\n" +
        "*Trường hợp quý khách chuyển tiền sang ngân hàng khác nhưng thông tin không chính xác, không trùng khớp với bất kỳ khách hàng nào trên hệ thống của họ:\n" +
        "*Trong trường hợp này, Ngân hàng hưởng sẽ không có cơ sở để hạch toán vào tài khoản người nhận" +
        "*Họ có thể giữ lại một thời gian ngắn chờ tra soát điều chỉnh từ Vietcombank hoặc chuyển trả lại Vietcombank ngay để hoàn trả tài khoản của quý khách, thời gian xử lý phụ thuộc vào Quy trình của Ngân hàng quý khách\n" +
        "*Do đó quý khách có thể cân nhắc: tới điểm giao dịch bất kỳ của Vietcombank yêu cầu điều chỉnh lệnh, hoặc chờ lệnh hoàn trả từ Ngân hàng hưởng"
  },
  {
    scenario: 5,
    question:"Không nhận được mã OTP",
    answer:"Trường hợp quý khách không nhận được mã OTP khi giao dịch có thể do: \n" +
        "*Hệ thống xảy ra sự cố nên chưa nhận được tín hiệu giao dịch, mọi người nên gửi lại yêu cầu gửi mã OTP để thử nếu như không gửi tiếp thì xử lý cách khác\n" +
        "*Số điện thoại nhận OTP của mọi người khi đăng ký dịch vụ bị khóa 2 chiều\n" +
        "*Do quý khách chặn tin nhắn rác của điện thoại nên không nhận được tin nhắn của ngân hàng\n" +
        "*Hệ thống ngân hàng bảo trì\n" +
        "*Thường thì mọi người sẽ nhận được mã OTP sau 2 -3 phút nếu như không nhận được mã OTP vui lòng thử lại sau một lúc, hoặc liên hệ với bộ phận CSKH qua số 1900545413 để được hỗ trợ\n" +
        "*Còn trường hợp mọi người không giao dịch mà vẫn nhận được mã OTP giao dịch thì nên cẩn thận, báo ngân hàng ngay lập tức bởi có nguy cơ tài khoản của quý khách bị xâm phạm"
  },
  {
    scenario: 5,
    question:"Rút tiền bị nuốt thẻ",
    answer:"Trường hợp thẻ của quý khách bị thu giữ tại ATM VCB:\n" +
        "*Trong vòng 30 ngày kể từ ngày thẻ bị thu giữ, quý khách liên hệ tới SĐT được ghi trên máy ATM; hoặc PGD/CN có đặt máy ATM giữ thẻ để yêu cầu hỗ trợ trả lại thẻ \n" +
        "*Sau thời hạn nêu trên nếu quý khách không liên hệ nhận lại bị thẻ nuốt, VCB sẽ khóa, hủy thẻ và phát hành lại thẻ thay thế cho quý khách, quý khách vui lòng liên hệ VCB để làm thủ tục phát hành lại thẻ \n" +
        "*Đối với thẻ tín dụng, quý khách vui lòng liên hệ chi nhánh đã phát hành trước đây; đối với thẻ ghi nợ liên hệ tại bất kỳ CN/PGD nào của VCB để được phục vụ\n" +
        "*Trường hợp thẻ của quý khách bị thu giữ tại ATM của ngân hàng khác:\n" +
        "*Trong vòng 10 ngày kể từ ngày thẻ bị thu giữ:\n" +
        "*Nếu quý khách muốn nhận thẻ tại Ngân hàng quản lý máy ATM (Ngân hàng thanh toán_NHTT) và NHTT có dịch vụ hỗ trợ trả thẻ trực tiếp cho Khách hàng: Quý khách xuất trình CMND/CCCD và Giấy xác nhận chủ thẻ do CN VCB cấp để nhận thẻ tại NHTT\n" +
        "*Nếu quý khách muốn nhận thẻ tại CN VCB: Khách hàng liên hệ chi nhánh đã phát hành thẻ ( đối với thẻ tín dụng) hoặc bất kỳ PGD/CN nào của VCB đối với  thẻ ghi nợ để được hỗ trợ\n" +
        "*Quá thời hạn trên hoặc nếu NHTT không đáp ứng được yêu cầu của Khách hàng: Quý khách liên hệ VCB để làm thủ tục phát hành lại thẻ* Đối với thẻ tín dụng liên hệ chi nhánh đã phát hành trước đây; đối với thẻ ghi nợ liên hệ tại bất kỳ điểm giao dịch nào của VCB để được phục vụ"
  },
  {
    scenario: 5,
    question:"Rút tiền mà không ra tiền",
    answer:"Trong trường hợp bạn là chủ thẻ VCB gặp sự cố rút tiền không thành công tài khoản bị trừ tiền tại máy ATM, bạn vui lòng liên hệ qua tổng đài 1900545413 hoặc CN/PGD VCB gần nhất để thực hiện tra soát nhé\n"
  },
  {
    scenario: 5,
    question:"Hotline của VCB",
    answer:"Điện thoại: 1900545413"
  },
  {
    scenario: 5,
    question:"Thủ tục khiếu nại",
    answer:"Vui lòng gọi điện thoại đến số Hotline hoặc đem theo giấy tờ tuỳ thân trực tiếp đến các điểm giao dịch của Vietcombank để đề nghị tra soát, khiếu nại. Yêu cầu sẽ được thực hiện trong vòng 30 ngày kể từ ngày tiếp nhận yêu cầu"
  },
  {
    scenario: 5,
    question:"Phí chuyển tiền qua thẻ",
    answer:"* Đối với thẻ ghi nợ nội địa\n" +
        "*Phí chuyển tiền liên ngân hàng qua thẻ 7.700 VNĐ/ giao dịch\n" +
        "*Phí chuyển tiền qua thẻ tại ATM trong hệ thống VCB: 3.300 VNĐ/ giao dịch\n" +
        "*Phí chuyển tiền qua thẻ tại ATM ngoài hệ thống VCB: 5.500 VND/giao dịch\n" +
        "*Đối với thẻ ghi nợ quốc tế\n" +
        "*Phí chuyển tiền trong hệ thống VCB: 3.300 VNĐ/ giao dịch\n" +
        "*Phí chuyển tiền liên ngân hàng áp dụng cho thẻ ghi nợ nội địa và ghi nợ quốc tế là:\n" +
        "*7.700 VNĐ/ giao dịch đối với giao dịch giá trị dưới 10.000.000 VNĐ \n" +
        "*0.022% giá trị giao dịch (tối thiểu 11.000 VNĐ) đối với giao dịch giá trị từ 10.000.000 VNĐ trở lên"
  },
  {
    scenario: 5,
    question:"Tổng chi tiêu là gì",
    answer:"Tổng số tiền anh chị giao dịch trong suốt thời gian 30 ngày kể từ ngày phát hành"
  },
  {
    scenario: 5,
    question:"Số tiền được tặng",
    answer:"Thẻ hiện tại là thẻ {tên thương hiệu thẻ} sẽ được tặng {số tiền tương ứng} khi chi tiêu {số tiền tương ứng} trở lên trong 30 ngày kể từ ngày phát hành ạ" +
        "*Có thể nói lung tung các con số cũng được ^^"
  },
  {
    scenario: 5,
    question:"Chính sách hoàn tiền",
    answer:"Với thẻ tín dụng tiền thưởng sẽ hạch toán vào hạn mức thẻ" +
        "*Với thẻ ghi nợ quốc tế tiền thưởng sẽ hạch toán vào tài khoản liên kết tới thẻ"
  },
  {
    scenario: 5,
    question:"Thế phải tiêu bao nhiêu",
    answer:"Vâng để được hoàn tiền, thì a/c cần chi tiêu từ xxx triệu trở lên" +
        "**Có thể nói lung tung các con số cũng được ^^"
  },
  {
    scenario: 5,
    question:"Chi tiêu ở đâu",
    answer:"Dạ, a/c có thể thanh toán tại các điểm chấp nhận thẻ trên toàn quốc, hoặc thanh toán trực tuyến, ngoại trừ các giao dịch rút tiền mặt"
  },
  {
    scenario: 5,
    question:"Chính sách chương trình",
    answer:"Dạ với loại thẻ mà anh chị đang sử dụng là {tên thương hiệu thẻ} thì mức hoàn tiền tối đa là {số tiền tương ứng hạng thẻ} đồng ạ"
  },
  {
    scenario: 5,
    question:"Bao giờ phải chi tiêu",
    answer:"Dạ thời gian chi tiêu là trong vòng 30 ngày kể từ ngày phát hành thẻ."
  },
]

const INTENT = [
  {
    // #0
    name: "Cấp lại mật khẩu",
    slot: ["name", "birthday","phone_number","cmnd", "four_last_digits","digital_bank"],
    servant:"Bạn hãy xác thực thông tin tên, số điện thoại, CMND, ngày sinh, 4 số cuối tài khoản của khách hàng."+
        "Mỗi thông tin xác nhận lại một lần. " +
        "Sau khi đã đủ 5 bước thì thông báo cho khách hàng là đã thay đổi thành công mật khẩu"
  },
  {
    // #1
    name: "Chương trình ưu đãi",
    slot: ["card_type"],
    servant:"Bạn có thể tra cứu thông tin của các loại thẻ ở dưới thanh search."+
        " Nếu thông tin nào không có thì có thể nói khách hàng chờ máy để chuyển sang phòng ban riêng." +
        " Cuộc hội thoại này cũng kết thúc"
  },
  {
    // #2
    name: "Điều kiện vay vốn",
    slot: ["name", "cmnd", "four_last_digits","loan_purpose", "loan_type"],
    servant:"Bạn hãy xác thực thông tin người dùng: Họ tên, tuổi, nghề nghiệp, thu nhập, giấy tờ đảm bảo tài sản." +
        " Sau đó dựa vào những thông tin cơ bản như trên và thông tin trong thanh search " +
        "để so sánh xem khách hàng đã đủ điều kiện hay chưa. Nếu đủ điều kiện thì hẹn khách hàng đến điểm giao dịch để tư vấn thêm",
  },
  {
    // #3
    name: "Điểm đặt ATM",
    slot: ["city", "district"],
    servant:"Bạn hãy hỏi chi tiết xem người đó đang ở thành phố, quận huyện nào." +
        " Sau đó, có thể chỉ cho khách hàng một địa chỉ giả(Không quan trọng độ chính " +
        "xác của thông tin nên bạn có thể nói như thế nào cũng được)"
  },
  {
    // #4
    name: "Điểm giao dịch",
    slot: ["city", "district"],
    servant:"Bạn hãy hỏi chi tiết xem người đó đang ở thành phố, quận huyện nào." +
        " Sau đó, có thể chỉ cho khách hàng một địa chỉ giả(Không quan trọng độ chính " +
        "xác của thông tin nên bạn có thể nói như thế nào cũng được)"

  },
  {
    // #5
    name: "Hồ sơ phát hành thẻ",
    slot: ["card_type", "card_usage"],
    servant:"Bạn có thể tra cứu thông tin của các loại thẻ ở dưới thanh search."+
        " Nếu thông tin nào không có thì có thể nói khách hàng chờ máy để chuyển sang phòng ban riêng." +
        " Cuộc hội thoại này cũng kết thúc"

  },
  {
    // #6
    name: "Hồ sơ vay vốn",
    slot: ["loan_purpose", "loan_type"],
    servant:"Bạn có thể tra cứu thông tin của các loại thẻ ở dưới thanh search."+
        " Nếu thông tin nào không có thì có thể nói khách hàng chờ máy để chuyển sang phòng ban riêng." +
        " Cuộc hội thoại này cũng kết thúc"
  },
  {
    // #7
    name: "Hủy chi tiêu thẻ",
    slot: ["name", "cmnd", "four_last_digits"],
    servant:"Bạn hãy xác thực thông tin tên, số điện thoại, CMND, ngày sinh, 4 số cuối tài khoản của khách hàng. " +
        "Mỗi thông tin xác nhận lại một lần. " +
        "Sau khi đã đủ 5 bước thì thông báo cho khách hàng là đã hủy chi tiêu thẻ thành công"
  },
  {
    // #8
    name: "Hướng dẫn mở thẻ",
    slot: ["card_activation_type"],
    servant:"Bạn có thể tra cứu thông tin của các loại thẻ ở dưới thanh search."+
        " Nếu thông tin nào không có thì có thể nói khách hàng chờ máy để chuyển sang phòng ban riêng." +
        " Cuộc hội thoại này cũng kết thúc"
  },
  {
    // #9
    name: "Khái niệm sản phẩm",
    slot: ["card_type", "card_usage"],
    servant:"Bạn có thể tra cứu thông tin của các loại thẻ ở dưới thanh search." +
        " Nếu thông tin nào không có thì có thể nói khách hàng chờ máy để chuyển sang phòng ban riêng. " +
        "Cuộc hội thoại này cũng kết thúc"
  },
  {
    // #10
    name: "Kích hoạt thẻ tự động",
    slot: ["name", "cmnd", "four_last_digits"],
    servant:"Bạn hãy xác thực thông tin tên, số điện thoại, CMND, ngày sinh, 4 số cuối tài khoản của khách hàng. " +
        "Mỗi thông tin xác nhận lại một lần. "+
        "Sau khi đã đủ 5 bước thì thông báo cho khách hàng là đã kích hoạt thẻ thành công"
  },
  {
    // #11
    name: "Khóa thẻ khẩn cấp",
    slot: ["name", "cmnd", "four_last_digits"],
    servant:"Bạn hãy xác thực thông tin tên, số điện thoại, 4 số cuối tài khoản của khách hàng. " +
        "Mỗi thông tin xác nhận lại một lần. " +
        "Sau khi đã đủ 5 bước thì thông báo cho khách hàng là đã khóa thẻ khẩn cấp thành công"
  },
  {
    // #12
    name: "Kích hoạt chi tiêu thẻ",
    slot: ["name", "cmnd", "four_last_digits"],
    servant:"Bạn hãy xác thực thông tin tên, số điện thoại, 4 số cuối tài khoản của khách hàng, hạn mức chi tiêu. " +
        "Mỗi thông tin xác nhận lại một lần. " +
        "Sau khi đã đủ 4 bước thì thông báo cho khách hàng là đã khóa thẻ khẩn cấp thành công"

  },
  {
    // #13
    name: "Phí chuyển tiền",
    slot: ["digital_bank"],
    servant:"Bạn có thể tra cứu thông tin phí chuyển tiền của các dịch vụ ở dưới thanh search." +
        " Nếu thông tin nào không có thì có thể nói khách hàng chờ máy để chuyển sang phòng ban riêng. " +
        "Cuộc hội thoại này cũng kết thúc"

  },
  {
    // #14
    name: "Phương thức hủy dịch vụ Ngân hàng điện tử",
    slot: ["digital_bank"],
    servant:"Bạn có thể tra cứu phương thức hủy dịch vụ ở dưới thanh search." +
        " Nếu thông tin nào không có thì có thể nói khách hàng chờ máy để chuyển sang phòng ban riêng. " +
        "Cuộc hội thoại này cũng kết thúc"

  },
  {
    // #15
    name: "Tính năng dịch vụ Ngân hàng điện tử",
    slot: ["digital_bank"],
    servant:"Bạn có thể tra cứu tính năng dịch vụ NHĐT ở dưới thanh search." +
        " Nếu thông tin nào không có thì có thể nói khách hàng chờ máy để chuyển sang phòng ban riêng. " +
        "Cuộc hội thoại này cũng kết thúc"

  },
  {
    // #16
    name: "Tra cứu số dư",
    slot: ["name", "cmnd", "four_last_digits"],
    servant:"Bạn hãy xác thực thông tin tên, số điện thoại, 4 số cuối tài khoản của khách hàng. " +
        "Mỗi thông tin xác nhận lại một lần. " +
        "Sau khi đã đủ 3 bước thì thông báo cho khách hàng số dư hiện tại trong tài khoản." +
        "Bạn có thể số tiền nào cũng được(Không quan trọng độ chính " +
        "xác của thông tin nên bạn có thể nói như thế nào cũng được)"

  },
  {
    // #17
    name: "Thay đổi hạn mức chi tiêu thẻ",
    slot: ["name", "cmnd", "four_last_digits"],
    servant:"Bạn hãy xác thực thông tin tên, số điện thoại, 4 số cuối tài khoản của khách hàng, hạn mức chi tiêu cũ của thẻ." +
        "Mỗi thông tin xác nhận lại một lần. " +
        "Sau đó, hỏi hạn mức mới mà khách hàng mong muốn." +
        "Sau khi đã hỏi đầy đủ thông tin thì thông báo cho khách hàng là đã thay đổi hạn mức thẻ thành công"
  },
  //18
  {
    name:"Khiếu nại sự cố",
    slot:["name", "cmnd", "four_last_digits","risk_report"],
    servant:"Bạn hãy xác thực thông tin tên, số điện thoại, 4 số cuối tài khoản của khách hàng." +
        "Mỗi thông tin xác nhận lại một lần. " +
        "Bạn hãy tham khảo thông tin trong thanh search phù hợp với sự cố của khách hàng để đưa ra tư vấn hợp lý"
  },
  //19
  {
    name:"Thông tin chương trình khuyến mại",
    slot:[],
    servant: "Bước 1: Chào hỏi khách hàng: giới thiệu mình là nhân viên chăm sóc khách hàng của ngân hàng VCB(vietcombank), xin phép được trao đổi một chút được không" +
        "*Bước 2: Giới thiệu chương trình: Thưa a/c, để tri ân khách hàng vừa phát hành thẻ quốc tế BIDV, Ngân hàng BIDV đang triển khai nhiều quà tặng hấp dẫn, dành cho khách hàng phát hành thẻ trong dịp này. A/c sẽ được hoàn tiền khi giao dịch bằng thẻ trong vòng 30 ngày kể từ ngày phát hành. Xác nhận lại lần với khách hàng có quan tâm không?" +
        "*Bước 3: Thông tin chương trình: Dạ với chương trình này, tùy theo loại thẻ a/c sẽ được tặng từ 300.000 đến 1.500.000 khi phát sinh chi tiêu. Ví dụ thẻ của a/c là master card, a/c sẽ được tặng 3% giá trị giao dịch khi chi tiêu từ 10 triệu trở lên. hỏi xem khách có thắc mắc gì?"+
        "*Nếu khách hàng có thắc mắc về chương trình thì có thể tham khảo câu trả lời ở thanh search"+
        "*Nếu bị khách hàng phàn nàn về CTKM: Dạ, mức hoàn tiền của chương trình tương đối hấp dẫn, chỉ cần chi tiêu số tiền vừa phải, a/c đã được hoàn số tiền tương ứng với phí thường niên thẻ rồi"
  },
  //20
  {
    name:"Nhắc nợ quá hạn thẻ tín dụng",
    slot:[],
    servant: "Bước 1: Chào hỏi khách hàng: giới thiệu mình là nhân viên chăm sóc khách hàng của ngân hàng VCB(vietcombank), xin phép được trao đổi một chút được không" +
        "*Bước 2: Xác nhận khách hàng: Dạ có phải số điện thoại của {danh_xung} {tên khách hàng} không ạ? Em được biết anh chị đang sử dụng thẻ tín dụng của BIDV. Hiện tại thẻ của anh chị đã quá thời hạn thanh toán số tiền giao dịch. Anh chị dành cho em 1-2 phút để cung cấp thêm thông tin được không ạ?"+
        "*Bước 3: Thông báo dư nợ: Thưa anh/chị, theo như hệ thống ngân hàng ghi nhận, thẻ tín dụng BIDV của anh chị có 4 số cuối là {4 số cuối thẻ tín dụng} đã quá thời hạn thanh toán với số dư là {dư nợ} đúng không ạ?"+
        "*Nếu khách hàng nói sẽ trả nợ thì chuyển sang bước 4:" +
        "*Bước 4: Thông báo sao kê: Thưa anh/chị, để đảm bảo rằng các kì sao kê sau anh/chị không còn chậm thanh toán, anh chị vui lòng lưu ý kì sao kê của sản phẩm thẻ tín dụng mà anh chị đang sử dụng là ngày {ngày sao kê}, và ngày thanh toán dư nợ cuối cùng là 15 ngày kể từ ngày sao kê. Anh chị thanh toán đúng ngày thì mình sẽ không phải chịu phí phạt thanh toán và lịch sử tín dụng của anh/chị sẽ ko bị ảnh hưởng."
  },
  //21
  {
    name:"Lọc khách hàng quan tâm cuộc gọi",
    slot:[],
    servant: "Bước 1: Chào hỏi khách hàng: giới thiệu mình là nhân viên chăm sóc khách hàng của ngân hàng VCB(vietcombank), xin phép được trao đổi một chút được không" +
        "*Bước 2: Giới thiệu chương trình: Hiện tại BIDV đang có ưu đãi hoàn tiền/miễn phí thường niên cho khách hàng mở thẻ tín dụng trong tháng này. Anh chị có thể dành 1,2 phút để em thông tin chi tiết về chương trình được không ạ"+
        "*Bước 3: Thông báo dư nợ: Thưa anh/chị, theo như hệ thống ngân hàng ghi nhận, thẻ tín dụng BIDV của anh chị có 4 số cuối là {4 số cuối thẻ tín dụng} đã quá thời hạn thanh toán với số dư là {dư nợ} đúng không ạ?"+
        "*Nếu khách hàng nói sẽ trả nợ thì chuyển sang bước 4:" +
        "*Bước 4: Thông báo sao kê: Thưa anh/chị, để đảm bảo rằng các kì sao kê sau anh/chị không còn chậm thanh toán, anh chị vui lòng lưu ý kì sao kê của sản phẩm thẻ tín dụng mà anh chị đang sử dụng là ngày {ngày sao kê}, và ngày thanh toán dư nợ cuối cùng là 15 ngày kể từ ngày sao kê. Anh chị thanh toán đúng ngày thì mình sẽ không phải chịu phí phạt thanh toán và lịch sử tín dụng của anh/chị sẽ ko bị ảnh hưởng."
  }
];
const RISK_REPORT=[
  {
    name: "Chuyển khoản nhầm",
    tag: "chuyen_khoan_nham",
  },
  {
    name: "Không nhận được mã OTP",
    tag: "khong_nhan_ma_OTP",
  },
  {
    name: "Rút tiền bị nuốt thẻ",
    tag: "rut_tien_nuot_the",
  },
  {
    name: "Rút tiền không ra tiền",
    tag: "rut_tien_khong_ra_tien",
  },
]
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
  {
    name: "Loại sự cố",
    tag: "RISK_REPORT",
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

const GENERIC_INTENT = [
  "Chào hỏi",
  "Bot làm được gì?",
  "Khen",
  "Chê",
  "Tạm biệt",
  "Câu hỏi thông thường khác",
]

module.exports = {
  SCENARIO,
  QA,
  INTENT,
  SLOT_LABEL,
  LOAN_PURPOSE,
  LOAN_TYPE,
  CARD_TYPE,
  CARD_USAGE,
  DIGITAL_BANK,
  CARD_ACTIVATION_TYPE,
  RISK_REPORT,
  GENERIC_INTENT,
}
