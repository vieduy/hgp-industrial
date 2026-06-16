import { createContext, useContext, useEffect, useState } from "react";

// Minimal i18n: a language ("vi" | "en") kept in context + localStorage, plus
// a tiny dictionary of UI chrome strings. Content strings come from the API as
// { vi, en } objects and are resolved via the `tr` helper below.

const UI = {
  nav_home: { vi: "Trang chủ", en: "Home" },
  nav_catalogue: { vi: "Danh mục", en: "Catalogue" },
  nav_about: { vi: "Về chúng tôi", en: "About Us" },
  nav_contact: { vi: "Liên hệ", en: "Contact" },

  hero_cta_catalogue: { vi: "Xem danh mục", en: "View Catalogue" },
  hero_cta_contact: { vi: "Liên hệ ngay", en: "Contact Us" },

  home_focus: { vi: "Chúng tôi tập trung vào", en: "We focus on" },
  home_offerings: { vi: "Sản phẩm & Giải pháp", en: "Products & Solutions" },
  home_partners: { vi: "Đối tác của chúng tôi", en: "Our Partners" },
  home_projects: { vi: "Dự án tiêu biểu", en: "Featured Projects" },
  home_commitment: { vi: "Cam kết của chúng tôi", en: "Our Commitment" },
  home_audience: { vi: "Đối tác đáng tin cậy của", en: "A trusted partner for" },
  learn_more: { vi: "Tìm hiểu thêm", en: "Learn more" },

  cat_title: { vi: "Danh mục sản phẩm", en: "Product Catalogue" },
  cat_intro: {
    vi: "Vật liệu, sơn phủ và giải pháp vật tư cho kết cấu thép và công trình công nghiệp.",
    en: "Materials, coatings and supply solutions for steel structures and industrial projects.",
  },
  cat_standard: { vi: "Tiêu chuẩn", en: "Standard" },
  cat_solution: { vi: "Giải pháp HGP", en: "HGP Solution" },
  cat_brands: { vi: "Thương hiệu đối tác", en: "Partner Brands" },
  cat_fire_ratings: { vi: "Cấp chịu lửa", en: "Fire Ratings" },
  cat_services: { vi: "Dịch vụ của chúng tôi", en: "Our Services" },
  why_hgp: { vi: "Vì sao chọn HGP", en: "Why HGP" },

  about_title: { vi: "Về chúng tôi", en: "About Us" },
  about_activities: { vi: "Lĩnh vực hoạt động", en: "Business Activities" },
  about_vision: { vi: "Tầm nhìn", en: "Vision" },
  about_mission: { vi: "Sứ mệnh", en: "Mission" },
  about_values: { vi: "Giá trị cốt lõi", en: "Core Values" },

  contact_title: { vi: "Thông tin liên hệ", en: "Contact Information" },
  contact_tax: { vi: "Mã số thuế", en: "Tax code" },
  contact_hotline: { vi: "Hotline", en: "Hotline" },
  contact_email: { vi: "Email", en: "Email" },
  contact_website: { vi: "Website", en: "Website" },
  contact_address: { vi: "Địa chỉ", en: "Address" },
  contact_map: { vi: "Xem trên bản đồ", en: "View on map" },

  footer_rights: {
    vi: "All rights reserved.",
    en: "All rights reserved.",
  },

  chat_title: { vi: "Trợ lý HGP", en: "HGP Assistant" },
  chat_subtitle: {
    vi: "Hỏi về sản phẩm, dịch vụ & liên hệ",
    en: "Ask about products, services & contact",
  },
  chat_greeting: {
    vi: "Xin chào! Tôi có thể giúp gì cho bạn về HGP Industrial?",
    en: "Hi! How can I help you with HGP Industrial?",
  },
  chat_placeholder: { vi: "Nhập tin nhắn…", en: "Type a message…" },
  chat_send: { vi: "Gửi", en: "Send" },
  chat_open: { vi: "Mở trợ lý", en: "Open assistant" },
  chat_close: { vi: "Đóng", en: "Close" },
  chat_error: {
    vi: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline 0384 928 141.",
    en: "Sorry, something went wrong. Please try again or call 0384 928 141.",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("hgp_lang") || "vi"
  );

  useEffect(() => {
    localStorage.setItem("hgp_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => setLang((l) => (l === "vi" ? "en" : "vi"));

  // Resolve a bilingual content object OR a UI key to the current language.
  const tr = (value) => {
    if (value == null) return "";
    if (typeof value === "string") return UI[value]?.[lang] ?? value;
    return value[lang] ?? value.en ?? value.vi ?? "";
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
