export async function urlToFile(url: string) {
  const res = await fetch(url, {
    cache: 'no-cache',
  });
  const blob = await res.blob();
  return new File([blob], url.split('/').pop() || '', { type: blob.type });
}
