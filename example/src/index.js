import React, { useState } from 'react';
import { render } from 'react-dom';
import { LangProvider, useIntl } from 'ebs-intl';

const translate = {
  greeting: {
    en: 'Hello, {name} {surname}!',
    ro: 'Buna, {name} {surname}!',
  },
  goodbye: {
    en: 'Bye, {name}',
    ru: 'Пока, {name}',
  },
  question: {
    en: 'How are you, {name}?',
    ru: 'Как дела, {name}?',
    ro: 'Cum te simti, {name}?',
  },
};

const Info = () => {
  const { t } = useIntl();

  return (
    <div>
      <div>{t('greeting', { name: 'EBS', surname: 'Integrator' })}</div>
      <div>{t('goodbye', { name: 'Coronavirus' })}</div>
      <div>{t('question', { name: 'Chisinau' })}</div>
    </div>
  );
};

export const App = () => {
  const [curentLang, setLang] = useState('en');

  return (
    <div>
      <LangProvider translate={translate} locale={curentLang}>
        <Info />
      </LangProvider>
      <div style={{ display: 'flex', marginTop: '.5rem' }}>
        <div>
          <button
            style={{ marginRight: '1rem' }}
            onClick={() => {
              setLang('en');
            }}
          >
            English
          </button>
        </div>
        <div>
          <button
            style={{ marginRight: '1rem' }}
            onClick={() => {
              setLang('ro');
            }}
          >
            Română
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setLang('ru');
            }}
          >
            Русский
          </button>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
