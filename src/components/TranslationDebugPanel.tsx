/**
 * Translation Debug Panel
 * 
 * Floating panel for managing translations in development mode
 */

import { useState } from 'react';
import { useTranslationDebug } from '../contexts/TranslationDebugContext';
import { 
  Settings, 
  X, 
  AlertCircle, 
  Copy, 
  Download,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

/**
 * TranslationDebugPanel Component
 * 
 * Only visible in development mode when translation mode is enabled
 * 
 * @example
 * {import.meta.env.DEV && <TranslationDebugPanel />}
 */
const TranslationDebugPanel = () => {
  const {
    isTranslationMode,
    toggleTranslationMode,
    missingKeys,
    clearMissingKeys,
    showKeysOnHover,
    toggleShowKeysOnHover,
    highlightUntranslated,
    toggleHighlightUntranslated,
  } = useTranslationDebug();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  if (!import.meta.env.DEV) {
    return null;
  }

  const handleCopyMissingKeys = () => {
    const text = missingKeys
      .map(item => `${item.namespace}:${item.key}`)
      .join('\n');
    
    navigator.clipboard.writeText(text);
    alert('Missing keys copied to clipboard!');
  };

  const handleExportMissingKeys = () => {
    const json = JSON.stringify(missingKeys, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `missing-keys-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className={`p-3 rounded-full shadow-lg transition-colors ${
            isTranslationMode
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-700 hover:bg-gray-800'
          } text-white`}
          title="Translation Debug Panel"
        >
          <Settings className="h-6 w-6" />
          {missingKeys.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {missingKeys.length}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-gray-900 text-white rounded-lg shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <span className="font-semibold">Translation Debug</span>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="p-1 hover:bg-gray-800 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {/* Translation Mode Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Translation Mode</span>
          <button
            onClick={toggleTranslationMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isTranslationMode ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isTranslationMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Show Keys on Hover */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Show Keys on Hover</span>
          <button
            onClick={toggleShowKeysOnHover}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showKeysOnHover ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showKeysOnHover ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Highlight Untranslated */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Highlight Untranslated</span>
          <button
            onClick={toggleHighlightUntranslated}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              highlightUntranslated ? 'bg-yellow-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                highlightUntranslated ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Missing Keys Section */}
        <div className="border-t border-gray-700 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-sm font-semibold mb-2"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span>Missing Keys ({missingKeys.length})</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {isExpanded && (
            <div className="space-y-2">
              {missingKeys.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">
                  No missing keys detected
                </p>
              ) : (
                <>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {missingKeys.map((item, index) => (
                      <div
                        key={index}
                        className="text-xs bg-gray-800 p-2 rounded"
                      >
                        <div className="font-mono text-red-400">
                          {item.namespace}:{item.key}
                        </div>
                        <div className="text-gray-500 text-[10px] mt-1">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleCopyMissingKeys}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-xs"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </button>
                    <button
                      onClick={handleExportMissingKeys}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-xs"
                      title="Export as JSON"
                    >
                      <Download className="h-3 w-3" />
                      Export
                    </button>
                    <button
                      onClick={clearMissingKeys}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded text-xs"
                      title="Clear list"
                    >
                      <Trash2 className="h-3 w-3" />
                      Clear
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400 mb-2">Quick Actions</p>
          <div className="space-y-2 text-xs">
            <a
              href="/admin/translations"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-center"
            >
              Open Translation Editor →
            </a>
            <button
              onClick={() => {
                window.open('https://github.com/yourusername/repo/tree/main/src/locales', '_blank');
              }}
              className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-center"
            >
              View on GitHub →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-gray-700 text-xs text-gray-500 text-center">
        Dev Mode Only
      </div>
    </div>
  );
};

export default TranslationDebugPanel;

