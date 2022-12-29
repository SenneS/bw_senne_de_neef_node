# bw_senne_de_neef_node

## Index
* [Endpoints](#endpoints)
    + [Auth Module](#auth-module)
        - [[POST] /api/v1/auth/register](#u-post-apiv1authregister-u)
        - [[POST] /api/v1/auth/login](#u-post-apiv1authlogin-u)
        - [[POST] /api/v1/auth/logout](#u-post-apiv1authlogout-u)
        - [[POST] /api/v1/auth/refresh](#u-post-apiv1authrefresh-u)
        - [[GET]  /api/v1/auth/delete](#u-get-apiv1authdelete-u)
        - [[GET]  /api/v1/auth/google](#u-get-apiv1authgoogle-u)
        - [[GET]  /api/v1/auth/google/callback](#u-get-apiv1authgooglecallback-u)
        - [[GET]  /api/v1/auth/me](#u-get-apiv1authme-u)
    + [Calendar Module](#calendar-module)
        - [[POST]  /api/v1/calendar/](#u-post-apiv1calendar-u)
        - [[GET]  /api/v1/calendar/:id](#u-get-apiv1calendar--id-u)
        - [[PATCH]  /api/v1/calendar/:id](#u-patch-apiv1calendar--id-u)
        - [[DELETE]  /api/v1/calendar/:id](#u-delete-apiv1calendar--id-u)
        - [[GET]  /api/v1/calendar/](#u-get-apiv1calendar-u)
    + [Event Module](#event-module)
        - [[POST]  /api/v1/event/](#u-post-apiv1event-u)
        - [[GET]  /api/v1/event/:id](#u-get-apiv1event--id-u)
        - [[PATCH]  /api/v1/event/:id](#u-patch-apiv1event--id-u)
        - [[DELETE]  /api/v1/event/:id](#u-delete-apiv1event--id-u)
* [resources](#resources)

## Endpoints
<hr/>

### Auth Module
<hr/>

#### <u>[POST] /api/v1/auth/register </u>
#### Purpose:
#### Request:
body:
```json
{
  "email": "senne.de.neef@student.ehb.be",
  "password": "azerty"
}
```
#### Response:

```json
{
  "status": 200,
  "message": null,
  "data": null
}
```

<hr/>

#### <u>[POST] /api/v1/auth/login </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[POST] /api/v1/auth/logout </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[POST] /api/v1/auth/refresh </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[GET]  /api/v1/auth/delete </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[GET]  /api/v1/auth/google </u>
#### Purpose:
<hr/>

#### <u>[GET]  /api/v1/auth/google/callback </u>
#### Purpose:
<hr/>

#### <u>[GET]  /api/v1/auth/me </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

### Calendar Module
<hr/>

#### <u>[POST]  /api/v1/calendar/ </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[GET]  /api/v1/calendar/:id </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[PATCH]  /api/v1/calendar/:id </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[DELETE]  /api/v1/calendar/:id </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[GET]  /api/v1/calendar/ </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>


### Event Module
<hr/>

#### <u>[POST]  /api/v1/event/ </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[GET]  /api/v1/event/:id </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[PATCH]  /api/v1/event/:id </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

#### <u>[DELETE]  /api/v1/event/:id </u>
#### Purpose:
#### Request:
body:
```json

```

#### Response:
body:
```json
{
  "status": 200,
  "message": null,
  "data": null
}
```
<hr/>

## resources

- https://www.fastify.io/
- https://www.typescriptlang.org/tsconfig
- https://canvas.ehb.be/courses/30473/pages/nodejs-databases-oefeningen?module_item_id=421313
- https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
- https://github.com/fastify/fastify-static
- https://stackoverflow.com/a/68303560
- https://stackoverflow.com/a/61405208
- https://stackoverflow.com/a/9270432
- https://mongoosejs.com/docs/typescript.html
- https://stackoverflow.com/a/70060763
- https://stackoverflow.com/a/41358367
- https://github.com/fastify/fastify-oauth2
- https://stackoverflow.com/a/69653389
- https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/