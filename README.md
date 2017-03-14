# BP Monitor

## Installation

- `npm install` or `yarn install`

## To Use

- start front end: 
	- Use `npm run start` and `npm run build-web` for hot-reloading and packing, respectively
- start back end:
	- npm run server

### Setup

1. `npm install` or `yarn install` in the root directory

### Configuration

1. Set up front end Auth
	- Create a file calls secrets.json in the root/secrets folder
	    - Note: Follow the format in secrets_example.json
	    - the SERVER key is your localhost, or other domain this app will run on
	- This allows Auth0 authentication to run
2. Set up server Auth
	- Create a file called .env in the root directory
	    - Note: Follow the format in .env_EXAMPLE
	- This allows Auth0 authentication to run

### Usage

- `npm install` or `yarn install` in the root directory
- add Auth0 secrets/config
- npm run build-web to build to dist
- npm run server to start server
- go to http://localhost:3003 to view! 
