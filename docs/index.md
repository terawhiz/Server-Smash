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
--header 'Content-Type: application/json' \
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
--header 'x-access-token: <AUTH-TOKEN>' \
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

`Unfollow a user`

```bash
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/user/unfollow/<FOLLOWER USER ID>' \
--header 'Content-Type: application/json' \
--header 'x-access-token: <AUTH-TOKEN>' \
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

#### Profile:

`Get profile data of a user`

```bash
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/user/profile' \
--header 'x-access-token: <AUTH-TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "<YOUR-USER-ID>",
    "profileId": "<USERID-OF-THE-PERSON-WHOSE-PROFILE-DATA-YOU-NEED>"
}'
```

```js
// RESPONSE
{
    "error": false,
    "_id": "60b0f831d7c8e32b7bd261bd",
    "username": "test1",
    "name": "test1",
    "email": "1@test.com",
    "profileUrl": "http://192.168.0.102:2000/_dsfjhsdjfh/users/default.jpg",
    "following": [],
    "followers": []
}
```

#### Profile Image Upload:

`Upload your profile image in this route`<br>
NOTE: _multer_ automatically parses the form data into req.body

```bash
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/user/profileUpload' \
--header 'x-access-token: <AUTH-TOKEN>' \
--form 'userId="60b0f831d7c8e32b7bd261bd"' \
--form 'profilePhoto=@"/home/shunt/Downloads/guy_with_cat.jpg"'
```

```js
// RESPONSE
{
    "error": false,
    "username": "test1",
    "name": "test1",
    "email": "1@test.com",
    "following": [
        "60b0fa04d7c8e32b7bd261be",
        "60b0fa12d7c8e32b7bd261bf",
        "60b0fa1dd7c8e32b7bd261c0",
        "60b0fa26d7c8e32b7bd261c1"
    ],
    "followers": [
        "60b0fa51d7c8e32b7bd261c2",
        "60b0fa26d7c8e32b7bd261c1",
    ],
    "profileUrl": "http://192.168.0.102:2000/_dsfjhsdjfh/users/1622218344372-guy_with_cat.jpg"
}
```

#### Adding a post without Image:

`Add a new user post without image in this route`

```bash
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/post/new' \
--header 'x-access-token: <JWT-TOKEN-HERE>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "YOUR-USER-ID",
    "content": "Hmm I see SO YOU aRE READING THIS PERSONAL DOCUMENTATION? TRY CLICKING THE STAR BUTTON IN TOP RIGHT CORNER OF THIS REPOSITORY YOU WILL SEE MAGICS xd"
}'
```

```js
// RESPONSE
{
    "likedBy": [],
    "time": "2021-05-28T18:06:37.598Z",
    "_id": "60b131dff83ec9b68a899880",
    "postedBy": "60b0f831d7c8e32b7bd261bd",
    "content": "blah blah",
    "comments": [],
    "__v": 0
}
```

#### Adding a post with Image:

`Add a new user post with image in this route`<br>
NOTE: _multer_ automatically parses the form data into req.body

```bash
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/post/new' \
--header 'x-access-token: <JWT-TOKEN>' \
--form 'userId="60b0f831d7c8e32b7bd261bd"' \
--form 'postImg=@"/home/shunt/Downloads/guy_with_cat.jpg"' \
--form 'content="hmmm uploading with img"'
```

```js
// RESPONSE
{
    "error": false,
    "likedBy": [],
    "time": "2021-05-28T18:23:51.455Z",
    "_id": "60b1357f3de8f8bcc70e404d",
    "postedBy": "60b0f831d7c8e32b7bd261bd",
    "content": "hmmm uploading with img",
    "imgUrl": "http://192.168.0.102:2000/_dsfjhsdjfh/posts/1622226303102-guy_with_cat.jpg",
    "comments": [],
    "__v": 0
}
```

#### Home feed

`get your folloing's posts`

```bash
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/post/homeFeed' \
--header 'x-access-token: <JWT-TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "60b0f831d7c8e32b7bd261bd"
}'
```

```js
// RESPONSE
[
  [
    {
      likedBy: [],
      time: "2021-05-28T18:45:15.488Z",
      _id: "60b14414187241cac3d1f16b",
      postedBy: "60b0fa04d7c8e32b7bd261be",
      content: "test post 1",
      comments: [],
      __v: 0,
    },
  ],
  [
    {
      likedBy: [],
      time: "2021-05-28T18:45:15.488Z",
      _id: "60b14445187241cac3d1f16c",
      postedBy: "60b0fa12d7c8e32b7bd261bf",
      content: "test post 2",
      comments: [],
      __v: 0,
    },
  ],
  [
    {
      likedBy: [],
      time: "2021-05-28T18:45:15.488Z",
      _id: "60b14465187241cac3d1f16d",
      postedBy: "60b0fa1dd7c8e32b7bd261c0",
      content: "test post 2",
      comments: [],
      __v: 0,
    },
  ],
  [],
  [],
];
```

#### Like a post:

`Like a post with post id`

```bash
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/post/like/60b14414187241cac3d1f16b' \
--header 'x-access-token: <JWT-TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "60b0f831d7c8e32b7bd261bd"
}'
```

```js
// RESPONSE
{
    "likedBy": [
        "60b0f831d7c8e32b7bd261bd"
    ],
    "time": "2021-05-28T18:45:15.488Z",
    "_id": "60b14414187241cac3d1f16b",
    "postedBy": "60b0fa04d7c8e32b7bd261be",
    "content": "test post 1",
    "comments": [],
    "__v": 0
}
```

#### Dislike a post:

`Dislike a post with post id`

```bash
# REQUEST
curl --location --request POST 'http://127.0.0.1:2000/api/post/dislike/60b14414187241cac3d1f16b' \
--header 'x-access-token: <JWT-TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "60b0f831d7c8e32b7bd261bd"
}'
```

```js
// RESPONSE
{
    "likedBy": [],
    "time": "2021-05-28T18:45:15.488Z",
    "_id": "60b14414187241cac3d1f16b",
    "postedBy": "60b0fa04d7c8e32b7bd261be",
    "content": "test post 1",
    "comments": [],
    "__v": 0
}
```

#### Comment on a post

`Commenting on a post`

```bash
curl --location --request POST 'http://127.0.0.1:2000/api/post/comment/60b14414187241cac3d1f16b' \
--header 'x-access-token: <JWT-TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "60b0f831d7c8e32b7bd261bd",
    "content": "blah blah 1st comment"
}'
```

```js
{
    "likedBy": [],
    "time": "2021-05-28T18:45:15.488Z",
    "_id": "60b14414187241cac3d1f16b",
    "postedBy": "60b0fa04d7c8e32b7bd261be",
    "content": "test post 1",
    "comments": [
        {
            "time": "2021-05-28T19:43:09.004Z",
            "_id": "60b148570b2337e5164e66e1",
            "content": "blah blah 1st comment",
            "postedBy": "60b0f831d7c8e32b7bd261bd"
        }
    ],
    "__v": 0
}
```
