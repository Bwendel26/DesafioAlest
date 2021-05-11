import React from 'react';
import { FaSearch } from 'react-icons/fa';

import "./Container.css";

function Container() {
    return(
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

            </div>
        </section>
    );
}

export default Container;