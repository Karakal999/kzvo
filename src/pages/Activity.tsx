const Activity = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Діяльність</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          Основні напрямки діяльності Академії педагогічної освіти.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-3">Наукова діяльність</h3>
            <p className="text-gray-700">
              Проведення наукових досліджень у галузі педагогіки та освіти.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-3">Освітня діяльність</h3>
            <p className="text-gray-700">
              Підготовка та підвищення кваліфікації педагогічних працівників.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-3">Методична робота</h3>
            <p className="text-gray-700">
              Розробка та впровадження інноваційних методик навчання.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-3">Міжнародна співпраця</h3>
            <p className="text-gray-700">
              Обмін досвідом з провідними освітніми закладами світу.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;

