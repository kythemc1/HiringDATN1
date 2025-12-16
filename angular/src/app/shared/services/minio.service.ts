import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export interface MinioFile {
  objectName: string;
  fileName: string;
  size: number;
  lastModified: Date;
  contentType: string;
  presignedUrl: string;
}

export interface MinioFileResponse {
  success: boolean;
  data: MinioFile[];
  total: number;
}

export interface FilePreviewResponse {
  base64: string;
}

@Injectable({
  providedIn: 'root',
})
export class MinioService {
  apiName = 'Administration';

  // Lấy danh sách file từ MinIO (bucket preview)
  getFiles = (prefix: string = '', config?: Partial<Rest.Config>) =>
    this.restService.request<any, MinioFileResponse>(
      {
        method: 'GET',
        url: '/api/preview/minio-files',
        params: { prefix },
      },
      { apiName: this.apiName, ...config },
    );

  // Preview PDF (base64) theo tên file và path
  previewPdfBase64ByName = (name: string, path: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FilePreviewResponse>(
      {
        method: 'GET',
        url: '/api/preview/preview-pdf-base64-by-name',
        params: { name, path },
      },
      { apiName: this.apiName, ...config },
    );

  // Convert file Attach (theo GUID trong DB) sang PDF, trả về URL (text/plain)
  convertToPdf = (fileId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>(
      { 
        method: 'GET',
        url: `/api/preview/convert-to-pdf/${fileId}`,
        responseType: 'text',
      },
      { apiName: this.apiName, ...config },
    );

  // Convert file trong bucket preview (theo objectName) sang PDF, trả về URL (text/plain)
  convertPreviewToPdf = (objectName: string, outputPath: string = 'Temp', config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>(
      {
        method: 'GET',
        url: '/api/preview/convert-preview-to-pdf',
        params: { objectName, outputPath },
        responseType: 'text',

      },
      { apiName: this.apiName, ...config },
    );

  // Method để chọn URL hiển thị nhanh
  previewFile = async (file: MinioFile): Promise<string | null> => {
    try {
      // PDF/Image/Text => dùng presigned URL
      if (file.contentType === 'application/pdf') {
        return file.presignedUrl;
      }
      if (file.contentType.startsWith('image/')) {
        return file.presignedUrl;
      }
      if (file.contentType.startsWith('text/')) {
        return file.presignedUrl;
      }

      // Office: thử convert từ preview bằng objectName
      if (this.isOfficeDocument(file.contentType)) {
        try {
          const pdfUrl = await lastValueFrom(this.convertPreviewToPdf(file.objectName));
          if (pdfUrl) return pdfUrl;
        } catch {
          // fallback phía dưới
        }
      }

      // Fallback
      return file.presignedUrl;
    } catch (error) {
      console.error('Error previewing file:', error);
      return file.presignedUrl;
    }
  };

  // Kiểm tra xem file có thể preview được không
  canPreviewFile = (contentType: string): boolean => {
    const previewableTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'text/plain', 'text/html', 'text/css', 'text/javascript',
      'application/pdf',
      'application/json', 'application/xml'
    ];
    return previewableTypes.includes(contentType) || this.isOfficeDocument(contentType);
  };

  // Kiểm tra xem có phải Office document không
  isOfficeDocument = (contentType: string): boolean => {
    return contentType.includes('word') ||
           contentType.includes('excel') ||
           contentType.includes('powerpoint') ||
           contentType.includes('msword') ||
           contentType.includes('spreadsheet') ||
           contentType.includes('presentation');
  };

  downloadFile = (presignedUrl: string): void => {
    const link = document.createElement('a');
    link.href = presignedUrl;
    link.download = '';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  openFile = (presignedUrl: string): void => {
    window.open(presignedUrl, '_blank');
  };

  formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  getFileIcon = (contentType: string): string => {
    if (contentType.includes('pdf')) return 'pi pi-file-pdf';
    if (contentType.includes('image')) return 'pi pi-image';
    if (contentType.includes('word')) return 'pi pi-file-word';
    if (contentType.includes('excel') || contentType.includes('spreadsheet')) return 'pi pi-file-excel';
    if (contentType.includes('powerpoint') || contentType.includes('presentation')) return 'pi pi-file-pdf';
    if (contentType.includes('text')) return 'pi pi-file-text';
    return 'pi pi-file';
  };

  constructor(private restService: RestService) {}
}