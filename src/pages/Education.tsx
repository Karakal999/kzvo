const Education = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Освітні програми</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-8">
          Академія пропонує широкий спектр освітніх програм для різних рівнів підготовки.
        </p>
        
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-6 py-4">
            <h3 className="text-2xl font-bold text-primary mb-2">Бакалаврат</h3>
            <p className="text-gray-700">
              Базова педагогічна освіта з можливістю спеціалізації.
            </p>
            <p className="text-sm text-gray-600 mt-2">Тривалість: 4 роки</p>
          </div>

          <div className="border-l-4 border-primary pl-6 py-4">
            <h3 className="text-2xl font-bold text-primary mb-2">Магістратура</h3>
            <p className="text-gray-700">
              Поглиблена підготовка педагогічних фахівців та науковців.
            </p>
            <p className="text-sm text-gray-600 mt-2">Тривалість: 2 роки</p>
          </div>

          <div className="border-l-4 border-primary pl-6 py-4">
            <h3 className="text-2xl font-bold text-primary mb-2">Аспірантура</h3>
            <p className="text-gray-700">
              Підготовка науково-педагогічних кадрів вищої кваліфікації.
            </p>
            <p className="text-sm text-gray-600 mt-2">Тривалість: 3-4 роки</p>
          </div>

          <div className="border-l-4 border-accent pl-6 py-4">
            <h3 className="text-2xl font-bold text-primary mb-2">Підвищення кваліфікації</h3>
            <p className="text-gray-700">
              Короткострокові та довгострокові програми для практикуючих педагогів.
            </p>
            <p className="text-sm text-gray-600 mt-2">Тривалість: від 1 місяця до 1 року</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;

