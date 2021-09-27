const path = require('path')
const fs = require('fs').promises
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json')

const readContacts = async () => {
    const contacts = await fs.readFile(contactsPath, 'utf8')
    const parsedContacts = JSON.parse(contacts)
    return parsedContacts
}

async function listContacts() {
  return readContacts()
    
}

async function getContactById(contactId) {
  const contacts = await readContacts()
  const [filteredContact] = contacts.filter(contact => String(contact.id) === String(contactId))
  return filteredContact
}

async function removeContact(contactId) {
  const contacts = await readContacts()
  const deletedContact = contacts.find(contact => String(contact.id) === String(contactId))
  const newContacts = contacts.filter(contact => String(contact.id) !== String(contactId))
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
  return deletedContact
}

async function addContact(name, email, phone) {
  const contacts = await readContacts()
  const newContact = {id: uuidv4(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}

