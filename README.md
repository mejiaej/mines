> **Required!** Docker installed.

**Remember** If using git bash replace `gradlew` with `./gradlew`.

## Development setup

#### Run API
1. Start up the database using `docker`
2. Start the API
```batch
# cd /api

$ docker-compose up -d
$ gradlew bootRun
```

#### Run Front-end
1. API needs to be running.
2. Go to `/web` directory
3. Install application and start it.

```batch
# cd /web

$ yarn install
$ yarn start
```

#### http://localhost:3000/


## Running Tests

#### React component tests
We can run react tests without having the API and Front-end running.
Go to `/web` directory
```batch
# cd /web

$ yarn test
```

#### End-to-end tests
Database, API and Front-end need to be running, make sure you've followed the steps presented above.
```batch
# cd /api

$ docker-compose up -d
$ gradlew bootRun

# cd /web

$ yarn cy:run
```

#### Integration tests
We only need the database running.

Go to `/api`
```batch
# cd /api

$ docker-compose up -d
$ gradle test
```

