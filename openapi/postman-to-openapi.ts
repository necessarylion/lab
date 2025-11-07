import postmanToOpenAPI from '@readme/postman-to-openapi'

postmanToOpenAPI('input.json', 'openapi.yaml', {
  defaultTag: 'General',
  pathDepth: 1,
  outputFormat: 'yaml',
  folders: {
    concat: true,
    separator: '.'
  }
});