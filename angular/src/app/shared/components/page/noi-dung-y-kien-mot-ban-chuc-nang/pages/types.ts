
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
  children?: TnpcItem[];
  // danh sách file đính kèm hiển thị ở cột FILE ĐÍNH KÈM
  files?: { id?: string | number; name: string; url?: string }[];
  // nội dung trả lời cho node (sử dụng ở level 2)
  replyContent?: string;
  // file đính kèm cho phần trả lời (level 2)
  filesReply?: { id?: string | number; name: string; url?: string }[];
  // mang theo danh sách file đính kèm gốc (nếu cần giữ nguyên DTO)
  fileDinhKems?: any[];
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
  fileDinhKems?: any[];
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
  fileDinhKems?: any[];
}
