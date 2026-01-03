import { MetadataRoute } from 'next'

import { newsData } from '@/shared/mock/newsData'

const baseUrl = 'https://www.khonthaiparty.com'

const toUrl = (path = '') => (path ? `${baseUrl}/${path}` : baseUrl)

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

const staticRoutes: Array<{
   path: string
   changeFrequency: ChangeFrequency
   priority: number
}> = [
   { path: '', changeFrequency: 'weekly', priority: 1 },
   { path: 'news', changeFrequency: 'daily', priority: 0.8 },
   { path: 'about/history', changeFrequency: 'yearly', priority: 0.6 },
   { path: 'about/ideology', changeFrequency: 'yearly', priority: 0.6 },
   { path: 'about/policy', changeFrequency: 'monthly', priority: 0.9 },
   { path: 'person/board', changeFrequency: 'monthly', priority: 0.5 },
   { path: 'person/activity', changeFrequency: 'monthly', priority: 0.5 },
   { path: 'person/constituency', changeFrequency: 'monthly', priority: 0.5 },
   { path: 'person/parliament', changeFrequency: 'monthly', priority: 0.5 },
   { path: 'person/party-list', changeFrequency: 'monthly', priority: 0.5 },
   { path: 'donation', changeFrequency: 'monthly', priority: 0.9 },
   { path: 'donation/now', changeFrequency: 'weekly', priority: 0.7 },
   { path: 'privacy-policy', changeFrequency: 'yearly', priority: 0.4 },
   { path: 'shop-map', changeFrequency: 'monthly', priority: 0.9 },
   { path: 'register', changeFrequency: 'weekly', priority: 0.4 },
   { path: 'register/step2', changeFrequency: 'weekly', priority: 0.4 },
   { path: 'login', changeFrequency: 'monthly', priority: 0.3 },
]

const now = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
   const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
      url: toUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
   }))

   const newsEntries: MetadataRoute.Sitemap = newsData.map((news) => ({
      url: toUrl(`news/${news.id}`),
      lastModified: news.date ? new Date(news.date) : now,
      changeFrequency: 'weekly',
      priority: 0.6,
   }))

   return [...staticEntries, ...newsEntries]
}
