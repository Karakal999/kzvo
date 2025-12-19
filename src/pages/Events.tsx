import EventCalendar from '../components/calendar/EventCalendar';

const Events = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Календар подій</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Заходи, конкурси, семінари та конференції для вчителів, учнів та всіх учасників освітнього процесу.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-primary/20 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">👨‍🏫</span>
              <h3 className="text-lg font-bold text-primary">Для вчителів</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Курси підвищення кваліфікації, методичні семінари, тренінги та вебінари для педагогів.
            </p>
          </div>

          <div className="bg-white border border-accent/20 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">🎓</span>
              <h3 className="text-lg font-bold text-primary">Для учнів</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Олімпіади, конкурси, наукові змагання та інтелектуальні турніри для школярів.
            </p>
          </div>

          <div className="bg-white border border-purple-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">🌐</span>
              <h3 className="text-lg font-bold text-primary">Загальні події</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Конференції, форуми, дні відкритих дверей та інші заходи для всіх зацікавлених.
            </p>
          </div>
        </div>

        {/* Calendar Component */}
        <EventCalendar />
      </div>
    </div>
  );
};

export default Events;

