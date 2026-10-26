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
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Normalizes a professional career profile object
 */
export function normalizeProfessional(raw) {
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const username = slugify(raw.username || raw.name);
    return {
      name: raw.name?.trim() || 'Anonymous Professional',
      username: username,
      title: raw.title?.trim() || 'Senior Specialist',
      department: raw.department?.trim() || 'Engineering & Technology',
      jobType: raw.jobType?.trim() || 'Full-Time / Remote',
      experience: raw.experience?.trim() || '5+ Years Experience',
      salary: raw.salary?.trim() || raw.hourlyRate?.trim() || 'Competitive / Open',
      currentCompany: raw.currentCompany?.trim() || raw.company?.trim() || '',
      education: raw.education?.trim() || '',
      bio: raw.bio?.trim() || 'Dedicated professional delivering high-impact solutions.',
      avatarUrl: resolveImageUrl(raw.avatarUrl || raw.avatar, 'avatar'),
      coverUrl: resolveImageUrl(raw.coverUrl || raw.cover, 'cover'),
      resumeUrl: raw.resumeUrl || raw.resume || '',
      skills: Array.isArray(raw.skills)
        ? raw.skills.map(s => String(s).trim())
        : (raw.skills ? String(raw.skills).split(',').map(s => s.trim()).filter(Boolean) : ['Professional']),
      location: raw.location?.trim() || 'Remote / Global',
      status: raw.status?.trim() || 'Actively Interviewing',
      socials: {
        github: raw.socials?.github || raw.github || '',
        twitter: raw.socials?.twitter || raw.twitter || '',
        linkedin: raw.socials?.linkedin || raw.linkedin || '',
        portfolio: raw.socials?.portfolio || raw.portfolio || '',
      },
      projects: Array.isArray(raw.projects)
        ? raw.projects.map(proj => ({
            title: proj.title || 'Key Career Project',
            description: proj.description || 'Major initiative and measurable impact.',
            tags: Array.isArray(proj.tags)
              ? proj.tags
              : (proj.tags ? String(proj.tags).split(',').map(t => t.trim()) : ['Career']),
            link: proj.link || '#',
            imageUrl: resolveImageUrl(proj.imageUrl || proj.image, 'project')
          }))
        : []
    };
  }

  return null;
}

/**
 * Parses raw Google Sheet table rows into Career Profile models
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

    const name = getCol('name', 'fullname', 'candidate') || 'Anonymous Professional';
    const username = slugify(getCol('username', 'slug', 'handle') || name);

    // Extract dynamic career projects/case studies
    const projects = [];
    for (let i = 1; i <= 4; i++) {
      const pTitle = getCol(`project${i}title`, `p${i}title`, `work${i}title`);
      if (pTitle) {
        projects.push({
          title: pTitle,
          description: getCol(`project${i}desc`, `project${i}description`, `p${i}desc`) || 'Delivered key performance outcomes.',
          tags: getCol(`project${i}tags`, `p${i}tags`) ? getCol(`project${i}tags`, `p${i}tags`).split(',').map(t => t.trim()) : ['Impact'],
          link: getCol(`project${i}link`, `project${i}url`, `p${i}link`) || '#',
          imageUrl: resolveImageUrl(getCol(`project${i}image`, `project${i}drive`, `p${i}img`), 'project')
        });
      }
    }

    return normalizeProfessional({
      name,
      username,
      title: getCol('title', 'role', 'headline', 'position'),
      department: getCol('department', 'category', 'industry', 'field') || 'Engineering & Tech',
      jobType: getCol('jobtype', 'workpreference', 'employmenttype') || 'Full-Time / Remote',
      experience: getCol('experience', 'yearsofexperience', 'exp') || '5+ Years',
      salary: getCol('salary', 'rate', 'hourlyrate', 'compensation', 'targetsalary') || 'Competitive / Open',
      currentCompany: getCol('currentcompany', 'company', 'employer'),
      education: getCol('education', 'degree', 'university'),
      bio: getCol('bio', 'about', 'summary'),
      avatarUrl: getCol('avatar', 'profilepic', 'headshot', 'photo', 'avatarurl'),
      coverUrl: getCol('cover', 'coverurl', 'banner'),
      resumeUrl: getCol('resume', 'cv', 'resumeurl', 'cvurl', 'resumepdf'),
      skills: getCol('skills', 'expertise', 'stack'),
      location: getCol('location', 'city', 'country'),
      status: getCol('status', 'availability') || 'Actively Interviewing',
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
