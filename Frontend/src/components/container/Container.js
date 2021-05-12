import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';

import Produtos from './produtos/index';
import AddProduto from './addProduto/index';
import "./Container.css";

export default class Container extends Component {

    state = {
        novoProduto: '',
        produtos: ["Tesoura"],
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

