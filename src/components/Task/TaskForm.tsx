import { useState } from 'react';
import './css/TaskForm.css';
import { useUser } from '../../hooks/useUsers';

interface TaskFormProps {
  id?: number;
  usuarioId?: number;
  projetoId?: number;
  titulo: string;
  dataCriacao: string;
  projetoNome: string;
  statusTarefa?: 1;
  prioridadeTarefa: string;
  tags: string[];
}

export const TaskForm = () => {
  const [tarefa, setTarefa] = useState<TaskFormProps>({
    titulo: '',
    dataCriacao: '',
    statusTarefa: 1,
    prioridadeTarefa: '',
    projetoNome: '',
    tags: [''],
  });
  const tarefasApi = import.meta.env.VITE_API_URL_TAREFAS;
  const authToken = localStorage.getItem('authToken');
  const prioridadeMap: Record<string, number> = {
    todas: 1,
    alta: 2,
    media: 3,
    baixa: 4,
  };

  const { loggedUser } = useUser();

  if (!loggedUser) {
    return null;
  }
  const handleTarefaCreate = async () => {
    try {
      const response = await fetch(tarefasApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          Titulo: tarefa.titulo,
          DataCriacao: tarefa.dataCriacao,
          ProjetoNome: tarefa.projetoNome,
          StatusTarefa: 1,
          PrioridadeTarefa:
            prioridadeMap[tarefa.prioridadeTarefa.toLowerCase()] ?? 3,
          Tags: tarefa.tags,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Erro criando tarefa:', data);
        alert(data?.message ?? 'Erro ao criar tarefa');
        return;
      }

      setTarefa({
        titulo: '',
        dataCriacao: '',
        projetoNome: '',
        prioridadeTarefa: '',
        tags: [''],
      });

      setTarefa(data);
    } catch (err) {
      console.error(err);
      alert('Erro ao criar tarefa');
    }
  };

  return (
    <form
      className="formulario__tarefa"
      onSubmit={(e) => {
        e.preventDefault();
        handleTarefaCreate();
      }}
    >
      <h2 className="tarefa__titulo">Nova Tarefa</h2>
      <div className="tarefa__titulo">
        <label htmlFor="titulo">Titulo</label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          value={tarefa.titulo}
          onChange={(e) => setTarefa({ ...tarefa, titulo: e.target.value })}
          placeholder="Ex.: Enviar relatório"
          className="input-titulo"
        />
      </div>

      <div className="tarefa__grid">
        <div className="tarefa__select tarefa__grid-rows">
          <label htmlFor="data">Data</label>
          <input
            id="data"
            name="data"
            value={tarefa.dataCriacao}
            onChange={(e) =>
              setTarefa({ ...tarefa, dataCriacao: e.target.value })
            }
            type="date"
            className="input-data"
          />
        </div>
        <div className="tarefa__select tarefa__grid-rows">
          <label htmlFor="prioridade">Prioridade</label>
          <select
            defaultValue="media"
            id="prioridade"
            value={tarefa.prioridadeTarefa}
            className="input-prioridade"
            onChange={(e) =>
              setTarefa({ ...tarefa, prioridadeTarefa: e.target.value })
            }
            name="prioridade"
          >
            <option value="todas">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>
        <div className="tarefa__select tarefa__grid-rows">
          <label htmlFor="projetos">Projetos</label>
          <input
            id="projetos"
            name="projetos"
            type="text"
            value={tarefa.projetoNome}
            onChange={(e) =>
              setTarefa({ ...tarefa, projetoNome: e.target.value })
            }
            placeholder="Nome do Projeto"
            className="input-projetos"
          />
        </div>
      </div>
      <div className="tarefa__tags">
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          type="text"
          value={tarefa.tags}
          onChange={(e) => setTarefa({ ...tarefa, tags: [e.target.value] })}
          placeholder="Separe por virgula (ex: trabalho, urgente!)"
          className="input-tags"
        />
      </div>
      <div className="tarefa__botoes">
        <button type="submit" className="button-submit">
          Adicionar
        </button>
        <button type="reset" className="button-reset">
          Limpar
        </button>
      </div>
    </form>
  );
};
