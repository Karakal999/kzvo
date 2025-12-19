import { Component, type ComponentType } from 'react';
import { withTranslation as withI18nextTranslation, type WithTranslation } from 'react-i18next';

/**
 * HOC for class components with translation support
 * 
 * @example
 * class MyComponent extends Component<Props & WithTranslation> {
 *   render() {
 *     const { t } = this.props;
 *     return <h1>{t('title')}</h1>;
 *   }
 * }
 * 
 * export default withTranslation('common')(MyComponent);
 */

/**
 * Enhanced withTranslation HOC with additional utilities
 */
export const withTranslation = (namespace?: any) => {
  return <P extends object>(WrappedComponent: ComponentType<P & WithTranslation>) => {
    const WithTranslationComponent = withI18nextTranslation(namespace)(WrappedComponent);
    
    return WithTranslationComponent as ComponentType<P>;
  };
};

/**
 * Base class for components with translation
 * 
 * @example
 * class MyComponent extends TranslatedComponent<Props> {
 *   render() {
 *     return <h1>{this.t('title')}</h1>;
 *   }
 * }
 * 
 * export default withTranslation('common')(MyComponent);
 */
export abstract class TranslatedComponent<P = {}, S = {}> extends Component<
  P & WithTranslation,
  S
> {
  /**
   * Shorthand for this.props.t
   */
  protected get t() {
    return this.props.t;
  }

  /**
   * Shorthand for this.props.i18n
   */
  protected get i18n() {
    return this.props.i18n;
  }

  /**
   * Get current language
   */
  protected get currentLanguage() {
    return this.props.i18n.language;
  }

  /**
   * Change language
   */
  protected changeLanguage(lang: string) {
    return this.props.i18n.changeLanguage(lang);
  }
}

export default withTranslation;

