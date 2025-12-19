import { useState } from 'react';
import { ArrowUp, ArrowDown, Download, Trophy, Medal, Award as AwardIcon } from 'lucide-react';
import type { CompetitionResult } from '../../types';

interface ResultsTableProps {
  results: CompetitionResult[];
  title?: string;
  showRegion?: boolean;
}

type SortField = 'rank' | 'participantName' | 'school' | 'grade' | 'score' | 'region';
type SortOrder = 'asc' | 'desc';

const ResultsTable = ({ results, title = 'Результати', showRegion = true }: ResultsTableProps) => {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortedResults = [...results].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle undefined values
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;

    // Handle string comparisons
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getAwardIcon = (award?: string) => {
    if (!award) return null;
    
    if (award.includes('I ступеня')) {
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    } else if (award.includes('II ступеня')) {
      return <Medal className="h-5 w-5 text-gray-400" />;
    } else if (award.includes('III ступеня')) {
      return <Medal className="h-5 w-5 text-orange-600" />;
    } else {
      return <AwardIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAwardColor = (award?: string) => {
    if (!award) return 'bg-gray-100 text-gray-700';
    
    if (award.includes('I ступеня')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    } else if (award.includes('II ступеня')) {
      return 'bg-gray-100 text-gray-800 border-gray-300';
    } else if (award.includes('III ступеня')) {
      return 'bg-orange-100 text-orange-800 border-orange-300';
    } else {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 font-semibold text-gray-700 hover:text-primary transition-colors"
    >
      <span>{children}</span>
      {sortField === field && (
        sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
      )}
    </button>
  );

  const handleExport = () => {
    console.log('Exporting results...');
    alert('Експорт результатів у форматі PDF/Excel (демо)');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
          <p className="text-gray-600">
            Всього учасників: <span className="font-semibold text-primary">{results.length}</span>
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
        >
          <Download className="h-5 w-5" />
          <span>Експортувати</span>
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <SortButton field="rank">Місце</SortButton>
                </th>
                <th className="px-6 py-4 text-left">
                  <SortButton field="participantName">Учасник</SortButton>
                </th>
                <th className="px-6 py-4 text-left">
                  <SortButton field="school">Заклад освіти</SortButton>
                </th>
                <th className="px-6 py-4 text-left">
                  <SortButton field="grade">Клас</SortButton>
                </th>
                {showRegion && (
                  <th className="px-6 py-4 text-left">
                    <SortButton field="region">Регіон</SortButton>
                  </th>
                )}
                <th className="px-6 py-4 text-left">
                  <SortButton field="score">Бали</SortButton>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="font-semibold text-gray-700">Нагорода</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((result) => (
                <tr key={result.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {result.rank <= 3 && (
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center font-bold
                          ${result.rank === 1 ? 'bg-yellow-400 text-white' : ''}
                          ${result.rank === 2 ? 'bg-gray-400 text-white' : ''}
                          ${result.rank === 3 ? 'bg-orange-500 text-white' : ''}
                        `}>
                          {result.rank}
                        </div>
                      )}
                      {result.rank > 3 && (
                        <span className="font-semibold text-gray-700">{result.rank}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{result.participantName}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {result.school}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {result.grade}
                  </td>
                  {showRegion && (
                    <td className="px-6 py-4 text-gray-700">
                      {result.region}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <span className="font-bold text-primary">{result.score}</span>
                  </td>
                  <td className="px-6 py-4">
                    {result.award && (
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getAwardColor(result.award)}`}>
                        {getAwardIcon(result.award)}
                        <span className="text-sm font-semibold">{result.award}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {sortedResults.map((result) => (
          <div key={result.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {/* Rank and Award */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {result.rank <= 3 ? (
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                    ${result.rank === 1 ? 'bg-yellow-400 text-white' : ''}
                    ${result.rank === 2 ? 'bg-gray-400 text-white' : ''}
                    ${result.rank === 3 ? 'bg-orange-500 text-white' : ''}
                  `}>
                    {result.rank}
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-lg text-gray-700">
                    {result.rank}
                  </div>
                )}
                <span className="text-sm text-gray-600">Місце</span>
              </div>
              {result.award && (
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getAwardColor(result.award)}`}>
                  {getAwardIcon(result.award)}
                </div>
              )}
            </div>

            {/* Participant Info */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">{result.participantName}</h3>
            <div className="space-y-1 text-sm text-gray-700 mb-3">
              <div><span className="font-semibold">Школа:</span> {result.school}</div>
              <div><span className="font-semibold">Клас:</span> {result.grade}</div>
              {showRegion && result.region && (
                <div><span className="font-semibold">Регіон:</span> {result.region}</div>
              )}
            </div>

            {/* Score */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="text-gray-600">Бали:</span>
              <span className="text-2xl font-bold text-primary">{result.score}</span>
            </div>

            {/* Award Label */}
            {result.award && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getAwardColor(result.award)}`}>
                  {result.award}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsTable;

