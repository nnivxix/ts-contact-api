# User API Spec

## Resgister User

Endpoint : POST `/api/users`

Request Body :

```json
{
	"username": "hanasa",
	"password": "rahasia",
	"name": "Hanasa"
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "hanasa",
		"name": "Hanasa"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Username must not blank"
}
```

## Login User

Endpoint : POST `/api/users/login`

Request Body :

```json
{
	"username": "hanasa",
	"password": "rahasia"
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "hanasa",
		"name": "Hanasa",
		"token": "uuid"
	},
	"message": "OK"
}
```

Response Body (Failed) :

```json
{
	"errors": "Username or Password is wrong."
}
```

## Get User

Endpoint : GET `/api/users/current`

Request Header :

- X-API-TOKEN : token

Response Body :

```json
{
	"data": {
		"username": "hanasa",
		"name": "Hanasa",
		"token": "uuid"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH `/api/users/current`

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"username": "hanasa",
	"name": "Hanasa"
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "hanasa",
		"name": "Hanasa"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE `/api/users/current`

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"message": "OK"
}
```

Response Body (Failed) :

```json
{
	"errors": "Unauthorized"
}
```
