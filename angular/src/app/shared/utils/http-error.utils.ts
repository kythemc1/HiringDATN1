// Common HTTP/API error message extractor
// Usage: extractApiMessage(err, 'Fallback message')

export function extractApiMessage(err: any, fallback?: string): string {
  const data = err?.error ?? err;

  // 1) Plain text error
  if (typeof data === 'string' && data.trim()) return data;

  // 2) ABP error format: { error: { message, details } }
  const abp = data?.error;
  if (abp) {
    if (typeof abp.message === 'string' && abp.message) return abp.message;
    if (typeof abp.details === 'string' && abp.details) return abp.details;
  }

  // 3) .NET ProblemDetails or generic
  if (typeof data?.title === 'string' && data.title) return data.title;
  if (typeof data?.message === 'string' && data.message) return data.message;

  // 4) Validation errors: { errors: { field: [messages] } }
  const validation = data?.errors;
  if (validation && typeof validation === 'object') {
    const firstKey = Object.keys(validation)[0];
    const msgs = (validation as any)[firstKey];
    if (Array.isArray(msgs) && msgs.length) return msgs.join('\n');
  }

  // 5) Blob JSON or unknown structure
  if (data instanceof Blob) return fallback || 'Đã xảy ra lỗi. Vui lòng thử lại sau.';

  return fallback || 'Đã xảy ra lỗi khi lưu dữ liệu';
}
