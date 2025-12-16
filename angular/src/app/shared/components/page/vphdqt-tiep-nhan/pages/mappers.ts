import { TnpcItem, NoiDungPhoiHopDto, NoiDungXuLyDto, noiDungVPHDQTDto } from './types';

export function mapSectionsToTnpcItems(
  sections: any[],
  banChucNangOptions: { label: string; value: number | null }[],
  noiDungXuLyDtosInput: NoiDungXuLyDto[] | null,
  noiDungVPHDQTDtosInput: noiDungVPHDQTDto[] | null,
  noiDungPhoiHopDtosInput: NoiDungPhoiHopDto[] | null
): TnpcItem[] {
  const result: TnpcItem[] = [];

  // Build label map once
  const labelMap = new Map<string, string>(
    (banChucNangOptions || []).map(o => [String(o.value), o.label])
  );
  const getLabels = (ids: Array<number | string> | null | undefined): string[] => {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    return ids
      .filter(v => v != null && v !== '')
      .map(v => labelMap.get(String(v)) ?? '-')
      .filter(l => l && l !== '-');
  };

  // Build reply lookup from inputs: prefer XuLy when parent is XuLy; prefer PhoiHop when parent is PhoiHop
  const replyXuLyMap = new Map<string, string>();
  const filesXuLyMap = new Map<string, { id?: string | number; name: string; url?: string }[]>();
  for (const r of noiDungXuLyDtosInput || []) {
    const id = (r as any)?.tieuChiBaoCaoId ?? '';
    const dm = (r as any)?.deMucId ?? '';
    const keyExact = `${id}|${dm}`;
    const keyTcbcOnly = `${id}|`;
    const val = (r as any)?.noiDung ?? '';
    if ((r as any)?.isLast === true || !replyXuLyMap.has(keyExact)) replyXuLyMap.set(keyExact, val);
    if ((r as any)?.isLast === true || !replyXuLyMap.has(keyTcbcOnly)) replyXuLyMap.set(keyTcbcOnly, val);
    const filesApi = (r as any)?.fileDinhKemDtos || (r as any)?.attachments || [];
    const mappedFiles = (filesApi as any[]).map((f: any) => ({
      id: f?.id ?? undefined,
      name: f?.tenFile ?? f?.tenTep ?? f?.fileName ?? f?.name ?? '-',
      url: f?.duongDanFile ?? f?.url ?? f?.downloadUrl ?? undefined,
    }));
    if (mappedFiles.length) {
      if ((r as any)?.isLast === true || !filesXuLyMap.has(keyExact)) filesXuLyMap.set(keyExact, mappedFiles);
      if ((r as any)?.isLast === true || !filesXuLyMap.has(keyTcbcOnly)) filesXuLyMap.set(keyTcbcOnly, mappedFiles);
    }
  }
  const replyPhoiHopHDQTMap = new Map<string, string>();
  const filesHDQTMap = new Map<string, { id?: string | number; name: string; url?: string }[]>();
  for (const r of noiDungVPHDQTDtosInput || []) {
    const id = (r as any)?.tieuChiBaoCaoId ?? '';
    const dm = (r as any)?.deMucId ?? '';
    const keyExact = `${id}|${dm}`;
    const keyTcbcOnly = `${id}|`;
    const val = (r as any)?.noiDung ?? '';
    if ((r as any)?.isLast === true || !replyPhoiHopHDQTMap.has(keyExact)) replyPhoiHopHDQTMap.set(keyExact, val);
    if ((r as any)?.isLast === true || !replyPhoiHopHDQTMap.has(keyTcbcOnly)) replyPhoiHopHDQTMap.set(keyTcbcOnly, val);
    const filesApi = (r as any)?.fileDinhKemDtos || (r as any)?.attachments || [];
    const mappedFiles = (filesApi as any[]).map((f: any) => ({
      id: f?.id ?? undefined,
      name: f?.tenFile ?? f?.tenTep ?? f?.fileName ?? f?.name ?? '-',
      url: f?.duongDanFile ?? f?.url ?? f?.downloadUrl ?? undefined,
    }));
    if (mappedFiles.length) {
      if ((r as any)?.isLast === true || !filesHDQTMap.has(keyExact)) filesHDQTMap.set(keyExact, mappedFiles);
      if ((r as any)?.isLast === true || !filesHDQTMap.has(keyTcbcOnly)) filesHDQTMap.set(keyTcbcOnly, mappedFiles);
    }
  }

  const replyPhoiHopMap = new Map<string, string>();
  for (const r of noiDungPhoiHopDtosInput || []) {
    const id = (r as any)?.tieuChiBaoCaoId ?? '';
    const dm = (r as any)?.deMucId ?? '';
    const keyExact = `${id}|${dm}`;
    const keyTcbcOnly = `${id}|`;
    const val = (r as any)?.noiDung ?? '';
    if ((r as any)?.isLast === true || !replyPhoiHopMap.has(keyExact)) replyPhoiHopMap.set(keyExact, val);
    if ((r as any)?.isLast === true || !replyPhoiHopMap.has(keyTcbcOnly)) replyPhoiHopMap.set(keyTcbcOnly, val);
  }

  for (const [sIdx, section] of (sections || []).entries()) {
    const groupId = section?.id != null ? String(section.id) : `grp-${sIdx + 1}`;
    const children: TnpcItem[] = [];

    // Group xử lý
    const assignment = section?.assignment;
    const groupXuLyId: number | null = assignment?.chucNangXuLy ?? null;
    const groupXuLy = getLabels(groupXuLyId != null ? [groupXuLyId] : null).join(', ');

    // Group phối hợp: ưu tiên từ assignment, fallback gom từ items
    let sectionPhoiHopIds: number[] | null = null;
    if (assignment && assignment.chucNangPhoiHop !== undefined) {
      const ph = assignment.chucNangPhoiHop;
      const arr = Array.isArray(ph) ? ph : ph != null ? [ph] : [];
      sectionPhoiHopIds = arr.length ? Array.from(new Set(arr)) : null;
    } else if (Array.isArray(section?.items)) {
      const set = new Set<number>();
      for (const it of section.items as any[]) {
        const ids = Array.isArray((it as any)?.banPhoiHopIds) ? (it as any).banPhoiHopIds : [];
        for (const id of ids) if (id != null) set.add(id);
      }
      sectionPhoiHopIds = set.size ? Array.from(set) : null;
    }
    const groupPartner = getLabels(sectionPhoiHopIds).join(', ');

    // Lấy Ban và Chuyên viên hiển thị ở cấp nhóm (id cha)
    const banFromDto = assignment?.banXuLyDto?.tenToChuc as string | undefined;
    const chuyenVienFromDto = assignment?.chuyenVienXuLyDto?.hoTen as string | undefined;
    const banGroup = banFromDto || groupXuLy || undefined;
    const chuyenVienGroup = chuyenVienFromDto || undefined;

    const items = Array.isArray(section?.items) ? section.items : [];
    const sectionIsXuLy = (section as any)?.isXuLy === true;
    items.forEach((it: any, i: number) => {
      const agree = it?.agree;
      const agreeSuffix = agree == null ? '' : agree ? ' - Đồng ý' : ' - Không đồng ý';

      const itemPartnerIds = Array.isArray(it?.banPhoiHopIds) ? it.banPhoiHopIds : [];
      const idsForLabel = sectionPhoiHopIds && sectionPhoiHopIds.length ? sectionPhoiHopIds : itemPartnerIds;
      const partner = getLabels(idsForLabel).join(', ');

      const xuLyItemId: number | null = it?.banXuLyId ?? null;
      const xuLy = getLabels(xuLyItemId != null ? [xuLyItemId] : null).join(', ');

      const childId = it?.id != null ? String(it.id) : `itm-${groupId}-${i + 1}`;

      const filesApi = Array.isArray(it?.fileDinhKemDtos)
        ? it.fileDinhKemDtos
        : Array.isArray(it?.attachments)
        ? it.attachments
        : [];
      const mappedFiles = filesApi.map((f: any) => ({
        id: f?.id ?? undefined,
        name: f?.tenFile ?? f?.tenTep ?? f?.fileName ?? f?.name ?? '-',
        url: f?.duongDanFile ?? f?.url ?? f?.downloadUrl ?? undefined,
      }));
      // Chuyên viên và Ban từ DTO (ưu tiên ở item, fallback từ assignment của section)
      const chuyenVien = it?.chuyenVienXuLyDto?.hoTen
        ?? assignment?.chuyenVienXuLyDto?.hoTen
        ?? undefined;

      const ban = it?.banXuLyDto?.tenToChuc
        ?? assignment?.banXuLyDto?.tenToChuc
        ?? (xuLy || undefined);

      const child: TnpcItem = {
        id: childId,
        title: `${i + 1}. ${it?.title ?? '-'}` + agreeSuffix,
        partner,
        chuyenVien,
        ban,
        xuLy,
        level: 1,
        files: mappedFiles,
        parentIsXuLy: sectionIsXuLy,
      };
      const desc = (it?.summary ?? it?.moTa ?? '').toString().trim();
      const deMucId = (section as any)?.rootId ?? null;
      const leafNumericId = Number(childId);
      const defaultReply = it?.noiDungTraLoiMoTa || it?.noiDungTraLoi || '';
      const mapKey = `${!Number.isNaN(leafNumericId) ? leafNumericId : ''}|${deMucId ?? ''}`;
      const parentIsXuLy = (section as any)?.isXuLy === true;
      const keyShort = `${!Number.isNaN(leafNumericId) ? leafNumericId : ''}|`;
      const replyFromInput = parentIsXuLy
        ? replyXuLyMap.get(mapKey) ?? replyXuLyMap.get(keyShort) ?? replyPhoiHopMap.get(mapKey) ?? replyPhoiHopMap.get(keyShort)
        : replyPhoiHopMap.get(mapKey) ?? replyPhoiHopMap.get(keyShort) ?? replyXuLyMap.get(mapKey) ?? replyXuLyMap.get(keyShort);

      // Lấy nội dung HĐQT trả lời từ nguồn VPHDQT (noiDungVPHDQTDtosInput)
      const replyHDQTFromInput = replyPhoiHopHDQTMap.get(mapKey) ?? replyPhoiHopHDQTMap.get(keyShort) ?? '';

      child.children = [
        {
          id: `${childId}-desc`,
          title: desc || '',
          level: 2,
          // Nội dung xin ý kiến/trao đổi (giữ nguyên)
          replyContent: (replyFromInput ?? defaultReply),
          // Nội dung HĐQT trả lời (mới)
          replyHDQTContent: replyHDQTFromInput,
          isXuLy: parentIsXuLy,
          deMucId: deMucId,
          // files phần xin ý kiến (noiDungXuLyDtos)
          filesXuLyReply: filesXuLyMap.get(mapKey) ?? filesXuLyMap.get(keyShort) ?? [],
          // files phần HĐQT trả lời (noiDungVPHDQTDto)
          filesReply: filesHDQTMap.get(mapKey) ?? filesHDQTMap.get(keyShort) ?? [],
          parentIsXuLy: parentIsXuLy,
          parentId: childId,
          parentTitle: it?.title ?? '-',
          parentPartner: partner,
          parentXuLy: xuLy,
          tieuChiBaoCaoId: !Number.isNaN(leafNumericId) ? leafNumericId : undefined,
        } as any,
      ];

      children.push(child);
    });

    result.push({
      id: groupId,
      title: section?.title ?? '-',
      groupPartner,
      groupXuLy,
      // Thông tin xử lý hiển thị ở template cấp nhóm
      ban: banGroup,
      chuyenVien: chuyenVienGroup,
      level: 0,
      parentIsXuLy: sectionIsXuLy,
      sIdx: sIdx,
      children,
    });
  }

  return result;
}
