# StackSmash API Docs

---

### Installation

```bash
sudo pacman -Syu
sudo pacman -S nodejs npm
git clone https://github.com/terawhiz/Server-Stacksmash
cd Server-Stacksmash
npm install
npm start
```

---

### Routes

#### Register:

`Register a new user`<br><br>

```zsh
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "test1",
    "name": "test1",
    "email": "1@test.com",
    "password": "testit1234"
}'
```

```js
// RESPONSE
{
  "error": false,
  "message": "user registered successfully",
  "redirect": "/login"
}
```

#### Login:

`Login to an existing user`

```bash
#REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/auth/login' \
--header 'Content-Type: application/json'\
--data-raw '{
    "username": "test1",
    "password": "testit1234"
}'
```

```js
// RESPONSE
{
  "error": false,
  "message": "you are logged in"
}
```

#### Follow a fellow user:

`follow an user`

```bash
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/user/follow/<FOLLOWER USER ID>' \
--header 'Content-Type: application/json' \
--header 'Cookie: auth_token=<AUTH-TOKEN>' \
--data-raw '{
    "userId": "<YOUR USER ID>"
}'
```

```js
// RESPONSE
{
  "error": false,
  "message": "you are following test2"
}
```

#### Unfollow a User:

```bash
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/user/unfollow/<FOLLOWER USER ID>' \
--header 'Content-Type: application/json' \
--header 'Cookie: auth_token=<AUTH-TOKEN>' \
--data-raw '{
    "userId": "<YOUR USER ID>"
}'
```

```js
// RESPONSE
{
  "error": false,
  "message": "You unfollowed test2"
}
```
