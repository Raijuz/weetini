"""
WEE TINI - Bubble Tea Brand Backend API
Built with FastAPI
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn

app = FastAPI(
    title="WEE TINI API",
    description="API cho thương hiệu trà sữa WEE TINI",
    version="1.0.0"
)

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== DATA MODELS ====================

class ContactForm(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    message: str


class FranchiseForm(BaseModel):
    name: str
    phone: str
    email: str
    address: str
    investment_budget: Optional[str] = None
    message: Optional[str] = None


class OrderItem(BaseModel):
    product_id: Optional[int] = None
    name: str
    price: Optional[int] = 0
    size: Optional[str] = "L"
    ice: Optional[str] = "100%"
    sugar: Optional[str] = "100%"
    toppings: Optional[list] = []
    quantity: int = 1
    unit_price: int
    total_price: int
    image: Optional[str] = None


class OrderCreate(BaseModel):
    name: str
    phone: str
    address: str
    note: Optional[str] = None
    payment_method: Optional[str] = "cod"
    items: list[OrderItem]
    total_amount: int


# ==================== MOCK DATA ====================

ORDERS = []

CATEGORIES = [
    {"id": "best-seller", "name": "Best Seller", "slug": "best-seller"},
    {"id": "matcha-signature", "name": "Matcha Signature", "slug": "matcha-signature"},
    {"id": "tra-trai-cay", "name": "Trà Trái Cây", "slug": "tra-trai-cay"},
    {"id": "nuoc-ep-trai-cay", "name": "Nước Ép & Trái Cây Tươi", "slug": "nuoc-ep-trai-cay"},
]

PRODUCTS = [
    {
        'id': 1,
        'code': '01',
        'name': 'Wee Sunshine | Kirakira',
        'slug': 'wee-sunshine-kirakira',
        'category': 'nuoc-ep-trai-cay',
        'description': 'Tựa ánh nắng đầu ngày, cam và cà rốt mang đến sắc ngọt dịu dàng, được đánh thức bởi chút chanh thanh mảnh. Một bản hòa sắc tươi sáng, đánh thức vị giác bằng sự rạng rỡ tự nhiên.',
        'price': 65000,
        'image': '/images/products/sunshine.jpg',
        'is_new': False,
        'is_best_seller': True,
        'size': 'L',
        'calories': '135 kcal',
        'ingredients': 'Cam + Cà rốt + Chanh',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 2,
        'code': '02',
        'name': 'Wee Glow | Waku Waku',
        'slug': 'wee-glow-waku-waku',
        'category': 'nuoc-ep-trai-cay',
        'description': 'Ba sắc thái nhiệt đới gặp nhau trong một bản giao hưởng đầy sức sống. Dứa ngọt thơm, cam mọng nước và chanh thanh nhẹ đan xen, để lại dư vị tươi mới như một ngày hè bất tận.',
        'price': 50000,
        'image': '/images/products/glow.jpg',
        'is_new': False,
        'is_best_seller': True,
        'size': 'L',
        'calories': '142 kcal',
        'ingredients': 'Dứa + Cam + Chanh',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 3,
        'code': '03',
        'name': 'Wee Freshie | Sasuga',
        'slug': 'wee-freshie-sasuga',
        'category': 'nuoc-ep-trai-cay',
        'description': 'Vị ngọt trong veo của dưa hấu khẽ chạm vào nét chua thanh của chanh, khép lại bằng làn hương bạc hà mát lành. Như một cơn gió dịu dàng ghé qua giữa ngày hè oi ả.',
        'price': 30000,
        'image': '/images/products/freshie.jpg',
        'is_new': False,
        'is_best_seller': True,
        'size': 'L',
        'calories': '120 kcal',
        'ingredients': 'Dưa hấu + Chanh + Bạc hà',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 4,
        'code': '04',
        'name': 'Wee Slay | Migoto',
        'slug': 'wee-slay-migoto',
        'category': 'nuoc-ep-trai-cay',
        'description': 'Táo mang nét ngọt thanh, dứa điểm chút hương nhiệt đới và chanh khẽ cân bằng mọi tầng vị. Một cuộc gặp gỡ đầy ngẫu hứng, nơi sự tươi mới trở thành dấu ấn khó quên.',
        'price': 60000,
        'image': '/images/products/slay.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '138 kcal',
        'ingredients': 'Táo + Dứa + Chanh',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 5,
        'code': '05',
        'name': 'Wee Green | Suteki',
        'slug': 'wee-green-suteki',
        'category': 'nuoc-ep-trai-cay',
        'description': 'Vị chua thanh giòn ngọt của cóc non hòa quyện cùng ổi tươi chín tới thơm lừng. Bản phối xanh tươi mát lành, giàu vitamin và mang lại nguồn năng lượng sảng khoái tức thì.',
        'price': 70000,
        'image': '/images/products/green.jpg',
        'is_new': True,
        'is_best_seller': False,
        'size': 'L',
        'calories': '125 kcal',
        'ingredients': 'Cóc + Ổi',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 6,
        'code': '06',
        'name': 'Wee Fit | Niko Niko',
        'slug': 'wee-fit-niko-niko',
        'category': 'nuoc-ep-trai-cay',
        'description': 'Sự hòa quyện giữa vị ngọt mọng của cam và nét thanh tao, phảng phất chút đắng nhẹ của bưởi. Một tổng thể cân bằng và tinh giản, dành cho những tâm hồn yêu sự thuần khiết.',
        'price': 70000,
        'image': '/images/products/fit.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '115 kcal',
        'ingredients': 'Cam + Bưởi',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 7,
        'code': '07',
        'name': 'Wee Fun | Kirei',
        'slug': 'wee-fun-kirei',
        'category': 'nuoc-ep-trai-cay',
        'description': 'Sắc đỏ của dưa hấu và dâu tây mở ra một miền hương vị ngọt ngào, xen chút chua dịu đầy duyên dáng. Tựa một niềm vui nhỏ được gói ghém trong sắc màu của mùa hè.',
        'price': 80000,
        'image': '/images/products/fun.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '128 kcal',
        'ingredients': 'Dưa hấu + Dâu Tây',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 8,
        'code': '08',
        'name': 'Wee Bootiful | Bijin',
        'slug': 'wee-bootiful-bijin',
        'category': 'nuoc-ep-trai-cay',
        'description': 'Nho chín mang vị ngọt đậm đà, quyện cùng hương thơm mềm mại của dưa lưới. Êm dịu, tròn vị và thanh tao – một nét quyến rũ không cần phô trương.',
        'price': 80000,
        'image': '/images/products/bootiful.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '145 kcal',
        'ingredients': 'Nho + Dưa lưới',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 9,
        'code': '09',
        'name': 'Wee Peachy | Kanpeki',
        'slug': 'wee-peachy-kanpeki',
        'category': 'nuoc-ep-trai-cay',
        'description': 'Chanh dây khơi mở tầng vị chua thanh sống động, trong khi hibiscus tô điểm sắc đỏ quyến rũ cùng hương hoa dịu nhẹ. Một nét chấm phá đầy thi vị, lưu lại dư âm thanh mát sau mỗi lần thưởng thức.',
        'price': 30000,
        'image': '/images/products/peachy.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '130 kcal',
        'ingredients': 'Chanh dây + Hibiscus',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 10,
        'code': '10',
        'name': 'Wee Golden | Saikō',
        'slug': 'wee-golden-saiko',
        'category': 'nuoc-ep-trai-cay',
        'description': 'Vị ngọt tươi của cam gặp gỡ nét chua mặn đặc trưng của xí muội, tạo nên sự giao thoa thú vị giữa những sắc thái đối lập. Đậm đà mà thanh thoát, quen thuộc nhưng luôn có điều bất ngờ.',
        'price': 70000,
        'image': '/images/products/golden.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '132 kcal',
        'ingredients': 'Cam + Xí muội',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 11,
        'code': '11',
        'name': 'Wee Flex | Jōzu',
        'slug': 'wee-flex-jozu',
        'category': 'tra-trai-cay',
        'description': 'Hương trà thanh dịu kết hợp cùng đào chín mọng, mang đến vị ngọt nhẹ nhàng và hương thơm mềm mại. Một lựa chọn cổ điển nhưng luôn tươi mới trong từng ngụm.',
        'price': 40000,
        'image': '/images/products/flex.jpg',
        'is_new': False,
        'is_best_seller': True,
        'size': 'L',
        'calories': '140 kcal',
        'ingredients': 'Trà đào',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 12,
        'code': '12',
        'name': 'Wee Sassy | Erai',
        'slug': 'wee-sassy-erai',
        'category': 'tra-trai-cay',
        'description': 'Vải tươi ngọt thanh hòa quyện cùng hương hoa hồng dịu nhẹ trên nền trà thơm. Từng tầng hương bung tỏa mềm mại, mang đến cảm giác thanh tao và quyến rũ.',
        'price': 40000,
        'image': '/images/products/sassy.jpg',
        'is_new': False,
        'is_best_seller': True,
        'size': 'L',
        'calories': '148 kcal',
        'ingredients': 'Trà vải hoa hồng',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 13,
        'code': '13',
        'name': 'Wee Chic | Kawaii',
        'slug': 'wee-chic-kawaii',
        'category': 'tra-trai-cay',
        'description': 'Hương trà thanh mát kết hợp cùng ổi tươi thơm dịu, mang đến vị ngọt tự nhiên và chút chua nhẹ tinh tế. Đơn giản, thanh khiết nhưng đủ để tạo nên dấu ấn riêng.',
        'price': 40000,
        'image': '/images/products/chic.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '130 kcal',
        'ingredients': 'Trà ổi',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 14,
        'code': '14',
        'name': 'Wee Extra | Kakkoii',
        'slug': 'wee-extra-kakkoii',
        'category': 'tra-trai-cay',
        'description': 'Dưa lưới chín thơm với vị ngọt dịu, mọng nước kết hợp cùng nền trà thanh nhẹ. Hương vị êm ái, tươi mát và lưu lại hậu ngọt tự nhiên.',
        'price': 40000,
        'image': '/images/products/extra.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '135 kcal',
        'ingredients': 'Trà dưa lưới',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 15,
        'code': '15',
        'name': 'Wee Zen | Happyō',
        'slug': 'wee-zen-happyo',
        'category': 'tra-trai-cay',
        'description': 'Dâu tây tươi mang vị chua ngọt đặc trưng hòa cùng hương trà dịu nhẹ. Sắc đỏ hồng bắt mắt cùng hương thơm trái cây tạo nên trải nghiệm tươi trẻ và dễ chịu.',
        'price': 70000,
        'image': '/images/products/zen.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '142 kcal',
        'ingredients': 'Trà dâu tây',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 16,
        'code': '16',
        'name': 'Wee Pure | Yabai',
        'slug': 'wee-pure-yabai',
        'category': 'tra-trai-cay',
        'description': 'Quýt tươi mọng nước mang vị chua ngọt thanh thoát, hòa cùng hương trà thơm dịu. Một thức uống nhẹ nhàng, trong trẻo với cảm giác tươi mát kéo dài.',
        'price': 40000,
        'image': '/images/products/pure.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '125 kcal',
        'ingredients': 'Trà quýt',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 17,
        'code': '17',
        'name': 'Wee Blush | Pika Pika',
        'slug': 'wee-blush-pika-pika',
        'category': 'tra-trai-cay',
        'description': 'Sự kết hợp đầy sắc màu từ những loại trái cây nhiệt đới tươi ngon trên nền trà thanh mát. Chua ngọt đan xen, mỗi ngụm là một chuyến du hành qua những tầng hương vị.',
        'price': 85000,
        'image': '/images/products/blush.jpg',
        'is_new': False,
        'is_best_seller': True,
        'size': 'L',
        'calories': '155 kcal',
        'ingredients': 'Trà nhiệt đới 4 mùa',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 18,
        'code': '18',
        'name': 'Wee Lazy | Fuwa Fuwa',
        'slug': 'wee-lazy-fuwa-fuwa',
        'category': 'tra-trai-cay',
        'description': 'Lựu tươi mang vị chua ngọt thanh tao, điểm xuyết trên nền trà thơm nhẹ. Sắc đỏ ruby nổi bật cùng hậu vị tươi mát, thích hợp cho những phút giây thư thả.',
        'price': 80000,
        'image': '/images/products/lazy.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '138 kcal',
        'ingredients': 'Trà lựu',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 19,
        'code': '19',
        'name': 'Wee Chill | Oishii',
        'slug': 'wee-chill-oishii',
        'category': 'tra-trai-cay',
        'description': 'Mãng cầu béo thơm, ngọt dịu kết hợp cùng chanh dây chua thanh đầy sức sống. Hai sắc thái hương vị hòa quyện tạo nên thức trà nhiệt đới vừa mềm mại vừa sảng khoái.',
        'price': 40000,
        'image': '/images/products/chill.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '160 kcal',
        'ingredients': 'Trà mãng cầu + chanh dây',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 20,
        'code': '20',
        'name': 'Wee Zesty | Pichi Pichi',
        'slug': 'wee-zesty-pichi-pichi',
        'category': 'tra-trai-cay',
        'description': 'Xoài chín vàng ngọt thơm hòa cùng chanh dây chua dịu, tạo nên sự tương phản đầy thú vị trên nền trà thanh mát. Đậm chất nhiệt đới, tươi tắn và bùng nổ hương vị.',
        'price': 70000,
        'image': '/images/products/zesty.jpg',
        'is_new': False,
        'is_best_seller': False,
        'size': 'L',
        'calories': '155 kcal',
        'ingredients': 'Trà xoài + chanh dây',
        'note': 'Món chưa bao gồm Topping'
    },
    {
        'id': 21,
        'code': '21',
        'name': 'WEE TINI | Subarashii',
        'slug': 'wee-tini-subarashii',
        'category': 'matcha-signature',
        'description': 'Matcha nguyên chất với hương trà xanh thanh nhẹ, thoảng chút đắng dịu hòa quyện cùng sữa dâu béo mịn và ngọt thơm. Sự giao thoa giữa sắc xanh và hồng tạo nên một thức uống vừa tinh tế vừa đáng yêu.',
        'price': 50000,
        'image': '/images/products/tini.jpg',
        'is_new': True,
        'is_best_seller': True,
        'size': 'L',
        'calories': '210 kcal',
        'ingredients': 'Matcha + sữa dâu',
        'note': 'Món chưa bao gồm Topping'
    },
]

STORES = [
    {
        "id": 1,
        "name": "WEE TINI - Trịnh Đình Thảo (Trụ sở chính)",
        "address": "37/14A Trịnh Đình Thảo, P. Tân Phú, TP. HCM",
        "phone": "0859 590 010",
        "hours": "08:00 - 22:30",
        "lat": 10.7780,
        "lng": 106.6380,
        "district": "Tân Phú"
    },
]

NEWS = [
    {
        "id": 1,
        "title": "WEE TINI khai trương chi nhánh thứ 40",
        "slug": "weetini-khai-truong-chi-nhanh-thu-40",
        "excerpt": "WEE TINI chính thức khai trương chi nhánh thứ 40 tại Quận 7, TP.HCM với nhiều ưu đãi hấp dẫn dành cho khách hàng.",
        "image": "/images/news/khai-truong.jpg",
        "date": "2024-12-15",
        "category": "Tin tức"
    },
    {
        "id": 2,
        "title": "Ra mắt Bơ Collection - Bộ sưu tập mùa hè",
        "slug": "ra-mat-bo-collection",
        "excerpt": "WEE TINI giới thiệu bộ sưu tập Bơ Collection với những thức uống mới lạ, kết hợp giữa bơ Đà Lạt và trà sữa truyền thống.",
        "image": "/images/news/bo-collection.jpg",
        "date": "2024-11-20",
        "category": "Sản phẩm mới"
    },
    {
        "id": 3,
        "title": "WEE TINI - Top thương hiệu trà sữa yêu thích 2024",
        "slug": "weetini-top-thuong-hieu-tra-sua",
        "excerpt": "WEE TINI vinh dự được bình chọn là Top thương hiệu trà sữa được yêu thích nhất năm 2024 bởi cộng đồng yêu trà sữa.",
        "image": "/images/news/top-brand.jpg",
        "date": "2024-10-05",
        "category": "Thành tựu"
    },
]

RECRUITMENT = [
    {
        "id": 1,
        "title": "Nhân Viên Pha Chế",
        "location": "Tất cả chi nhánh TP.HCM",
        "type": "Toàn thời gian / Bán thời gian",
        "salary": "5.000.000 - 8.000.000 VNĐ",
        "description": "Pha chế các loại đồ uống theo công thức chuẩn của WEE TINI, đảm bảo chất lượng và phục vụ khách hàng.",
        "requirements": [
            "Nam/Nữ từ 18 - 30 tuổi",
            "Nhanh nhẹn, chịu khó",
            "Không yêu cầu kinh nghiệm, được đào tạo",
            "Ưu tiên có kinh nghiệm pha chế"
        ]
    },
    {
        "id": 2,
        "title": "Quản Lý Cửa Hàng",
        "location": "Tất cả chi nhánh TP.HCM",
        "type": "Toàn thời gian",
        "salary": "10.000.000 - 15.000.000 VNĐ",
        "description": "Quản lý vận hành cửa hàng, đảm bảo chất lượng dịch vụ và doanh thu.",
        "requirements": [
            "Nam/Nữ từ 22 - 35 tuổi",
            "Có kinh nghiệm quản lý F&B tối thiểu 1 năm",
            "Kỹ năng lãnh đạo, giao tiếp tốt",
            "Chịu được áp lực công việc"
        ]
    },
]

ABOUT_DATA = {
    "overview": {
        "title": "TỔNG QUAN",
        "description": "WEE TINI, thành lập vào năm 2026, đã và đang không ngừng phát triển trong suốt thời gian qua với hơn 10 cửa hàng trải rộng khắp TP. Hồ Chí Minh, Huế, Phan Thiết, Đà Nẵng. Với chất lượng đặc trưng và dịch vụ tận tâm, thương hiệu đã nhanh chóng chiếm được tình cảm và sự yêu mến của đông đảo khách hàng. Triết lý của WEE TINI là mang đến trải nghiệm đồ uống chuẩn vị, giản đơn mà tinh tế, đáp ứng nhịp sống hiện đại năng động.",
        "stats": [
            {"number": 2000, "suffix": "+", "label": "Ly trà sữa", "sublabel": "bán ra mỗi ngày"},
            {"number": 20, "suffix": "+", "label": "Loại trà sữa, topping", "sublabel": "khác nhau"},
            {"number": 10, "suffix": "+", "label": "Cửa hàng", "sublabel": "trên toàn quốc"},
        ]
    },
    "vision_mission": {
        "title": "TẦM NHÌN - SỨ MỆNH",
        "description": "Trở thành chuỗi thương hiệu trà sữa TOP tại Việt Nam. Kết hợp lối sống đơn giản tạo nên chất riêng của WEE TINI.",
        "items": [
            {"icon": "handshake", "title": "Đối Tác", "desc": "Đề cao tinh thần hợp tác và tương trợ cùng nhau phát triển"},
            {"icon": "heart", "title": "Khách Hàng", "desc": "Luôn lấy khách hàng làm trung tâm, nỗ lực phấn đấu đổi mới"},
            {"icon": "leaf", "title": "Chất Lượng", "desc": "Cam kết chất lượng sản phẩm luôn đạt tiêu chuẩn cao nhất"},
        ]
    },
    "core_values": {
        "title": "GIÁ TRỊ CỐT LÕI",
        "items": [
            {"title": "Chất lượng", "desc": "Nguyên liệu tươi sạch, quy trình chuẩn"},
            {"title": "Sáng tạo", "desc": "Không ngừng đổi mới, sáng tạo công thức mới"},
            {"title": "Tận tâm", "desc": "Phục vụ khách hàng bằng cả trái tim"},
            {"title": "Phát triển", "desc": "Cùng đội ngũ phát triển bền vững"},
        ]
    }
}

FRANCHISE_DATA = {
    "title": "NHƯỢNG QUYỀN THƯƠNG HIỆU",
    "description": "WEE TINI mở rộng cơ hội hợp tác nhượng quyền thương hiệu trên toàn quốc. Với mô hình kinh doanh đã được chứng minh hiệu quả, chúng tôi sẵn sàng đồng hành cùng bạn trên con đường khởi nghiệp.",
    "benefits": [
        {"icon": "chart-line", "title": "Mô hình hiệu quả", "desc": "ROI nhanh trong 12-18 tháng"},
        {"icon": "graduation-cap", "title": "Đào tạo toàn diện", "desc": "Đào tạo từ A-Z, hỗ trợ vận hành"},
        {"icon": "truck", "title": "Cung ứng nguyên liệu", "desc": "Hệ thống cung ứng ổn định, đồng nhất"},
        {"icon": "bullhorn", "title": "Marketing tập trung", "desc": "Chiến lược marketing bài bản, hiệu quả"},
    ],
    "investment": {
        "total": "Từ 150.000.000 VNĐ",
        "includes": [
            "Phí nhượng quyền thương hiệu",
            "Thiết kế và thi công cửa hàng",
            "Trang thiết bị, dụng cụ pha chế",
            "Nguyên liệu ban đầu",
            "Đào tạo nhân sự",
        ]
    }
}

SITE_CONFIG = {
    "brand_name": "WEE TINI",
    "tagline": "Thương hiệu trà sữa & nước ép trái cây tươi",
    "hotline": "0859 590 010",
    "email": "Weetinicreative@gmail.com",
    "facebook": "https://facebook.com/weetini",
    "instagram": "https://instagram.com/weetini",
    "tiktok": "https://tiktok.com/@weetini",
    "address": "37/14A Trịnh Đình Thảo, P. Tân Phú, TP. HCM",
    "working_hours": "08:00 - 22:00 (Tất cả các ngày trong tuần)",
}


# ==================== API ENDPOINTS ====================

@app.get("/")
async def root():
    return {"message": "WEE TINI API v1.0", "status": "running"}


@app.get("/api/config")
async def get_config():
    return SITE_CONFIG


@app.get("/api/categories")
async def get_categories():
    return CATEGORIES


@app.get("/api/products")
async def get_products(category: Optional[str] = None):
    if category:
        filtered = [p for p in PRODUCTS if p["category"] == category]
        return filtered
    return PRODUCTS


@app.get("/api/products/featured")
async def get_featured_products():
    return [p for p in PRODUCTS if p["is_best_seller"]]


@app.get("/api/products/{product_id}")
async def get_product(product_id: int):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tìm thấy")
    return product


@app.get("/api/stores")
async def get_stores(district: Optional[str] = None):
    if district:
        filtered = [s for s in STORES if s["district"] == district]
        return filtered
    return STORES


@app.get("/api/news")
async def get_news():
    return NEWS


@app.get("/api/about")
async def get_about():
    return ABOUT_DATA


@app.get("/api/franchise")
async def get_franchise():
    return FRANCHISE_DATA


@app.get("/api/recruitment")
async def get_recruitment():
    return RECRUITMENT


@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    # In production, save to database and send notification
    return {"success": True, "message": "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất."}


@app.post("/api/franchise/register")
async def submit_franchise(form: FranchiseForm):
    # In production, save to database and send notification
    return {"success": True, "message": "Cảm ơn bạn đã quan tâm đến nhượng quyền WEE TINI! Chúng tôi sẽ liên hệ sớm."}


@app.post("/api/orders")
async def create_order(order: OrderCreate):
    import time
    order_id = f"WTN{int(time.time() * 1000) % 1000000:06d}"
    order_record = {
        "order_id": order_id,
        "name": order.name,
        "phone": order.phone,
        "address": order.address,
        "note": order.note,
        "payment_method": order.payment_method,
        "items": [item.dict() for item in order.items],
        "total_amount": order.total_amount,
        "status": "pending",
        "created_at": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    ORDERS.insert(0, order_record)
    return {
        "success": True,
        "order_id": order_id,
        "message": "Đặt hàng thành công! Đội ngũ WEE TINI sẽ liên hệ xác nhận trong ít phút.",
        "order": order_record
    }


@app.get("/api/orders")
async def get_orders():
    return ORDERS


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
