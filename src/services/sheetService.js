import { google } from 'googleapis';
import dotenv from 'dotenv';
import { normalizeSheetRows, normalizeProfessional } from '../utils/schemaNormalizer.js';

dotenv.config();

/**
 * Built-in mock dataset so the platform functions immediately
 * even before external Google credentials are configured.
 */
export const MOCK_PROFESSIONALS = [
  {
    name: "Aiden Vance",
    username: "aiden-vance",
    title: "Zero-G UI/UX Architect & 3D Designer",
    bio: "Pioneering spatial interfaces and interactive web experiences. Crafting weightless visual designs that defy ordinary aesthetics.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    skills: ["Three.js", "Web3 Design", "Spatial UI", "Figma", "Design Systems"],
    hourlyRate: "$95/hr",
    location: "Global / Remote",
    status: "Available for Q1 Projects",
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://aidenvance.design"
    },
    projects: [
      {
        title: "Nebula OS Spatial Desktop",
        description: "Browser-based 3D workspace with real-time gravitational simulation and window docking.",
        tags: ["WebGL", "Three.js", "GLSL Shaders"],
        link: "https://example.com/project-1",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Aura Gravity Protocol",
        description: "DeFi dashboard with reactive ambient lighting, dynamic orbital charts, and fluid physics.",
        tags: ["React", "TailwindCSS", "Framer Motion"],
        link: "https://example.com/project-2",
        imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    name: "Elena Rostova",
    username: "elena-rostova",
    title: "Senior Fullstack Engineer & Cloud Architect",
    bio: "Building hyper-scalable distributed microservices, serverless backends, and low-latency cloud ecosystems.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    skills: ["Node.js", "Go", "Kubernetes", "AWS", "GraphQL", "PostgreSQL"],
    hourlyRate: "$120/hr",
    location: "Zurich, Switzerland",
    status: "Partially Booked",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    projects: [
      {
        title: "QuantumSync Engine",
        description: "Sub-millisecond data synchronization cluster handling 500k concurrent WebSocket connections.",
        tags: ["Go", "Redis", "Docker", "gRPC"],
        link: "https://example.com/quantumsync",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    name: "Marcus Chen",
    username: "marcus-chen",
    title: "Creative Technologist & Generative AI Specialist",
    bio: "Merging deep learning models with interactive canvas physics to craft unforgettable consumer experiences.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    skills: ["Python", "PyTorch", "Canvas API", "WebGL", "TypeScript"],
    hourlyRate: "$110/hr",
    location: "San Francisco, USA",
    status: "Available Immediately",
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    },
    projects: [
      {
        title: "Synesthesia Visualizer",
        description: "Real-time AI audio-to-motion graphics generator executing directly on GPU shaders.",
        tags: ["GLSL", "WebAudio", "TensorFlow.js"],
        link: "https://example.com/synesthesia",
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
 * Fetch data via Google Public CSV export (Zero API key required)
 */
async function fetchViaPublicCsv(spreadsheetId) {
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Public CSV fetch failed with status ${response.status}`);
  }
  const text = await response.text();
  
  // Basic CSV parser for Google Sheets CSV export
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
        i++; // Skip escaped quote
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
 * Main provider method that auto-selects the best data source:
 * 1. Service Account (if configured in .env)
 * 2. Public Google Sheet (if spreadsheet ID is provided)
 * 3. Seed Mock Dataset (if neither is supplied or on failure)
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
  console.log('⚡ Using built-in Anti-Gravity Professionals seed data.');
  const normalizedMock = MOCK_PROFESSIONALS.map(normalizeProfessional);
  return { source: 'mock-dataset', data: normalizedMock };
}
