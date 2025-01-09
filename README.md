# Cominsur website 

### Live Project: [www.cominsur.com.co](https://www.cominsur.com.co)


https://github.com/david12997/cominsur.co/assets/51899338/6af22cb2-4632-4123-8bd9-97c17f4a096c


#### Corporative website using next.js tailwind and docker, i have designed, build and deploy this project, this is just a webapp of an private corporative system that i have contributed to build

# Table of content

- [Architecture](#Architecture)
- [UI Design](#UI-design)
- [Frontend](#Frontend)
- [Backend API](#Backend-API)


## Architecture

Overview of high level components website system
<img src="https://cms.cominsur.com.co/cominsur/assets/rrcu4yzmcogokokw" />
<br></br>

### Use case diagram
<img src="https://cms.cominsur.com.co/cominsur/assets/ox41x5u7d8gwoggo"/>
<br></br>

## UI design
To design and prototype a solution i used figma 
**You can follow the design process here [Figma design project](https://www.figma.com/file/nqoCWXr6UxIxvKfqtyC7mI/Untitled?type=design&node-id=0%3A1&mode=design&t=fOXfcvKDglShlKnt-1)**
<img src="https://cms.cominsur.co/cominsur/assets/rg7qvwt5jeo0o48o"/>


<br></br>

## Frontend

This project use next js to have access to server site rendering, static site generation and client side generation strategies, i have decide to use next js framework thinking about the importance of SEO to this project

To handle the global state and persist information this project use redux and reduxtoolkit

<br></br>

## Backend API

This project expose a simple API to solve the main requirements

<br></br>
#### Get data aluminum profile system
```http
  GET /api/sistemas?id=1
```
| Query parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string/number`  | unique identifier to system. required


<br></br>
#### Get data of all systems available 
```http
  GET /api/sistemas/all
```

<br></br>
#### Get all references available without any specifi order
```http
  GET /api/referencias/all?limit=20&offset=0
```
| Query parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit` | `number`  | specific quantity of resources you want to obtain
| `offset` | `number`  | how many resources you want to skip before yo start to retriving the resources


<br></br>
#### Get specific aluminum profile reference by id reference
```http
  GET /api/referencias/id?idRef=1
```
| Query parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idRef` | `string/number`  | unique identifier to specific aluminum profile. required


<br></br>
#### Get profile  references by specific aluminum system
```http
  GET /api/referencias?system=1&limit=9&offset=0
```
| Query parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `system` | `string/number`  | unique identifier to specific aluminum system. required
| `limit` | `number`  | specific quantity of resources you want to obtain
| `offset` | `number`  | how many resources you want to skip before yo start to retriving the 


<br></br>
#### Search references by patterns 
```http
  GET /api/referencias/search?search=traslape&limit=9&offset=0
```
| Query parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `search` | `string`  | pattern reference to search coincidences. required
| `limit` | `number`  | specific quantity of resources you want to obtain
| `offset` | `number`  | how many resources you want to skip before yo start to retriving the 


<br></br>
#### Get data required for views pages
```http
  GET /api/pages?page=index
```
| Query parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `string`  | speciic name of each view available 
