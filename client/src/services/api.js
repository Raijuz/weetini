export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
export const API_BASE = `${API_URL}/api`



// Fallback mock data matching Weetini Menu & FastAPI backend
export const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'Tất cả', slug: 'all' },
  { id: 'best-seller', name: 'Best Seller', slug: 'best-seller' },
  { id: 'matcha-signature', name: 'Matcha Signature', slug: 'matcha-signature' },
  { id: 'tra-trai-cay', name: 'Trà Trái Cây', slug: 'tra-trai-cay' },
  { id: 'nuoc-ep-trai-cay', name: 'Nước Ép & Trái Cây Tươi', slug: 'nuoc-ep-trai-cay' },
]

export const DEFAULT_PRODUCTS = [
  {
    id: 1,
    code: '01',
    name: 'Wee Sunshine | Kirakira',
    slug: 'wee-sunshine-kirakira',
    category: 'nuoc-ep-trai-cay',
    description: 'Tựa ánh nắng đầu ngày, cam và cà rốt mang đến sắc ngọt dịu dàng, được đánh thức bởi chút chanh thanh mảnh. Một bản hòa sắc tươi sáng, đánh thức vị giác bằng sự rạng rỡ tự nhiên.',
    price: 38000,
    image: '/images/products/sunshine.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'L',
    calories: '135 kcal',
    ingredients: 'Cam + Cà rốt + Chanh'
  },
  {
    id: 2,
    code: '02',
    name: 'Wee Glow | Waku Waku',
    slug: 'wee-glow-waku-waku',
    category: 'nuoc-ep-trai-cay',
    description: 'Ba sắc thái nhiệt đới gặp nhau trong một bản giao hưởng đầy sức sống. Dứa ngọt thơm, cam mọng nước và chanh thanh nhẹ đan xen, để lại dư vị tươi mới như một ngày hè bất tận.',
    price: 38000,
    image: '/images/products/glow.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'L',
    calories: '142 kcal',
    ingredients: 'Dứa + Cam + Chanh'
  },
  {
    id: 3,
    code: '03',
    name: 'Wee Freshie | Sasuga',
    slug: 'wee-freshie-sasuga',
    category: 'nuoc-ep-trai-cay',
    description: 'Vị ngọt trong veo của dưa hấu khẽ chạm vào nét chua thanh của chanh, khép lại bằng làn hương bạc hà mát lành. Như một cơn gió dịu dàng ghé qua giữa ngày hè oi ả.',
    price: 38000,
    image: '/images/products/freshie.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'L',
    calories: '120 kcal',
    ingredients: 'Dưa hấu + Chanh + Bạc hà'
  },
  {
    id: 4,
    code: '04',
    name: 'Wee Slay | Migoto',
    slug: 'wee-slay-migoto',
    category: 'nuoc-ep-trai-cay',
    description: 'Táo mang nét ngọt thanh, dứa điểm chút hương nhiệt đới và chanh khẽ cân bằng mọi tầng vị. Một cuộc gặp gỡ đầy ngẫu hứng, nơi sự tươi mới trở thành dấu ấn khó quên.',
    price: 38000,
    image: '/images/products/slay.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '138 kcal',
    ingredients: 'Táo + Dứa + Chanh'
  },
  {
    id: 5,
    code: '06',
    name: 'Wee Fit | Niko Niko',
    slug: 'wee-fit-niko-niko',
    category: 'nuoc-ep-trai-cay',
    description: 'Sự hòa quyện giữa vị ngọt mọng của cam và nét thanh tao, phảng phất chút đắng nhẹ của bưởi. Một tổng thể cân bằng và tinh giản, dành cho những tâm hồn yêu sự thuần khiết.',
    price: 38000,
    image: '/images/products/fit.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '115 kcal',
    ingredients: 'Cam + Bưởi'
  },
  {
    id: 6,
    code: '07',
    name: 'Wee Fun | Kirei',
    slug: 'wee-fun-kirei',
    category: 'nuoc-ep-trai-cay',
    description: 'Sắc đỏ của dưa hấu và dâu tây mở ra một miền hương vị ngọt ngào, xen chút chua dịu đầy duyên dáng. Tựa một niềm vui nhỏ được gói ghém trong sắc màu của mùa hè.',
    price: 39000,
    image: '/images/products/fun.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '128 kcal',
    ingredients: 'Dưa hấu + Dâu tây'
  },
  {
    id: 7,
    code: '08',
    name: 'Wee Bootiful | Bijin',
    slug: 'wee-bootiful-bijin',
    category: 'nuoc-ep-trai-cay',
    description: 'Nho chín mang vị ngọt đậm đà, quyện cùng hương thơm mềm mại của dưa lưới. Êm dịu, tròn vị và thanh tao – một nét quyến rũ không cần phô trương.',
    price: 42000,
    image: '/images/products/bootiful.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '145 kcal',
    ingredients: 'Nho + Dưa lưới'
  },
  {
    id: 8,
    code: '09',
    name: 'Wee Peachy | Kanpeki',
    slug: 'wee-peachy-kanpeki',
    category: 'tra-trai-cay',
    description: 'Chanh dây khơi mở tầng vị chua thanh sống động, trong khi hibiscus tô điểm sắc đỏ quyến rũ cùng hương hoa dịu nhẹ. Một nét chấm phá đầy thi vị, lưu lại dư âm thanh mát sau mỗi lần thưởng thức.',
    price: 39000,
    image: '/images/products/peachy.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '130 kcal',
    ingredients: 'Chanh dây + Hibiscus'
  },
  {
    id: 9,
    code: '10',
    name: 'Wee Golden | Saikō',
    slug: 'wee-golden-saiko',
    category: 'nuoc-ep-trai-cay',
    description: 'Vị ngọt tươi của cam gặp gỡ nét chua mặn đặc trưng của xí muội, tạo nên sự giao thoa thú vị giữa những sắc thái đối lập. Đậm đà mà thanh thoát, quen thuộc nhưng luôn có điều bất ngờ.',
    price: 39000,
    image: '/images/products/golden.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '132 kcal',
    ingredients: 'Cam + Xí muội'
  },
  {
    id: 10,
    code: '11',
    name: 'Wee Flex | Jōzu',
    slug: 'wee-flex-jozu',
    category: 'tra-trai-cay',
    description: 'Hương trà thanh dịu kết hợp cùng đào chín mọng, mang đến vị ngọt nhẹ nhàng và hương thơm mềm mại. Một lựa chọn cổ điển nhưng luôn tươi mới trong từng ngụm.',
    price: 35000,
    image: '/images/products/flex.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'L',
    calories: '140 kcal',
    ingredients: 'Trà đào'
  },
  {
    id: 11,
    code: '12',
    name: 'Wee Sassy | Erai',
    slug: 'wee-sassy-erai',
    category: 'tra-trai-cay',
    description: 'Vải tươi ngọt thanh hòa quyện cùng hương hoa hồng dịu nhẹ trên nền trà thơm. Từng tầng hương bung tỏa mềm mại, mang đến cảm giác thanh tao và quyến rũ.',
    price: 38000,
    image: '/images/products/sassy.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'L',
    calories: '148 kcal',
    ingredients: 'Trà vải hoa hồng'
  },
  {
    id: 12,
    code: '13',
    name: 'Wee Chic | Kawaii',
    slug: 'wee-chic-kawaii',
    category: 'tra-trai-cay',
    description: 'Hương trà thanh mát kết hợp cùng ổi tươi thơm dịu, mang đến vị ngọt tự nhiên và chút chua nhẹ tinh tế. Đơn giản, thanh khiết nhưng đủ để tạo nên dấu ấn riêng.',
    price: 35000,
    image: '/images/products/chic.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '130 kcal',
    ingredients: 'Trà ổi'
  },
  {
    id: 13,
    code: '14',
    name: 'Wee Extra | Kakkoii',
    slug: 'wee-extra-kakkoii',
    category: 'tra-trai-cay',
    description: 'Dưa lưới chín thơm với vị ngọt dịu, mọng nước kết hợp cùng nền trà thanh nhẹ. Hương vị êm ái, tươi mát và lưu lại hậu ngọt tự nhiên.',
    price: 38000,
    image: '/images/products/extra.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '135 kcal',
    ingredients: 'Trà dưa lưới'
  },
  {
    id: 14,
    code: '15',
    name: 'Wee Zen | Happyō',
    slug: 'wee-zen-happyo',
    category: 'tra-trai-cay',
    description: 'Dâu tây tươi mang vị chua ngọt đặc trưng hòa cùng hương trà dịu nhẹ. Sắc đỏ hồng bắt mắt cùng hương thơm trái cây tạo nên trải nghiệm tươi trẻ và dễ chịu.',
    price: 38000,
    image: '/images/products/zen.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '142 kcal',
    ingredients: 'Trà dâu tây'
  },
  {
    id: 15,
    code: '16',
    name: 'Wee Pure | Yabai',
    slug: 'wee-pure-yabai',
    category: 'tra-trai-cay',
    description: 'Quýt tươi mọng nước mang vị chua ngọt thanh thoát, hòa cùng hương trà thơm dịu. Một thức uống nhẹ nhàng, trong trẻo với cảm giác tươi mát kéo dài.',
    price: 38000,
    image: '/images/products/pure.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '125 kcal',
    ingredients: 'Trà quýt'
  },
  {
    id: 16,
    code: '17',
    name: 'Wee Blush | Pika Pika',
    slug: 'wee-blush-pika-pika',
    category: 'tra-trai-cay',
    description: 'Sự kết hợp đầy sắc màu từ những loại trái cây nhiệt đới tươi ngon trên nền trà thanh mát. Chua ngọt đan xen, mỗi ngụm là một chuyến du hành qua những tầng hương vị.',
    price: 39000,
    image: '/images/products/blush.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'L',
    calories: '155 kcal',
    ingredients: 'Trà nhiệt đới 4 mùa'
  },
  {
    id: 17,
    code: '18',
    name: 'Wee Lazy | Fuwa Fuwa',
    slug: 'wee-lazy-fuwa-fuwa',
    category: 'tra-trai-cay',
    description: 'Lựu tươi mang vị chua ngọt thanh tao, điểm xuyết trên nền trà thơm nhẹ. Sắc đỏ ruby nổi bật cùng hậu vị tươi mát, thích hợp cho những phút giây thư thả.',
    price: 38000,
    image: '/images/products/lazy.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '138 kcal',
    ingredients: 'Trà lựu'
  },
  {
    id: 18,
    code: '19',
    name: 'Wee Chill | Oishii',
    slug: 'wee-chill-oishii',
    category: 'tra-trai-cay',
    description: 'Mãng cầu béo thơm, ngọt dịu kết hợp cùng chanh dây chua thanh đầy sức sống. Hai sắc thái hương vị hòa quyện tạo nên thức trà nhiệt đới vừa mềm mại vừa sảng khoái.',
    price: 39000,
    image: '/images/products/chill.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '160 kcal',
    ingredients: 'Trà mãng cầu + Chanh dây'
  },
  {
    id: 19,
    code: '20',
    name: 'Wee Zesty | Pichi Pichi',
    slug: 'wee-zesty-pichi-pichi',
    category: 'tra-trai-cay',
    description: 'Xoài chín vàng ngọt thơm hòa cùng chanh dây chua dịu, tạo nên sự tương phản đầy thú vị trên nền trà thanh mát. Đậm chất nhiệt đới, tươi tắn và bùng nổ hương vị.',
    price: 39000,
    image: '/images/products/zesty.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '155 kcal',
    ingredients: 'Trà xoài + Chanh dây'
  },
  {
    id: 20,
    code: '21',
    name: 'Wee Tini | Subarashii',
    slug: 'wee-tini-subarashii',
    category: 'matcha-signature',
    description: 'Matcha nguyên chất với hương trà xanh thanh nhẹ, thoảng chút đắng dịu hòa quyện cùng sữa dâu béo mịn và ngọt thơm. Sự giao thoa giữa sắc xanh và hồng tạo nên một thức uống vừa tinh tế vừa đáng yêu.',
    price: 45000,
    image: '/images/products/tini.jpg',
    is_new: true,
    is_best_seller: true,
    size: 'L',
    calories: '210 kcal',
    ingredients: 'Matcha + Sữa dâu'
  },
]

export const DEFAULT_STORES = [
  {
    id: 1,
    name: 'Weetini - Nguyễn Trãi',
    address: '123 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP.HCM',
    phone: '0888 900 111',
    hours: '08:00 - 22:30',
    lat: 10.7717,
    lng: 106.6920,
    district: 'Quận 1',
    features: ['Máy lạnh', 'Chỗ để xe', 'Giao hàng tận nơi', 'Thanh toán thẻ / Ví']
  },
  {
    id: 2,
    name: 'Weetini - Lê Văn Sỹ',
    address: '456 Lê Văn Sỹ, Phường 14, Quận 3, TP.HCM',
    phone: '0888 900 222',
    hours: '08:00 - 22:30',
    lat: 10.7890,
    lng: 106.6734,
    district: 'Quận 3',
    features: ['Take-away nhanh', 'Chỗ để xe máy', 'Máy lạnh', 'Free Wi-Fi']
  },
  {
    id: 3,
    name: 'Weetini - Phan Xích Long',
    address: '78 Phan Xích Long, Phường 3, Quận Phú Nhuận, TP.HCM',
    phone: '0888 900 333',
    hours: '08:00 - 23:00',
    lat: 10.7984,
    lng: 106.6800,
    district: 'Phú Nhuận',
    features: ['Không gian rộng', 'Chỗ ngồi lại', 'Điều hòa 2 tầng', 'View phố đi bộ']
  },
  {
    id: 4,
    name: 'Weetini - Nguyễn Oanh',
    address: '200 Nguyễn Oanh, Phường 17, Quận Gò Vấp, TP.HCM',
    phone: '0888 900 444',
    hours: '08:00 - 22:30',
    lat: 10.8380,
    lng: 106.6684,
    district: 'Gò Vấp',
    features: ['Take-away cực nhanh', 'Chỗ để xe', 'Giao hàng Grab/ShopeeFood']
  },
  {
    id: 5,
    name: 'Weetini - Phạm Văn Đồng',
    address: '55 Phạm Văn Đồng, Phường Hiệp Bình Chánh, TP. Thủ Đức',
    phone: '0888 900 555',
    hours: '08:00 - 22:30',
    lat: 10.8470,
    lng: 106.7220,
    district: 'Thủ Đức',
    features: ['Mặt tiền đường lớn', 'Chỗ đậu xe rộng', 'Giao hàng siêu tốc']
  },
  {
    id: 6,
    name: 'Weetini - Đại Lộ Bình Dương',
    address: '15 Đại Lộ Bình Dương, TX. Thuận An, Bình Dương',
    phone: '0888 900 666',
    hours: '08:00 - 22:00',
    lat: 10.9800,
    lng: 106.6530,
    district: 'Bình Dương',
    features: ['Cửa hàng flagship', 'Chỗ ngồi thoải mái', 'Bãi đỗ ô tô', 'Máy lạnh']
  },
  {
    id: 7,
    name: 'Weetini - Biên Hòa Đồng Khởi',
    address: '88 Đường Đồng Khởi, Phường Tam Hiệp, TP. Biên Hòa, Đồng Nai',
    phone: '0888 900 777',
    hours: '08:00 - 22:00',
    lat: 10.9575,
    lng: 106.8427,
    district: 'Biên Hòa',
    features: ['Take-away & Ngồi lại', 'Phục vụ thân thiện', 'Khuyến mãi mỗi tuần']
  },
]

export const DEFAULT_ABOUT = {
  overview: {
    title: 'TỔNG QUAN',
    description: 'Weetini (lấy cảm hứng từ sự mộc mạc và chuẩn mực của Sunday Basic), thành lập vào năm 2018, đã không ngừng phát triển trong suốt hơn 6 năm qua với hơn 40 cửa hàng trải rộng khắp TP. Hồ Chí Minh, Biên Hòa và Bình Dương. Với chất lượng đặc trưng và dịch vụ tận tâm, thương hiệu đã nhanh chóng chiếm được tình cảm và sự yêu mến của đông đảo khách hàng.',
    stats: [
      { number: 20000, suffix: '+', label: 'Ly trà sữa', sublabel: 'bán ra mỗi ngày' },
      { number: 40, suffix: '+', label: 'Loại trà sữa, topping', sublabel: 'khác nhau' },
      { number: 40, suffix: '+', label: 'Cửa hàng', sublabel: 'trên toàn quốc' },
    ]
  },
  vision_mission: {
    title: 'TẦM NHÌN - SỨ MỆNH',
    description: 'Trở thành chuỗi thương hiệu trà sữa TOP tại Việt Nam. Kết hợp lối sống đơn giản tạo nên chất riêng của Weetini.',
    items: [
      { icon: 'handshake', title: 'Đối Tác', desc: 'Đề cao tinh thần hợp tác và tương trợ cùng nhau phát triển vững bền' },
      { icon: 'heart', title: 'Khách Hàng', desc: 'Luôn lấy khách hàng làm trung tâm, nỗ lực phấn đấu đổi mới hương vị' },
      { icon: 'leaf', title: 'Chất Lượng', desc: 'Cam kết chất lượng sản phẩm nguyên liệu tươi sạch luôn đạt chuẩn cao nhất' },
    ]
  },
  core_values: {
    title: 'GIÁ TRỊ CỐT LÕI',
    items: [
      { title: 'Chất lượng tự nhiên', desc: 'Lựa chọn búp trà tươi cao nguyên, nói không với phụ gia độc hại.' },
      { title: 'Sáng tạo không ngừng', desc: 'Liên tục cập nhật xu hướng thức uống hiện đại phù hợp giới trẻ.' },
      { title: 'Phục vụ tận tâm', desc: 'Nụ cười và sự hài lòng của thực khách là thước đo thành công.' },
      { title: 'Đồng hành phát triển', desc: 'Hỗ trợ trọn vẹn cho các đối tác nhượng quyền cùng bứt phá.' },
    ]
  }
}

export const DEFAULT_FRANCHISE = {
  title: 'NHƯỢNG QUYỀN THƯƠNG HIỆU WEETINI',
  description: 'Weetini mở rộng cơ hội hợp tác nhượng quyền thương hiệu trên toàn quốc. Với mô hình kinh doanh tinh gọn, chi phí đầu tư hợp lý, hoàn vốn nhanh trong 12 - 18 tháng, chúng tôi cam kết đồng hành cùng đối tác trên con đường khởi nghiệp thành công.',
  benefits: [
    {
      title: 'Mô hình hiệu quả cao',
      desc: 'Tối ưu diện tích từ 15m² - 45m², hoàn vốn nhanh trong 12-18 tháng nhờ lượng khách ổn định.'
    },
    {
      title: 'Đào tạo toàn diện & chuyển giao',
      desc: 'Đào tạo pha chế chuẩn hóa, quy trình vận hành POS, quản lý tồn kho và chăm sóc khách hàng.'
    },
    {
      title: 'Chuỗi cung ứng khép kín',
      desc: 'Hệ thống nguyên liệu chính hãng giá sỉ độc quyền, đảm bảo đồng nhất chất lượng trên toàn hệ thống.'
    },
    {
      title: 'Chiến dịch Marketing tập trung',
      desc: 'Hỗ trợ truyền thông khai trương, tiếp thị số đa kênh Facebook, TikTok, KOLs và app giao hàng.'
    }
  ],
  steps: [
    { step: '01', title: 'Đăng ký tư vấn', desc: 'Để lại thông tin liên hệ và trao đổi trực tiếp cùng đội ngũ phát triển mặt bằng' },
    { step: '02', title: 'Khảo sát mặt bằng', desc: 'Đội ngũ chuyên gia thẩm định lưu lượng khách và tính khả thi của địa điểm' },
    { step: '03', title: 'Ký kết hợp đồng', desc: 'Thống nhất điều khoản hợp tác pháp lý minh bạch và kế hoạch triển khai' },
    { step: '04', title: 'Thiết kế & Thi công', desc: 'Set up không gian theo bộ nhận diện thương hiệu chuẩn Weetini' },
    { step: '05', title: 'Đào tạo nhân sự', desc: 'Đào tạo công thức pha chế, quy chuẩn dịch vụ và vận hành phần mềm' },
    { step: '06', title: 'Khai trương bùng nổ', desc: 'Tung chương trình khuyến mãi ra mắt và hỗ trợ vận hành trực tiếp ngày đầu' },
  ],
  investment: {
    total: 'Chỉ từ 150.000.000 VNĐ',
    includes: [
      'Phí nhượng quyền sử dụng thương hiệu',
      'Thiết kế 2D/3D và biển hiệu nhận diện',
      'Máy móc thiết bị pha chế chuyên nghiệp',
      'Nguyên vật liệu ban đầu đủ vận hành 1 tháng',
      'Chương trình đào tạo và bàn giao tài liệu SOP',
      'Gói hỗ trợ marketing ngày khai trương',
    ]
  }
}

export const DEFAULT_RECRUITMENT = [
  {
    id: 1,
    title: 'Nhân Viên Pha Chế (Barista)',
    location: 'Tất cả chi nhánh TP.HCM & Bình Dương',
    type: 'Toàn thời gian / Bán thời gian linh hoạt',
    salary: '25.000 - 32.000 đ/giờ (~6.000.000 - 8.500.000 đ/tháng)',
    description: 'Trực tiếp pha chế các loại trà sữa, trà trái cây theo công thức chuẩn; duy trì vệ sinh quầy bar và phục vụ khách hàng chu đáo.',
    requirements: [
      'Độ tuổi: 18 - 26 tuổi',
      'Nhanh nhẹn, trung thực, có thái độ vui vẻ nhiệt tình',
      'Không yêu cầu kinh nghiệm, được đào tạo bài bản từ đầu',
      'Làm việc tối thiểu 4-5 ca/tuần',
    ],
    benefits: [
      'Phụ cấp tiền ăn và thưởng doanh số theo tháng',
      'Ưu đãi 50% đồ uống Weetini cho nhân viên',
      'Cơ hội thăng tiến lên Trưởng ca sau 3-6 tháng',
    ]
  },
  {
    id: 2,
    title: 'Cửa Hàng Trưởng (Store Manager)',
    location: 'Chi nhánh Quận 1, Quận 3, Phú Nhuận',
    type: 'Toàn thời gian',
    salary: '10.000.000 - 15.000.000 đ/tháng + Thưởng KPI doanh số',
    description: 'Chịu trách nhiệm quản lý vận hành toàn diện cửa hàng, phân ca nhân sự, kiểm soát nguyên vật liệu và đạt chỉ tiêu doanh thu.',
    requirements: [
      'Nam/Nữ từ 22 - 32 tuổi',
      'Có kinh nghiệm tối thiểu 1 năm ở vị trí tương đương ngành F&B',
      'Kỹ năng quản lý đội nhóm, giao tiếp và xử lý tình huống tốt',
      'Tinh thần trách nhiệm cao, chịu được áp lực',
    ],
    benefits: [
      'Đóng BHXH, BHYT đầy đủ theo quy định pháp luật',
      'Thưởng lễ, Tết, lương tháng 13',
      'Lộ trình đào tạo Quản lý khu vực (Area Manager)',
    ]
  },
  {
    id: 3,
    title: 'Nhân Viên Thu Ngân / Phục Vụ',
    location: 'Các chi nhánh TP.HCM',
    type: 'Bán thời gian / Sinh viên',
    salary: '24.000 - 28.000 đ/giờ',
    description: 'Order món cho khách, thanh toán tiền mặt/chuyển khoản, dọn dẹp vệ sinh khu vực sảnh bàn ghế sạch sẽ.',
    requirements: [
      'Từ 18 tuổi trở lên, ngoại hình ưa nhìn là lợi thế',
      'Giao tiếp lịch sự, niềm nở với khách hàng',
      'Chăm chỉ, sẵn sàng hỗ trợ đồng đội',
    ],
    benefits: [
      'Lịch làm việc linh hoạt sắp xếp theo lịch học',
      'Môi trường làm việc trẻ trung, thân thiện',
    ]
  }
]

// API helpers with fallback
export async function fetchProducts(category = '') {
  try {
    const url = category && category !== 'all'
      ? `${API_BASE}/products?category=${encodeURIComponent(category)}`
      : `${API_BASE}/products`
    const res = await fetch(url)
    if (res.ok) {
      return await res.json()
    }
  } catch {
    // fallback
  }
  if (!category || category === 'all') return DEFAULT_PRODUCTS
  return DEFAULT_PRODUCTS.filter(p => p.category === category)
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`)
    if (res.ok) return await res.json()
  } catch {
    // fallback
  }
  return DEFAULT_CATEGORIES
}

export async function fetchStores(district = '') {
  try {
    const url = district ? `${API_BASE}/stores?district=${encodeURIComponent(district)}` : `${API_BASE}/stores`
    const res = await fetch(url)
    if (res.ok) return await res.json()
  } catch {
    // fallback
  }
  if (!district) return DEFAULT_STORES
  return DEFAULT_STORES.filter(s => s.district === district)
}

export async function submitContactForm(data) {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) return await res.json()
  } catch {
    // fallback
  }
  return { success: true, message: 'Cảm ơn bạn đã gửi liên hệ! Đội ngũ Weetini sẽ phản hồi trong vòng 24h.' }
}

export async function submitFranchiseForm(data) {
  try {
    const res = await fetch(`${API_BASE}/franchise/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) return await res.json()
  } catch {
    // fallback
  }
  return { success: true, message: 'Đăng ký thành công! Chuyên viên nhượng quyền Weetini sẽ liên hệ tư vấn trong 24 giờ.' }
}

export async function submitOrder(orderData) {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
    if (res.ok) return await res.json()
  } catch (error) {
    console.warn('Backend /api/orders request failed, using local fallback:', error)
  }
  // Fallback for offline or static hosting
  const randomId = `WTN${Math.floor(100000 + Math.random() * 900000)}`
  return {
    success: true,
    order_id: randomId,
    message: 'Đặt hàng thành công! Đội ngũ Weetini sẽ liên hệ xác nhận trong ít phút.',
    order: {
      order_id: randomId,
      ...orderData,
      status: 'pending',
      created_at: new Date().toISOString(),
    },
  }
}

// Hàm gọi endpoint tùy chỉnh theo Cách 1
export async function getYourData(endpoint = 'your-endpoint') {
  try {
    const response = await fetch(`${API_URL}/api/${endpoint}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Lỗi khi gọi API endpoint /api/${endpoint}:`, error)
    return null
  }
}


