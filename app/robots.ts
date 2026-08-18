import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config/siteConfig'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.socials.liveSite}/sitemap.xml`,
  }
}
