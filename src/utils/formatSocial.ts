/**
 * Utility helper to normalize social links if user enters handle with @ or bare domain
 */
export function formatSocialUrl(type: 'instagram' | 'facebook' | 'tiktok' | 'maps' | 'web', input?: string): string {
  if (!input || !input.trim()) return '';
  const trimmed = input.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  const cleanHandle = trimmed.replace(/^@/, '');

  switch (type) {
    case 'instagram':
      return trimmed.includes('instagram.com') ? `https://${trimmed}` : `https://instagram.com/${cleanHandle}`;
    case 'facebook':
      return trimmed.includes('facebook.com') ? `https://${trimmed}` : `https://facebook.com/${cleanHandle}`;
    case 'tiktok':
      return trimmed.includes('tiktok.com') ? `https://${trimmed}` : `https://tiktok.com/@${cleanHandle}`;
    case 'maps':
      return trimmed.includes('maps.google.com') || trimmed.includes('goo.gl') ? `https://${trimmed}` : `https://maps.google.com/?q=${encodeURIComponent(trimmed)}`;
    case 'web':
      return `https://${trimmed}`;
    default:
      return trimmed;
  }
}
