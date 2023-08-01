# Home Library Service: Part 1

## Downloading

```
git clone https://github.com/KirillGenin/nodejs2023Q2-service.git
```
*Or using SSH:*
```
git clone git@github.com:KirillGenin/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

Rename file *.env.example* to *.env*

```
npm start
```

## Api REST

<details> 
<summary>/user:</summary>

- `GET /user` - to get all users

- `GET /user/:id` - get single user by id

- `POST /user` - create new user 

- `PUT /user/:id` - update user's password _only if you know old password_

- `DELETE /user/:id` - delete user

</details>

<details>
<summary>/track:</summary>

- `GET /track` - get all tracks

- `GET /track/:id` - get single track by id

- `POST /track` - create new track:

- `PUT /track/:id` - update track

- `DELETE /track/:id` - delete track

</details>
<details>
<summary>/artist:</summary>

- `GET /artist` - get all artists

- `GET /artist/:id` - get single artist by id

- `POST /artist` - create new artist

- `PUT /artist/:id` - update artist

- `DELETE /artist/:id` - delete artist
</details>
<details>
<summary>
/album:
</summary>

- `GET /album` - get all albums

- `GET /album/:id` - get single album by id

- `POST /album` - create new album

- `PUT /album/:id` - update album

- `DELETE /album/:id` - delete album
</details>
<details>
<summary>
/favs:
</summary>

- `GET /favs` - get all favorites

- `POST /favs/track/:id` - add track to the favorite

- `DELETE /favs/track/:id` - delete track from favorites

- `POST /favs/album/:id` - add album to the favorites

- `DELETE /favs/album/:id` - delete album from favorites

- `POST /favs/artist/:id` - add artist to the favorites

- `DELETE /favs/artist/:id` - delete artist from favorites
</details>

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```