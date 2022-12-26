const mongoose = require("mongoose")

// credentials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

async function main() {
   try {

      mongoose.set("strictQuery", true)
      await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.5d9r5hl.mongodb.net/?retryWrites=true&w=majority`);
      console.log('Database connected');

   } catch (error) {
      console.log(`Erro: ${error}`)
   }
}

module.exports = main