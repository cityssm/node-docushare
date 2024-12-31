import configCityssm, { cspellWords } from 'eslint-config-cityssm'
import tseslint from 'typescript-eslint'

export const config = tseslint.config(...configCityssm, {
  rules: {
    '@cspell/spellchecker': [
      'warn',
      {
        cspell: {
          words: [
            ...cspellWords,
            'docu',
            
            // Libraries
            'dsapi',
            'nodedocusharejava',
            'jdom'
          ]
        }
      }
    ],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-type-assertion': 'off'
  }
})

export default config
