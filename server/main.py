"""
Weetini - Bubble Tea Brand Backend API
Built with FastAPI
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn

app = FastAPI(
    title="Weetini API",
    description="API cho thương hiệu trà sữa Weetini",
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


# ==================== MOCK DATA ====================

CATEGORIES = [
    {"id": "best-seller", "name": "Best Seller", "slug": "best-seller"},
    {"id": "tra-sua", "name": "Trà Sữa", "slug": "tra-sua"},
    {"id": "tra-thanh-nhiet", "name": "Trà Thanh Nhiệt", "slug": "tra-thanh-nhiet"},
    {"id": "tra-nguyen-vi", "name": "Trà Nguyên Vị", "slug": "tra-nguyen-vi"},
    {"id": "sua-tuoi", "name": "Sữa Tươi", "slug": "sua-tuoi"},
    {"id": "bo-collection", "name": "Bơ Collection", "slug": "bo-collection"},
]

PRODUCTS = [
    {
        "id": 1,
        "name": "Trà Sữa Trân Châu Đường Đen",
        "slug": "tra-sua-tran-chau-duong-den",
        "category": "best-seller",
        "description": "Trà sữa truyền thống hòa quyện cùng trân châu đường đen dẻo thơm, tạo nên hương vị ngọt ngào khó quên.",
        "price": 35000,
        "image": "/images/products/tra-sua-tran-chau.jpg",
        "is_new": False,
        "is_best_seller": True,
        "size": "L",
        "note": "Món chưa bao gồm Topping"
    },
    {
        "id": 2,
        "name": "Ô Long Sữa Nhãn Hoa",
        "slug": "o-long-sua-nhan-hoa",
        "category": "tra-sua",
        "description": "Hương nhài thanh khiết, hòa quyện cùng sữa ít béo mềm mượt, điểm xuyến mứt nhãn ngọt dịu và thạch giòn dai.",
        "price": 39000,
        "image": "/images/products/o-long-nhan-hoa.jpg",
        "is_new": True,
        "is_best_seller": True,
        "size": "L",
        "note": "Món chưa bao gồm Topping"
    },
    {
        "id": 3,
        "name": "Trà Sữa Chocolate",
        "slug": "tra-sua-chocolate",
        "category": "tra-sua",
        "description": "Hòa quyện giữa vị trà thơm nhẹ và hương chocolate ngọt ngào, mang đến trải nghiệm béo ngậy và sảng khoái.",
        "price": 35000,
        "image": "/images/products/tra-sua-chocolate.jpg",
        "is_new": False,
        "is_best_seller": True,
        "size": "L",
        "note": "Món chưa bao gồm Topping"
    },
    {
        "id": 4,
        "name": "Hồng Trà Tắc",
        "slug": "hong-tra-tac",
        "category": "tra-thanh-nhiet",
        "description": "Được ủ từ trà đen Assam Ấn Độ đậm vị, kết hợp cùng tắc tươi chua nhẹ và trà bí đao thanh mát.",
        "price": 25000,
        "image": "/images/products/hong-tra-tac.jpg",
        "is_new": False,
        "is_best_seller": False,
        "size": "XL",
        "note": "Món chưa bao gồm Topping"
    },
    {
        "id": 5,
        "name": "Lục Trà Tắc",
        "slug": "luc-tra-tac",
        "category": "tra-thanh-nhiet",
        "description": "Được ủ từ trà xanh thanh nhẹ, kết hợp cùng tắc tươi chua nhẹ và trà bí đao thanh mát, tạo nên ly trà chua - ngọt cực kỳ sảng khoái.",
        "price": 25000,
        "image": "/images/products/luc-tra-tac.jpg",
        "is_new": False,
        "is_best_seller": False,
        "size": "XL",
        "note": "Món chưa bao gồm Topping"
    },
    {
        "id": 6,
        "name": "Trà Đào Cam Sả",
        "slug": "tra-dao-cam-sa",
        "category": "tra-thanh-nhiet",
        "description": "Kết hợp tươi mát giữa trà đào ngọt dịu, vị cam thơm lừng và hương sả thanh mát. Một thức uống sảng khoái, giải nhiệt đầy hấp dẫn!",
        "price": 30000,
        "image": "/images/products/tra-dao-cam-sa.jpg",
        "is_new": False,
        "is_best_seller": True,
        "size": "XL",
        "note": "Món chưa bao gồm Topping"
    },
    {
        "id": 7,
        "name": "Bơ Dừa Non",
        "slug": "bo-dua-non",
        "category": "bo-collection",
        "description": "Bơ Đà Lạt dẻo mịn, thơm béo tự nhiên hòa quyện cùng nước cốt dừa béo ngậy, thêm topping cuốn hạt điều giòn bùi.",
        "price": 45000,
        "image": "/images/products/bo-dua-non.jpg",
        "is_new": True,
        "is_best_seller": False,
        "size": "L",
        "note": ""
    },
    {
        "id": 8,
        "name": "Trà Sữa Bơ",
        "slug": "tra-sua-bo",
        "category": "bo-collection",
        "description": "Trà sữa truyền thống kết hợp lớp bơ xay mịn béo ngậy, tạo nên hương vị lạ miệng, cuốn hút.",
        "price": 42000,
        "image": "/images/products/tra-sua-bo.jpg",
        "is_new": True,
        "is_best_seller": False,
        "size": "L",
        "note": ""
    },
    {
        "id": 9,
        "name": "Trà Ô Long Nguyên Vị",
        "slug": "tra-o-long-nguyen-vi",
        "category": "tra-nguyen-vi",
        "description": "Trà Ô Long được ủ đúng cách, giữ trọn hương thơm tự nhiên và vị chát nhẹ thanh mát đặc trưng.",
        "price": 20000,
        "image": "/images/products/tra-o-long.jpg",
        "is_new": False,
        "is_best_seller": False,
        "size": "L",
        "note": ""
    },
    {
        "id": 10,
        "name": "Sữa Tươi Trân Châu",
        "slug": "sua-tuoi-tran-chau",
        "category": "sua-tuoi",
        "description": "Sữa tươi thanh trùng béo mịn, kết hợp trân châu dẻo dai, giản đơn mà ngon khó cưỡng.",
        "price": 30000,
        "image": "/images/products/sua-tuoi-tran-chau.jpg",
        "is_new": False,
        "is_best_seller": True,
        "size": "L",
        "note": "Món chưa bao gồm Topping"
    },
    {
        "id": 11,
        "name": "Trà Sữa Khoai Môn",
        "slug": "tra-sua-khoai-mon",
        "category": "tra-sua",
        "description": "Vị khoai môn bùi bùi hòa quyện sữa thơm béo, thêm trân châu dẻo dai tạo nên thức uống đậm đà khó quên.",
        "price": 35000,
        "image": "/images/products/tra-sua-khoai-mon.jpg",
        "is_new": False,
        "is_best_seller": True,
        "size": "L",
        "note": "Món chưa bao gồm Topping"
    },
    {
        "id": 12,
        "name": "Trà Sữa Matcha",
        "slug": "tra-sua-matcha",
        "category": "tra-sua",
        "description": "Matcha Nhật Bản thượng hạng pha cùng sữa tươi, mang đến vị thanh nhẹ, thơm dịu và hậu ngọt tự nhiên.",
        "price": 38000,
        "image": "/images/products/tra-sua-matcha.jpg",
        "is_new": False,
        "is_best_seller": False,
        "size": "L",
        "note": "Món chưa bao gồm Topping"
    },
]

STORES = [
    {
        "id": 1,
        "name": "Weetini - Nguyễn Trãi",
        "address": "123 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP.HCM",
        "phone": "0888 900 111",
        "hours": "08:00 - 22:00",
        "lat": 10.7717,
        "lng": 106.6920,
        "district": "Quận 1"
    },
    {
        "id": 2,
        "name": "Weetini - Lê Văn Sỹ",
        "address": "456 Lê Văn Sỹ, Phường 14, Quận 3, TP.HCM",
        "phone": "0888 900 222",
        "hours": "08:00 - 22:00",
        "lat": 10.7890,
        "lng": 106.6734,
        "district": "Quận 3"
    },
    {
        "id": 3,
        "name": "Weetini - Phan Xích Long",
        "address": "78 Phan Xích Long, Phường 3, Quận Phú Nhuận, TP.HCM",
        "phone": "0888 900 333",
        "hours": "08:00 - 22:30",
        "lat": 10.7984,
        "lng": 106.6800,
        "district": "Phú Nhuận"
    },
    {
        "id": 4,
        "name": "Weetini - Nguyễn Oanh",
        "address": "200 Nguyễn Oanh, Phường 17, Quận Gò Vấp, TP.HCM",
        "phone": "0888 900 444",
        "hours": "08:00 - 22:00",
        "lat": 10.8380,
        "lng": 106.6684,
        "district": "Gò Vấp"
    },
    {
        "id": 5,
        "name": "Weetini - Phạm Văn Đồng",
        "address": "55 Phạm Văn Đồng, Phường Hiệp Bình Chánh, TP. Thủ Đức",
        "phone": "0888 900 555",
        "hours": "08:00 - 22:00",
        "lat": 10.8470,
        "lng": 106.7220,
        "district": "Thủ Đức"
    },
    {
        "id": 6,
        "name": "Weetini - Bình Dương",
        "address": "15 Đại Lộ Bình Dương, TX. Thuận An, Bình Dương",
        "phone": "0888 900 666",
        "hours": "08:00 - 22:00",
        "lat": 10.9800,
        "lng": 106.6530,
        "district": "Bình Dương"
    },
]

NEWS = [
    {
        "id": 1,
        "title": "Weetini khai trương chi nhánh thứ 40",
        "slug": "weetini-khai-truong-chi-nhanh-thu-40",
        "excerpt": "Weetini chính thức khai trương chi nhánh thứ 40 tại Quận 7, TP.HCM với nhiều ưu đãi hấp dẫn dành cho khách hàng.",
        "image": "/images/news/khai-truong.jpg",
        "date": "2024-12-15",
        "category": "Tin tức"
    },
    {
        "id": 2,
        "title": "Ra mắt Bơ Collection - Bộ sưu tập mùa hè",
        "slug": "ra-mat-bo-collection",
        "excerpt": "Weetini giới thiệu bộ sưu tập Bơ Collection với những thức uống mới lạ, kết hợp giữa bơ Đà Lạt và trà sữa truyền thống.",
        "image": "/images/news/bo-collection.jpg",
        "date": "2024-11-20",
        "category": "Sản phẩm mới"
    },
    {
        "id": 3,
        "title": "Weetini - Top thương hiệu trà sữa yêu thích 2024",
        "slug": "weetini-top-thuong-hieu-tra-sua",
        "excerpt": "Weetini vinh dự được bình chọn là Top thương hiệu trà sữa được yêu thích nhất năm 2024 bởi cộng đồng yêu trà sữa.",
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
        "description": "Pha chế các loại đồ uống theo công thức chuẩn của Weetini, đảm bảo chất lượng và phục vụ khách hàng.",
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
        "description": "Weetini, thành lập vào năm 2018, đã không ngừng phát triển trong suốt hơn 6 năm qua với hơn 40 cửa hàng trải rộng khắp TP. Hồ Chí Minh, Biên Hòa và Bình Dương. Với chất lượng đặc trưng và dịch vụ tận tâm, thương hiệu đã nhanh chóng chiếm được tình cảm và sự yêu mến của đông đảo khách hàng.",
        "stats": [
            {"number": 20000, "suffix": "+", "label": "Ly trà sữa", "sublabel": "bán ra mỗi ngày"},
            {"number": 40, "suffix": "+", "label": "Loại trà sữa, topping", "sublabel": "khác nhau"},
            {"number": 40, "suffix": "+", "label": "Cửa hàng", "sublabel": "trên toàn quốc"},
        ]
    },
    "vision_mission": {
        "title": "TẦM NHÌN - SỨ MỆNH",
        "description": "Trở thành chuỗi thương hiệu trà sữa TOP tại Việt Nam. Kết hợp lối sống đơn giản tạo nên chất riêng của Weetini.",
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
    "description": "Weetini mở rộng cơ hội hợp tác nhượng quyền thương hiệu trên toàn quốc. Với mô hình kinh doanh đã được chứng minh hiệu quả, chúng tôi sẵn sàng đồng hành cùng bạn trên con đường khởi nghiệp.",
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
    "brand_name": "Weetini",
    "tagline": "Thương hiệu trà sữa Việt",
    "hotline": "0888 900 111",
    "email": "contact@weetini.vn",
    "facebook": "https://facebook.com/weetini",
    "instagram": "https://instagram.com/weetini",
    "tiktok": "https://tiktok.com/@weetini",
    "address": "123 Nguyễn Trãi, Quận 1, TP.HCM",
    "working_hours": "08:00 - 22:00 (Tất cả các ngày trong tuần)",
}


# ==================== API ENDPOINTS ====================

@app.get("/")
async def root():
    return {"message": "Weetini API v1.0", "status": "running"}


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
    return {"success": True, "message": "Cảm ơn bạn đã quan tâm đến nhượng quyền Weetini! Chúng tôi sẽ liên hệ sớm."}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
