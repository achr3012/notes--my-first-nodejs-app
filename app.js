const yargs = require('yargs')
const notes = require('./notes.js')

yargs.command({
  command: 'add',
  describe: 'Add new note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.add(argv.title, argv.body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.remove(argv.title)
  }
})

yargs.command({
  command: 'list',
  describe: 'List all notes',
  
  handler() {
    notes.list()
  }
})

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.read(argv.title)
  }
})

yargs.parse()