/**
 * Localized phone input component
 */

import { useState, useEffect } from 'react';
import { useLocaleFormat, useFormLocale } from '../hooks/useLocaleFormat';
import { useCommonTranslation } from '../hooks/useTypedTranslation';

interface LocalizedPhoneInputProps {
  /**
   * Input value
   */
  value: string;

  /**
   * Change handler
   */
  onChange: (value: string) => void;

  /**
   * Input name attribute
   */
  name?: string;

  /**
   * Is field required
   */
  required?: boolean;

  /**
   * Is field disabled
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Show validation error
   */
  error?: string;

  /**
   * Custom label
   */
  label?: string;
}

/**
 * LocalizedPhoneInput Component
 * 
 * Phone input with locale-specific formatting and validation
 * 
 * @example
 * const [phone, setPhone] = useState('');
 * 
 * <LocalizedPhoneInput
 *   value={phone}
 *   onChange={setPhone}
 *   required
 * />
 */
const LocalizedPhoneInput = ({
  value,
  onChange,
  name = 'phone',
  required = false,
  disabled = false,
  className = '',
  error,
  label,
}: LocalizedPhoneInputProps) => {
  const { formatPhoneNumber } = useLocaleFormat();
  const { placeholders } = useFormLocale();
  const { t } = useCommonTranslation();

  const [displayValue, setDisplayValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused && value) {
      setDisplayValue(formatPhoneNumber(value));
    } else {
      setDisplayValue(value);
    }
  }, [value, formatPhoneNumber, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);
    onChange(newValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value) {
      const formatted = formatPhoneNumber(value);
      setDisplayValue(formatted);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayValue(value);
  };

  const inputLabel = label || t('labels.phone');

  return (
    <div className={`${className}`}>
      {inputLabel && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {inputLabel}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        type="tel"
        id={name}
        name={name}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholders.phone}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-2 border rounded-md
          focus:ring-2 focus:ring-primary focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      <p className="mt-1 text-xs text-gray-500">
        {placeholders.phone}
      </p>
    </div>
  );
};

export default LocalizedPhoneInput;

