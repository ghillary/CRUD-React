import React, { useState, useEffect } from 'react';
import './App.css'

const db_Curso = () => {
  const db = localStorage.getItem('cursos');
  if (db) {
    return JSON.parse(db);
  } else {
    return [];
  }
};

const ItensTabela = ({ cursos, deleteCurso, editCurso }) => {
  return cursos.map((curso) => (
    <tr key={curso.nome}>
      <td id='borda3'>{curso.nome}</td>
      <td>{curso.turno}</td>
      <td>{curso.modalidade}</td>
      <td>{curso.periodos}</td>
      <td>
        <button className='botaoEditar' onClick={() => editCurso(curso)}>
          Editar
        </button>
      </td>
      <td id='borda4' className='delete-btn' onClick={() => deleteCurso(curso.nome)}>
        <button className='botaoDeletar'>Deletar</button>
      </td>
    </tr>
  ));
};

function App() {
  const [cursos, setCursos] = useState(db_Curso());
  const [nome, setNome] = useState('');
  const [turno, setTurno] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [periodos, setPeriodos] = useState('');
  const [Editando, setEditando] = useState(false);
  const [editCursoNome, setEditCursoNome] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();

    if (Editando) {
      const atualizarCurso = cursos.map((curso) => {
        if (curso.nome === editCursoNome) {
          return {
            ...curso,
            nome,
            turno,
            modalidade,
            periodos
          };
        }
        return curso;
      });

      setCursos(atualizarCurso);
      setEditando(false);
      setEditCursoNome('');
    } else {
      let curso = {
        nome,
        turno,
        modalidade,
        periodos
      };
      setCursos([...cursos, curso]);
    }

    setNome('');
    setTurno('');
    setModalidade('');
    setPeriodos('');
  };

  const editCurso = (curso) => {
    setEditando(true);
    setEditCursoNome(curso.nome);
    setNome(curso.nome);
    setTurno(curso.turno);
    setModalidade(curso.modalidade);
    setPeriodos(curso.periodos);
  };

  const deleteCurso = (nome) => {
    const filteredCursos = cursos.filter((element) => {
      return element.nome !== nome;
    });
    setCursos(filteredCursos);
  };

  useEffect(() => {
    localStorage.setItem('cursos', JSON.stringify(cursos));
  }, [cursos]);

  return (
    <div className='App'>
      <h1 id='titulo'>Cadastro de cursos!</h1>
      <div className='main'>
        <div className='form'>
          <form autoComplete='off' className='input-group' onSubmit={handleAdd}>
            <label className='label-group'>Nome: </label>
            <input
              type='text'
              className='input-group'
              required
              onChange={(e) => setNome(e.target.value)}
              value={nome}
            ></input>

            <label className='label-group'>Turno: </label>
            <input
              type='text'
              className='input-group'
              required
              onChange={(e) => setTurno(e.target.value)}
              value={turno}
            ></input>

            <label className='label-group'>Modalidade: </label>
            <input
              type='text'
              className='input-group'
              required
              onChange={(e) => setModalidade(e.target.value)}
              value={modalidade}
            ></input>

            <label className='label-group'>Períodos: </label>
            <input
              type='text'
              className='input-group'
              required
              onChange={(e) => setPeriodos(e.target.value)}
              value={periodos}
            ></input>

            <button type='submit' className='botaoAdicionar'>
              {Editando ? 'Salvar' : 'Cadastrar'}
            </button>
          </form>
        </div>

        <div className='view-container'>
          {cursos.length > 0 && (
            <>
              <table className='tabela'>
                <thead>
                  <tr>
                    <th id='borda1'>Nome do Curso</th>
                    <th>Turno</th>
                    <th>Modalidade</th>
                    <th>Períodos</th>
                    <th></th>
                    <th id='borda2'></th>
                  </tr>
                </thead>
                <tbody>
                  <ItensTabela cursos={cursos} deleteCurso={deleteCurso} editCurso={editCurso} />
                </tbody>
                <tfoot></tfoot>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;