export interface Project {
  slug?: string
  title: string
  desc: string
  preview?: string
  link?: string
  repo?: string
  techStack?: string[]
  problem?: string
  solution?: string
  learnings?: string
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    slug: 'pcb-custom-malang',
    title: 'PCB Custom Malang',
    desc: 'Advanced circuitry showcase and custom fabrication platform for localized sensor arrays.',
    preview: '/sprites/Preview1.webp',
    link: 'https://pcb-custom-malang.web.app/',
    repo: 'https://github.com/Zxaviers',
    techStack: ['React', 'Tailwind CSS', 'Netlify', 'Vercel'],
    problem:
      'PCB Custom Malang needed an online presence to showcase their custom PCB fabrication services to prospective clients, without relying on manual one-to-one outreach.',
    solution:
      'Built as a responsive showcase site using React and Tailwind CSS, hosted on Netlify with a CI/CD pipeline via GitHub and Vercel for fast, consistent deployments.',
    learnings:
      'First experience handling a client-facing project end to end — from understanding the client business needs, to translating them into a clear page structure, to setting up an automated deployment flow.',
  },
  {
    slug: 'bootstrap-portfolio',
    title: 'Bootstrap Portfolio',
    desc: 'Fundamental responsive web portfolio showcasing initial development explorations and core styling.',
    preview: '/sprites/Preview2.webp',
    link: 'https://zxaviers.github.io/Personal/',
    repo: 'https://github.com/Zxaviers/Personal',
    techStack: ['HTML5', 'CSS3', 'Bootstrap'],
    problem:
      'Before this React/Tailwind site existed, I needed a simple online portfolio to start presenting myself and early projects while still learning web development.',
    solution:
      'The first portfolio was built with HTML, CSS, and Bootstrap, deployed via GitHub Pages — focused on fundamentals: responsive layout, tidy content structure, and a simple deploy process without complex build tooling.',
    learnings:
      'The starting point for understanding web development basics before moving to modern frameworks like React — a reminder of how far things have come since this project was built.',
  },
  {
    slug: 'jkt48-vault',
    title: 'JKT48 Vault',
    desc: 'Premium photo gallery & media archive powered by Google Drive storage and Google Sheets database, featuring masonry layout, member filtering, and full-size lightbox viewer.',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Google Drive API', 'Google Sheets API'],
    problem:
      'Needed a neat, fast, and easy-to-manage JKT48 photo gallery curation and archive platform without complicated paid database infrastructure.',
    solution:
      'Uses Google Drive as proxied file storage and Google Sheets as a dynamic database, wrapped in a modern Next.js 15 masonry-grid interface with member search, category filters, and a protected admin panel.',
    learnings:
      'Implemented proxied Google Drive API file streaming, Google Sheets API integration via a Google Cloud service account, and masonry layout performance optimization in the App Router.',
    comingSoon: true,
  },
  {
    slug: 'zenspace',
    title: 'ZenSpace',
    desc: 'SaaS Unified Cloud Drive that aggregates multiple Google Drive accounts into a single virtual workspace with combined storage quota, file indexing, and smart upload routing.',
    techStack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Google Drive API', 'Auth.js'],
    problem:
      'Users often hold several separate Google Drive accounts with a limited 15GB quota each, and juggling accounts to find or upload files is a hassle.',
    solution:
      'A SaaS platform that merges multiple Google Drive accounts into one unified virtual vault with total quota aggregation, virtual file indexing, at-rest OAuth2 token encryption (AES-GCM), and automatic smart upload routing to the account with the most remaining quota.',
    learnings:
      'Designed the Drizzle ORM + Neon PostgreSQL schema for the Edge runtime, a secure multi-account OAuth2 architecture, and real-time quota sync.',
    comingSoon: true,
  },
]
