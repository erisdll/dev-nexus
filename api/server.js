const app = require('./src/app')
const PORT = process.env.PORT || 80; // backup port
const dbconnection = require('./src/database/mongooseConnect')

process.on('uncaughtException', (err) => {
  console.log(`UNCAUGHT EXCEPTION!\n`)
  console.log(`ERR: ${ err.name }`)
  console.log(`MSG: ${ err.message }\n`)
  console.log('SERVER NOW SHUTTING DOWN!');
  process.exit(1);
});

app.listen( 
  PORT, () => {
    console.log(`Server on!\nApp listening on port ${PORT}`)
  }
)

dbconnection.connect()
