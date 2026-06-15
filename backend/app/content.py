"""All site content for the HGP Industrial showcase site.

Content is bilingual (Vietnamese / English) and taken from the company
profile and product catalogue PDFs. Each user-facing string is a dict of the
shape ``{"vi": "...", "en": "..."}`` so the frontend can toggle language
client-side without re-fetching.

This is the single source of truth for the site copy. Editing the website
text means editing this file.
"""

from __future__ import annotations


def t(vi: str, en: str) -> dict[str, str]:
    """Helper to build a bilingual string."""
    return {"vi": vi, "en": en}


# ---------------------------------------------------------------------------
# Company-wide identity / contact
# ---------------------------------------------------------------------------

COMPANY = {
    "name": "HGP INDUSTRIAL CO., LTD",
    "name_vi": "CÔNG TY TNHH HGP INDUSTRIAL",
    "tagline": "THINK BIG, GO FAR",
    "subtitle": t(
        "Vật liệu xây dựng • Vật tư công nghiệp • Giải pháp sơn phủ",
        "Building Materials • Industrial Supply • Coating Solutions",
    ),
    "intro": t(
        "HGP INDUSTRIAL là đơn vị chuyên cung cấp vật liệu xây dựng, sơn và "
        "giải pháp vật tư công trình với định hướng chuyên nghiệp – hiện đại – "
        "bền vững.",
        "HGP INDUSTRIAL specializes in building materials, coating products, "
        "and industrial supply solutions with a professional, modern, and "
        "sustainable orientation.",
    ),
    "philosophy": t(
        "Chất lượng sản phẩm – Uy tín dịch vụ – Đồng hành lâu dài",
        "Quality Products – Reliable Service – Long-term Partnership",
    ),
    "focus": [
        t("Vật liệu xây dựng", "Building materials"),
        t(
            "Giải pháp sơn chống cháy & sơn chống ăn mòn công nghiệp",
            "Fireproofing & industrial protective coating solutions",
        ),
        t("Vật tư hoàn thiện", "Finishing materials"),
        t(
            "Giải pháp cung ứng cho công trình và dự án",
            "Supply solutions for construction projects",
        ),
    ],
    "audience": [
        t("Nhà thầu xây dựng", "Contractors"),
        t("Đại lý & cửa hàng vật liệu", "Dealers & material stores"),
        t("Công trình dân dụng", "Residential projects"),
        t("Dự án công nghiệp", "Industrial projects"),
        t("Khách hàng doanh nghiệp", "Corporate clients"),
    ],
    "contact": {
        "tax_code": "0318718191",
        "hotline": "0384 928 141",
        "email": "HGP.ind.vn@gmail.com",
        "website": "www.hgpindustrial.com.vn",
        "address": t(
            "175 đường số 2, Phường Tăng Nhơn Phú, TP. Hồ Chí Minh",
            "175 Street No. 2, Tang Nhon Phu Ward, Ho Chi Minh City",
        ),
        "maps_url": (
            "https://www.google.com/maps/search/"
            "175+street+no+2,+Tang+Nhon+Phu+Ward,+Ho+Chi+Minh+city"
        ),
    },
}


# ---------------------------------------------------------------------------
# About: vision / mission / values / commitment
# ---------------------------------------------------------------------------

ABOUT = {
    "business_activities": [
        {
            "title": t("Tư vấn kỹ thuật & giải pháp", "Technical Consulting & Solutions"),
            "text": t(
                "Hỗ trợ tư vấn kỹ thuật, lựa chọn vật tư và giải pháp tối ưu "
                "nhằm nâng cao hiệu quả thi công và chất lượng công trình.",
                "Providing technical support, material selection, and optimized "
                "solutions to improve construction efficiency and project quality.",
            ),
        },
        {
            "title": t("Vật liệu xây dựng", "Building Materials"),
            "text": t(
                "Cung cấp đa dạng vật tư phục vụ công nghiệp.",
                "Supplying a diverse range of materials for industrial projects.",
            ),
        },
        {
            "title": t(
                "Cung ứng sơn & vật liệu hoàn thiện",
                "Coatings & Finishing Materials",
            ),
            "text": t(
                "Phân phối & thi công các dòng sơn chống cháy, sơn chống ăn mòn "
                "và vật liệu hoàn thiện chất lượng cao.",
                "Distributing and applying high-quality fireproofing paint, "
                "protective coating and finishing solutions.",
            ),
        },
    ],
    "vision": t(
        "Trở thành đơn vị cung ứng vật liệu và giải pháp công trình uy tín, "
        "hiện đại và chuyên nghiệp hàng đầu tại Việt Nam.",
        "To become one of Vietnam's leading professional and reliable suppliers "
        "of building materials and industrial solutions.",
    ),
    "mission": [
        t("Sản phẩm chất lượng", "Quality products"),
        t("Giải pháp tối ưu", "Optimized solutions"),
        t("Dịch vụ nhanh chóng", "Fast service"),
        t("Chi phí cạnh tranh", "Competitive pricing"),
        t("Sự đồng hành bền vững", "Long-term partnership"),
    ],
    "core_values": [
        {
            "key": "QUALITY",
            "text": t(
                "Cam kết chất lượng sản phẩm và dịch vụ.",
                "Commitment to product and service quality.",
            ),
        },
        {
            "key": "PROFESSIONAL",
            "text": t(
                "Tác phong chuyên nghiệp trong từng quy trình.",
                "Professionalism in every process.",
            ),
        },
        {
            "key": "TRUST",
            "text": t(
                "Uy tín là nền tảng phát triển lâu dài.",
                "Trust is the foundation of sustainable growth.",
            ),
        },
        {
            "key": "DEVELOPMENT",
            "text": t(
                "Không ngừng cải tiến và phát triển.",
                "Continuous innovation and development.",
            ),
        },
    ],
    "commitment": [
        t("Sản phẩm chính hãng", "Genuine products"),
        t("Giá thành cạnh tranh", "Competitive pricing"),
        t("Giao hàng nhanh chóng", "Fast delivery"),
        t("Hỗ trợ tận tâm", "Dedicated support"),
        t("Đồng hành lâu dài", "Long-term partnership"),
    ],
    "thank_you": t(
        "HGP INDUSTRIAL xin chân thành cảm ơn Quý khách hàng và Quý đối tác đã "
        "luôn tin tưởng, đồng hành và hợp tác cùng chúng tôi. Chúng tôi cam kết "
        "tiếp tục xây dựng mối quan hệ hợp tác lâu dài dựa trên uy tín, chất "
        "lượng và sự phát triển bền vững.",
        "HGP INDUSTRIAL sincerely appreciates the trust, support, and "
        "partnership of our valued customers and partners. We are committed to "
        "building long-term partnerships based on trust, quality, and "
        "sustainable development.",
    ),
}


# ---------------------------------------------------------------------------
# Partners
# ---------------------------------------------------------------------------

PARTNERS = [
    {"name": "JOTUN", "logo": "/partners/jotun.png"},
    {"name": "AkzoNobel", "logo": "/partners/akzonobel.png"},
    {"name": "PPG", "logo": "/partners/ppg.png"},
    {"name": "NIPPON PAINT", "logo": "/partners/nippon.png"},
    {"name": "Seamaster", "logo": "/partners/seamaster.png"},
    {"name": "SAMHWA", "logo": "/partners/samhwa.png"},
    {"name": "DESAM", "logo": "/partners/desam.png"},
    {"name": "KCC Paint", "logo": "/partners/kcc.png"},
]


# ---------------------------------------------------------------------------
# Featured projects
# ---------------------------------------------------------------------------

PROJECTS = [
    {
        "name": "PepsiCo Ha Nam",
        "location": t("Hà Nam", "Ha Nam"),
        "image": "/projects/pepsico.jpg",
    },
    {
        "name": "BW Industrial Nghe An",
        "location": t("Nghệ An", "Nghe An"),
        "image": "/projects/bw-industrial.jpg",
    },
    {
        "name": t(
            "Nhà máy nhiệt điện Quảng Trạch",
            "Quang Trach Thermal Power Plant",
        ),
        "location": t("Quảng Bình", "Quang Binh"),
        "image": "/projects/quang-trach.jpg",
    },
    {
        "name": "Settsu Carton Vietnam",
        "location": t("Việt Nam", "Vietnam"),
        "image": "/projects/settsu-carton.jpg",
    },
    {
        "name": "Takigawa Factory No. 3",
        "location": t("Việt Nam", "Vietnam"),
        "image": "/projects/takigawa.jpg",
    },
]


# ---------------------------------------------------------------------------
# Catalogue — three product / service categories
# ---------------------------------------------------------------------------

_PROTECTIVE_COATINGS = {
    "id": "protective-coatings",
    "title": t("Sơn phủ bảo vệ – Hệ sơn", "Protective Coatings – Paint System"),
    "tagline": t(
        "Bảo vệ kết cấu thép cho tuổi thọ dài lâu.",
        "Protecting steel for a longer service life.",
    ),
    "intro": t(
        "Mọi hệ sơn đều bắt đầu từ việc hiểu rõ môi trường. Kết cấu thép liên "
        "tục chịu tác động của độ ẩm, tia UV, ô nhiễm công nghiệp, hóa chất và "
        "môi trường biển. Lựa chọn đúng hệ sơn là yếu tố then chốt để tối đa "
        "hóa tuổi thọ tài sản, giảm chi phí bảo trì và đảm bảo bảo vệ kết cấu "
        "lâu dài.",
        "Every coating system starts with understanding the environment. Steel "
        "structures are continuously exposed to moisture, UV radiation, "
        "industrial pollutants, chemicals, and marine atmospheres. Selecting "
        "the right coating system is essential to maximize asset life, reduce "
        "maintenance costs, and ensure long-term structural protection.",
    ),
    "standard": "ISO 12944",
    "standard_note": t(
        "Tiêu chuẩn quốc tế về chống ăn mòn cho kết cấu thép — quy định việc "
        "lựa chọn, thiết kế và thi công hệ sơn bảo vệ.",
        "International standard for corrosion protection of steel structures — "
        "specifying the selection, design, and application of protective "
        "coating systems.",
    ),
    "steps": [
        t("Chọn môi trường", "Select Environment"),
        t("Chọn độ bền", "Select Durability"),
        t("Chọn hệ sơn", "Select Coating System"),
    ],
    "tables": [
        {
            "title": t(
                "Phân loại độ ăn mòn theo ISO 12944",
                "Corrosivity categories according to ISO 12944",
            ),
            "columns": [
                t("Cấp", "Category"),
                t("Mức độ ăn mòn", "Corrosivity Level"),
                t("Môi trường điển hình", "Typical Environment"),
            ],
            "rows": [
                ["C1", t("Rất thấp", "Very Low"), t("Văn phòng, trường học, khách sạn", "Offices, schools, hotels")],
                ["C2", t("Thấp", "Low"), t("Nhà kho, khu vực nông thôn", "Warehouses, rural areas")],
                ["C3", t("Trung bình", "Medium"), t("Đô thị, cơ sở công nghiệp nhẹ", "Urban areas, light industrial facilities")],
                ["C4", t("Cao", "High"), t("Khu công nghiệp, ven biển", "Industrial zones, coastal areas")],
                ["C5", t("Rất cao", "Very High"), t("Nhà máy hóa chất, cảng biển, độ ẩm & muối cao", "Chemical plants, seaports, high humidity and salt environments")],
                ["CX", t("Cực cao", "Extreme"), t("Công trình ngoài khơi, môi trường biển khắc nghiệt", "Offshore structures, severe marine environments")],
            ],
        },
        {
            "title": t(
                "Tuổi thọ bảo vệ theo ISO 12944",
                "Protective lifetime according to ISO 12944",
            ),
            "columns": [
                t("Độ bền", "Durability"),
                t("Số năm đến lần bảo trì lớn đầu tiên", "Years to first major maintenance"),
            ],
            "rows": [
                [t("Thấp (L)", "Low (L)"), "≤ 7"],
                [t("Trung bình (M)", "Medium (M)"), "7 – 15"],
                [t("Cao (H)", "High (H)"), "15 – 25"],
                [t("Rất cao (VH)", "Very High (VH)"), "> 25"],
            ],
        },
    ],
    "solution": [
        t(
            "Tư vấn lựa chọn hệ sơn bảo vệ theo cấp ăn mòn C2 – C5.",
            "Consultation on selecting protective coating systems for corrosivity categories C2 – C5.",
        ),
        t(
            "Cung cấp vật liệu sơn chống ăn mòn cho kết cấu thép tuân thủ ISO 12944.",
            "Supply of anti-corrosion coating materials for steel structures in compliance with ISO 12944.",
        ),
        t(
            "Hỗ trợ kỹ thuật xây dựng quy cách và lựa chọn hệ sơn.",
            "Technical support for coating specification development and system selection.",
        ),
        t(
            "Tư vấn đạt tuổi thọ và mục tiêu độ bền của dự án.",
            "Recommendations to achieve the required service life and project durability objectives.",
        ),
        t(
            "Giải pháp sơn cho nhà máy, kho bãi, hạ tầng, ven biển và môi trường biển.",
            "Coating solutions tailored for industrial plants, warehouses, infrastructure, coastal, and marine environments.",
        ),
    ],
    "brands": ["JOTUN", "AKZONOBEL", "PPG", "NIPPON", "SEAMASTER", "SAMHWA"],
    "why_hgp": [
        t("Chuyên môn kỹ thuật", "Technical Expertise"),
        t("Thương hiệu sơn toàn cầu", "Global Coating Brands"),
        t("Giải pháp theo dự án", "Project-Based Solutions"),
        t("Hỗ trợ kỹ thuật nhanh chóng", "Responsive Technical Support"),
    ],
    "slogan": t(
        "Bảo vệ thép. Gìn giữ giá trị. Xây dựng tương lai.",
        "Protecting Steel. Preserving Value. Building for the Future.",
    ),
}

_FASTENERS = {
    "id": "fasteners",
    "title": t("Bu lông & Phụ kiện", "Fasteners – Bolts & Accessories"),
    "tagline": t(
        "Kết nối chắc chắn cho kết cấu bền vững.",
        "Reliable connections for lasting structures.",
    ),
    "intro": t(
        "Việc bảo vệ kết cấu thép không chỉ phụ thuộc vào hệ sơn mà còn vào "
        "chất lượng của các mối liên kết cơ khí. HGP cung cấp các giải pháp liên "
        "kết được thiết kế để đảm bảo tính toàn vẹn của kết cấu thép trong suốt "
        "vòng đời sử dụng.",
        "The protection of steel structures depends not only on coating systems "
        "but also on the quality of their mechanical connections. At HGP, we "
        "deliver fastening solutions engineered to support the integrity of "
        "steel structures throughout their service life.",
    ),
    "tables": [
        {
            "title": t("Bu lông neo (Anchor Bolts)", "Anchor Bolts"),
            "columns": [t("Thông số", "Property"), t("Chi tiết", "Detail")],
            "rows": [
                [t("Tiêu chuẩn", "Standard"), "DIN, ASTM A307, ASTM A325, ASTM F1554, JIS B1178, TCVN 1916"],
                [t("Kiểu", "Type"), "Type-I, Type-J, Type-JA, Type-L"],
                [t("Lớp phủ", "Coating"), t("Đen oxy hóa, Mạ kẽm nhúng nóng, Mạ kẽm", "Black oxide, Hot-dip galvanized, Zinc plate")],
                [t("Cấp bền", "Grade"), "4.6, 5.6, 8.8, 10.9, A36"],
                [t("Vật liệu", "Material"), t("Thép carbon, SUS 304", "Carbon steel, SUS 304")],
                [t("Đường kính", "Bolt diameter"), "M10 – M48"],
            ],
        },
        {
            "title": t("Bu lông liên kết (Connecting Bolts)", "Connecting Bolts"),
            "columns": [t("Thông số", "Property"), t("Chi tiết", "Detail")],
            "rows": [
                [t("Tiêu chuẩn", "Standard"), "DIN 933, DIN 931, ASTM A307/A325/A490, JIS B1186 F10T/S10T, ISO"],
                [t("Lớp phủ", "Coating"), t("Đen oxy hóa, Mạ kẽm, Mạ kẽm nhúng nóng, Dacromet", "Black oxide, Zinc plated, Hot-dip galvanized, Dacromet")],
                [t("Cấp bền", "Grade"), "4.6, 8.8, 10.9, 12.9"],
                [t("Phụ kiện", "Accessories"), t("Đai ốc, Long đen bản, Long đen vuông, Long đen vênh", "Nuts, Plate washer, Square washer, Spring washer")],
            ],
        },
        {
            "title": t("Cáp & Thanh giằng (Wire Rope & Bracing Rod)", "Wire Rope & Bracing Rod"),
            "columns": [t("Hạng mục", "Item"), t("Chi tiết", "Detail")],
            "rows": [
                [t("Cáp – Loại", "Wire rope – Type"), "6x12 + FC, 6x37 + IRC"],
                [t("Cáp – Lớp phủ", "Wire rope – Coating"), t("Trần, Mạ kẽm, SUS 304, Bọc PVC", "Plain, Galvanized, SUS 304, PVC cover")],
                [t("Cáp – Phụ kiện", "Wire rope – Accessories"), t("Tăng đơ, Khóa cáp, Bu lông mắt", "Turnbuckle, Wire rope clip, Eye bolts")],
                [t("Thanh giằng – Kích thước", "Bracing rod – Size"), "M10 – M36"],
                [t("Thanh giằng – Cấp bền", "Bracing rod – Grade"), "4.6, 5.6, 6.6, 8.8"],
                [t("Thanh giằng – Lớp phủ", "Bracing rod – Coating"), t("Đen oxy hóa, Mạ kẽm, Nhúng nóng", "Black oxide, Zinc plate, Hot dip")],
            ],
        },
        {
            "title": t("Phụ kiện khác", "Other Accessories"),
            "columns": [t("Loại", "Item"), t("Chi tiết", "Detail")],
            "rows": [
                [t("Bu lông nở (Expansion)", "Expansion bolts"), "M8–M16, " + "Zinc plate / Hot dip"],
                [t("Bu lông hóa chất (Chemical)", "Chemical bolts"), "M12–M24, Fischer / Ramset / Hilti"],
                [t("Vít (Screw)", "Screw"), "AS1566, Class 3 & Class 4"],
                [t("Đinh chống cắt (Shear Stud)", "Shear stud"), "ISO / GB, M16, M19, M22, M25"],
            ],
        },
    ],
    "why_hgp": [
        t("Thu mua đơn giản", "Simple Procurement"),
        t("Sản xuất linh hoạt theo yêu cầu", "Flexible Manufacturing"),
        t("Giao hàng nhanh", "Fast Delivery"),
        t("Chất lượng ổn định", "Consistent Quality"),
    ],
    "slogan": t(
        "Bảo vệ hiệu quả – Liên kết tin cậy – Kết cấu bền vững.",
        "Effective Protection – Reliable Connections – Lasting Structures.",
    ),
}

_FIREPROOFING = {
    "id": "fireproofing",
    "title": t("Sơn chống cháy (Dịch vụ thi công)", "Fireproofing Paint (Application Service)"),
    "tagline": t(
        "Sơn chống cháy bảo vệ con người và kết cấu.",
        "Fireproofing coatings protect people and structures.",
    ),
    "intro": t(
        "Trong khi ăn mòn ảnh hưởng đến thép theo thời gian, lửa có thể phá hủy "
        "tính toàn vẹn của kết cấu chỉ trong vài phút. Lớp sơn chống cháy giúp "
        "duy trì khả năng chịu lực của kết cấu thép trong đám cháy, tạo thời "
        "gian quý giá cho việc sơ tán, ứng phó khẩn cấp và bảo vệ tài sản.",
        "While corrosion affects steel over time, fire can compromise "
        "structural integrity within minutes. Fireproofing coatings help "
        "maintain the load-bearing capacity of steel structures during a fire, "
        "providing valuable time for evacuation, emergency response, and asset "
        "protection.",
    ),
    "standard": "QCVN 06:2022/BXD",
    "standard_note": t(
        "Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình.",
        "National Technical Regulation on Fire Safety for Buildings and Structures.",
    ),
    "fire_ratings": ["R15", "R30", "R45", "R60", "R90", "R120"],
    "services": [
        t("Tư vấn thiết kế khả năng chịu lửa", "Fire resistance design consultation"),
        t("Tối ưu chi phí theo cấp chịu lửa yêu cầu", "Cost optimization based on required fire rating"),
        t("Cung cấp vật liệu và thi công", "Material supply and application"),
        t("Kiểm soát chất lượng và hồ sơ dự án", "Quality control and project documentation"),
    ],
    "brands": ["JOTUN", "DESAM", "SAMHWA"],
    "why_hgp": [
        t("Tuân thủ QCVN 06:2022/BXD", "Compliance with QCVN 06:2022/BXD"),
        t("Giải pháp tối ưu chi phí chống cháy", "Optimized Fireproofing Cost Solutions"),
        t("Nguồn vật liệu tin cậy", "Reliable Material Supply"),
        t("Dịch vụ thi công chuyên nghiệp", "Professional Application Service"),
        t("Hỗ trợ kỹ thuật suốt dự án", "Technical Support Throughout the Project"),
    ],
}

CATALOGUE = [_PROTECTIVE_COATINGS, _FASTENERS, _FIREPROOFING]
