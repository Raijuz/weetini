"""
WEE TINI - Bubble Tea Brand Backend API
Built with FastAPI
"""

import os
import json
from datetime import datetime
from typing import Optional
import resend

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Auto load environment variables from .env if present
def _load_env():
    for p in [".env", "server/.env", "../server/.env", os.path.join(os.path.dirname(__file__), ".env")]:
        if os.path.isfile(p):
            try:
                with open(p, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            k, v = line.split("=", 1)
                            os.environ[k.strip()] = v.strip().strip('"').strip("'")
            except Exception:
                pass

_load_env()

app = FastAPI(
    title="WEE TINI API",
    description="API cho thương hiệu trà sữa WEE TINI",
    version="1.0.0"
)

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_origin_regex=r"https?://.*",
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
    email: Optional[str] = ""
    address: Optional[str] = ""
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
        "total": "Từ 106.000.000 VNĐ",
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


def save_franchise_lead(data: dict):
    """Lưu trữ thông tin khách đăng ký nhượng quyền vào file json nội bộ"""
    try:
        data_dir = os.path.join(os.path.dirname(__file__), "data")
        os.makedirs(data_dir, exist_ok=True)
        file_path = os.path.join(data_dir, "franchise_leads.json")
        leads = []
        if os.path.exists(file_path):
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    leads = json.load(f)
            except Exception:
                leads = []
        leads.append(data)
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(leads, f, ensure_ascii=False, indent=2)
        print(f"💾 [LEAD LƯU THÀNH CÔNG] Khách: {data.get('name')} - SĐT: {data.get('phone')}")
    except Exception as e:
        print(f"❌ [LỖI LƯU LEAD]: {e}")


def send_franchise_email_notification(data: dict):
    """Gửi email thông báo nhượng quyền qua Resend API"""
    _load_env()
    api_key = os.getenv("RESEND_API_KEY", "")
    from_email = os.getenv("EMAIL_FROM", "WEE TINI <no-reply@weetini.com>")
    receiver = os.getenv("FRANCHISE_NOTIFICATION_EMAIL", "Weetinicreative@gmail.com")

    name = data.get("name", "N/A")
    phone = data.get("phone", "N/A")
    email = data.get("email", "N/A")
    address = data.get("address", "N/A")
    budget = data.get("investment_budget", "N/A")
    message = data.get("message") or "Không có ghi chú thêm"
    submitted_at = data.get("created_at", datetime.now().strftime("%d/%m/%Y %H:%M:%S"))

    if not api_key:
        print("⚠️ [RESEND CHƯA CẤU HÌNH] Chưa có RESEND_API_KEY trong file .env.")
        print(f"   Email thông báo dự kiến gửi tới: {receiver}")
        print(f"   Thông tin đối tác: {name} | {phone} | {address} | Vốn: {budget}")
        return False

    resend.api_key = api_key

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f0; margin: 0; padding: 20px; }}
        .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }}
        .header {{ background: linear-gradient(135deg, #98B155 0%, #F6869D 100%); padding: 30px 24px; text-align: center; color: #ffffff; }}
        .header h1 {{ margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px; }}
        .header p {{ margin: 6px 0 0 0; opacity: 0.95; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }}
        .content {{ padding: 28px 24px; }}
        .lead-card {{ background: #fafbf6; border-left: 4px solid #98B155; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; }}
        .field-table {{ width: 100%; border-collapse: collapse; }}
        .field-table td {{ padding: 12px 6px; border-bottom: 1px dashed #e2e8f0; font-size: 14px; vertical-align: top; }}
        .field-label {{ width: 170px; font-weight: 700; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.3px; }}
        .field-value {{ color: #0f172a; font-weight: 600; }}
        .field-value a {{ color: #98B155; text-decoration: none; }}
        .budget-tag {{ display: inline-block; background: #ffe4e6; color: #e11d48; padding: 3px 10px; border-radius: 9999px; font-weight: 700; font-size: 13px; }}
        .message-box {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; color: #334155; font-size: 14px; line-height: 1.6; }}
        .action-btn {{ display: inline-block; background: #98B155; color: #ffffff !important; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; margin-top: 24px; text-align: center; box-shadow: 0 4px 12px rgba(152,177,85,0.3); }}
        .footer {{ background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>WEE TINI</h1>
          <p>🔔 ĐĂNG KÝ NHƯỢNG QUYỀN MỚI</p>
        </div>
        <div class="content">
          <div class="lead-card">
            <strong>Đối tác đăng ký:</strong> {name} • <a href="tel:{phone}" style="color: #98B155; font-weight: bold;">{phone}</a>
          </div>
          <table class="field-table">
            <tr>
              <td class="field-label">Họ và tên:</td>
              <td class="field-value">{name}</td>
            </tr>
            <tr>
              <td class="field-label">Số điện thoại:</td>
              <td class="field-value"><a href="tel:{phone}">{phone}</a></td>
            </tr>
            <tr>
              <td class="field-label">Email đối tác:</td>
              <td class="field-value"><a href="mailto:{email}">{email}</a></td>
            </tr>
            <tr>
              <td class="field-label">Khu vực muốn mở:</td>
              <td class="field-value">{address}</td>
            </tr>
            <tr>
              <td class="field-label">Vốn đầu tư dự kiến:</td>
              <td class="field-value"><span class="budget-tag">{budget}</span></td>
            </tr>
            <tr>
              <td class="field-label">Thời gian đăng ký:</td>
              <td class="field-value">{submitted_at}</td>
            </tr>
          </table>
          <div style="padding-top: 16px;">
            <div class="field-label" style="margin-bottom: 8px;">Lời nhắn / Câu hỏi của đối tác:</div>
            <div class="message-box">{message}</div>
          </div>
          <div style="text-align: center;">
            <a href="tel:{phone}" class="action-btn">📞 BẤM ĐỂ GỌI ĐỐI TÁC NGAY</a>
          </div>
        </div>
        <div class="footer">
          Email thông báo tự động từ hệ thống Website WEE TINI • Wee Fun, Wee Chill, Wee Slay
        </div>
      </div>
    </body>
    </html>
    """

    try:
        params = {
            "from": from_email,
            "to": [receiver],
            "subject": f"[WEE TINI] 🔔 Đăng ký nhượng quyền: {name} - {phone}",
            "html": html_content,
        }
        resp = resend.Emails.send(params)
        email_id = resp.get("id") if isinstance(resp, dict) else getattr(resp, "id", resp)
        print(f"✅ [RESEND ĐÃ GỬI THÀNH CÔNG] ID: {email_id} | Tới: {receiver}")
        return True
    except Exception as e:
        print(f"❌ [LỖI GỬI EMAIL RESEND]: {e}")
        return False


@app.post("/api/franchise/register")
async def submit_franchise(form: FranchiseForm, background_tasks: BackgroundTasks):
    data = form.model_dump() if hasattr(form, "model_dump") else form.dict()
    data["created_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # 1. Lưu trữ cục bộ đảm bảo không bị thất thoát thông tin khách hàng
    save_franchise_lead(data)

    # 2. Gửi email thông báo ngầm (background task)
    background_tasks.add_task(send_franchise_email_notification, data)

    return {
        "success": True,
        "message": "Cảm ơn bạn đã quan tâm đến nhượng quyền WEE TINI! Chuyên viên tư vấn sẽ liên hệ lại trong vòng 24 giờ."
    }


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
