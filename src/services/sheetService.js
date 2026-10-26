import { google } from 'googleapis';
import dotenv from 'dotenv';
import { normalizeSheetRows, normalizeProfessional } from '../utils/schemaNormalizer.js';

dotenv.config();

/**
 * Built-in career profiles showcasing diverse job roles across industries
 */
export const MOCK_PROFESSIONALS = [
  {
    name: "Abdul Latif",
    username: "abdul-latif",
    title: "Senior Fullstack Engineer & Jamstack Architect",
    department: "Engineering & Technology",
    jobType: "Full-Time (Remote / Hybrid)",
    experience: "6+ Years Experience",
    salary: "$90,000 - $110,000 / yr",
    currentCompany: "Ex-TechCorp Lead",
    education: "BS Computer Science",
    bio: "Specializing in high-performance Jamstack architectures, automated CI/CD pipelines, and responsive web platforms with zero runtime lag.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Sample download link
    skills: ["JavaScript", "Node.js", "WebGL", "React", "Cloud Architecture", "CI/CD"],
    location: "Islamabad, PK (Open to Global Remote)",
    status: "Actively Interviewing",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      portfolio: "https://github.com/Sahil-093"
    },
    projects: [
      {
        title: "Anti-Gravity Automated Platform",
        description: "Zero-maintenance automated platform transforming headless spreadsheet databases into static edge portfolios.",
        tags: ["Node.js", "GitHub Actions", "Jamstack"],
        link: "https://github.com/Sahil-093/portfolios",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Enterprise Distributed Microservices",
        description: "Built fault-tolerant APIs handling over 400k daily transactions with 99.99% uptime.",
        tags: ["Docker", "Redis", "Cloud"],
        link: "#",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    name: "Sophia Sterling",
    username: "sophia-sterling",
    title: "Staff Product Designer & Design Systems Lead",
    department: "Design & Creative",
    jobType: "Full-Time (Remote)",
    experience: "8+ Years Experience",
    salary: "$125,000 - $145,000 / yr",
    currentCompany: "Horizon Spatial Labs",
    education: "BFA Interactive Media",
    bio: "Pioneering spatial interfaces, accessible design systems, and product ergonomics for Fortune 500 tech companies.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    skills: ["Figma", "Design Systems", "Product Strategy", "User Research", "3D Prototyping"],
    location: "Zurich / Remote",
    status: "Open to Leadership Roles",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      portfolio: "https://example.com"
    },
    projects: [
      {
        title: "Nova Global Design System",
        description: "Unified cross-platform design library deployed across 14 enterprise applications, cutting UI development time by 42%.",
        tags: ["Figma", "Design Tokens", "Accessibility"],
        link: "#",
        imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    name: "Marcus Vance",
    username: "marcus-vance",
    title: "Head of Growth & Performance Marketing",
    department: "Marketing & Growth",
    jobType: "Full-Time / Executive",
    experience: "10+ Years Experience",
    salary: "$140,000 - $160,000 / yr",
    currentCompany: "ScaleMatrix Growth",
    education: "MBA Marketing & Analytics",
    bio: "Scaled two B2B SaaS startups from $1M to $25M ARR through data-driven performance funnels and global brand campaigns.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    skills: ["Growth Marketing", "B2B SaaS", "Attribution Modeling", "SEO", "Product-Led Growth"],
    location: "London / Remote",
    status: "Available for Q1 Hire",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    projects: [
      {
        title: "Omnichannel Acquisition Engine",
        description: "Generated 350k qualified leads in 12 months while decreasing customer acquisition cost (CAC) by 31%.",
        tags: ["Growth", "Analytics", "Automation"],
        link: "#",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

/**
 * Fetch data using Google Sheets API v4 (Service Account)
 */
async function fetchViaServiceAccount(spreadsheetId, clientEmail, privateKey) {
  const formattedKey = privateKey.replace(/\\n/g, '\n');
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: formattedKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'A:Z',
  });

  return response.data.values || [];
}

/**
 * Fetch data via Google Public CSV export
 */
async function fetchViaPublicCsv(spreadsheetId) {
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Public CSV fetch failed with status ${response.status}`);
  }
  const text = await response.text();
  
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some(c => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }
  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows;
}

/**
 * Main provider method
 */
export async function getProfessionalsData() {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID?.trim();
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const key = process.env.GOOGLE_PRIVATE_KEY?.trim();

  // Mode 1: Service Account
  if (spreadsheetId && email && key) {
    try {
      console.log('📡 Fetching data via Google Cloud Service Account API...');
      const rawRows = await fetchViaServiceAccount(spreadsheetId, email, key);
      const normalized = normalizeSheetRows(rawRows);
      if (normalized.length > 0) {
        return { source: 'service-account', data: normalized };
      }
    } catch (err) {
      console.warn(`⚠️ Service Account fetch failed: ${err.message}. Falling back...`);
    }
  }

  // Mode 2: Public Google Sheet CSV
  if (spreadsheetId) {
    try {
      console.log('🌐 Fetching data via Google Sheets Public Endpoint...');
      const rawRows = await fetchViaPublicCsv(spreadsheetId);
      const normalized = normalizeSheetRows(rawRows);
      if (normalized.length > 0) {
        return { source: 'public-sheet', data: normalized };
      }
    } catch (err) {
      console.warn(`⚠️ Public sheet fetch failed: ${err.message}. Falling back...`);
    }
  }

  // Mode 3: Built-in Mock Data
  console.log('⚡ Using built-in Anti-Gravity Career Profiles seed data.');
  const normalizedMock = MOCK_PROFESSIONALS.map(normalizeProfessional);
  return { source: 'mock-dataset', data: normalizedMock };
}
