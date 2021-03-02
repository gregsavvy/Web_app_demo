About this app:

This is a Web app demo which consists of 3 separate modules:

1. NODE.js (without Express) | Independent RestAPI backend (JSON provider, file and img host) | ex. localhost:5000/api/products or localhost:5000/api/products_img/{:img}
2. Vanilla JS | Admin frontend used for product management | ex. localhost:8081
3. VUE.js | Client frontend with shopping cart | ex. localhost:8080

Scope creep consideration for the demo:

1. No cryptographic hash functions implementation on session cookies and user passwords (ex. bcrypt).
2. No https implementation (consequently no 'Secure' parameter on cookie headers).
3. No API test framework implementation (ex. Mocha).
4. No proper storage for users, currently they are stored in './backend/models/users.json' for ease of running this demo without Docker.
5. No checkout and payment functionality on frontend, consequently no inventory management functionality as well.
6. No infinite scrolling functionality.

Installation (Linux):

1. Install Node.js (https://nodejs.org/en/).
2. Install git $sudo apt-get install git-all
3. Pull git repo into any directory, - $git remote add demo https://github.com/gregsavvy/Test-Web-App.git), then $git pull demo
4. Install dependencies, - $npm install

For ease of installation all dependencies are put inside root package.json. As a side note, it's considered best practice to separate dependencies for backend and frontend.

Ease of running dependencies:
1. "express": "^4.17.1",
2. "concurrently": "^5.3.0",

Backend dependencies:
1. "busboy": "^0.2.14",
2. "dotenv": "^8.2.0",
3. "mongoose": "^5.10.13",

Frontend dependencies:
1. "@vue/cli": "^4.5.11",
2. "file-loader": "^4.3.0",
3. "url-loader": "^2.3.0",
4. "vue": "^2.6.11",
5. "vue-router": "^3.5.1",
6. "vuex": "^3.6.2",
7. "vuex-persistedstate": "^4.0.0-beta.3"

Run (Linux):
1. From the main directory, - $npm start

This command will start all 3 modules in one terminal window.

For separate commands, please see package.json files.

PS:
Do not run this app on production systems without taking into consideration the aforementioned scope creep of the demo.

PPS:
Dockerfile and docker-compose.yml are not optimized implementations of docker for this project because of it's root dependencies structure. They are only there for a check mark.
