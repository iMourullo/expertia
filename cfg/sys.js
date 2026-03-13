import { Eta } from "eta";
const eta = new Eta( { views: process.argv[1].replace('app','views'), cache: true, debug: false } );

function etaEngine(){
  return (path, opts, callback) => {
    try {
      const sArc = eta.readFile(path);
      const rTmp = eta.renderString(sArc, opts);
      callback(null, rTmp);
    } catch (e){
      console.log('Error: Eta Engine!');
      callback(e);
    };
  };
}

function normalizePort(val) {
  var port = parseInt(val, 10);
  if(isNaN(port)){ return val; }   // named pipe
  if (port >= 0){ return port; }   // port number
  return false;
}

export default { etaEngine, normalizePort }
