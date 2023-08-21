# Home Library Service: Part 2

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop [Download & Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

## Downloading

```
git clone https://github.com/KirillGenin/nodejs2023Q2-service.git
```
*Or using SSH:*
```
git clone git@github.com:KirillGenin/nodejs2023Q2-service.git
```

## Switch to the develop branch

```
git checkout task-8-hl-service-2
```

## Installing NPM modules

```
npm install
```

## Environment

Rename file *.env.example* to *.env*

## Running application

```
docker-compose up
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

## Scanning

Run script for vulnerabilities scanning (free solution)

```
npm run start:scout
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```