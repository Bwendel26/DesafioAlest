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