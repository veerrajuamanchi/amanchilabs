export type Product = {
  id: 'derma' | 'wealth'
  name: string
  tagline: string
  descriptor: string
  status: 'explore' | 'in-development'
  url?: string
  dark: boolean
  trustPoints: [string, string, string]
}

export const products: Product[] = [
  {
    id: 'wealth',
    name: 'WealthPrivate',
    tagline: 'Your wealth. Your data. Your control.',
    descriptor: 'A private financial operating system that turns scattered documents into a source-backed history of your financial life.',
    status: 'in-development',
    dark: true,
    trustPoints: ['Private by design', 'You own your data', 'Built for the long term'],
  },
  {
    id: 'derma',
    name: 'DermaPrivate',
    tagline: 'Personalized skincare. On your terms.',
    descriptor: 'Plan and understand your skincare routine with ingredient-aware intelligence. AI assists only when you choose.',
    status: 'explore',
    url: 'https://dermaprivate-website.onrender.com/index.html',
    dark: false,
    trustPoints: ['Your data stays private', 'Personalized insights', 'Designed for real life'],
  },
]
