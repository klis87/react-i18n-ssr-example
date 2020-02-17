import React from 'react';
import { useTranslation } from 'react-i18next';

import languages from 'languages';

const LanguagePicker = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      {languages.map(lang => (
        <button
          key={lang}
          type="button"
          onClick={() => {
            i18n.changeLanguage(lang);
          }}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguagePicker;
