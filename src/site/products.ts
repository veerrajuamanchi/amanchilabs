export type Product = {
  name: string
  category: string
  description: string
  status: 'Featured' | 'In development'
  url?: string
  image?: string
  accent: string
  featured?: boolean
}

export const products: Product[] = [
  {
    name: 'DermaPrivate',
    category: 'Private skincare routine planning',
    description:
      'A private skincare companion to organize products and routines, review ingredient-aware findings, and use optional AI assistance on your terms.',
    status: 'Featured',
    url: 'https://dermaprivate-website.onrender.com/index.html',
    accent: 'sage',
    featured: true,
  },
]
