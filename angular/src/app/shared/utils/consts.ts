// import { FormKeyDto } from '@proxy/administration/dtos';
// import { HinhThucBaoCao, MucDichXinYKienBaoCao, TrangThai } from '@proxy/administration/utilities';

// export const PREFIX_FILE_UPLOAD_PATH = 'Upload';
// export const maxFileSizeInMegabytes = 100;
// export const maxFileSizeInKilobytes = 100 * 1024;
// export const maxFileSizeInBytes = 100 * 1024 * 1024;
// export const defaultRowsPerPage = 15;
// export const rowsPerPageOptions = [5, 10, 15, 25, 50, 100, 250, 500];
// export const trangThaiOptions: { key: string; value: number }[] = [
//   { key: '::Enum:TrangThai.HoatDong', value: TrangThai.HoatDong },
//   { key: '::Enum:TrangThai.KhongHoatDong', value: TrangThai.KhongHoatDong },
// ];

// export const mucDichXinYKienBaoCaoOptions = [
//   { value: MucDichXinYKienBaoCao.BaoCaoXinYKien, label: 'Báo cáo xin ý kiến' },
//   { value: MucDichXinYKienBaoCao.BaoCaoTheoYCTD, label: 'Báo cáo theo YCTĐ' },
//   { value: MucDichXinYKienBaoCao.BaoCaoBatThuong, label: 'Báo cáo bất thường' },
// ];

// export const hinhThucBaoCaoOptions = [
//   { value: HinhThucBaoCao.BaoCaoMoi, label: 'Báo cáo mới' },
//   { value: HinhThucBaoCao.ThayThe, label: 'Báo cáo thay thế' },
// ];

// export const loaiBaoCaoOptions = [
//   { value: 1, label: 'Họp ĐHĐCĐ thường niên' },
//   { value: 2, label: 'Họp ĐHĐCĐ bất thường' },
//   { value: 3, label: 'Họp ĐHĐCĐ khác' },
// ];

// // BaoCaoUtilsConsts
// export const BaoCaoUtilsConsts = {
//   BaoCao: 'BaoCao',
//   DuoiTenBaoCao: 'VB001',
//   TieuChiBaoCaosTableName: 'TieuChiBaoCaos',
// } as const;

// // TrangThaiCongViecUtilsConsts
// export const TrangThaiCongViecUtilsConsts = {
//   ChuaXuLy: 'CV_ChuaXuLy',
//   DangXuLy: 'CV_DangXuLy',
//   SoanThao: 'CV_SoanThao',
//   DaKySo: 'CV_KySo',
//   DaGui: 'CV_DaGui',
//   PhoiHop: 'CV_PhoiHop',
//   DangPhoiHop: 'CV_DangPhoiHop',
//   DaPhoiHop: 'CV_DaPhoiHop',
//   KySo: 'CV_KySo',
//   ChoKySo: 'CV_ChoKySo',
//   TuChoi: 'CV_TuChoi',
//   TraLai: 'CV_TraLai',
//   BoSung: 'CV_BoSung',
//   DangBoSung: 'CV_DangBoSung',
//   DaBoSung: 'CV_DaBoSung',
//   VuongMac: 'CV_VuongMac',
//   YeuCauBoSung: 'CV_YeuCauBoSung'
// } as const;

// // TrangThaiBaoCaoUtilsConsts
// export const TrangThaiBaoCaoUtilsConsts = {
//   // NguoiDaiDien
//   SoanThao: 'SoanThao',

//   // VanThu
//   ChoVanThuTiepNhan: 'ChoVanThuTiepNhan',
//   VanThuDaTiepNhan: 'VanThuDaTiepNhan',
//   VanThuTraLai: 'VanThuTraLai',
//   VanThuDaGui: 'VanThuDaGui',

//   // BanChuTri
//   ChoBanChuTriTiepNhan: 'ChoBanChuTriTiepNhan',
//   BanChuTriDaTiepNhan: 'BanChuTriDaTiepNhan',
//   BanChuTriPhanCong: 'BanChuTriPhanCong',

//   // TapDoan
//   ChoTapDoanTiepNhan: 'ChoTapDoanTiepNhan',
//   ChoTapDoanPheDuyet: 'ChoTapDoanPheDuyet',
//   TapDoanPheDuyet: 'TapDoanPheDuyet',

//   // BanChucNang
//   BanChucNangChoTiepNhan: 'BanChucNangChoTiepNhan',
//   BanChucNangDaTiepNhan: 'BanChucNangDaTiepNhan',
//   BanChucNangDaPhanCong: 'BanChucNangDaPhanCong',

//   //#region ChuyenVien
//   ChuyenVienDaTiepNhan: 'ChuyenVienDaTiepNhan',
//   ChuyenVienDaGui: 'ChuyenVienDaGui',
//   // #endregion

//   //#region LanhDaoBanChucNangDuyetKetQua
//   BanChucNangDangChinhSua: 'BanChucNangDangChinhSua',
//   BanChucNangDaKySo: 'BanChucNangDaKySo',
//   BanChucNangDaTrinhKy: 'BanChucNangDaTrinhKy',
//   //#endregion

//   BanChuTriDuyet: 'BanChuTriDuyet',

//   BanChucNangKySo: 'BanChucNangKySo',

//   ChuyenVienChuTriDaGui: 'ChuyenVienChuTriDaGui',

//   ChoBanChucNangKySo: 'ChoBanChucNangKySo',

//   TongGiamDocKyDuyet: 'TongGiamDocKyDuyet',

//   ChoTongGiamDocKyDuyet: 'ChoTongGiamDocKyDuyet',

//   //9.2
//   ChoVPHDQT_TiepNhan: 'ChoVPHDQT_TiepNhan',
//   ChoVPHDQT_XuLy: 'ChoVPHDQT_XuLy',
//   VPHDQT_TraLoi: 'VPHDQT_TraLoi',
//   VPHDQT_TuChoi: 'VPHDQT_TuChoi',

//   //10.1
//   ChuyenVienChuTriTongHopCV: 'ChuyenVienChuTriTongHopCV',
//   ChuyenVienChuTriDaGuiCV: 'ChuyenVienChuTriDaGuiCV',

//   //10.2
//   BanChuTriDuyetCV: 'BanChuTriDuyetCV',

//   // 11
//   ChoTongGiamDocKyDuyetHDQT: 'ChoTongGiamDocKyDuyetHDQT',
//   TongGiamDocKyDuyetHDQT: 'TongGiamDocKyDuyetHDQT',

//   // 12
//   ChoVanThuLaySoCongVanDi: 'ChoVanThuLaySoCongVanDi',
//   VanThuLaySoCongVanDi: 'VanThuLaySoCongVanDi',

//   //13
//   ChoNDDTiepNhan :'ChoNDDTiepNhan'

//   // NhomnLanhDaoBanDuocPhanCong
// } as const;

// // PermissionProviderConstant
// export const PermissionProviderConstant = {
//   ROLE: 'R',
//   USER: 'U',
// } as const;

// // TypeTrangThaiConsts
// export const TypeTrangThaiConsts = {
//   BaoCao: 'BaoCao',
//   CongViec: 'CongViec',
// } as const;

// // GiaTriPhanQuyenConsts
// export const GiaTriPhanQuyenConsts = {
//   NguoiDaiDien: 'ndd',
//   VanThu: 'vanthu',
//   LDBanChuTri: 'LDBanchutri',
//   LDTapDoan: 'LDTapdoan',
//   NhomLanhDaoBanDuocPhanCong: 'nhomlanhdaobanduocphancong',
// } as const;

// // LoaiPhanQuyenConsts
// export const LoaiPhanQuyenConsts = {
//   VaiTro: 'vaitro',
//   NhomNguoiDung: 'nhomnguoidung',
//   ToChuc: 'tochuc', // Không phải doanh nghiệp
// } as const;

// export const FormKey: FormKeyDto = {
// };

// // TrangThai BaoCaoBatThuong

// export const TrangThaiBaoCaoBatThuong = {
//   BTSoanThao: 'BT_SoanThao',
//   BTChoTapDoanTiepNhan: 'BT_ChoTapDoanTiepNhan',
//   BTTapDoanTiepNhan: 'BT_TapDoanTiepNhan',
//   BTHoanThanh: 'BT_HoanThanh',
// };

// // trạng thái báo cáo theo yêu cầu tập đoàn
// export const TrangThaiBaoCaoTheoYCTapDoan = {
//   SoanThao: 'YCTD_SoanThao',
//   ChoLDPheDuyet: 'YCTD_ChoLDPheDuyet',
//   LDTDPheDuyet: 'YCTD_LDTDPheDuyet',
//   LDTDTuChoi: 'YCTD_LDTDTuChoi',
//   NguoiDaiDienTraLoi: 'YCTD_NguoiDaiDienTraLoi',
//   BCNPheDuyet: 'YCTD_BCNPheDuyet',
//   BCNTuChoi: 'YCTD_BCNTuChoi',
// };

// //các role trong hệ thống

// export const RoleConsts = {
//   LDBanChucNang: 'lanhdaobanchucnang',
//   ChuyenVien: 'chuyenvien',
//   LDTapdoan: 'ldtapdoan',
//   NguoiDaiDien: 'ndd',
//   TongGiamDoc: 'LDTapdoan',
//   BanChuTri: 'LDBanchutri',
// };

// export const LoaiToChucConsts = {
//   TapDoan: 'TAPDOAN',
//   VanPhongHoiDongQuanTri: 'VPHDQT',
// };
