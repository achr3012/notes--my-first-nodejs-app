const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse("Note added successfully."))
  } else {
    console.log(chalk.red.inverse("This note title is taken."))
  }
}

const removeNotes = title => {
  const notes = loadNotes()
  const notesToKeep = notes.filter(note => note.title !== title)
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed!'))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse('Please enter a valid note title.'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.blue.inverse('Your notes: '))
  notes.forEach(note => console.log(' => '+ note.title))
}

const readNote = title => {
  const notes = loadNotes()
  const note = notes.find(note => note.title === title)
  if (note) {
    console.log(chalk.yellow.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Please enter a valid note title.'))
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('myNotes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const bufferedNotes = fs.readFileSync('myNotes.json');
    const dataJSON = bufferedNotes.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  add: addNotes,
  remove: removeNotes,
  list: listNotes,
  read: readNote
}