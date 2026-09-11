const PROXY_BASE = 'https://grandview-realty.jphamm2001.workers.dev/proxy';

export function getProxiedMediaUrl(mediaUrl?: string | null): string {
  if (!mediaUrl) {
    return '';
  }

  if (mediaUrl.startsWith(PROXY_BASE)) {
    return mediaUrl;
  }

  return `${PROXY_BASE}?url=${encodeURIComponent(mediaUrl)}`;
}
