import type { Course } from '../types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Сучасні методи викладання',
    description: 'Опануйте інноваційні методики навчання та сучасні педагогічні підходи.',
    duration: '3 місяці',
    level: 'intermediate',
    category: 'Методики викладання',
  },
  {
    id: '2',
    title: 'Цифрові технології в освіті',
    description: 'Навчіться ефективно використовувати цифрові інструменти в навчальному процесі.',
    duration: '2 місяці',
    level: 'beginner',
    category: 'ІТ в освіті',
  },
  {
    id: '3',
    title: 'Психологія навчання',
    description: 'Поглиблене вивчення психологічних аспектів освітнього процесу.',
    duration: '4 місяці',
    level: 'advanced',
    category: 'Психологія',
  },
];
