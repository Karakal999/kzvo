import type { TranslatedNews } from '../types/translated-content';

/**
 * Mock translated news data
 * 
 * This demonstrates the structure for multilingual content.
 * In production, this would come from API/Database.
 */
export const mockTranslatedNews: TranslatedNews[] = [
  {
    id: 1,
    translations: {
      uk: {
        title: 'Нова освітня програма для вчителів',
        excerpt: 'Академія запускає інноваційну програму підвищення кваліфікації',
        content: `
          <p>Академія педагогічної освіти з радістю оголошує про запуск нової освітньої програми для вчителів.</p>
          <p>Програма включає сучасні методики викладання, використання цифрових технологій та інноваційні підходи до навчання.</p>
        `,
        slug: 'nova-osvitnya-programa',
        metaTitle: 'Нова освітня програма для вчителів | Академія',
        metaDescription: 'Дізнайтеся про нову інноваційну програму підвищення кваліфікації для педагогів',
      },
      en: {
        title: 'New Educational Program for Teachers',
        excerpt: 'Academy launches innovative professional development program',
        content: `
          <p>The Academy of Pedagogical Education is pleased to announce the launch of a new educational program for teachers.</p>
          <p>The program includes modern teaching methods, use of digital technologies and innovative approaches to learning.</p>
        `,
        slug: 'new-educational-program',
        metaTitle: 'New Educational Program for Teachers | Academy',
        metaDescription: 'Learn about the new innovative professional development program for educators',
      },
    },
    image: '/images/news/program-launch.jpg',
    imageAlt: {
      uk: 'Викладачі на презентації нової програми',
      en: 'Teachers at new program presentation',
    },
    date: '2025-01-15',
    category: 'announcements',
    tags: ['освіта', 'програми', 'вчителі'],
    featured: true,
    author: 'Адміністрація',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 2,
    translations: {
      uk: {
        title: 'Міжнародна конференція з педагогіки',
        excerpt: 'Академія приймає учасників з 15 країн світу',
        content: `
          <p>З 20 по 22 лютого відбудеться щорічна міжнародна конференція з питань сучасної педагогіки.</p>
          <p>Учасники обговорять найактуальніші теми освіти та обмін досвідом.</p>
        `,
        slug: 'mizhnarodna-konferenciya',
        metaTitle: 'Міжнародна конференція | Академія',
        metaDescription: 'Приєднуйтесь до міжнародної конференції з педагогіки',
      },
      en: {
        title: 'International Conference on Pedagogy',
        excerpt: 'Academy hosts participants from 15 countries',
        content: `
          <p>The annual international conference on modern pedagogy will take place from February 20 to 22.</p>
          <p>Participants will discuss the most relevant education topics and share experiences.</p>
        `,
        slug: 'international-conference',
        metaTitle: 'International Conference | Academy',
        metaDescription: 'Join the international conference on pedagogy',
      },
    },
    image: '/images/news/conference.jpg',
    imageAlt: {
      uk: 'Учасники конференції',
      en: 'Conference participants',
    },
    date: '2025-02-10',
    category: 'events',
    tags: ['конференція', 'міжнародне співробітництво'],
    featured: false,
    author: 'Оргкомітет',
    createdAt: '2025-02-10T09:00:00Z',
  },
  {
    id: 3,
    translations: {
      uk: {
        title: 'Досягнення наших випускників',
        excerpt: 'Випускники академії отримали національні нагороди',
        content: `
          <p>Ми з гордістю повідомляємо, що троє наших випускників отримали національні педагогічні нагороди.</p>
          <p>Це визнання їхнього професіоналізму та dedication to education.</p>
        `,
        slug: 'dosyagnennya-vypusknykiv',
        metaTitle: 'Досягнення випускників | Академія',
        metaDescription: 'Наші випускники отримали національні педагогічні нагороди',
      },
      en: {
        title: 'Achievements of Our Graduates',
        excerpt: 'Academy graduates received national awards',
        content: `
          <p>We are proud to announce that three of our graduates have received national teaching awards.</p>
          <p>This is recognition of their professionalism and dedication to education.</p>
        `,
        slug: 'graduate-achievements',
        metaTitle: 'Graduate Achievements | Academy',
        metaDescription: 'Our graduates received national teaching awards',
      },
    },
    image: '/images/news/awards.jpg',
    date: '2025-01-25',
    category: 'achievements',
    tags: ['випускники', 'нагороди', 'досягнення'],
    featured: true,
    createdAt: '2025-01-25T14:00:00Z',
  },
];

/**
 * Mock function to simulate API call
 */
export const fetchTranslatedNews = async (id?: number): Promise<TranslatedNews | TranslatedNews[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (id !== undefined) {
    const news = mockTranslatedNews.find(n => n.id === id);
    if (!news) {
      throw new Error('News not found');
    }
    return news;
  }

  return mockTranslatedNews;
};

/**
 * Mock function to fetch news by slug
 */
export const fetchNewsBySlug = async (slug: string, lang: 'uk' | 'en'): Promise<TranslatedNews> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const news = mockTranslatedNews.find(n => n.translations[lang].slug === slug);
  
  if (!news) {
    throw new Error('News not found');
  }

  return news;
};

