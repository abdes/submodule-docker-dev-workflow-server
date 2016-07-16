# Server submodule for the example app using the git submodule and docker developer workflow

see the top-level project at [https://github.com/abdes/submodule-docker-dev-workflow](https://github.com/abdes/submodule-docker-dev-workflow)

This is a backend server application example using [node.js](https://nodejs.org/en/)
and the [express framework](https://expressjs.com). It is part of the overall
example system to demonstrate the use of git submodules and docker to simplify
and optimize the developer workflow.

At runtime, the application is [dockerized](http://www.docker.com) to run within
a container based on the node.js docker container. The requests are fronted by
a [nginx](https://www.nginx.com) reverse proxy, also running in a docker container.

## Module structure

As of now, this simple Hello World application does not require any special
structure.

## API

The application only responds to the endpoint `/hello` with a string.
  
