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