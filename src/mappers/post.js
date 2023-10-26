function post(row = []) {
  return {
    toMap: () => ({
      id: row[0] || null,
      username: row[1] || null,
      author: row[2] || null,
      description: row[3] || null
    })
  }
}

export default post
