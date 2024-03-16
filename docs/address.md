# Address API Specs

## Create Address

Endpoint : POST /api/contacts/:contact/addresses

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"street": "Jalan Anu",
	"city": "Kota Anu",
	"province": "Provinsi",
	"country": "Negara",
	"postal_code": "12313"
}
```

Response Body :

```json
"data" : {
  {
    "id": 1,
    "street" : "Jalan Anu",
    "city": "Kota Anu",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "12313"
  }
}

```

Response Body (Failed) :

```json
{
	"errors": "postal_code is required"
}
```

## Get Address

Endpoint : GET /api/contacts/:contact/addresses/:address

Request Header :

- X-API-TOKEN : token

Response Body :

```json
{

  "data" : {
    {
      "id": 1,
      "street" : "Jalan Anu",
      "city": "Kota Anu",
      "province": "Provinsi",
      "country": "Negara",
      "postal_code": "12313"
    }
  }
}

```

Response Body (Failed) :

```json
{
	"errors": "Address is not found"
}
```

## Update Address

Endpoint : PUT /api/contacts/:contact/addresses

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"street": "Jalan Anu Edited",
	"city": "Kota Anu",
	"province": "Provinsi",
	"country": "Negara",
	"postal_code": "12313"
}
```

Response Body :

```json
"data" : {
  {
    "id": 1,
    "street" : "Jalan Anu Edited",
    "city": "Kota Anu",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "12313"
  }
}

```

Response Body (Failed) :

```json
{
	"errors": "postal_code is required"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:contact/addresses/:address

Request Header :

- X-API-TOKEN : token

Response Body :

```json
{
	"data": "OK"
}
```

Response Body (Failed) :

```json
{
	"errors": "Address not found"
}
```

## List Address

Endpoint : GET /api/contacts/:contact/addresses

Request Header :

- X-API-TOKEN : token

Response Body :

```json
{
	"data": [
		{
			"id": 1,
			"street": "Jalan Anu",
			"city": "Kota Anu",
			"province": "Provinsi",
			"country": "Negara",
			"postal_code": "12313"
		},
		{
			"id": 2,
			"street": "Jalan Anu",
			"city": "Kota Anu",
			"province": "Provinsi",
			"country": "Negara",
			"postal_code": "12313"
		}
	]
}
```

Response Body (Failed) :

```json
{
	"errors": "Contact is not found"
}
```
