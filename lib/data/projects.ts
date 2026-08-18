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
    preview: '/sprites/Preview1.png',
    link: 'https://pcb-custom-malang.web.app/',
    repo: 'https://github.com/Zxaviers',
    techStack: ['React', 'Tailwind CSS', 'Netlify', 'Vercel'],
    problem:
      'PCB Custom Malang butuh kehadiran online untuk menampilkan layanan pembuatan PCB custom mereka ke calon klien, tanpa harus bergantung pada komunikasi manual satu-per-satu.',
    solution:
      'Dibangun sebagai situs showcase responsif menggunakan React dan Tailwind CSS, di-hosting di Netlify dengan pipeline CI/CD lewat GitHub dan Vercel untuk deployment yang cepat dan konsisten.',
    learnings:
      'Pengalaman pertama menangani proyek client-facing dari awal sampai deploy — mulai dari memahami kebutuhan bisnis klien, menerjemahkannya ke struktur halaman yang jelas, sampai mengatur alur deployment otomatis.',
  },
  {
    slug: 'bootstrap-portfolio',
    title: 'Bootstrap Portfolio',
    desc: 'Fundamental responsive web portfolio showcasing initial development explorations and core styling.',
    preview: '/sprites/Preview2.png',
    link: 'https://zxaviers.github.io/Personal/',
    repo: 'https://github.com/Zxaviers/Personal',
    techStack: ['HTML5', 'CSS3', 'Bootstrap'],
    problem:
      'Sebelum situs React/Tailwind ini ada, saya butuh portofolio online sederhana untuk mulai menampilkan diri dan proyek-proyek awal saat masih belajar web development.',
    solution:
      'Portofolio pertama dibangun dengan HTML, CSS, dan Bootstrap, di-deploy lewat GitHub Pages — fokus ke fundamental: layout responsif, struktur konten yang rapi, dan proses deploy sederhana tanpa tooling build yang rumit.',
    learnings:
      'Titik awal untuk memahami dasar-dasar pengembangan web sebelum pindah ke framework modern seperti React — jadi pengingat seberapa jauh sudah berkembang sejak proyek ini dibuat.',
  },
  {
    slug: 'jkt48-vault',
    title: 'JKT48 Vault',
    desc: 'Premium photo gallery & media archive powered by Google Drive storage and Google Sheets database, featuring masonry layout, member filtering, and full-size lightbox viewer.',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Google Drive API', 'Google Sheets API'],
    problem:
      'Kebutuhan platform kurasi dan arsip galeri foto JKT48 yang rapi, cepat, dan mudah dikelola tanpa infrastruktur database berbayar yang rumit.',
    solution:
      'Memanfaatkan Google Drive sebagai file storage (proxied) dan Google Sheets sebagai database dinamis, dibalut antarmuka masonry grid modern Next.js 15, pencarian member, filter kategori, dan admin panel terproteksi.',
    learnings:
      'Implementasi proxy streaming file Google Drive API, integrasi Google Sheets API via Google Cloud Service Account, dan optimasi performa masonry layout di App Router.',
    comingSoon: true,
  },
  {
    slug: 'zenspace',
    title: 'ZenSpace',
    desc: 'SaaS Unified Cloud Drive that aggregates multiple Google Drive accounts into a single virtual workspace with combined storage quota, file indexing, and smart upload routing.',
    techStack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Google Drive API', 'Auth.js'],
    problem:
      'Pengguna sering memiliki beberapa akun Google Drive terpisah dengan kapasitas 15GB terbatas dan repot berganti akun saat mencari atau mengunggah file.',
    solution:
      'Platform SaaS yang menggabungkan multi-akun Google Drive ke satu wadah virtual terpadu dengan agregasi total kuota, virtual file indexing, enkripsi token OAuth2 at-rest (AES-GCM), dan smart upload routing otomatis ke akun dengan sisa kuota terbanyak.',
    learnings:
      'Perancangan skema database Drizzle ORM + Neon PostgreSQL di Edge runtime, arsitektur multi-account OAuth2 aman, dan sinkronisasi kuota real-time.',
    comingSoon: true,
  },
]
