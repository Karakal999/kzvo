import { Trans as I18nextTrans, type TransProps } from 'react-i18next';
import LinkWithLang from './LinkWithLang';

/**
 * Trans Component for complex translations
 * 
 * Supports:
 * - Links inside text
 * - HTML tags
 * - Component interpolation
 * - Variables
 * 
 * @example
 * // Simple text with variable
 * <Trans i18nKey="welcome" values={{ name: "John" }}>
 *   Welcome, {{name}}!
 * </Trans>
 * 
 * @example
 * // Text with link
 * <Trans 
 *   i18nKey="about.read_more"
 *   components={{ 
 *     link: <LinkWithLang to="/about" /> 
 *   }}
 * >
 *   Read more <link>about us</link>
 * </Trans>
 * 
 * @example
 * // Text with bold
 * <Trans i18nKey="message">
 *   This is <strong>important</strong> text
 * </Trans>
 */
export const Trans = (props: TransProps<any>) => {
  return <I18nextTrans {...props} />;
};

/**
 * Trans with automatic LinkWithLang support
 * 
 * @example
 * // Translation: "Читайте більше <1>про нас</1>"
 * <TransWithLink 
 *   i18nKey="about.read_more"
 *   linkTo="/about"
 * />
 */
interface TransWithLinkProps extends Omit<TransProps<any>, 'components'> {
  linkTo: string;
  linkClassName?: string;
}

export const TransWithLink = ({ linkTo, linkClassName, ...props }: TransWithLinkProps) => {
  return (
    <Trans
      {...props}
      components={{
        link: <LinkWithLang to={linkTo} className={linkClassName} />,
      }}
    />
  );
};

export default Trans;

