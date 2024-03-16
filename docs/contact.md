# Contact API Specs

## Create Contact

Endpoint : POST /api/contacts

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"first_name": "Hanasa",
	"last_name": "",
	"email": "hanasa@mail.com",
	"phone": "089999999"
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"first_name": "Hanasa",
		"last_name": "",
		"email": "hanasa@mail.com",
		"phone": "089999999"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "first_name must not blank"
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"first_name": "Hanasa",
		"last_name": "",
		"email": "hanasa@mail.com",
		"phone": "089999999"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Contact is not found"
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"first_name": "Hanasa S",
	"last_name": "",
	"email": "hanasa@mail.com",
	"phone": "089999999"
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"first_name": "Hanasa S",
		"last_name": "",
		"email": "hanasa@mail.com",
		"phone": "089999999"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "first_name must not blank"
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

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
	"errors": "Contact not found, Unauthorized"
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter :

- name : String, contact first_name or contact last_name, (optional)
- phone : String, contact phone (optional)
- email : String, contact email (optional)
- page : Number, default 1
- size : Number, default 10

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : [
    {
      "id" : 1,
      "first_name": "Hanasa",
      "last_name": "",
      "email": "hanasa@mail.com",
      "phone": "089999999"
    }
    {
      "id" : 2,
      "first_name": "Hanasa",
      "last_name": "",
      "email": "hanasa@mail.com",
      "phone": "089999999"
    }
  ],
  "pagination": {
    "current_page" : 1,
    "total_page" : 10,
    "size" : 10,
  }
}
```

Response Body (Failed) :

```json
{
	"errors": "Contact not found, Unauthorized"
}
```
