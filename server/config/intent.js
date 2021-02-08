// const INTENT = [

// ]

const COLOR = ['Trắng', 'Vàng', 'Trong suốt']

const DEVICE = [
  {
    name: 'Quạt',
    room: ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Phòng làm việc', 'Phòng tắm'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: [
          {
            name: 'Mức',
            min: 1,
            max: 4,
          },
        ],
      }, 
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      }, 
      {
        name: 'Tăng',
        requireScale: 1,
        scale: [
          {
            name: 'Mức',
            min: 1,
            max: 3,
          },
        ],
      }, 
      {
        name: 'Giảm',
        requireScale: 1,
        scale: [
          {
            name: 'Mức',
            min: 1,
            max: 3,
          },
        ],
      },
      {
        name: 'Đặt',
        requireScale: 1,
        scale: [
          {
            name: 'Mức',
            min: 1,
            max: 4,
          },
        ],
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  },
  {
    name: 'Quạt thông gió',
    room: ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Phòng làm việc', 'Phòng tắm'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  },
  {
    name: 'Tivi',
    room: ['Phòng khách', 'Phòng ăn', 'Phòng ngủ', 'Phòng làm việc'],
    action: [
      {
        name: 'Bật',
        requireScale: 1,
        scale: [
          {
            name: 'Kênh',
            min: 1,
            max: 140,
          },
          {
            name: 'Âm lượng',
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Đặt',
        requireScale: 1,
        scale: [
          {
            name: 'Kênh',
            min: 1,
            max: 140,
          },
          {
            name: 'Âm lượng',
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: 'Tăng', // có tăng giảm kênh không?
        requireScale: 1,
        scale: [
          {
            name: 'Âm lượng',
            min: 1,
            max: 99,
          },
        ],
      },
      {
        name: 'Giảm',
        requireScale: 1,
        scale: [
          {
            name: 'Âm lượng',
            min: 1,
            max: 99,
          },
        ],
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      }
    ],
  },
  {
    name: 'Loa',
    room: ['Phòng khách', 'Phòng ăn', 'Phòng ngủ', 'Phòng làm việc'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: [
          {
            name: 'Âm lượng',
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Tăng',
        requireScale: 1,
        scale: [
          {
            name: 'Âm lượng',
            min: 1,
            max: 99,
          },
        ],
      },
      {
        name: 'Giảm',
        requireScale: 1,
        scale: [
          {
            name: 'Âm lượng',
            min: 1,
            max: 99,
          },
        ],
      },
      {
        name: 'Đặt',
        requireScale: 1,
        scale: [
          {
            name: 'Âm lượng',
            min: 1,
            max: 100,
          },
        ],
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      }
    ],
  },
  {
    name: 'Đèn bàn',
    room: ['Phòng khách', 'Phòng ngủ', 'Phòng làm việc'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: [
          {
            name: 'Độ sáng',
            min: 1,
            max: 100,
          },
        ],
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Tăng',
        requireScale: 1,
        scale: [
          {
            name: 'Độ sáng',
            min: 1,
            max: 99,
          },
        ],
      },
      {
        name: 'Giảm',
        requireScale: 1,
        scale: [
          {
            name: 'Độ sáng',
            min: 1,
            max: 99,
          },
        ],
      },
      {
        name: 'Đặt',
        requireScale: 1,
        scale: [
          {
            name: 'Độ sáng',
            min: 1,
            max: 100,
          },
        ],
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  },
  {
    name: 'Đèn trần',
    room: ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Phòng làm việc', 'Phòng tắm'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: [
          {
            name: 'Màu',
            min: 0,
            max: COLOR.length,
          }
        ],
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Đặt',
        requireScale: 1,
        scale: [
          {
            name: 'Màu',
            min: 0,
            max: COLOR.length,
          }
        ],
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  },
  {
    name: 'Đèn cầu thang',
    room: ['Cầu thang'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  },
  {
    name: 'Bình nóng lạnh',
    room: ['Phòng khách', 'Phòng bếp', 'Phòng vệ sinh', 'Phòng tắm'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  },
  {
    name: 'Điều hòa',
    room: ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng làm việc'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: [
          {
            name: "Nhiệt độ",
            min: 18,
            max: 36,
          },
        ],
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Tăng',
        requireScale: 1,
        scale: [
          {
            name: "Nhiệt độ",
            min: 1,
            max: 18,
          },
        ],
      },
      {
        name: 'Giảm',
        requireScale: 1,
        scale: [
          {
            name: "Nhiệt độ",
            min: 1,
            max: 18,
          },
        ],
      },
      {
        name: 'Đặt',
        requireScale: 1,
        scale: [
          {
            name: "Nhiệt độ",
            min: 18,
            max: 36,
          },
        ],
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  },
  {
    name: 'Lò sưởi', // cần nhiệt độ thì copy từ điều hòa xuống, cần không nhỉ?
    room: ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng làm việc'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  },
  {
    name: 'Cổng',
    room: ['Vườn', 'Garage'],
    action: [
      {
        name: 'Mở',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Đóng',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  },
  {
    name: 'Lò nướng',
    room: ['Phòng bếp'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: [
          {
            name: "Nhiệt độ",
            min: 100,
            max: 500,
          },
        ],
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Tăng',
        requireScale: 1,
        scale: [
          {
            name: "Nhiệt độ",
            min: 100,
            max: 500,
          },
          {
            name: "Thời gian hẹn giờ",
            min: 1,
            max: 5,
          },
        ],
      },
      {
        name: 'Giảm',
        requireScale: 1,
        scale: [
          {
            name: "Nhiệt độ",
            min: 100,
            max: 500,
          },
          {
            name: "Thời gian hẹn giờ",
            min: 1,
            max: 5,
          },
        ],
      },
      {
        name: 'Đặt',
        requireScale: 1,
        scale: [
          {
            name: "Nhiệt độ",
            min: 100,
            max: 500,
          },
          {
            name: "Thời gian hẹn giờ",
            min: 1,
            max: 6,
          },
        ],
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  },
  {
    name: 'Bếp',
    room: ['Phòng bếp'],
    action: [
      {
        name: 'Bật',
        requireScale: 0,
        scale: [
          {
            name: "Nhiệt độ",
            min: 100,
            max: 500,
          },
        ],
      },
      {
        name: 'Tắt',
        requireScale: 0,
        scale: null,
      },
      {
        name: 'Tăng',
        requireScale: 1,
        scale: [
          {
            name: "Nhiệt độ",
            min: 100,
            max: 500,
          },
          {
            name: "Thời gian hẹn giờ",
            min: 1,
            max: 5,
          },
        ],
      },
      {
        name: 'Giảm',
        requireScale: 1,
        scale: [
          {
            name: "Nhiệt độ",
            min: 100,
            max: 500,
          },
          {
            name: "Thời gian hẹn giờ",
            min: 1,
            max: 5,
          },
        ],
      },
      {
        name: 'Đặt',
        requireScale: 1,
        scale: [
          {
            name: "Nhiệt độ",
            min: 100,
            max: 500,
          },
          {
            name: "Thời gian hẹn giờ",
            min: 1,
            max: 6,
          },
        ],
      },
      {
        name: 'Kiểm tra',
        requireScale: 0,
        scale: null,
      },
    ],
  }
]

// Kiểm tra = check status
const ACTION = ['Bật', 'Tắt', 'Đặt', "Tăng", "Giảm", "Kiểm tra"]
const ACTION_NO_SCALE = ['Tắt', "Kiểm tra"]
// const DEVICE = ['Quạt', 'Quạt thông gió', 'Ti vi', 'Loa', 'Đèn bàn', 'Đèn trần', 'Bình nóng lạnh', 'Điều hòa', 'Lò sưởi', 'Cổng', 'Lò nướng', 'Bếp']
// const DEVICE_LEVEL = ['Quạt', 'Ti vi', 'Loa', 'Đèn bàn', 'Điều hòa', 'Lò sưởi', 'Cổng', 'Lò nướng', 'Bếp']
// const DEVICE_PERCENTAGE
// const DEVICE_NO_SCALE = ['Quạt thông gió', 'Bình nóng lạnh', 'Cổng', 'Lò sưởi']
const SCALE = ['Màu', 'Âm lượng', 'Mức', 'Kênh', 'Nhiệt độ', 'Thời gian']
const ROOM = ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Vườn', 'Phòng làm việc', 'Sân thượng', 'Ban công', 'Phòng tắm']
// FLOOR - 1 - 5
// LEVEL - 1 - 10 - "all"

module.exports = {
  // ACTION, ACTION_NO_SCALE, DEVICE, DEVICE_NO_SCALE, SCALE, ROOM
  DEVICE, 
  COLOR,
}