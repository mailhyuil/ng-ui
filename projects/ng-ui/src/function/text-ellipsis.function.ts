export function textEllipsis(str?: any, maxLength?: number) {
  if (!str) return '';

  // HTML 태그를 제거하여 순수한 텍스트만 추출
  const text = str.toString().replace(/<[^>]*>/g, '');

  if (maxLength && text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }

  return text;
}
