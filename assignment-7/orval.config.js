module.exports = {
  'bookstore-file': {
    input: 'https://develop-api.bookstore.dwarvesf.com/swagger/doc.json',
    output:{
      mode: 'tags-split', // use more than 1 file instead of generating one file
      target: 'src/app/_generated/bookStore.ts',
      schemas: 'src/app/_generated/model',
      client: 'swr', // generate hook with SWR lib (don't need to write my own hook trigger api)
      override: {
        mutator: {
          path: 'src/app/_lib/custom-instance.ts',
          name: 'customInstance',
        },
      },
    }
  },
};