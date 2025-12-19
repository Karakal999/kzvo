const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Про академію</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          Академія педагогічної освіти є провідним освітнім закладом Київської області, 
          що спеціалізується на підготовці та підвищенні кваліфікації педагогічних кадрів.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Наша місія - забезпечити якісну освіту та розвиток професійних 
          компетентностей викладачів, які формують майбутнє нашого суспільства.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Ми пишаємося нашими випускниками, які працюють у освітніх закладах по всій Україні 
          та вносять значний внесок у розвиток національної освітньої системи.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

