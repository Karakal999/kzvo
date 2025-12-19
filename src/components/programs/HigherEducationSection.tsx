import { useState } from 'react';
import { GraduationCap, Calendar, DollarSign, FileText, Clock, CheckCircle } from 'lucide-react';
import { mastersPrograms, phdPrograms } from '../../data/programs';
import { formatDate } from '../../utils/formatDate';

type EducationType = 'masters' | 'phd';

const HigherEducationSection = () => {
  const [activeType, setActiveType] = useState<EducationType>('masters');

  const programs = activeType === 'masters' ? mastersPrograms : phdPrograms;

  const admissionInfo = {
    masters: {
      deadlines: [
        { title: 'Подача документів', dates: '15 липня - 5 серпня 2025' },
        { title: 'Вступні випробування', dates: '10-15 серпня 2025' },
        { title: 'Зарахування', dates: 'до 25 серпня 2025' },
      ],
      documents: [
        'Заява про вступ',
        'Диплом бакалавра (оригінал)',
        'Додаток до диплома',
        'Копія паспорта',
        'Медична довідка форми 086-У',
        '6 фотокарток 3х4',
        'Мотиваційний лист',
      ],
      exams: [
        { subject: 'Фахове випробування', type: 'Письмово' },
        { subject: 'Іноземна мова', type: 'Тестування' },
      ],
    },
    phd: {
      deadlines: [
        { title: 'Подача документів', dates: '1 серпня - 20 серпня 2025' },
        { title: 'Вступні іспити', dates: '25-30 серпня 2025' },
        { title: 'Зарахування', dates: 'до 1 вересня 2025' },
      ],
      documents: [
        'Заява про вступ',
        'Диплом магістра (оригінал)',
        'Копія паспорта',
        'Список наукових публікацій',
        'Наукова стаття (за темою дослідження)',
        'Рекомендації від 2 науковців',
        'План дисертаційного дослідження',
      ],
      exams: [
        { subject: 'Спеціальність', type: 'Усно' },
        { subject: 'Філософія науки', type: 'Письмово' },
        { subject: 'Іноземна мова', type: 'Усно' },
      ],
    },
  };

  const info = admissionInfo[activeType];

  return (
    <div>
      {/* Type Toggle */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveType('masters')}
          className={`flex-1 px-8 py-4 rounded-lg font-bold transition-all ${
            activeType === 'masters'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary'
          }`}
        >
          <div className="flex items-center justify-center space-x-3">
            <GraduationCap className="h-6 w-6" />
            <span>Магістратура</span>
          </div>
        </button>
        <button
          onClick={() => setActiveType('phd')}
          className={`flex-1 px-8 py-4 rounded-lg font-bold transition-all ${
            activeType === 'phd'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary'
          }`}
        >
          <div className="flex items-center justify-center space-x-3">
            <GraduationCap className="h-6 w-6" />
            <span>Аспірантура</span>
          </div>
        </button>
      </div>

      {/* Programs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {programs.map((program) => (
          <div key={program.id} className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-primary mb-4">{program.title}</h3>
            <p className="text-gray-700 mb-6">{program.description}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-gray-700">Тривалість: {program.duration}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-gray-700">Початок: {formatDate(program.startDate)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-gray-700">Вартість: {program.price.toLocaleString()} грн/рік</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <h4 className="font-bold text-gray-900 mb-3">Вимоги:</h4>
              <ul className="space-y-2">
                {program.requirements?.map((req, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
              Подати документи
            </button>
          </div>
        ))}
      </div>

      {/* Admission Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Deadlines */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold text-gray-900">Терміни</h3>
          </div>
          <div className="space-y-4">
            {info.deadlines.map((deadline, index) => (
              <div key={index} className="border-l-4 border-primary pl-4">
                <div className="font-semibold text-gray-900">{deadline.title}</div>
                <div className="text-sm text-gray-600">{deadline.dates}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold text-gray-900">Документи</h3>
          </div>
          <ul className="space-y-2">
            {info.documents.map((doc, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <span className="text-primary mt-1">•</span>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exams */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold text-gray-900">Випробування</h3>
          </div>
          <div className="space-y-3">
            {info.exams.map((exam, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="font-semibold text-gray-900">{exam.subject}</div>
                <div className="text-sm text-gray-600">{exam.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-blue-900 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Маєте питання щодо вступу?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Приймальна комісія готова відповісти на всі ваші запитання та допомогти з оформленням документів.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center space-x-2">
            <span>📧</span>
            <a href="mailto:admission@academy.edu.ua" className="hover:underline">
              admission@academy.edu.ua
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <span>📞</span>
            <a href="tel:+380442345682" className="hover:underline">
              +38 (044) 234-56-82
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEducationSection;

