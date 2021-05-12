# Desafio Alest

Página até o momento:

![Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/DApaginaProdutosCrud.png](Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/DApaginaProdutosCrud.png)

**Instruções**:

- Crie um projeto em um repositório publico (github, gitlab, bitbucket, ...) para hospedar o seu código. Lembre-se de documentar o seu projeto no Readme.
- Crie um projeto no Google Firebase. Não se preocupe com o custo, o Firebase possui um plano gratuito.
- Crie um banco de dados com o Cloud Firestore

Seu desafio é construir uma interface frontend (em angular ou react) que deverá mostrar produtos a serem vendidos. Os dados devem ser salvos e pegos pelo backend que acessa o banco de Dados NoSQL Firestore da Google. Essa aplicação deve permitir visualizar, adicionar, atualizar e deletar os produtos utilizando a API HTTP do backend.

O backend deve ser feito em Node.js ou Typescript utilizando o framework express para construir uma API que realize um CRUD com os produtos no Firestore.

Editor de texto: VSCode

Estrutura do projeto:

![Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/estruturaDesafioAlest.png](Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/estruturaDesafioAlest.png)

- Frontend:

![Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/estruturaDAprojetoReact.png](Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/estruturaDAprojetoReact.png)

- Backend:

![Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/estruturaDoBack.png](Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/estruturaDoBack.png)

index.js Backend:

```jsx
'use strict';

const express = require('express');
// const app = express();
const cors = require('cors');
const config = require('./config');
const productRoutes = require('./routes/student-routes');

app.use(express.json());
app.use(cors());
app.use(express.json());

app.use('./api', productRoutes.routes);

app.listen(config.port, () => console.log('App is listening on port ' + config.port));
```

Utilizei um arquivo .env para armazenar e esconder os dados de conexão com o firebase e com express, logo em seguida, foi criado um arquivo config.js para importar e armazenar os dados do arquivo .env.

config.js Backend:

```jsx
'use_strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
      }
}
```

Logo em seguida temos o arquivo que faz a inicialização com o banco de dados:

db.js Backend:

 

```jsx
const firebase = require('firebase');
const config = require('./config');

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;
```

Estrutura do models product.js (estrutura dos dados a serem passados para o banco):

```jsx
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
```

Em toda estrutura utilizamos o express o cors, firebase e o nodemon, lembrando que o Body-parser do express foi depreciado da forma antiga, no express 4, temos:

Em vez de: 

```jsx
app.use(bodyParser.json());
```

Usaremos: 

```jsx
app.use(express.json());
```

...

Ao final, nosso server Backend está retornando o seguinte erro: AssertionError [ERR_ASSERTION]: PORT is required, referente ao arquivo index.js, porém o problema está em assert.js:383.

![Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/DABackendRodando.gif](Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/DABackendRodando.gif)

### Frontend

Nosso Frontend foi construido com o comando "npx create-react-app ..." sendo assim, mantivemos a estrutura do nosso index.js na pasta src, e modificamos nosso App.js para receber nossos componentes:

```jsx
import React from 'react';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Container from "./components/container/Container";

import './App.css';

export default function App() {
  return(
    <>
      <Header />
      <Container />
      <Footer />
    </>
  );
}
```

Como podemos observar, estamos carregando os componentes Header, Container e Footer, a seguir falamos dos 3 consecutivamente:

Nosso header é composto por uma div e um h1 simples, onde trazemos o título da aplicação:

```jsx
import React from 'react';

import './Header.css';

function Header() {
    return(
        <header className="header">
            <div>
                <h1>Produtos CRUD</h1>
            </div>
        </header>
    );
}

export default Header;
```

e o estilo ficou da seguinte forma: 

```css
.header {
    background-color: #141414;
    margin: auto;
    height: 10vh;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.header h1 {
    font-family: monospace;
    color: aliceblue;
    font-size: 4vh;
    position: relative;
    transform: translateY(50%);
}
```

 

Logo em seguida temos nosso Container: 

Onde o arquivo principal, container.js, faz o uso de state para e localStorage para armazenar e fazer o controle dos nossos produtos e logo em seguida temos a estrutura da barra de pesquisa, e itens a serem mostrados: 

Container.js

```jsx
import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';

import Produtos from './produtos/index';
import AddProduto from './addProduto/index';
import "./Container.css";

export default class Container extends Component {

    state = {
        novoProduto: '',
        produtos: [],
        index: -1
    }

    componentDidMount() {
        const produtos = JSON.parse(localStorage.getItem('produtos'));
    
        if(!produtos) return;
    
        this.setState({ produtos });
      }

    componentDidUpdate(prevProps, prevState) {
        const { produtos } = this.state;
    
        if(produtos === prevState.produtos) return;
    
        localStorage.setItem('produtos', JSON.stringify(produtos));
      }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { produtos, index } = this.state;
        let { novoProduto } = this.state;
        novoProduto = novoProduto.trim();
    
        if(produtos.indexOf(novoProduto) !== -1) return;
    
        const novosProdutos = [...produtos];
        
        if(index === -1) {
            this.setState({
            produtos: [...novosProdutos, novoProduto],
            novaproduto: '',
          });
        } else {
            novosProdutos[index] = novoProduto;
    
            this.setState({
            produtos: [...novosProdutos],
            index: -1
          });
        }
    
      }
    
    handleChange = (e) => {
        this.setState({
            novoProduto: e.target.value,
        });
      }
    
    handleEdit = (e, index) => {
        const { produtos } = this.state;
    
        this.setState({
            index,
            novoProduto: produtos[index]
        })
      }
    
    handleDelete = (e, index) => {
        const { produtos } = this.state;
        const novosProdutos = [...produtos];
    
        novosProdutos.splice(index, 1);
    
        this.setState({
            produtos: [...novosProdutos]
        })
      }

    render() {

      const { novoProduto, produtos } = this.state;

      return (
          <section className="container">
              <div>
                  <form className="pesquisa">
                      <input type="search" id="texto" placeholder="Pesquisar"></input>
                      <button type="submit" className="search-button">
                          <FaSearch />
                      </button>
                  </form>
              </div>
              <div>
                  <AddProduto 
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    novoProduto={novoProduto}
                  />
                  <Produtos 
                    produtos={produtos}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                  />
              </div>
          </section>
      );
    }
}
```

Dentro de nosso container, temos a barra de pesquisa e fazemos a chamada de dois componentes mais internos, que são os componentes Produtos e AddProduto:

produtos/index.js: 

```jsx
import React from 'react';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import PropTypes from 'prop-types';

import './produtos.css'

export default function Produtos({ produtos, handleEdit, handleDelete }) {
    return (
        <ul className="produtos">
          {produtos.map((produto, index) => (
            <li key={produto}>
              {produto}
              <span>
                <FaEdit onClick={(e) => handleEdit(e, index)} className="edit"/>
                <FaWindowClose onClick={(e) => handleDelete(e, index)} className="delete"/>
              </span>
            </li>
          ))}
        </ul>
    );
}

Produtos.propTypes = {
    produtos: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}
```

e addProduto/index.js: 

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

import './addProduto.css';

export default function AddProduto ({ handleSubmit, handleChange, novoProduto }) {
    return (
        <form onSubmit={handleSubmit} action="#" className="addProduto">
          <input 
            onChange={handleChange} 
            type="text"
            value={novoProduto} 
            placeholder="Adicionar Produto"
          />
          <button type="submit"><FaPlus /></button>
        </form>
    );
}

AddProduto.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    novoProduto: PropTypes.string.isRequired,
};
```

Ao final temos o nosso footer que é uma estrutura simples em nosso Footer.js

```jsx
import React from 'react';

import "./Footer.css";

function Footer() {
    return(
        <footer className="footer">
            <div>
                <span>Made by Bruno Fernandes Dev</span> {/*Add some Bootstrap icon*/}
            </div>
        </footer>
    );
}

export default Footer;
```

Ao final, temos o Frontend apresentado como no topo do documento, o carregamento dos produtos (colocados de forma direta no código) ainda não está funcional, porém é apresentado nas ferramentas de desenvolvedor no LocalStorage do browser.

![Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/serverReact.png](Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/serverReact.png)

![Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/DApaginaProdutosCrud%201.png](Desafio%20Alest%20d5669aa26e2247eb9b35563be1e79e0c/DApaginaProdutosCrud%201.png)