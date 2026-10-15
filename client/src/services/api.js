const API_BASE = 'http://localhost:8000/api'

// Fallback mock data matching Sunday Basic & FastAPI backend
export const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'Tất cả', slug: 'all' },
  { id: 'best-seller', name: 'Best Seller', slug: 'best-seller' },
  { id: 'tra-sua', name: 'Trà Sữa', slug: 'tra-sua' },
  { id: 'tra-thanh-nhiet', name: 'Trà Thanh Nhiệt', slug: 'tra-thanh-nhiet' },
  { id: 'tra-nguyen-vi', name: 'Trà Nguyên Vị', slug: 'tra-nguyen-vi' },
  { id: 'sua-tuoi', name: 'Sữa Tươi', slug: 'sua-tuoi' },
  { id: 'bo-collection', name: 'Bơ Collection', slug: 'bo-collection' },
]

export const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Trà Sữa Trân Châu Đường Đen',
    slug: 'tra-sua-tran-chau-duong-den',
    category: 'best-seller',
    description: 'Trà sữa truyền thống hòa quyện cùng trân châu đường đen dẻo thơm, tạo nên hương vị ngọt ngào khó quên.',
    price: 35000,
    image: '/images/products/default-milk-tea.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'L',
    calories: '320 kcal',
    ingredients: 'Trà đen hảo hạng, sữa tươi thanh trùng, trân châu đường đen dẻo dai tự nấu'
  },
  {
    id: 2,
    name: 'Ô Long Sữa Nhãn Hoa',
    slug: 'o-long-sua-nhan-hoa',
    category: 'tra-sua',
    description: 'Hương nhài thanh khiết, hòa quyện cùng sữa ít béo mềm mượt, điểm xuyến mứt nhãn ngọt dịu và thạch giòn dai.',
    price: 39000,
    image: '/images/products/default-milk-tea.jpg',
    is_new: true,
    is_best_seller: true,
    size: 'L',
    calories: '280 kcal',
    ingredients: 'Trà Ô Long Bảo Lộc, hoa quế thanh khiết, mứt nhãn tươi ngọt mát, sữa thơm ngậy'
  },
  {
    id: 3,
    name: 'Trà Sữa Chocolate',
    slug: 'tra-sua-chocolate',
    category: 'tra-sua',
    description: 'Hòa quyện giữa vị trà thơm nhẹ và hương chocolate ngọt ngào, mang đến trải nghiệm béo ngậy và sảng khoái.',
    price: 35000,
    image: '/images/products/default-milk-tea.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'L',
    calories: '340 kcal',
    ingredients: 'Bột cacao nguyên chất, trà sữa truyền thống, sốt socola đậm vị'
  },
  {
    id: 4,
    name: 'Hồng Trà Tắc',
    slug: 'hong-tra-tac',
    category: 'tra-thanh-nhiet',
    description: 'Được ủ từ trà đen Assam Ấn Độ đậm vị, kết hợp cùng tắc tươi chua nhẹ và trà bí đao thanh mát, tạo nên ly trà chua ngọt cực đã.',
    price: 25000,
    image: '/images/products/default-fruit-tea.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'XL',
    calories: '150 kcal',
    ingredients: 'Trà Assam hảo hạng, nước cốt tắc tươi nguyên chất, bí đao thanh nhiệt'
  },
  {
    id: 5,
    name: 'Lục Trà Tắc',
    slug: 'luc-tra-tac',
    category: 'tra-thanh-nhiet',
    description: 'Được ủ từ trà xanh thanh nhẹ, kết hợp cùng tắc tươi chua nhẹ và trà bí đao thanh mát, tạo nên ly trà chua - ngọt cực kỳ sảng khoái.',
    price: 25000,
    image: '/images/products/default-fruit-tea.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'XL',
    calories: '140 kcal',
    ingredients: 'Trà xanh Thái Nguyên, tắc tươi mát, đá viên mát lạnh sảng khoái'
  },
  {
    id: 6,
    name: 'Trà Đào Cam Sả',
    slug: 'tra-dao-cam-sa',
    category: 'tra-thanh-nhiet',
    description: 'Kết hợp tươi mát giữa trà đào ngọt dịu, vị cam thơm lừng và hương sả thanh mát. Một thức uống sảng khoái, giải nhiệt đầy hấp dẫn!',
    price: 30000,
    image: '/images/products/default-fruit-tea.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'XL',
    calories: '180 kcal',
    ingredients: 'Trà đào ủ lạnh, cam vàng mọng nước, sả cây tươi đập dập thơm nức'
  },
  {
    id: 7,
    name: 'Bơ Dừa Non',
    slug: 'bo-dua-non',
    category: 'bo-collection',
    description: 'Bơ 034 Đà Lạt dẻo mịn, thơm béo tự nhiên hòa quyện cùng nước cốt dừa béo ngậy, thêm topping hạt điều giòn giòn bùi bùi.',
    price: 45000,
    image: '/images/products/default-matcha.jpg',
    is_new: true,
    is_best_seller: false,
    size: 'L',
    calories: '390 kcal',
    ingredients: 'Bơ sáp 034 Đắk Lắk, cốt dừa Bến Tre béo ngậy, hạt điều sấy giòn tan'
  },
  {
    id: 8,
    name: 'Trà Sữa Bơ',
    slug: 'tra-sua-bo',
    category: 'bo-collection',
    description: 'Trà sữa truyền thống kết hợp lớp bơ xay mịn béo ngậy, tạo nên hương vị lạ miệng, cuốn hút khó cưỡng.',
    price: 42000,
    image: '/images/products/default-matcha.jpg',
    is_new: true,
    is_best_seller: false,
    size: 'L',
    calories: '360 kcal',
    ingredients: 'Lớp bơ sáp tươi dầm nhuyễn, trà sữa thơm đậm đà, sữa đặc hảo hạng'
  },
  {
    id: 9,
    name: 'Trà Ô Long Nguyên Vị',
    slug: 'tra-o-long-nguyen-vi',
    category: 'tra-nguyen-vi',
    description: 'Trà Ô Long được ủ đúng cách, giữ trọn hương thơm tự nhiên và vị chát nhẹ thanh mát đặc trưng.',
    price: 20000,
    image: '/images/products/default-fruit-tea.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '30 kcal',
    ingredients: 'Búp trà Ô Long thượng hạng được ủ ở nhiệt độ tiêu chuẩn 92°C'
  },
  {
    id: 10,
    name: 'Sữa Tươi Trân Châu Đường Đen',
    slug: 'sua-tuoi-tran-chau',
    category: 'sua-tuoi',
    description: 'Sữa tươi thanh trùng Dalat Milk béo mịn, kết hợp trân châu dẻo dai nấu đường nâu, giản đơn mà ngon khó cưỡng.',
    price: 30000,
    image: '/images/products/default-milk-tea.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'L',
    calories: '290 kcal',
    ingredients: 'Sữa tươi thanh trùng 100%, trân châu ngâm đường phèn nâu mật mía'
  },
  {
    id: 11,
    name: 'Trà Sữa Khoai Môn',
    slug: 'tra-sua-khoai-mon',
    category: 'tra-sua',
    description: 'Vị khoai môn bùi bùi hòa quyện sữa thơm béo, thêm trân châu dẻo dai tạo nên thức uống đậm đà khó quên.',
    price: 35000,
    image: '/images/products/default-milk-tea.jpg',
    is_new: false,
    is_best_seller: true,
    size: 'L',
    calories: '330 kcal',
    ingredients: 'Cốt khoai môn dẻo mịn bùi béo, sữa tươi nguyên kem, trà đen'
  },
  {
    id: 12,
    name: 'Trà Sữa Matcha Nhật',
    slug: 'tra-sua-matcha',
    category: 'tra-sua',
    description: 'Matcha Uji Nhật Bản thượng hạng pha cùng sữa tươi, mang đến vị thanh nhẹ, thơm dịu và hậu ngọt tự nhiên.',
    price: 38000,
    image: '/images/products/default-matcha.jpg',
    is_new: false,
    is_best_seller: false,
    size: 'L',
    calories: '260 kcal',
    ingredients: 'Matcha Uji nguyên chất nhập khẩu, sữa tươi thanh trùng, đá mát'
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
