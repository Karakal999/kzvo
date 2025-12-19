import { Building, Users, Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import Accordion from '../Accordion';
import { departments, divisions, centers } from '../../data/about';

const StructureSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Структура академії</h2>
      
      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
        <p className="text-lg text-gray-700">
          Академія має розгалужену організаційну структуру, що включає кафедри,
          відділи та центри, які забезпечують високу якість освітнього процесу
          та науково-методичної роботи.
        </p>
      </div>

      {/* Departments */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Building className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold text-primary">Кафедри</h3>
        </div>
        <div className="space-y-4">
          {departments.map((dept) => (
            <Accordion key={dept.id} title={dept.name} variant="bordered">
              <div className="space-y-4">
                <p className="text-gray-700">{dept.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-gray-900">Завідувач кафедри:</span>
                  </div>
                  <p className="text-gray-700 ml-7">{dept.head}</p>
                </div>

                {dept.contact && (
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-3">Контактна інформація:</h4>
                    <div className="space-y-2 ml-2">
                      {dept.contact.phone && (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Phone className="h-4 w-4 text-primary" />
                          <span>{dept.contact.phone}</span>
                        </div>
                      )}
                      {dept.contact.email && (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Mail className="h-4 w-4 text-primary" />
                          <a href={`mailto:${dept.contact.email}`} className="hover:text-primary">
                            {dept.contact.email}
                          </a>
                        </div>
                      )}
                      {dept.contact.room && (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{dept.contact.room}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Accordion>
          ))}
        </div>
      </div>

      {/* Divisions */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Briefcase className="h-6 w-6 text-accent" />
          <h3 className="text-2xl font-bold text-primary">Відділи</h3>
        </div>
        <div className="space-y-4">
          {divisions.map((division) => (
            <Accordion key={division.id} title={division.name} variant="primary">
              <div className="space-y-3">
                <p className="text-gray-700">{division.description}</p>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Керівник:</span>
                  <span>{division.head}</span>
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </div>

      {/* Centers */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Building className="h-6 w-6 text-accent" />
          <h3 className="text-2xl font-bold text-primary">Центри</h3>
        </div>
        <div className="space-y-4">
          {centers.map((center) => (
            <Accordion key={center.id} title={center.name}>
              <div className="space-y-3">
                <p className="text-gray-700">{center.description}</p>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Директор:</span>
                  <span>{center.head}</span>
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </div>

      {/* Organizational Chart Placeholder */}
      <div className="mt-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8">
        <h3 className="text-xl font-bold text-center text-gray-500 mb-4">
          Організаційна схема
        </h3>
        <div className="flex justify-center">
          <div className="text-6xl">📊</div>
        </div>
        <p className="text-center text-gray-500 mt-4">
          Інтерактивна організаційна схема буде додана найближчим часом
        </p>
      </div>
    </div>
  );
};

export default StructureSection;

