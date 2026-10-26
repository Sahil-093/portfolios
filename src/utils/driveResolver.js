/**
 * Google Drive & Asset URL Resolver
 * Extracts Google Drive File IDs from various share URL formats
 * and transforms them into high-speed direct CDN streamable URLs.
 */

/**
 * Extracts Google Drive File ID from multiple URL variations
 * @param {string} url - Google Drive URL or ID
 * @returns {string|null} - Extracted File ID or null
 */
export function extractDriveFileId(url) {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();

  // Pattern 1: /file/d/{FILE_ID}/
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1];

  // Pattern 2: ?id={FILE_ID} or &id={FILE_ID}
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];

  // Pattern 3: /open?id={FILE_ID}
  const openMatch = trimmed.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch && openMatch[1]) return openMatch[1];

  // Pattern 4: /thumbnail?id={FILE_ID}
  const thumbMatch = trimmed.match(/\/thumbnail\?id=([a-zA-Z0-9_-]+)/);
  if (thumbMatch && thumbMatch[1]) return thumbMatch[1];

  // Pattern 5: Raw Drive ID (typically 28-35 alphanumeric chars)
  if (/^[a-zA-Z0-9_-]{25,45}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Converts any Google Drive URL into an optimized direct CDN view URL.
 * If the URL is already an external image (e.g. Unsplash, Cloudinary, AWS S3), returns it as-is.
 * 
 * @param {string} rawUrl - Input image URL or Drive ID
 * @param {'avatar'|'cover'|'project'} type - Context for sensible fallbacks
 * @returns {string} - Direct, embeddable image URL
 */
export function resolveImageUrl(rawUrl, type = 'avatar') {
  const fallbacks = {
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    project: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  };

  if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.trim() === '') {
    return fallbacks[type] || fallbacks.avatar;
  }

  const trimmed = rawUrl.trim();

  // If it's a Google Drive link or ID
  const driveId = extractDriveFileId(trimmed);
  if (driveId) {
    // lh3.googleusercontent.com/d/{id} is Google's modern high-speed CDN endpoint for public Drive files
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }

  // If it's already an HTTP/HTTPS URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // Default fallback
  return fallbacks[type] || fallbacks.avatar;
}
