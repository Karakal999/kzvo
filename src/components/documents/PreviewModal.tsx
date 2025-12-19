import { X, Download, ExternalLink, AlertCircle } from 'lucide-react';
import type { Document } from '../../types';

interface PreviewModalProps {
  document: Document;
  isOpen: boolean;
  onClose: () => void;
}

const PreviewModal = ({ document, isOpen, onClose }: PreviewModalProps) => {
  if (!isOpen) return null;

  const canPreview = document.fileType === 'pdf';

  const handleDownload = () => {
    // Mock download
    console.log('Downloading:', document.title);
    alert(`Завантаження файлу: ${document.title}`);
  };

  const handleOpenExternal = () => {
    // Mock external open
    console.log('Opening externally:', document.title);
    window.open(document.fileUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex-1 min-w-0 mr-4">
            <h2 className="text-2xl font-bold text-primary mb-2 line-clamp-2">
              {document.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">
                {document.category}
              </span>
              <span>{document.fileSize}</span>
              <span className="uppercase font-semibold text-primary">
                {document.fileType}
              </span>
              {document.author && (
                <span className="text-gray-500">
                  Автор: {document.author}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {canPreview ? (
            <iframe
              src={`${document.fileUrl}#toolbar=0`}
              className="w-full h-full"
              title={document.title}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <AlertCircle className="h-20 w-20 text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                Попередній перегляд недоступний
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Файли формату {document.fileType.toUpperCase()} не підтримують попередній перегляд у браузері. 
                Завантажте файл, щоб відкрити його на вашому комп'ютері.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <div className="text-lg font-bold text-primary mb-2">
                  {document.title}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Формат: <span className="font-semibold uppercase">{document.fileType}</span></div>
                  <div>Розмір: <span className="font-semibold">{document.fileSize}</span></div>
                  {document.description && (
                    <div className="mt-3 pt-3 border-t border-gray-300">
                      {document.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {document.downloads && (
              <span>Завантажень: <span className="font-semibold">{document.downloads}</span></span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Закрити
            </button>
            {canPreview && (
              <button
                onClick={handleOpenExternal}
                className="flex items-center space-x-2 px-6 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Відкрити в новій вкладці</span>
              </button>
            )}
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Завантажити</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;

