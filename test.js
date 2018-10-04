const bcrypt = require('bcrypt');
const saltRounds = 10;

var hash = bcrypt.hashSync('sallibou1994', saltRounds);
compare = bcrypt.compareSync('sallibou1994', '$2b$10$tQA/vJfsOOk2WstXC47p4OAs6/PgzYp63Tduegvo4SFAiJ.HzWQSG'); // true
console.log(hash);
console.log(compare);


