import oracledb from 'oracledb'

export let connection

const initDB = async () => {
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    })
    console.log('sucessfully connected to db!')
  } catch (error) {
    console.error(error)
  } finally {
    if (connection) {
      //   try {
      //     await connection.close()
      //     console.log('connection closed')
      //   } catch (error) {
      //     console.error(error)
      //   }
    }
  }
}

export default initDB
