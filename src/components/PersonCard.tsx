import { Mail, Phone, Award, GraduationCap, User } from 'lucide-react';
import type { Person } from '../types';

interface PersonCardProps {
  person: Person;
  variant?: 'default' | 'detailed';
}

const PersonCard = ({ person, variant = 'default' }: PersonCardProps) => {
  if (variant === 'detailed') {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Photo */}
          <div className="flex-shrink-0">
            {person.photo ? (
              <img
                src={person.photo}
                alt={person.name}
                className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="h-16 w-16 text-primary" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-primary mb-2">{person.name}</h3>
            <p className="text-lg text-gray-700 mb-3">{person.position}</p>

            {person.degree && (
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <GraduationCap className="h-5 w-5 text-accent" />
                <span>{person.degree}</span>
              </div>
            )}

            {/* Contacts */}
            <div className="space-y-2 mb-4">
              {person.email && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${person.email}`} className="hover:text-primary transition-colors">
                    {person.email}
                  </a>
                </div>
              )}
              {person.phone && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href={`tel:${person.phone}`} className="hover:text-primary transition-colors">
                    {person.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Bio */}
            {person.bio && (
              <p className="text-gray-700 mb-4">{person.bio}</p>
            )}

            {/* Awards */}
            {person.awards && person.awards.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="font-semibold text-gray-900">Нагороди та відзнаки:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {person.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default compact variant
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        {/* Photo */}
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="h-8 w-8 text-primary" />
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 truncate">{person.name}</h4>
          <p className="text-sm text-gray-600 truncate">{person.position}</p>
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="text-sm text-primary hover:underline truncate block"
            >
              {person.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonCard;

