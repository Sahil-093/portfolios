import { resolveImageUrl } from './driveResolver.js';

/**
 * Creates a clean URL-friendly slug from string
 */
export function slugify(text) {
  if (!text) return 'user-' + Math.random().toString(36).substring(2, 8);
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

/**
 * Normalizes a raw professional row/object into a unified structure
 */
export function normalizeProfessional(raw) {
  // If raw is already in the object format (like our mock dataset)
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const username = slugify(raw.username || raw.name);
    return {
      name: raw.name?.trim() || 'Anonymous Professional',
      username: username,
      title: raw.title?.trim() || 'Independent Specialist',
      bio: raw.bio?.trim() || 'Crafting next-generation digital experiences.',
      avatarUrl: resolveImageUrl(raw.avatarUrl || raw.avatar, 'avatar'),
      coverUrl: resolveImageUrl(raw.coverUrl || raw.cover, 'cover'),
      skills: Array.isArray(raw.skills)
        ? raw.skills.map(s => String(s).trim())
        : (raw.skills ? String(raw.skills).split(',').map(s => s.trim()).filter(Boolean) : ['Specialist']),
      hourlyRate: raw.hourlyRate?.trim() || '$85/hr',
      location: raw.location?.trim() || 'Remote / Global',
      status: raw.status?.trim() || 'Available for Projects',
      socials: {
        github: raw.socials?.github || raw.github || '',
        twitter: raw.socials?.twitter || raw.twitter || '',
        linkedin: raw.socials?.linkedin || raw.linkedin || '',
        portfolio: raw.socials?.portfolio || raw.portfolio || '',
      },
      projects: Array.isArray(raw.projects)
        ? raw.projects.map(proj => ({
            title: proj.title || 'Featured Project',
            description: proj.description || 'Interactive digital solution.',
            tags: Array.isArray(proj.tags)
              ? proj.tags
              : (proj.tags ? String(proj.tags).split(',').map(t => t.trim()) : ['Web']),
            link: proj.link || '#',
            imageUrl: resolveImageUrl(proj.imageUrl || proj.image, 'project')
          }))
        : []
    };
  }

  return null;
}

/**
 * Parses raw Google Sheet table rows (array of arrays, where row 0 is headers)
 * @param {Array<Array<string>>} rows 
 * @returns {Array<Object>} Normalized professional objects
 */
export function normalizeSheetRows(rows) {
  if (!rows || !Array.isArray(rows) || rows.length < 2) {
    return [];
  }

  const rawHeaders = rows[0].map(h => (h || '').toString().toLowerCase().replace(/[^a-z0-9]/g, ''));
  const dataRows = rows.slice(1);

  return dataRows.map(row => {
    const getCol = (...aliases) => {
      for (const alias of aliases) {
        const cleanAlias = alias.toLowerCase().replace(/[^a-z0-9]/g, '');
        const idx = rawHeaders.indexOf(cleanAlias);
        if (idx !== -1 && row[idx] !== undefined && row[idx] !== '') {
          return row[idx].trim();
        }
      }
      return '';
    };

    const name = getCol('name', 'fullname', 'professionalname') || 'Anonymous Professional';
    const username = slugify(getCol('username', 'slug', 'handle') || name);

    // Extract dynamic projects (supports up to 4 project column groups or JSON)
    const projects = [];
    const projectsJsonRaw = getCol('projects', 'projectsjson');
    if (projectsJsonRaw) {
      try {
        const parsed = JSON.parse(projectsJsonRaw);
        if (Array.isArray(parsed)) projects.push(...parsed);
      } catch {
        // Ignore JSON parse errors
      }
    }

    // Also parse dedicated project columns: Project 1 Title, Project 1 Desc, etc.
    for (let i = 1; i <= 4; i++) {
      const pTitle = getCol(`project${i}title`, `p${i}title`);
      if (pTitle) {
        projects.push({
          title: pTitle,
          description: getCol(`project${i}desc`, `project${i}description`, `p${i}desc`) || 'High performance project.',
          tags: getCol(`project${i}tags`, `p${i}tags`) ? getCol(`project${i}tags`, `p${i}tags`).split(',').map(t => t.trim()) : ['Web'],
          link: getCol(`project${i}link`, `project${i}url`, `p${i}link`) || '#',
          imageUrl: resolveImageUrl(getCol(`project${i}image`, `project${i}drive`, `p${i}img`), 'project')
        });
      }
    }

    return normalizeProfessional({
      name,
      username,
      title: getCol('title', 'role', 'headline', 'profession'),
      bio: getCol('bio', 'about', 'summary'),
      avatarUrl: getCol('avatar', 'profilepic', 'headshot', 'photo', 'avatarurl'),
      coverUrl: getCol('cover', 'coverurl', 'banner', 'bannerurl'),
      skills: getCol('skills', 'expertise', 'stack'),
      hourlyRate: getCol('hourlyrate', 'rate', 'price'),
      location: getCol('location', 'city', 'country'),
      status: getCol('status', 'availability'),
      socials: {
        github: getCol('github', 'git'),
        twitter: getCol('twitter', 'x'),
        linkedin: getCol('linkedin'),
        portfolio: getCol('portfolio', 'website'),
      },
      projects
    });
  }).filter(Boolean);
}
