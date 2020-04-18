module.exports = s => {
  const size = 24 // length of chars of an ObjectId
  s = `${s}`
  while (s.length < (size || 2)) { s = '0' + s }
  return s
}
