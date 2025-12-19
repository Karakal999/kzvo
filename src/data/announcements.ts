import type { Announcement } from '../types';
import { ml } from '../utils/multilingualData';

export const announcements: Announcement[] = [
  {
    id: '1',
    title: ml('Терміново! Зміна дати вступних іспитів', 'Urgent! Change of entrance exam date'),
    content: ml(
      'У зв\'язку з технічними причинами вступні іспити перенесено на 25 січня 2025 року. Всі зареєстровані абітурієнти будуть повідомлені додатково.',
      'Due to technical reasons, the entrance exams have been postponed to January 25, 2025. All registered applicants will be notified additionally.'
    ),
    date: '2024-12-19',
    priority: 'urgent',
    link: '/contacts',
  },
  {
    id: '2',
    title: ml('Важливо! Реєстрація на зимову сесію', 'Important! Registration for winter session'),
    content: ml(
      'Нагадуємо студентам про необхідність зареєструватися на зимову екзаменаційну сесію до 22 грудня 2024 року через особистий кабінет.',
      'We remind students about the need to register for the winter exam session by December 22, 2024 through your personal account.'
    ),
    date: '2024-12-18',
    priority: 'important',
    link: '/education',
  },
  {
    id: '3',
    title: ml('Оновлення графіку роботи бібліотеки', 'Library schedule update'),
    content: ml(
      'З 1 січня 2025 року бібліотека працюватиме за новим розкладом: Пн-Пт 8:00-19:00, Сб 9:00-15:00.',
      'From January 1, 2025, the library will operate on a new schedule: Mon-Fri 8:00-19:00, Sat 9:00-15:00.'
    ),
    date: '2024-12-17',
    priority: 'normal',
    link: '/resources',
  },
  {
    id: '4',
    title: ml('Важливо! Стипендіальна комісія', 'Important! Scholarship committee'),
    content: ml(
      'Засідання стипендіальної комісії відбудеться 28 грудня. Подання документів до 26 грудня включно.',
      'The scholarship committee meeting will be held on December 28. Document submission deadline is December 26 inclusive.'
    ),
    date: '2024-12-16',
    priority: 'important',
  },
  {
    id: '5',
    title: ml('Конкурс на кращу наукову роботу', 'Best scientific work competition'),
    content: ml(
      'Оголошено прийом робіт на щорічний конкурс студентських наукових досліджень. Дедлайн - 15 лютого 2025 року.',
      'Applications are now open for the annual student scientific research competition. Deadline - February 15, 2025.'
    ),
    date: '2024-12-15',
    priority: 'normal',
    link: '/students',
  },
];

