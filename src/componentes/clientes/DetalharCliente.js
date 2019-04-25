import React, { Component } from 'react';

export default class DetalharCliente extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        fetch(this.props.match.params.cpf);
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_acesso'));
        headers.append('Content-Type', 'application/json');
        const dadosRequisicao = {
            method: 'GET',
            headers: headers
        };
        fetch('http://localhost:9093/v1/cliente/'+this.props.match.params.cpf, dadosRequisicao)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                }
            })
            .then(resposta => {
                this.setState({ cliente: resposta });
            });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                    <a className="navbar-brand mr-1" href="index.html">Cadastro de Clientes</a>
                    <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    </form>
                    <ul className="navbar-nav ml-auto ml-md-0">
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Usuario<i className="fa fa-user-circle fa-fw"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
                            </div>
                        </li>
                    </ul>

                </nav>
                <div id="wrapper">
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">Cadastrar Cliente</a>
                                </li>
                            </ol>
                            <div className="container">
                                {this.state.mensagemSucesso !== undefined &&
                                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                                        {this.state.mensagemSucesso}
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                }
                                <form onSubmit={this.cadastrar} method="post">
                                    <div className="row align-items-center">
                                        <div className="col-2">
                                            <label>CPF: {this.state.cliente.cpf}</label>
                                        </div>
                                        <div className="col-10">
                                            <label>Nome:{this.state.cliente.nome}</label>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-2">
                                            <label>CEP:{this.state.cliente.cep}</label>
                                        </div>
                                        <div className="col-10">
                                            <label>Logradouro:</label>
                                        </div>
                                    </div>
                                    <div class="row align-items-center">
                                        <div className="col-4">
                                            <label htmlFor="bairro">Bairro</label>
                                        </div>
                                        <div className="col-8">
                                            <label htmlFor="complemento">Complemento</label>
                                        </div>
                                    </div>
                                    <div class="row align-items-center">
                                        <div className="col-3">
                                            <label htmlFor="numero">Número</label>
                                        </div>
                                        <div className="col-7">
                                            <label htmlFor="cidade">Cidade</label>
                                        </div>
                                        <div className="col-2">
                                            <label htmlFor="uf" name="uf">UF</label>
                                        </div>
                                    </div>
                                    <div class="row align-items-end">
                                        <div className="col-6">
                                            <label htmlFor="tipoTelefone">Tipo do Telefone</label>
                                        </div>
                                        <div className="col-2">
                                            <button type="button" className="btn btn-primary" title="Adicionar outro telefone" onClick={this.adicionaTelefone}>Adicionar</button>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-4">
                                            {this.state.listaTelefones.length > 0 &&
                                                <table className="table">
                                                    <thead>
                                                        <th>Tipo de Telefone</th>
                                                        <th>Número</th>
                                                    </thead>
                                                    <tbody>


                                                    </tbody>
                                                </table>
                                            }
                                        </div>
                                    </div>
                                    <br /><br /><br />
                                    <div className="row">
                                        <div className="col-10">
                                        </div>
                                        <div className="col-1">
                                            <input type="submit" value="Cadastrar" className="btn btn-primary" />
                                        </div>
                                        <div className="col-1">
                                            <Link to="/principal/" className="btn btn-secondary">Cancelar</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}