# STITCH PROMPT — Dinh Dưỡng AI Web App

## Prompt chính (dán vào Stitch)

```
Thiết kế web app "Dinh Dưỡng AI" — ứng dụng tư vấn dinh dưỡng cá nhân hoá cho người Việt Nam.

**Màu sắc & thương hiệu:**
- Màu chủ đạo: xanh lá #1D9E75 (tươi, khỏe mạnh)
- Màu tối: #0F6E56
- Nền nhạt: #E1F5EE và #f8faf9
- Font: Be Vietnam Pro (400, 500, 600)
- Logo: icon bát cơm + lá xanh

**Cấu trúc layout:**
- Header sticky: logo trái, badge "AI sẵn sàng" phải
- Navigation bar sticky (dưới header): 6 tab ngang có thể cuộn
- Main content: max-width 680px căn giữa, padding 16px
- Mobile-first, responsive

**6 màn hình / tab cần thiết kế:**

1. TAB "Chat AI" — màn hình chính
   - Khung chat có avatar AI (icon lá xanh) và user
   - Bubble tin nhắn: AI màu xám nhạt, User màu xanh #1D9E75
   - Input row: ô nhập + nút gửi xanh
   - Quick pills bên dưới: gợi ý câu hỏi nhanh (Tôi bị tiểu đường, Cần giảm cân, Thực đơn hôm nay...)
   - Thanh cuộn mảnh màu xanh nhạt

2. TAB "Tra cứu" — lookup thực phẩm
   - Input nhập tên thực phẩm + nút "AI tra cứu"
   - Result box: 4 stat cards (Calories, Protein, Carbs, Chất béo) dạng grid 2x2
   - Dưới stats: bảng chi tiết các chỉ số nhỏ hơn
   - Nút "Lưu vào nhật ký"

3. TAB "Nhật ký" — food diary
   - Danh sách món đã ăn theo thời gian (sáng/trưa/tối)
   - Mỗi row: icon bữa ăn + tên món + calo + nút xoá
   - Footer tổng kết: tổng calo hôm nay vs. mục tiêu, thanh progress
   - Màu progress: xanh nếu dưới mục tiêu, vàng nếu gần, đỏ nếu vượt

4. TAB "Kho thực phẩm VN" — database
   - Search bar tìm kiếm
   - Filter pills: Ngũ cốc / Thịt / Hải sản / Rau củ / Trái cây / Đồ uống
   - Grid 2 cột: card mỗi thực phẩm gồm nhóm badge + tên + calo/100g
   - Click mở detail panel bên dưới: stats + cảnh báo dinh dưỡng + nút "Hỏi AI"

5. TAB "So sánh" — product compare
   - 3 input fields: Sản phẩm 1, 2, 3 (optional)
   - Dropdown mục tiêu: Giảm cân / Tăng cơ / Tim mạch / Tiểu đường
   - Nút "So sánh bằng AI"
   - Result: bảng so sánh markdown + kết luận AI

6. TAB "Quét nhãn" — label scanner
   - Upload zone lớn: icon camera + "Chụp hoặc tải ảnh nhãn thực phẩm"
   - Preview ảnh sau khi upload
   - Nút "AI phân tích nhãn"
   - Result box hiển thị phân tích

**Style chi tiết:**
- Cards: border-radius 16px, border 1px solid #eef0ee, shadow nhẹ
- Buttons: border-radius 10px, padding 11px 20px
- Inputs: border-radius 10px, focus ring xanh #1D9E75
- Stat cards: số lớn 22px bold màu #1D9E75, label nhỏ xám
- Cảnh báo dinh dưỡng: background vàng nhạt #FFF3CD, text #856404, icon ⚠️
- Animations: fade-up nhẹ khi hiện result
- Empty states: icon + text hướng dẫn thân thiện

Thiết kế clean, tối giản, chuyên nghiệp. Không dùng màu sắc loè loẹt. Ưu tiên readability và UX tốt trên mobile.
```

---

## Sau khi Stitch tạo xong UI

### Bước 1: Export HTML từ Stitch
- Bấm **Export** → **Download as HTML**
- Giải nén → có `index.html`, `styles.css`, các assets

### Bước 2: Thay thế API endpoint
Trong `index.html`, tìm và thay tất cả:
```
/.netlify/functions/gemini
```
Bằng:
```
/api/gemini
```

### Bước 3: Cấu trúc thư mục Vercel
```
project/
├── index.html          ← từ Stitch export
├── favicon.svg         ← giữ nguyên
├── logo.svg            ← giữ nguyên
├── vercel.json         ← file đã tạo
└── api/
    └── gemini.js       ← file đã tạo
```

### Bước 4: Deploy lên Vercel
1. Vào vercel.com → New Project
2. Import từ GitHub hoặc drag & drop thư mục
3. Vào **Settings → Environment Variables**
4. Thêm: `GEMINI_API_KEY` = your_api_key_here
5. Bấm Deploy → xong!
