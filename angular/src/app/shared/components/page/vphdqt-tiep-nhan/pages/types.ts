
export interface TnpcItem {
  id: string;
  title: string;
  summary?: string;
  note?: string;
  partner?: string;
  // tên ban phối hợp tại group (nếu có)
  groupPartner?: string;
  // tên ban xử lý tại group (nếu có)
  groupXuLy?: string;
  // tên ban xử lý tại item (nếu có)
  xuLy?: string;
  parentIsXuLy?: boolean;
  level: number;
  // group index for roman prefix (only for level 0 rows)
  sIdx?: number;
  chuyenVien?: string;
  // Tên ban xử lý 
  ban?: string;
  children?: TnpcItem[];
  // danh sách file đính kèm hiển thị ở cột FILE ĐÍNH KÈM
  files?: { id?: string | number; name: string; url?: string }[];
  // nội dung trả lời cho node (sử dụng ở level 2)
  replyContent?: string;
  // file đính kèm cho phần trả lời (level 2) - dùng cho HĐQT trả lời
  filesReply?: { id?: string | number; name: string; url?: string }[];
  // file đính kèm cho phần xin ý kiến (level 2) - lấy từ noiDungXuLyDtos
  filesXuLyReply?: { id?: string | number; name: string; url?: string }[];
}

export interface NoiDungXuLyDto {
  baoCaoId: number;
  deMucId: number;
  tieuChiBaoCaoId: number;
  nguoiThucHienId: string;
  ngayThucHien: string;
  noiDung: string;
  toChucId: number;
  isLast: boolean;
}

export interface noiDungVPHDQTDto {
  baoCaoId: number;
  deMucId: number;
  tieuChiBaoCaoId: number;
  nguoiThucHienId: string;
  ngayThucHien: string;
  noiDung: string;
  toChucId: number;
  isLast: boolean;
}

export interface NoiDungPhoiHopDto {
  baoCaoId: number;
  deMucId: number;
  tieuChiBaoCaoId: number;
  nguoiThucHienId: string;
  ngayThucHien: string;
  noiDung: string;
  toChucId: number;
  isLast: boolean;
}
