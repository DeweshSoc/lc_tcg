
# LC/tcg
[![APACHE 2.0 License](https://img.shields.io/hexpm/l/apa)](https://choosealicense.com/licenses/mit/)

A leetcode based RESTful testcase generator API.

For documentation of the code base - [LC/tcg code docs](https://deweshsoc.github.io/lc_tcg-code-docs/)

## API Reference

For comprehensive documentation visit - 
<a href="https://lc-tcg-docs.cyclic.app/api-docs" target="_blank">LC/tcg API docs</a>

### Servers: 
- Local -  ``http://localhost:5000``
- Remote - ``https://lc-tcg-api.cyclic.app/``
 choose remote server when using the api documentation to try out endpoints

### Arrays

#### Get a random array

```http
  GET /api/arrays/0
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | no parameter |

RETURNS : a random array

#### Get custom list of arrays

```http
  POST /api/arrays/1
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `count`      | `number` | **Required**. Number of arrays to generate |
| `minSz`      | `number` | **Required**. Minimum possible array size |
| `maxSz`      | `number` | **Required**. Maximum possible array size |
| `minEle`      | `number` | **Required**. Minimum possible array element size |
| `maxEle`      | `number` | **Required**. Maximum possible array element size |
| `uniqueEle`      | `boolean` | **Required**. True if all elements in array should br unique|

RETURNS : A list of ``count`` number of arrays each of size in range ``[minSz,maxSz]`` having elements in range ``[minEle,maxEle]``



## Run Locally

Clone the project

```bash
  git clone https://github.com/DeweshSoc/lc_tcg.git
```

Go to the project directory

```bash
  cd lc_tcg
```

Install dependencies

```bash
  npm install .
```

Start the server

```bash
  npm run start
```
``Server available at http://localhost:5000``




## Authors

- [@deweshsoc](https://www.github.com/deweshsoc)

