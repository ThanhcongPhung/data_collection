const SCENARIO=[
  {
    name:"Khoá/mở khoá thẻ hoặc dịch vụ Ngân hàng điện tử",
    context:"Bạn trong tình huống bị mất ví và điện thoại, bạn lo lắng thẻ ngân hàng và tài khoản\n" +
        "Mobile Banking trên điện thoại sẽ bị kẻ gian lợi dụng rút hết tiền. Bạn yêu cầu được hỗ\n" +
        "trợ từ ngân hàng. Sau đó, bạn cần hỏi về thủ tục làm lại thẻ và mở khóa dịch vụ\n" +
        "NHĐT/Internet banking/Mobile banking"
  }
  ,
  {
    name:"Mở thẻ",
    context:"Bạn có nhu cầu mở thẻ tại ngân hàng phục vụ mục đích mua sắm trực tuyến. Tuy\n" +
        "nhiên bạn chưa rõ ngân hàng có những loại thẻ nào, loại thẻ nào đáp ứng được nhu\n" +
        "cầu của bạn và để được phát hành loại thẻ đó, bạn phải làm gì."
  },
  {
    name:"Gửi tiền",
    context:"Bạn có nhu cầu gửi tiền vào ngân hàng. Tuy nhiên bạn chưa có tài khoản tại ngân\n" +
        "hàng, và muốn biết cần lưu ý những vấn đề gì khi gửi tiết kiệm vào ngân hàng."
  },
  {
    name:"Vay vốn",
    context:"Bạn cần vay tiền. Bạn chưa rõ có những hình thức cho vay nào, thủ tục cần thiết để\n" +
        "được giải ngân từ khách hàng và cần chuẩn bị những hồ sơ gì."
  },
  {
    name:"Khiếu nại khi có sự cố",
    context:"Bạn thực hiện giao dịch qua các kênh online nhưng gặp phải sự cố (chuyển khoản\n" +
        "nhầm, không nhận được OTP, giao dịch bị lỗi, v.v...) bạn cần khiếu nại đến bộ phận\n" +
        "có thẩm quyền đồng thời cần được hướng dẫn để khắc phục sự cố."
  },
]


const QA = [
  {
    scenario: 1,
    question:"Cách khóa thẻ",
    answer:"Quý khách có thể tới chi nhánh gần nhất để yêu cầu khóa dịch vụ nhé."
  },
  {
    scenario: 1,
    question:"Cách khóa Mobile banking/Ngân hàng điện tử",
    answer:"Quý khách có thể tới chi nhánh gần nhất để yêu cầu khóa dịch vụ nhé."
  },
  {
    scenario: 1,
    question:"Hướng dẫn hủy dịch vụ Mobile banking",
    answer:"Quý khách vui lòng liên hệ với điểm giao dịch Vietcombank gần nhất để thực hiện đăng ký ngừng sử dụng dịch" +
        " vụ VCB-Mobile B@nking hoặc hủy dịch vụ VCB-Mobile B@nking qua kênh ngân hàng trên internet VCB – iB@nking."
  },
  {
    scenario: 1,
    question:"Hướng dẫn làm lại thẻ",
    answer:"Để cấp lại thẻ quý khách vui lòng mang Chứng minh nhân dân/Căn cước hoặc Hộ chiếu đến phòng giao dịch Vietcombank" +
        " gần nhất để được hướng dẫn làm thủ tục cấp lại thẻ. Và chuẩn bị 50000 VNĐ cho phí làm thẻ."
  },
  {
    scenario: 1,
    question:"Thời gian phát hành thẻ",
    answer:"Dạ, Thời gian phát hành thẻ theo quy định là 5 - 7 ngày làm việc, tuy nhiên việc in phôi thẻ được xử lý tập trung tại Hội sở chính nên thời gian cụ thể có thể kéo dài hơn.\n" +
        "Do đó, cân nhắc tình hình thực tế mà chi nhánh tiếp nhận phát hành sẽ hẹn quý khách ngày trả thẻ cụ thể phù hợp." +
        "Thông thường, sau khi quý khách đăng ký phát hành thẻ thành công, chi nhánh Vietcombank sẽ ghi ngày lấy thẻ trong tờ giấy hẹn, " +
        "quý khách vui lòng lấy thẻ theo thời gian quy định. Trường hợp chi nhánh không giao giấy hẹn lấy thẻ vui lòng liên hệ với chi nhánh nơi đã tiếp nhận yêu cầu phát hành thẻ sau 5 - 7 ngày làm việc để kiểm tra đã có thẻ hay chưa nhé."
  },
  {
    scenario: 1,
    question:"Hướng dẫn làm lại thẻ",
    answer:"Để cấp lại thẻ quý khách vui lòng mang Chứng minh nhân dân/Căn cước hoặc Hộ chiếu đến phòng giao dịch Vietcombank" +
        " gần nhất để được hướng dẫn làm thủ tục cấp lại thẻ. Và chuẩn bị 50000 VNĐ cho phí làm thẻ."
  },
  {
    scenario: 1,
    question:"Hướng dẫn tải ứng dụng Mobile banking",
    answer:"Sau khi đăng ký dịch vụ thành công, quý khách sẽ nhận được tin nhắn SMS từ Vietcombank thông báo đăng ký thành công và có chứa link tải ứng dụng. \n" +
        "Sau khi kiểm tra kết nối internet từ điện thoại (3G/GPRS/Wifi), tùy thuộc vào loại điện thoại, quý khách thực hiện tải ứng dụng như sau:" +
        "- Với điện thoại hỗ trợ Java & điện thoại sử dụng hệ điều hành BlackBerry OS:  Nhấn vào link hoặc nhấp đường link vào trình duyệt điện thoại để truy cập đến máy chủ. Khi truy cập vào máy chủ theo đường link đã được gửi, hệ thống sẽ tự động xác định loại/model điện thoại quý khách đang sử dụng và cho phép quý khách tải phiên bản phù hợp nhất với điện thoại của mình" +
        "- Với điện thoại với sử dụng điều hành Android: quý khách truy cập Google Play, gõ tìm kiếm tên ứng dụng “Vietcombank” và thực hiện tải và cài đặt ứng dụng về máy điện thoại." +
        "- Với điện thoại sử dụng hệ điều hành iOS (iPhone): quý khách truy cập AppStore, gõ tìm kiếm tên ứng dụng “Vietcombank” và thực hiện tải và cài đặt ứng dụng về máy điện thoại.\\"
  },
  {
    scenario: 1,
    question:"Hướng dẫn tải ứng dụng Mobile banking",
    answer:"Sau khi đăng ký dịch vụ thành công, quý khách sẽ nhận được tin nhắn SMS từ Vietcombank thông báo đăng ký thành công và có chứa link tải ứng dụng. \n" +
        "Sau khi kiểm tra kết nối internet từ điện thoại (3G/GPRS/Wifi), tùy thuộc vào loại điện thoại, quý khách thực hiện tải ứng dụng như sau:" +
        "- Với điện thoại hỗ trợ Java & điện thoại sử dụng hệ điều hành BlackBerry OS:  Nhấn vào link hoặc nhấp đường link vào trình duyệt điện thoại để truy cập đến máy chủ. Khi truy cập vào máy chủ theo đường link đã được gửi, hệ thống sẽ tự động xác định loại/model điện thoại quý khách đang sử dụng và cho phép quý khách tải phiên bản phù hợp nhất với điện thoại của mình" +
        "- Với điện thoại với sử dụng điều hành Android: quý khách truy cập Google Play, gõ tìm kiếm tên ứng dụng “Vietcombank” và thực hiện tải và cài đặt ứng dụng về máy điện thoại." +
        "- Với điện thoại sử dụng hệ điều hành iOS (iPhone): quý khách truy cập AppStore, gõ tìm kiếm tên ứng dụng “Vietcombank” và thực hiện tải và cài đặt ứng dụng về máy điện thoại.\\"
  },
  {
    scenario: 1,
    question:"Dịch vụ Internet Banking là gì",
    answer:"VCB-iB@nking là chương trình phần mềm ứng dụng do Vietcombank phát triển và cung cấp trên website để Quý khách có thể thực hiện các giao dịch với ngân hàng mọi lúc mọi nơi thông qua các thiết bị có kết nối Internet như máy tính, máy tính bảng, thiết bị di động,.." +
        "Để được hướng dẫn sử dụng dịch vụ VCB-iB@NKING, quý khách vui lòng tham khảo đường link sau đây nhé: https://www.vietcombank.com.vn/upload/huong_dan_su_dung_dich_vu.pdf"
  },
  {
    scenario: 1,
    question:"Dịch vụ Internet Banking là gì",
    answer:"VCB-iB@nking là chương trình phần mềm ứng dụng do Vietcombank phát triển và cung cấp trên website để Quý khách có thể thực hiện các giao dịch với ngân hàng mọi lúc mọi nơi thông qua các thiết bị có kết nối Internet như máy tính, máy tính bảng, thiết bị di động,.." +
        "Để được hướng dẫn sử dụng dịch vụ VCB-iB@NKING, quý khách vui lòng tham khảo đường link sau đây nhé: https://www.vietcombank.com.vn/upload/huong_dan_su_dung_dich_vu.pdf"
  },
  {
    scenario: 1,
    question:"Dịch vụ Mobile Banking là gì",
    answer:"Dịch vụ VCB-Mobile B@nking là dịch vụ cho phép khách hàng thực hiện các giao dịch tài chính với ngân hàng và các giao dịch phi tài chính  khác ngay trên ứng dụng VCB-Mobile B@nking cài đặt trên thiết bị di động."
  },
  {
    scenario: 1,
    question:"Dịch vụ SMS Banking là gì",
    answer:"Dịch vụ VCB-SMS B@nking là dịch vụ ngân hàng qua tin nhắn điện thoại di động cho phép khách hàng nhận các tin nhắn thông báo biến động số dư tài khoản tiền gửi thanh toán và chi tiêu hẻ tín dụng hoặc chủ động truy vấn thông tin, nạp tiền điện thoại thông qua việc gửi tin nhắn theo cú pháp đến đầu số 6167."
  },
  {
    scenario: 1,
    question:"Dịch vụ Phone Banking là gì",
    answer:"VCB-Phone B@nking là một dịch vụ ngân hàng của VCB thông qua đầu số điện thoại cố định khách hàng có thể giao dịch với ngân hàng cung ứng dịch vụ mà không cần phải đến ngân hàng. Các dịch vụ phổ biến hiện nay cung cấp trên Phone Banking bao gồm: Truy vấn tài khoản, liệt kê giao dịch, thanh toán, chuyển tiền, tư vấn thông tin sản phẩm dịch vụ của ngân hàng, giải đáp thắc mắc, khiếu nại của khách hàng đối với Ngân hàng"
  },

  {
    scenario: 1,
    question:"Dịch vụ VCBPAY",
    answer:"VCBPAY là ứng dụng thứ cấp đầu tiên thuộc hệ sinh thái ứng dụng Mobile Banking, sử dụng chung tên đăng nhập và mật khẩu truy cập của ứng dụng VCB-Mobile B@nking. \n" +
        "Do đó, khi thay đổi mật khẩu một trong hai ứng dụng sẽ đồng thời thay đổi mật khẩu của ứng dụng còn lại.\n" +
        "VCBPAY là ứng dụng cài đặt trên thiết bị di động mang lại cho khách hàng trải nghiệm thanh toán P2P nhanh chóng và các tiện ích tuyệt vời."
  },
  {
    scenario: 1,
    question:"Hướng dẫn thay đổi số điện thoại đăng ký ngân hàng điện tử",
    answer:"Quý khách vui lòng mang theo CMND/CCCD đến điểm giao dịch Vietcombank gần nhất để thực hiện thay đổi thông tin đăng ký nhé!"
  },
  {
    scenario: 1,
    question:"Hướng dẫn mở lại dịch vụ Ngân hàng điện tử",
    answer:""
  },
  {
    scenario: 2,
    question:"Các loại thẻ mà ngân hàng hỗ trợ",
    answer:"Hiện tại Vietcombank đang phát hành 3 loại thẻ chính bao gồm: \n" +
        "- Ghi nợ nội địa\n" +
        "- Ghi nợ quốc tế\n" +
        "- Tín dụng quốc tế\n" +
        "Đối với thẻ quốc tế, Vietcombank phát hành đa dạng với hầu hết các thương hiệu thẻ phổ biến như Visa, Mastercard, American Express, JCB, Unionpay. \n" +
        "Nếu quý khách đang có nhu cầu mở thẻ, vui lòng tham khảo thông tin chi tiết dưới link sau:\n" +
        "https://portal.vietcombank.com.vn/Personal/Card/Pages/home.aspx?devicechannel=default"
  },
  {
    scenario: 2,
    question:"Thẻ JCB là thẻ gì",
    answer:"Thẻ JCB là cách mọi người gọi các thẻ thanh toán quốc tế (thẻ tín dụng, thẻ ghi nợ, và thẻ trả trước) mang thương hiệu JCB." +
        "JCB là công ty cung cấp công nghệ thanh toán toàn cầu có trụ sở tại Nhật Bản. Công ty này thiết lập một mạng lưới thanh toán kết nối chủ thẻ, đơn vị chấp nhận thẻ (trung tâm thương mại, nhà hàng, spa, v.v.) và ngân hàng/tổ chức phát hành thẻ (phát hành thẻ và xử lý giao dịch), giúp các giao dịch hoàn tất nhanh chóng và dễ dàng."
  },
  {
    scenario: 2,
    question:"Thẻ Visa là thẻ gì",
    answer:"Thẻ Visa là loại thẻ thanh toán quốc tế do công ty Visa International Service Association có trụ sở tại San Francisco, California, Mỹ liên kết với các ngân hàng phát hành. Trên thẻ có biểu tượng VISA nằm ở góc bên phải."
  },
  {
    scenario: 2,
    question:"Thẻ Mastercard là thẻ gì",
    answer:"Thẻ MasterCard là loại thẻ thanh toán quốc tế do công ty MasterCard Worldwide có trụ sở ở Purchase, New York, Mỹ kết hợp với các ngân hàng phát hành. Trên thẻ có biểu tượng MasterCard nằm ở góc bên phải."
  },
  {
    scenario: 2,
    question:"Thẻ nội địa",
    answer:"Thẻ ATM là một loại thẻ theo chuẩn ISO 7810, dùng để thực hiện các giao dịch tự động như kiểm tra tài khoản, rút tiền hoặc chuyển khoản, thanh toán hóa đơn, mua thẻ điện thoại... từ máy rút tiền tự động ATM. Thẻ ATM bao gồm: Thẻ trả trước, thẻ ghi nợ và thẻ tín dụng.\n" +
        "\n" +
        "Thẻ ATM nội địa (hay thẻ thanh toán nội địa) là loại thẻ ngân hàng thay cho tiền mặt, dùng để thanh toán hóa đơn ở siêu thị, cửa hàng, rút tiền thông qua ATM hoặc máy POS đều được. Khác với thẻ thanh toán quốc tế thì thẻ ATM nội địa chỉ có thể thanh toán trong quốc gia của bạn chứ không dùng được ở nước ngoài."
  },
  {
    scenario: 2,
    question:"Hướng dẫn mở thẻ",
    answer:"Quý khách có thể mở thẻ theo 2 cách sau: \n" +
        " Cách 1: Mở thẻ online\n" +
        "- Truy cập đường dẫn sau: https://www.vietcombank.com.vn/dangkythe/?itemID=39 \n" +
        "- Tích chọn đăng ký mở thẻ\n" +
        "- Điền đầy đủ thông tin theo yêu cầu của biểu mẫu (Họ và Tên, địa chỉ, nơi ở, hộ khẩu, ngày sinh, số CMND/Hộ chiếu, email...)\n" +
        "Sau khi hoàn tất, quý khách sẽ nhận được cuộc gọi từ ngân hàng hướng dẫn xác minh thông tin cũng như cách nhận thẻ.\n" +
        "Cách 2: Mở thẻ tại điểm giao dịch Vietcombank\n" +
        "Đem theo CMTND, thẻ căn cước đến điểm giao dịch Vietcombank gần nhất để giao dịch viên hỗ trợ trực tiếp."
  },
  {
    scenario: 2,
    question:"Điều kiện mở thẻ",
    answer:"Điều kiện phát hành đối với các loại thẻ của Vietcombank như sau:\n" +
        "- Cá nhân từ 15 tuổi trở lên, không bị mất hoặc hạn chế năng lực hành vi dân sự theo quy định của pháp luật.\n" +
        "- Trường hợp đối tượng phát hành thẻ là người nước ngoài thì phải được phép cư trú tại Việt Nam với thời hạn từ 12 tháng trở lên.\n" +
        "** Riêng đối với các loại thẻ tín dụng Vietcombank, để mở thẻ: Điều kiện lương chuyển khoản từ 5 triệu trở lên. \n" +
        "Nếu nhận lương qua tài khoản Vietcombank: Quý khách sẽ được miễn cung cấp giấy tờ chứng minh thu nhập. \n" +
        "Nếu không nhận lương qua tài khoản Vietcombank: Quý khách có thể lựa chọn 1 trong hai nhóm giấy tờ sau:\n" +
        "      + Sao kê lương qua ngân hàng trong 03 tháng gần nhất và Hợp đồng lao động/Quyết định bổ nhiệm/Quyết định nâng lương/Quyết định tuyển dụng. \n" +
        "      + Xác nhận của cơ quan công tác theo mẫu Vietcombank quy định. Nếu không muốn chứng minh thu nhập quý khách có thể thế chấp giấy tờ có giá (ví dụ như sổ tiết kiệm)."
  },
  {
    scenario: 2,
    question:"Thủ tục cấp lại thẻ",
    answer:"Tất cả các thông tin của quý khách đều được lưu trữ trong hệ thống Vietcombank. Do đó để làm lại thẻ quý khách chỉ cần một trong những giấy tờ sau: Chứng minh nhân dân (CMND) bản gốc; Thẻ căn cước công dân; Hộ chiếu; Chiếc thẻ ATM Vietcombank bị hỏng."
  },
  {
    scenario: 2,
    question:"Phí mở thẻ",
    answer:"Lần đầu phát hành thẻ miễn phí, tính phí từ lần tiếp theo phát hành phôi"
  },
  {
    scenario: 2,
    question:"Cách thanh toán thẻ",
    answer:"Hiện nay có 3 cách để thanh toán số dư trên tài khoản Thẻ tín dụng." +
        "1. Tự động trích nợ tài khoản thanh toán – Đăng ký dịch vụ trích nợ tự động từ tài khoản thanh toán của mình mở tại Vietcombank số tiền thanh toán tối thiểu hoặc toàn bộ dư nợ thẻ tín dụng hàng tháng. Quý khách chỉ cần kiểm tra xem mình có đủ tiền trong tài khoản thanh toán vào ngày đến hạn.\n" +
        "2. Chuyển khoản – Có thể chuyển khoản từ tài khoản Vietcombank sang tài khoản Thẻ tín dụng thông qua máy ATM của Vietcombank, hoặc dịch vụ ngân hàng trực tuyến, hoặc chuyển khoản từ ngân hàng khác.\n" +
        "3. Thanh toán tiền mặt/séc  – Quý khách cũng có thể nộp tiền mặt tại các máy ATM đa chức năng hoạt động 24/24, được đặt tại các chi nhánh/ phòng giao dịch của Vietcombank; hoặc nộp tiền mặt tại quầy giao dịch của Vietcombank trong các ngày làm việc"
  },
  {
    scenario: 2,
    question:"Hạn mức từng loại thẻ",
    answer:""
  },
  {
    scenario: 2,
    question:"Lãi suất khi sử dụng thẻ tín dụng",
    answer:"Hiện tại mức lãi suất đang áp dụng với các sản phẩm thẻ tín dụng của Vietcombank từ 9%/năm đến 18%/năm tùy theo sản phẩm thẻ và hình thức cấp tín dụng thẻ."
  },
  {
    scenario: 2,
    question:"Cách sử dụng thẻ",
    answer:"Quý khách có thể thanh toán tại điểm chấp nhận thanh toán thẻ như nhà hàng ăn nhanh, siêu thị, cửa hàng tiện lợi, cửa hàng café, cây xăng, nhà thuốc, hoặc các cửa hàng có máy POS..."
  },
  {
    scenario: 2,
    question:"Tính năng thẻ",
    answer:"Khách hàng có thể sử dụng thẻ Vietcombank để:\n" +
        " - Giao dịch tại hàng triệu máy ATM và hệ thống các đơn vị chấp nhận thẻ của VCB trên khắp cả nước;\n" +
        " - Hưởng lãi không kỳ hạn trên số dư tài khoản của khách hàng;\n" +
        " - Thanh toán linh hoạt tại các đơn vị chấp nhận thẻ trên toàn quốc, thanh toán tiện lợi qua Internet và các ứng dụng di động như ví điện tử MOCA;\n" +
        " - Thanh toán linh hoạt tại hàng triệu đơn vị chấp nhận thẻ tại Việt Nam, bao gồm cả các điểm chấp nhận thẻ contactless;\n" +
        " - Thanh toán hóa đơn cho các dịch vụ điện nước, viễn thông, bảo hiểm, thanh toán vé máy bay online;\n" +
        " - Quản lý và kiểm soát chi tiêu thông qua các tiện ích gia tăng như VCB-iB@nking, VCB-Mobile banking, SMS Banking, VCB-Phone Banking;\n" +
        " - Các giao dịch được phép khác mà Vietcombank quy định.\n" +
        " Dịch vụ khách hàng 24/7 qua tổng đài của Trung tâm Hỗ trợ khách hàng 1900.54.54.13."
  },
  {
    scenario: 3,
    question:"Cách gửi tiết kiệm",
    answer:"Quý khách có thể đăng kí mở tài khoản thanh toán hoặc sổ tiết kiệm bằng cách:\n" +
        "1.  Tới địa điểm giao dịch:\n" +
        "Khi đến vui lòng đem theo Giấy tờ xác minh thông tin của khách hàng (giấy chứng minh nhân dân hoặc Thẻ căn cước công dân" +
        " hoặc Hộ chiếu còn thời hạn hiệu lực hoặc Giấy khai sinh của cá nhân chưa đủ 14 tuổi) để mở tài khoản theo sự hướng dẫn của GDV.\n" +
        "Trường hợp gửi thêm tiền vào TTK, người gửi tiền xuất trình thêm TTK khi gửi tiền.\n" +
        "2. Gửi tiết kiệm qua phương tiện điện tử: thực hiện theo quy định tại  sản phẩm Tiền gửi trực tuyến. Chi tiết vui lòng xem tại đây: \n" +
        "https://portal.vietcombank.com.vn/Documents/Bi%E1%BB%83u%20m%E1%BA%ABu%20c%C3%A1%20nh%C3%A2n/Bi%E1%BB%83u%20m" +
        "%E1%BA%ABu%20Ti%E1%BA%BFt%20ki%E1%BB%87m/Huong%20dan%20GUI%20TIEN%20TRUC%20TUYEN_15.10.2013.pdf"
  },
  {
    scenario: 3,
    question:"Các loại tiền có thể gửi tiết kiệm",
    answer:"Tùy sản phẩm, các loại ngoại tệ sẽ được quy định từng thời kì: \n" +
        "- Tài khoản tiền gửi và tiết kiệm trả lãi sau: các loại ngoại tệ quy định từng thời kì\n" +
        "- Tiết kiệm trả lãi trước hoặc lãi định kì: USD, EUR\n" +
        "- Tiết kiệm tự động: USD\n" +
        "- Tích lũy kiều hối: USD\n" +
        "Riêng đối với loại tiền gửi trực tuyến, chỉ có thể gửi bằng loại tiền VND."
  },
  {
    scenario: 3,
    question:"Lãi suất tiết kiệm",
    answer:""
  },
  {
    scenario: 3,
    question:"Thời hạn gửi tiết kiệm",
    answer:""
  },
  {
    scenario: 3,
    question:"Cách mở khoản tiết kiệm",
    answer:"Quý khách có thể đăng kí mở tài khoản thanh toán hoặc sổ tiết kiệm bằng cách:\n" +
        "Khi đến vui lòng đem theo Giấy tờ xác minh thông tin của khách hàng (giấy chứng minh nhân dân hoặc Thẻ căn cước công dân hoặc Hộ chiếu còn thời hạn hiệu lực hoặc Giấy khai sinh của cá nhân chưa đủ 14 tuổi) để mở tài khoản theo sự hướng dẫn của GDV.\n" +
        "Trường hợp gửi thêm tiền vào TTK, người gửi tiền xuất trình thêm TTK khi gửi tiền.\n" +
        "\n" +
        "2. Gửi tiết kiệm qua phương tiện điện tử: thực hiện theo quy định tại  sản phẩm Tiền gửi trực tuyến. Chi tiết vui lòng xem tại đây: \n" +
        "https://portal.vietcombank.com.vn/Documents/Bi%E1%BB%83u%20m%E1%BA%ABu%20c%C3%A1%20nh%C3%A2n/Bi%E1%BB%83u%20m%E1%BA%ABu%20Ti%E1%BA%BFt%20ki%E1%BB%87m/Huong%20dan%20GUI%20TIEN%20TRUC%20TUYEN_15.10.2013.pdf"
  },
  {
    scenario: 3,
    question:"Cách tất toán tài khoản tiết kiệm",
    answer:"Tài khoản tiết kiệm tất toán trước hạn được xử lý như sau:\n" +
        "- Tiền lãi được tính trên cơ sở số tiền gửi, số ngày gửi thực tế, hình thức trả lãi và mức lãi suất rút trước hạn tiền gửi tiết kiệm.\n" +
        "- Đối với loại tiền gửi trả lãi trước hoặc trả lãi định kỳ, Vietcombank sẽ thu lại phần chênh lệch giữa số lãi đã lĩnh và số lãi khách hàng được hưởng (nếu có) khi trả gốc cho khách hàng."
  },
  {
    scenario: 3,
    question:"Thủ tục mở tài khoản",
    answer:"Quý khách có thể đăng kí mở tài khoản thanh toán hoặc sổ tiết kiệm bằng cách:\n" +
        "1.  Tới địa điểm giao dịch:\n" +
        "Khi đến vui lòng đem theo Giấy tờ xác minh thông tin của khách hàng (giấy chứng minh nhân dân hoặc Thẻ căn cước công dân hoặc Hộ chiếu còn thời hạn hiệu lực hoặc Giấy khai sinh của cá nhân chưa đủ 14 tuổi) để mở tài khoản theo sự hướng dẫn của GDV.\n" +
        "Trường hợp gửi thêm tiền vào TTK, người gửi tiền xuất trình thêm TTK khi gửi tiền.\n" +
        "\n" +
        "2. Gửi tiết kiệm qua phương tiện điện tử: thực hiện theo quy định tại  sản phẩm Tiền gửi trực tuyến. Chi tiết vui lòng xem tại đây: \n" +
        "https://portal.vietcombank.com.vn/Documents/Bi%E1%BB%83u%20m%E1%BA%ABu%20c%C3%A1%20nh%C3%A2n/Bi%E1%BB%83u%20m%E1%BA%ABu%20Ti%E1%BA%BFt%20ki%E1%BB%87m/Huong%20dan%20GUI%20TIEN%20TRUC%20TUYEN_15.10.2013.pdf"
  },
  {
    scenario: 3,
    question:"Giấy tờ mở tài khoản",
    answer:"Hồ sơ mở tài khoản tiền gửi ở VCB bao gồm: \n" +
        "- CMND/ CCCD/ Hộ chiếu còn hiệu lực.\n" +
        "- Giấy Yêu cầu gửi tiền/Giấy đề nghị mở tài khoản cá nhân Vietcombank (mẫu ngân hàng).\n" +
        "Riêng đối với sản phẩm tiết kiệm tự động bổ sung thêm Giấy đăng ký sử dụng sản phẩm Tiết kiệm tự động.\n" +
        "\n" +
        "Đối với tiền gửi trực tuyến, quý khách cần đăng ký dịch vụ VCB-SMS B@nking, dịch vụ Ngân hàng trực tuyến VCB - iB@nking hoặc VCB Mobile B@nking tại các điểm giao dịch của Vietcombank trên toàn quốc. Hồ sơ yêu cầu:\n" +
        "   - CMND/CCCD/Hộ chiếu còn hiệu lực (bản gốc)\n" +
        "   - Mẫu đăng ký dịch vụ Ngân hàng điện tử.  \n" +
        "Thông chi tiết tham khảo tại link dưới đây: https://portal.vietcombank.com.vn/Personal/Saving/Pages/Tien-gui-truc-tuyen.aspx?devicechannel=default"
  },
  {
    scenario: 3,
    question:"Số tài khoản mỗi người có thể mở",
    answer:"Dạ hiện tại Vietcombank quy định mỗi người chỉ được mở 1 tài khoản thanh toán tại ngân hàng nhé."
  },
  {
    scenario: 3,
    question:"Điều kiện mở tài khoản",
    answer:"Điều kiện mở tài khoản tiết kiệm của Vietcombank khá đơn giản. Quý khách chỉ cần là một trong các đối tượng sau đây nhé:\n" +
        "a. Công dân Việt Nam từ đủ 18 tuổi trở lên có năng lực hành vi dân sự đầy đủ theo quy định của pháp luật Việt Nam.\n" +
        "b. Công dân Việt Nam từ đủ 15 tuổi đến chưa đủ 18 tuổi không bị hạn chế năng lực hành vi dân sự hoặc không mất năng lực hành vi dân sự theo quy định của pháp luật.\n" +
        "c.Công dân Việt Nam bị hạn chế năng lực hành vi dân sự hoặc mất năng lực hành vi dân sự theo quy định của pháp luật hoặc chưa đủ 15 tuổi thực hiện giao dịch tiền gửi tiết kiệm thông qua người đại diện theo pháp luật; Công dân Việt Nam có khó khăn trong nhận thức, làm chủ hành vi theo quy định của pháp luật thực hiện giao dịch tiền gửi tiết kiệm thông qua người giám hộ."
  },
  {
    scenario: 3,
    question:"Phí mở tài khoản",
    answer:"Để thuận tiện hơn quý khách có thể tham khảo biểu phí dịch vụ tài khoản của VCB theo đường link dưới đây nhé: \n" +
        "https://portal.vietcombank.com.vn/content/Corporate/BieuPhi/Kh%C3%A1ch%20h%C3%A0ng%20Doanh%20nghi%E1%BB%87p/Bi%E1%BB%83u%20ph%C3%AD%20t%C3%A0i%20kho%E1%BA%A3n%20doanh%20nghi%E1%BB%87p/Dich%20vu%20tai%20khoan.pdf"
  },
  {
    scenario: 3,
    question:"phí dịch vụ ngân hàng",
    answer:"Biểu phí thông tin dịch vụ Ngân hàng điện tử như sau:\n" +
        "https://portal.vietcombank.com.vn/content/personal/BieuPhi/Ng%C3%A2n%20h%C3%A0ng%20%C4%91i%E1%BB%87n%20t%E1%BB%AD/Ng%C3%A2n%20h%C3%A0ng%20%C4%91i%E1%BB%87n%20t%E1%BB%AD/20190513_Dich%20vu%20ngan%20hang%20dien%20tu_BP%20KHCN%20_dang%20tai%20Website.pdf"
  },
  {
    scenario: 4,
    question:"Mục đích vay vốn",
    answer:"Vay mua nhà, mua xe, vay tiêu dùng, vay kinh doanh"
  },
  {
    scenario: 4,
    question:"Điều kiện vay mua xe",
    answer:"Điều kiện vay mua ô tô như sau:\n" +
        "\t\t\t- Mọi cá nhân có đủ năng lực pháp luật dân sự và năng lực hành vi dân sự vay vốn tại Vietcombank.\n" +
        "\t\t\t- Khách hàng có độ tuổi không quá 60 \n" +
        "\t\t\t​- Khách hàng có tổng thu nhập từ 8 triệu VND trở lên\n" +
        "\t\t\t- Khách hàng có Giấy chứng nhận đăng ký kinh doanh và/hoặc các giấy tờ có tính chất pháp lý tương đương\n" +
        "\t\t\t- Khách hàng có Tài sản đảm bảo là xe ô tô mới/ xe ô tô đã qua sử dụng hoặc bất động sản của bên vay/bên thứ ba (bố mẹ của bên vay)."
  },
  {
    scenario: 4,
    question:"Điều kiện vay kinh doanh",
    answer:"Điều kiện vay kinh doanh như sau:\n" +
        "\t\t\t- Khách hàng cá nhân (bao gồm cá nhân tự kinh doanh/thành viên hộ kinh doanh/chủ doanh nghiệp tư nhân) có đủ năng lực pháp luật dân sự và năng lực hành vi dân sự\n" +
        "\t\t\t- Có độ tuổi từ đủ 18 tuổi trở lên và không quá 65 tuổi (tại thời điểm đáo hạn khoản vay)\n" +
        "\t\t\t- Có Giấy chứng nhận đăng ký kinh doanh và/hoặc các giấy tờ có tính chất pháp lý tương đương\n" +
        "\t\t\t- Tài sản đảm bảo là giấy tờ có giá, bất động sản, tài sản hình thành từ vốn vay là ô tô mua mới"
  },
  {
    scenario: 4,
    question:"Điều kiện vay tiêu dùng",
    answer:"Có 3 hình thức vay: Vay thế chấp, Vay tín chấp, Vay cầm cố giấy tờ có giá"
  },
  {
    scenario: 4,
    question:"Điều kiện vay tiêu dùng theo hình thức vay thế chấp",
    answer:"Vay thế chấp (vay có đảm bảo bằng tài sản như nhà, xe ô tô, xe máy ..):Điều kiện vay tiêu dùng thế chấp như \tsau:\n" +
        "- Khách hàng có độ tuổi từ 18 - 65 tính đến thời điểm đề nghị vay vốn;\n" +
        "- Khách hàng có nguồn thu nhập ổn định từ lương tối thiểu 05 triệu đồng trở lên;\n" +
        "- Khách hàng có tài sản thế chấp là bất động sản hoặc ô tô."
  },
  {
    scenario: 4,
    question:"Điều kiện vay tiêu dùng theo hình thức vay tín chấp",
    answer:"Vay tín chấp (vay không đảm bảo bằng tài sản):Điều kiện vay tiêu dùng tín chấp như sau:\n" +
        "- Khách hàng là cá nhân có độ tuổi không quá 55 với nữ và 60 với nam tại thời điểm kết thúc khoản vay\n" +
        "- Khách hàng có thu nhập ổn định từ lương tối thiểu từ 03 triệu đồng trở lên\n" +
        "- Xếp hạng tín dụng từ loại A trở lên theo Hệ thống xếp hạng tín dụng nội bộ của Vietcombank.\n" +
        "- Kinh nghiệm công tác từ 12 tháng trở lên\n" +
        "- Được cơ quan công tác xác nhận thông tin cần thiết (mức lương, vị trí công tác..."
  },
  {
    scenario: 4,
    question:"Điều kiện vay tiêu dùng theo hình thức vay cầm cố giấy tờ có giá",
    answer:"Vay cầm cố giấy tờ có giá (vay cầm cố các GTCG như tín phiếu kho bạc, trái phiếu Chính phủ):Điều kiện vay tiêu dùng bằng giấy tờ có giá như sau:\n" +
        "- GTCG được cầm cố: trái phiếu Chính phủ, tín phiếu kho bạc, kỳ phiếu, trái phiếu, sổ tiết kiệm, chứng chỉ tiền gửi, tài khoản tiền gửi có kỳ hạn do Vietcombank và các tổ chức tín dụng khác phát hành.\n" +
        "- Mọi cá nhân có đủ năng lực pháp luật dân sự và năng lực hành vi dân sự vay vốn tại Vietcombank.\n" +
        "- GTCG thuộc quyền sở hữu hợp pháp của khách hàng hoặc của bên thứ ba (nếu có)."
  },
  {
    scenario: 4,
    question:"Điều kiện vay mua nhà",
    answer:"Điều kiện vay mua bất động sản như sau:\n" +
        "- Mọi cá nhân có đủ năng lực pháp luật dân sự và năng lực hành vi dân sự vay vốn tại Vietcombank.\n" +
        "- Khách hàng  có độ tuổi từ 18 tuổi trở lên và không quá 65 tuổi tính đến thời điểm đề nghị vay vốn.\n" +
        "- Khách hàng có thu nhập tối thiểu 5 triệu đồng/tháng.\n" +
        "- Khách hàng có Tài sản đảm bảo là: tài sản hình thành từ vốn vay/bất động sản khác/giấy tờ có giá (theo quy định của VCB)."
  },
  {
    scenario: 4,
    question:"thủ tục vay thế chấp (vay có đảm bảo bằng tài sản như nhà, xe ô tô, xe máy ..)",
    answer:"Hồ sơ vay thế chấp tiêu dùng bao gồm các giấy tờ sau\n" +
        "\n" +
        "- Phương án sử dụng vốn (theo mẫu)\n" +
        "- Hồ sơ pháp lý:  CMND/Căn cước công dân/hộ chiếu; Hộ khẩu thường trú/tạm trú dài hạn (KT3) của khách hàng hoặc của bên thứ ba có tài sản bảo đảm cho khoản vay; Giấy đăng ký kết hôn/Giấy chứng nhận độc thân của khách hàng;\n" +
        "- Hồ sơ chứng minh thu nhập;\n" +
        "- Hồ sơ về tài sản bảo đảm;\n" +
        "- Hồ sơ chứng minh mục đích sử dụng vốn."
  },
  {
    scenario: 4,
    question:"thủ tục ay tín chấp (vay không đảm bảo bằng tài sản)",
    answer:"Hồ sơ vay tvín chấp tiêu dùng bao gồm các giấy tờ sau\n" +
        "\n" +
        "- Phương án sử dụng vốn (theo mẫu).\n" +
        "- Hồ sơ pháp lý: CMND/ Căn cước công dân/Hộ chiếu; Hộ khẩu thường trú/tạm trú dài hạn (KT3) của Khách hàng;\n" +
        "- Hồ sơ chứng minh thu nhập: Hợp đồng lao động; Sao kê giao dịch tài khoản ngân hàng 06 tháng gần nhất (có xác nhận của ngân hàng phát hành); Giấy xác nhận của cơ quan công tác của Khách hàng về vị trí công tác, thu nhập của Khách hàng;\n" +
        "- Hồ sơ chứng minh thu nhập khác (nếu có);"
  },
  {
    scenario: 4,
    question:"thủ tục vay cầm cố giấy tờ có giá (vay cầm cố các GTCG như tín phiếu kho bạc, trái phiếu Chính phủ)",
    answer:"Hồ sơ vay cầm cố GTCG cho mục đích tiêu dùng bao gồm các giấy tờ sau:\n" +
        "\n" +
        "- Hồ sơ pháp lý: Bản sao CMND/Căn cước công dân/Hộ chiếu của khách hàng hoặc chủ sở hữu GTCG (nếu cầm cố GTCG của bên thứ ba).\n" +
        "- Bản gốc giấy tờ có giá;\n" +
        "- Phương án sử dụng vốn kiêm Hợp đồng cho vay kiêm Hợp đồng cầm cố kiêm giấy nhận nợ (theo mẫu của ngân hàng);\n" +
        "- Các hồ sơ khác (nếu có).\n" +
        "Lưu ý: Khách hàng xuất trình bản chính để đối chiếu."
  },
  {
    scenario: 4,
    question:"hồ sơ vay mua xe",
    answer:"Hồ sơ vay mua xe sẽ bao gồm các giấy tờ sau:\n" +
        "- Phương án sử dụng vốn.\n" +
        "- Hồ sơ pháp lý khách hàng: CMND/ Căn cước công dân/Hộ chiếu, Hộ khẩu thường trú/tạm trú dài hạn (KT3), Giấy đăng ký kết hôn/Giấy chứng nhận độc thân\n" +
        "- Hồ sơ chứng minh thu nhập: Hợp đồng lao động, sao kê tài khoản ngân hàng, ...\n" +
        "- Hồ sơ tài sản bảo đảm."
  },
  {
    scenario: 4,
    question:"hồ sơ vay kinh doanh",
    answer:"Với kinh doanh tài lộc, hồ sơ kinh doanh bao gồm:\n" +
        "- Phương án sử dụng vốn (theo mẫu)\n" +
        "- Hồ sơ pháp lý: Bản sao CMND/Căn cước công dân/Hộ chiếu; Hộ khẩu thường trú/tạm trú dài hạn (KT3); Giấy chứng nhận đăng ký kinh doanh và/hoặc các giấy tờ có tính chất pháp lý tương đương;\n" +
        "- Hồ sơ chứng minh hoạt động kinh doanh của khách hàng và/ hoặc Doanh nghiệp tư nhân do Khách hàng là chủ sở hữu;\n" +
        "- Hồ sơ tài sản bảo đảm: bản sao.\n" +
        "\n" +
        "Với  kinh doanh trung hạn, hồ sơ vay vốn bao gồm:\n" +
        "- Phương án sử dụng vốn.\n" +
        "- Hồ sơ pháp lý của khách hàng: Bản sao CMND/ Căn cước công dân/Hộ chiếu; - Hộ khẩu thường trú/tạm trú dài hạn (KT3) Giấy đăng ký kết hôn/Giấy chứng nhận độc thân\n" +
        "- Hồ sơ chứng minh thu nhập: Bản sao Giấy chứng nhận đăng ký kinh doanh và/hoặc các giấy tờ có tính chất pháp lý tương đương; Hồ sơ chứng minh thu nhập khác (nếu có)\n" +
        "- Hồ sơ tài sản bảo đảm"
  },
  {
    scenario: 4,
    question:"hồ sơ vay mua nhà",
    answer:"Hồ sơ vay mua bất động sản như sau:\n" +
        "- Phương án sử dụng vốn.\n" +
        "- Hồ sơ pháp lý: Bản sao CMND/Hộ chiếu, Hộ khẩu thường trú/tạm trú dài hạn (KT3), Giấy đăng ký kết hôn/Giấy chứng nhận độc thân.\n" +
        "- Hồ sơ chứng minh thu nhập: Hợp đồng lao động;  Sao kê tài khoản ngân hàng.\n" +
        "- Hồ sơ về tài sản bảo đảm\n" +
        "Riêng đối với Cho vay xây sửa nhà, khách hàng bổ sung thêm Hồ sơ chứng minh mục đích sử dụng vốn"
  },
  {
    scenario: 4,
    question:"thời hạn vay",
    answer:"Cho vay tiêu dùng không bảo đảm bằng tài sản: Thời gian vay linh hoạt lên tới 60 tháng\n" +
        "\tCho vay tiêu dùng có bảo đảm bằng tài sản:Thời hạn cho vay lên đến 120 tháng\t\n" +
        "\tCho vay mua nhà dự án: Thời gian vay linh hoạt lên đến: 20 năm\n" +
        "\tCho vay xây sửa nhà: Thời gian vay linh hoạt lên đến 15 năm\n" +
        "\tCho vay mua nhà đất: Thời gian vay linh hoạt lên đến 15 năm\n" +
        "\tCho vay mua ô tô: Thời gian vay linh hoạt lên đến 60 tháng\n" +
        "\tCho vay Kinh doanh trung hạn: Thời gian vay linh hoạt lên đến 60 tháng\n" +
        "\tKinh doanh tài lộc: Thời gian vay linh hoạt tối đa lên đến 12 tháng\\"
  },
  {
    scenario: 4,
    question:"Có được vay online không",
    answer:"Dạ hiện tại Vietcombank chưa hỗ trợ vay vốn trực tuyến mong quý khách thông cảm."
  },
  {
    scenario: 4,
    question:"Trả nợ trước hạn",
    answer:"Khách hàng được phép trả nợ trước hạn một phần hoặc toàn bộ khoản vay tại thời điểm bất kì trong thời hạn khoản vay và chịu phí phạt trả nợ trước theo quy định của Vietcombank.\n" +
        "Trường hợp khách hàng trả nợ trước một phần khoản vay, khách hàng có thể lập giấy đề nghị trả nợ trước hạn và nêu rõ mong muốn được cơ cấu lại khoản vay."
  },
  {
    scenario: 4,
    question:"Số tiền được vay",
    answer:"Số tiền được vay tùy thuộc vào tình hình tài chính và khả năng trả nợ của quý khách. Về thời gian vay, chúng tôi sẽ tư vấn thời gian vay phù hợp với nguồn tài chính của quý khách. \n" +
        "Với Vietcombank, quý khách có thể vay tối đa đến 70% giá trị của tài sản dự định mua. (Hãy liên hệ với chúng tôi để biết thêm chi tiết)"
  },
  {
    scenario: 5,
    question:"Cách giải quyết khi chuyển khoản nhầm",
    answer:"Vietcombank xin thông tin đến quý khách như sau:\n" +
        "1. Trường hợp chuyển tiền trong cùng hệ thống Vietcombank và phát hiện thông tin sai sót (chuyển khoản nhầm):\n" +
        "Trong trường hợp này, quý khách vui lòng mang CMND (bản gốc, còn hiệu lực) đến điểm giao dịch bất kỳ của Ngân hàng làm yêu cầu tra soát. Khi nhận được yêu cầu tra soát hợp lệ, Vietcombank sẽ hỗ trợ bằng cách liên hệ với người nhận chuyển nhầm để thông báo yêu cầu hoàn trả.\n" +
        "Chúng tôi xin lưu ý theo quy định của Ngân hàng Nhà nước và Vietcombank thì ngân hàng không có quyền được tự động khoanh giữ hoặc trích nợ tài khoản người nhận nếu chưa được người nhận đồng ý hoàn trả hoặc xác nhận hoàn trả. Trong vòng tối đa 30 ngày kể từ ngày tiếp nhận hồ sơ tra soát của quý khách, chúng tôi sẽ thông báo đến quý khách kết quả tra soát.\n" +
        "\n" +
        "\n" +
        "2. Trường hợp quý khách chuyển tiền sang ngân hàng khác nhưng thông tin không chính xác, không trùng khớp với bất kỳ khách hàng nào trên hệ thống của họ:\n" +
        "Trong trường hợp này, Ngân hàng hưởng sẽ không có cơ sở để hạch toán vào tài khoản người nhận. Họ có thể giữ lại một thời gian ngắn chờ tra soát điều chỉnh từ Vietcombank hoặc chuyển trả lại Vietcombank ngay để hoàn trả tài khoản của quý khách, thời gian xử lý phụ thuộc vào Quy trình của Ngân hàng quý khách. \n" +
        "Do đó quý khách có thể cân nhắc: \n" +
        "(i) tới điểm giao dịch bất kỳ của Vietcombank yêu cầu điều chỉnh lệnh  \n" +
        "(ii) chờ lệnh hoàn trả từ Ngân hàng hưởng."
  },
  {
    scenario: 5,
    question:"Cần làm gì khi không nhận được mã OTP",
    answer:"Trường hợp quý khách không nhận được mã OTP khi giao dịch có thể do: \n" +
        "- Hệ thống xảy ra sự cố nên chưa nhận được tín hiệu giao dịch, mọi người nên gửi lại yêu cầu gửi mã OTP để thử nếu như không gửi tiếp thì xử lý cách khác.\n" +
        "- Số điện thoại nhận OTP của mọi người khi đăng ký dịch vụ bị khóa 2 chiều\n" +
        "- Do quý khách chặn tin nhắn rác của điện thoại nên không nhận được tin nhắn của ngân hàng\n" +
        "- Hệ thống ngân hàng bảo trì\n" +
        "Thường thì mọi người sẽ nhận được mã OTP sau 2 -3 phút nếu như không nhận được mã OTP vui lòng thử lại sau một lúc, hoặc liên hệ với bộ phận CSKH qua số 1900545413 để được hỗ trợ.\n" +
        "Còn trường hợp mọi người không giao dịch mà vẫn nhận được mã OTP giao dịch thì nên cẩn thận, báo ngân  hàng ngay lập tức bởi có nguy cơ tài khoản của quý khách bị xâm phạm."
  },
  {
    scenario: 5,
    question:"Rút tiền bị nuốt thẻ",
    answer:"1. Trường hợp thẻ của quý khách bị thu giữ tại ATM VCB:\n" +
        "• Trong vòng 30 ngày kể từ ngày thẻ bị thu giữ, quý khách liên hệ tới SĐT được ghi trên máy ATM; hoặc PGD/CN có đặt máy ATM giữ thẻ để yêu cầu hỗ trợ trả lại thẻ. \n" +
        "• Sau thời hạn nêu trên nếu quý khách không liên hệ nhận lại bị thẻ nuốt, VCB sẽ khóa, hủy thẻ và phát hành lại thẻ thay thế cho quý khách, quý khách vui lòng liên hệ VCB để làm thủ tục phát hành lại thẻ. \n" +
        "Đối với thẻ tín dụng, quý khách vui lòng liên hệ chi nhánh đã phát hành trước đây; đối với thẻ ghi nợ liên hệ tại bất kỳ CN/PGD nào của VCB để được phục vụ.\n" +
        "2. Trường hợp thẻ của quý khách bị thu giữ tại ATM của ngân hàng khác:\n" +
        "• Trong vòng 10 ngày kể từ ngày thẻ bị thu giữ:\n" +
        "+ Nếu quý khách muốn nhận thẻ tại Ngân hàng quản lý máy ATM (Ngân hàng thanh toán_NHTT) và NHTT có dịch vụ hỗ trợ trả thẻ trực tiếp cho Khách hàng: Quý khách xuất trình CMND/CCCD và Giấy xác nhận chủ thẻ do CN VCB cấp để nhận thẻ tại NHTT.\n" +
        "+ Nếu quý khách muốn nhận thẻ tại CN VCB: Khách hàng liên hệ chi nhánh đã phát hành thẻ ( đối với thẻ tín dụng) hoặc bất kỳ PGD/CN nào của VCB đối với  thẻ ghi nợ để được hỗ trợ.\n" +
        "• Quá thời hạn trên hoặc nếu NHTT không đáp ứng được yêu cầu của Khách hàng:  Quý khách liên hệ VCB để làm thủ tục phát hành lại thẻ. Đối với thẻ tín dụng liên hệ chi nhánh đã phát hành trước đây; đối với thẻ ghi nợ liên hệ tại bất kỳ điểm giao dịch nào của VCB để được phục vụ."
  },
  {
    scenario: 5,
    question:"Rút tiền mà không ra tiền",
    answer:"Trong trường hợp bạn là chủ thẻ VCB gặp sự cố rút tiền không thành công tài khoản bị trừ tiền tại máy ATM, bạn vui lòng liên hệ qua tổng đài 1900545413 hoặc CN/PGD VCB gần nhất để thực hiện tra soát nhé.\n" +
        "\n" +
        "hotline: Hãy liên hệ với Vietcombank để chúng tôi có thể tư vấn trực tiếp về sản phẩm và dịch vụ mà quý khách quan tâm nhé. Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ ạ!\n" +
        "Điện thoại: 1900545413"
  },
  {
    scenario: 5,
    question:"Địa chỉ chi nhánh gần nhất",
    answer:""
  },
  {
    scenario: 5,
    question:"Hotline của VCB",
    answer:""
  },
  {
    scenario: 5,
    question:"Thủ tục khiếu nại",
    answer:"Dạ, Vietcombank xin cảm ơn những đóng góp của quý khách. Quý khách vui lòng gọi điện thoại đến số Hotline hoặc đem theo giấy tờ tuỳ thân trực tiếp đến các điểm giao dịch của Vietcombank để đề nghị tra soát, khiếu nại. Yêu cầu của quý khách sẽ được thực hiện trong vòng 30 ngày kể từ ngày tiếp nhận yêu cầu ạ."
  },
  {
    scenario: 5,
    question:"Hướng dẫn khiếu nại",
    answer:""
  },
]
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
  GENERIC_INTENT,
}