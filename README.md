# contabil
Project for accounting balance sheet import and processing

### Requirements
- Node JS >=10.15
- MongoDB >=4.0.0
- npm install -g bower

### How to deploy in Linux
- export NODE_ENV=${enviroment} ex: production
- export NODE_DEBUG=${debug} ex: false
- export NODE_PORT=${port_run_app}
- export NODE_MONGO_HOST=${ip} ex: 10.22.0.3
- export NODE_MONGO_PORT=${port} ex 27017
- export NODE_MONGO_USER=${user} ex: contabil
- export NODE_MONGO_PASS=${pass} ex: 8456de1f1w56
- export NODE_MONGO_DBNAME=${dbname} ex: contabil
- npm install
- bower install
- npm start