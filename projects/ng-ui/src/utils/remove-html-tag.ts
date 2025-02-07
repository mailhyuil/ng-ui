export function removeHtmlTags(html: string): string {
  return html.replace(/<[^>]*>?/g, '');
}
