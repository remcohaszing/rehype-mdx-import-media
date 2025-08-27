import { define } from '@remcohaszing/eslint'

export default define([
  { ignores: ['fixtures/'] },
  {
    rules: {
      'no-param-reassign': 'off'
    }
  }
])
