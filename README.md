# Dự án Template Platform - Strive - tương tự Behance -SasS Platform - MAI THÊM THỦ CÔNG CATEGORIES VÀO KHI CÓ API TRẢ VỀ

# MAI LÀM TRANG PREVIEW TEMPLATES

[CHỈNH SỬA MENU THÊM Inspiration NHƯ CỦA DRIBBBLE ĐỂ HIỂN THỊ NHỮNG TÁC PHẨM ĐOẠI NHƯ VẬY

LÚC ĐẦU LÀM FORM ĐỂ TẠO TEMPLATE NHƯNG HIỆN FLOW KHÔNG CÒN HỢP LÝ NỮA GIỜ SẼ CHUYỂN SANG TẠO CÁC `Inspiration` VÀ FORM UPDATE VÀ XOÁ CŨNG VẬY

- FORM SẼ ĐƯỢC CHỈNH SỬA THÀNH `title, categories, description, link, image, slug`

- NAVIGATION ĐẦU TIÊN SẼ QUẢN LÝ TEMPLATE ĐÃ TẠO ĐƯỢC QUẢN LÝ BÊN `LEMON SQUEEZY` và gọi API từ `LEMON SQUEEZY` về để hiển thị ra
- Làm end point dể có thê download file về
- NAVIGATION THỨ 2 SẼ QUẢN LÝ CÁC `Inspiration` đã được tạo có các chức năng như thếm sửa xoá.
- Phần header khi chuyển hướng tới trang hiển thị `Inspiration`

- Trang `Inspiration` sẽ có đầu tiên là filter theo tag và 1 filter nữa sẽ lọc theo tên của `Inspiration`, tiếp theo là hiển ra danh sách `Inspiration` tương ứng như Dribble sẽ có là `Image, avatar author, title , heart , watch`, bên dưới sẽ có button loadmore để thị thêm 10 cái nữa chẳng hạn
  ]
  chỉnh sửa sidebar dashboard navigation

chỗ Creating và update sẽ chỉnh sửa thành Product bên trong sẽ có 1 button create dẫn tới trang create, trang product này sẽ là trang chính để quản lý product như mockup ,image ....

# LAM THEM SKELETON

# Ý TƯỞNG

- Tạo một SasS Platform tên là [Strive], chuyên cung cấp và chia sẽ nhưng template đẹp , UI xịn xò , người dùng có thể xem trước template đó và tải nó về để sử dụng cho riêng mình hoặc cho dự án lớn, gồm những template có tính phí và nhưng template miễn phí , trước mắt là như thế suy nghĩ ra được gì thì ghi vào đây tiếp tục.

# CHỨC NĂNG

- Admin (Trần Thiện Đức) có trang dashboard quản lý các template đã tạo , chức năng thêm sửa xoá , Làm chức năng chỉ admin mới hiển thị trang dashboard quản lý , user thì chỉ có trang xem và mua, `tương lai` có thể thêm `Mã giảm giá theo % add cho từng gmail của user`

- Đăng nhập , không cần đăng ký
- User có thể đăng nhập vào website để xem và lưu giữ template đẹp về profile của mình ,mỗi user sẽ có 1 trang profile để quản lý những template nào mình đã thả tim và nhưng template nào mình đã tải về
- User có thể xem các template khi vào button `Chi tiết` thì sẽ tới page là `Show case - để show nhưng thông tin của template đó tương tự như của framer https://www.framer.com/templates/guery/`, các quyền như `Thêm, sửa, xoá chỉ nằm ở phía admin,còn user chỉ có thễ xem, thả tim , và tải về template đã chọn chứ không thể có các quyềnn như trên` ,
- Khi user click vào trang để xem template thì sẽ lưu thành 1 lượt xem ,và hiển thị nó ở phần danh sách template
  -Tất nhiên phải có filter để ra từng loại template và search template
  {
  `TƯƠNG LAI`
- Sẽ có ưu đãi cho member nào mua gói của Allow , tuỳ theo từng loại gói sẽ có ưu đãi khác nhau
- Sẽ có trang khi click Buy template thì nó sẽ dẫn tới page mua hàng có các thông tin như visa, MasterCard v.v dùng Shopify để làm.
  }

- Có trang dashboard để các template đã thích và các template đã mua

# CÔNG NGHỆ

[version@latest]

`convex - noSQL database` => [version@latest]
`typescript` => [version@5.2]
`nextjs - route page` => [version@14.2.0]
`tailwindcss` => [version@3.4]
`shacnUI - UI component libaries` => [version@latest]
`Lemon Squeezy - quản lý sản phẩm và có thanh toán (payment)` => [version@latest]
`edgestore - lưu ảnh lên cloud(free)` => [version@latest]
`react-hook-form - thư viện xử lý form` => [version@latest]
`clerk - chức năng đăng ký , đăng nhập` => [version@latest]
`zustand - chức năng tương tự như redux` => [version@latest]
`zod - chức năng tương tự như redux` => [version@latest]

- Các thư viện nhỏ:
- thư viện để hiển thị ảnh khi click vào ``
-
-

# KINH PHÍ

- Database no-sql thì sử dụng Convex - Không mất phí
- Deploy lên `vercel` free không mất phí

# THIẾT KẾ

- Tham khảo giao diện (UI) từng trang Framer.com chuyên về template [Framer/Template]

# KHÓ KHĂN

- Làm một mình nên từ mò tất cả mọi thứ

# THÀNH QUẢ

- Được 1 trang website Template dành cho bản thân hoặc cũng có thể chia sẽ cho mọi người , cải thiện kỹ năng _UI-UX_ và kỹ năng code, luyện kỹ năng code cho mau lên trình.
