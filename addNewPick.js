const grabity = require("grabity");

function addNewPick(url, db, cb) {
  (async () => {
    let it = await grabity.grabIt(url);
    const pick = {
      title: it.title || url,
      description: it.description || '',
      image: it.image || '',
      url: url
    };
    console.log(pick);
    db.ref('fccCaracas/picks').push(pick, error =>  error ? cb(true) : cb(null) );
  })();	
}

module.exports = addNewPick;