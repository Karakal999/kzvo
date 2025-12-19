const ActivityPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Діяльність</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          Академія здійснює широкий спектр освітньої та методичної діяльності.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-3">Освітня діяльність</h3>
            <p className="text-gray-700">
              Підготовка та перепідготовка педагогічних кадрів за сучасними програмами.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-3">Методична робота</h3>
            <p className="text-gray-700">
              Розробка методичних матеріалів та рекомендацій для педагогів.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-3">Наукова діяльність</h3>
            <p className="text-gray-700">
              Проведення досліджень у галузі педагогіки та освіти.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-3">Міжнародна співпраця</h3>
            <p className="text-gray-700">
              Партнерство з провідними освітніми установами світу.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;

