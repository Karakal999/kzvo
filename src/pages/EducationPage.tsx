const EducationPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Освіта програми</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-6">
          Академія пропонує широкий спектр освітніх програм для педагогів на всіх рівнях професійного розвитку.
        </p>

        <div className="space-y-6">
          {/* Program Cards */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-primary mb-3">Бакалаврат педагогічної освіти</h3>
            <p className="text-gray-700 mb-3">
              Комплексна програма підготовки педагогів із сучасними компетентностями.
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-semibold mr-2">Тривалість:</span>
              <span>4 роки</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-primary mb-3">Магістратура в галузі освіти</h3>
            <p className="text-gray-700 mb-3">
              Поглиблена підготовка фахівців у сфері педагогіки та управління освітою.
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-semibold mr-2">Тривалість:</span>
              <span>2 роки</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-primary mb-3">Курси підвищення кваліфікації</h3>
            <p className="text-gray-700 mb-3">
              Короткострокові програми для вдосконалення професійних навичок педагогів.
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-semibold mr-2">Тривалість:</span>
              <span>від 1 до 6 місяців</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;

