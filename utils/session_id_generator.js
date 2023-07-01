function sessionIDGenerator() {
  const SESSIONID_LENGTH = 30
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/'

  const collection = lowerCaseLetters + upperCaseLetters + numbers + symbols

  let sessionID = ''
  for (let i = 0; i < SESSIONID_LENGTH; i++) {
    const index = Math.floor(Math.random() * collection.length)
    sessionID += collection[index]
  }

  return sessionID
}

module.exports = sessionIDGenerator