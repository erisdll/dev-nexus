const app = require('./src/app')
const PORT = process.env.PORT || 3000; // backup port


process.on('uncaughtException', (err) => {
  console.log(`UNCAUGHT EXCEPTION!\n`)
  console.log(`ERR: ${ err.name }`)
  console.log(`MSG: ${ err.message }\n`)
  console.log('SERVER NOW SHUTTING DOWN!');
  process.exit(1);
});

app.listen( 
  PORT, () => {
    console.log(`Server on!\nListening on port ${PORT}`)
  }
)