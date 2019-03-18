import React, { Component } from 'react';
import InputMask from 'react-input-mask'

export default class CadastrarCliente extends Component {

    constructor() {
        super();
        this.state = {listaTiposTelefones:[], listaUfs:[]};
        this.aplicaValores = this.aplicaValores.bind(this);
        this.consultaCEP = this.consultaCEP.bind(this);
    }

    aplicaValores(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    consultaCEP(event){
        const target = event.target;
        const cep = target.value;
        fetch('https://viacep.com.br/ws/'+cep.replace(/[^0-9]/g, '')+'/json')
        .then(resposta =>{
            if(resposta.ok){
                return resposta.json();
            }
        })
        .then(resposta=>{
            this.setState({logradouro:resposta.logradouro});
            
        })
    }

    componentWillMount(){
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_acesso'));
        const dadosRequisicao = {
            method: 'GET',
            headers: headers
        };
        fetch('http://localhost:9093/v1/tipoTelefone', dadosRequisicao)
        .then(resposta =>{
            if(resposta.ok){
                return resposta.json();
            }
        })
        .then(resposta =>{
            this.setState({listaTiposTelefones:resposta});
        });

        fetch('http://localhost:9093/v1/uf', dadosRequisicao)
        .then(resposta =>{
            if(resposta.ok){
                return resposta.json();
            }
        })
        .then(resposta =>{
            this.setState({listaUfs:resposta});
        })
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
                            <div className="row">
                                <div className="col-md-auto">
                                    <form>
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="cpf">CPF</label>
                                                <InputMask name="cpf" className="form-control" mask="999.999.999-99" id="cpf" aria-describedby="cpf" placeholder="CPF" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="nome">Nome</label>
                                                <input type="text" name="nome" className="form-control" id="nome" aria-describedby="nome" placeholder="Nome" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="cep">CEP</label>
                                                <InputMask type="text" onBlur={this.consultaCEP} name="cep" mask="99.999-999" className="form-control" id="cep" aria-describedby="cep" placeholder="CEP" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="logradouro">Logradouro</label>
                                                <input type="text" name="logradouro" value={this.state.logradouro} className="form-control" id="logradouro" aria-describedby="logradouro" placeholder="Logradouro" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="bairro">Bairro</label>
                                                <input type="text" name="bairro" className="form-control" id="bairro" aria-describedby="bairro" placeholder="Bairro" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="cidade">Cidade</label>
                                                <input type="text" name="cidade" className="form-control" id="cidade" aria-describedby="cidade" placeholder="Cidade" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="uf" name="uf">UF</label>
                                                <select className="form-control" id="uf" name="uf">
                                                    {
                                                        this.state.listaUfs.map(uf => {
                                                            return (<option value={uf.sigla}>{uf.sigla}</option>);
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="tipoTelefone" name="tipoTelefone">Tipo do Telefone</label>
                                                <select className="form-control" id="tipoTelefone">
                                                    {
                                                        this.state.listaTiposTelefones.map(tipoTelefone=>{
                                                            return (<option value={tipoTelefone.id}>{tipoTelefone.descricao}</option>);
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="telefone">Telefone</label>
                                                <InputMask type="text" name="telefone" mask="(99) 9999-9999" className="form-control" id="telefone" aria-describedby="telefone" placeholder="Telefone" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}