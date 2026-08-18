/**
 * Site Configuration - Reads environment variables with safe defaults.
 */
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Rizky Mardhani',
  handle: process.env.NEXT_PUBLIC_SITE_HANDLE || 'Zenith',
  role: process.env.NEXT_PUBLIC_SITE_ROLE || 'Web Enthusiast & IoT Embedded Explorer',
  location: process.env.NEXT_PUBLIC_SITE_LOCATION || 'Indonesia 🇮🇩',
  university: process.env.NEXT_PUBLIC_SITE_UNIVERSITY || 'Universitas Brawijaya',
  level: process.env.NEXT_PUBLIC_SITE_LEVEL || 'Lv. 20 Explorer',
  timezone: process.env.NEXT_PUBLIC_SITE_TIMEZONE || 'UTC+7',

  socials: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/zxaviers',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/rizky-mardhani1st',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/ryzennth_',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'riskimardhani@gmail.com',
    liveSite: process.env.NEXT_PUBLIC_LIVE_SITE_URL || 'https://zenithcode.my.id',
  },
}
