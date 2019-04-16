import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class App extends Component {
  constructor() {
    super();
    this.state = { listaClientes: [] };
  }
  componentWillMount() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_acesso'));
    headers.append('Content-Type', 'application/json');
    const dadosRequisicao = {
      method: 'GET',
      headers: headers
    };
    fetch('http://localhost:9093/v1/cliente', dadosRequisicao)
      .then(resposta => {
        if (resposta.ok) {
          return resposta.json();
        }
      })
      .then(resposta => {
        console.log('Resposta: ', resposta);
        this.setState({ listaClientes: resposta });
      });
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
          <a className="navbar-brand mr-1" href="index.html">Cadastro e Clientes</a>
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
                  <a href="#">Clientes Cadastrados</a>
                </li>
              </ol>
              <div className="row justify-content-md-center">
                <div className="col-md-auto">
                  <div className="table-responsive">
                    {console.log(this.state)}
                    <table className="table">
                      <thead>
                        <th>CPF</th>
                        <th>Nome</th>
                        <th>Ações</th>
                      </thead>
                      {this.state.listaClientes.length > 0 &&
                        <tbody>
                          {
                            this.state.listaClientes.map(cliente => {
                              return (
                                <tr key={cliente.cpf}>
                                  <td>{cliente.cpf}</td>
                                  <td>{cliente.nome}</td>
                                  <td></td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      }
                      {this.state.listaClientes.length === 0 &&
                        <caption>Nenhum cliente cadastrado. </caption>
                      }
                    </table>
                  </div>
                </div>
              </div>
              <div>
                <Link to="/cadastrar/" className="btn btn-primary">Incluir Um Novo Cliente</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
