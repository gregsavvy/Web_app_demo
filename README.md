About this app:

This is a Web app demo which consists of 5 separate modules:

1. NODE.js (without Express) | Independent RestAPI backend (JSON provider, file and img host) | ex. localhost:5000/api/products or localhost:5000/api/products_img/{:img}
2. Vanilla JS | Admin frontend used for product management | ex. localhost:8081
3. VUE.js | Client frontend with shopping cart | ex. localhost:8080
4. MongoDB | JSON database used to store product info | ex. localhost:7070 (Mongo Express)
5. PostgreSQL | SQL database used to store user info | ex. localhost:6060 (Adminer)

---

Default login and password for admin frontend: admin | admin.

---

Installation (Linux):

1. Install Docker from https://docs.docker.com/engine/install/ubuntu/ & Docker Compose from https://docs.docker.com/compose/install/
2. Install git $sudo apt-get install git-all
3. Pull git repo into any directory, - $git remote add demo https://github.com/gregsavvy/Test-Web-App.git), then $git pull demo

---

Run (Linux):
1. From the main directory, - $sudo docker-compose up
2. One thing to note, because of an unresolved issue in nodejs-pg library (https://github.com/brianc/node-postgres/issues/1611). You may have to Ctrl+C all containers and then again, - $sudo docker-compose up, - in order for Postgres to setup everything properly [**].

This will start all 5 modules in separate containers.

---

Kubernetes implementation:
testing...

---

Ease of running dependencies:
1. "express": "^4.17.1",
2. "concurrently": "^5.3.0",

Backend dependencies:
1. "busboy": "^0.2.14",
2. "dotenv": "^8.2.0",
3. "mongoose": "^5.10.13",
4. "pg": "^8.6.0"

Frontend dependencies:
1. "@vue/cli": "^4.5.11",
2. "file-loader": "^4.3.0",
3. "url-loader": "^2.3.0",
4. "vue": "^2.6.11",
5. "vue-router": "^3.5.1",
6. "vuex": "^3.6.2",
7. "vuex-persistedstate": "^4.0.0-beta.3"

---

Scope creep consideration for the demo:
1. No cryptographic hash functions implementation on session cookies and user passwords (ex. bcrypt). DO NOT STORE SUCH INFO WITHOUT CRYPTOGRAPHIC ENCRYPTION IN DATABASES.
2. No https implementation (consequently no 'Secure' parameter on cookie headers).
3. No API test framework implementation (ex. Mocha).
4. No checkout and payment functionality on frontend, consequently no inventory management functionality as well.
5. No infinite scrolling functionality.

PS:
Do not run this app on production systems without taking into consideration the aforementioned scope creep of the demo.

[**] The issue here seems to persist even after applying all the possible fixes from github users. Seems to be a problem with the pool object and how it handles connections.