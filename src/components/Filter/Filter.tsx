import { useList } from '../../hooks/useList';
import './Filter.css';
import { useFilter } from '../../components/index';

export const Filter = () => {
  const { lista } = useList();
  const {
    selectedPriority,
    setSelectedPriority,
    selectedStatus,
    setSelectedStatus,
  } = useFilter();
  const priorities = ['Todas', 'Alta', 'Media', 'Baixa'];
  const status = [
    {
      Aberta: 'Aberta',
      Concluida: 'Concluida',
    },
  ];

  return (
    <aside className="filtros">
      <div className="filtro__container">
        <h2 className="filtros__titulo">Filtros</h2>
        <form className="filtro__formulario">
          <p className="filtros__subtitulo">Refine sua lista de tarefas</p>
          <fieldset className="filtros__group">
            <legend className="filtros__legenda">Status</legend>
            {status.map((t, idx) => (
              <div key={idx} className="filtro__checker">
                <label className="filtro__opcoes">
                  <input
                    type="checkbox"
                    name="aberta"
                    id="aberta"
                    value={t.Aberta}
                    checked={selectedStatus === t.Aberta}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />
                  {t.Aberta}
                </label>
                <label className="filtro__opcoes">
                  <input
                    type="checkbox"
                    name="concluida"
                    id="concluida"
                    value={t.Concluida}
                    checked={selectedStatus === t.Concluida}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />
                  {t.Concluida}
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="filtros__group">
            <legend className="filtros__legenda">Prioridade</legend>
            {priorities.map((priority) => (
              <label className="filtro__opcoes" key={priority}>
                <input
                  type="radio"
                  name="prioridade"
                  value={priority}
                  checked={selectedPriority === priority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                />
                {priority}
              </label>
            ))}
          </fieldset>
          <fieldset className="filtros__group">
            <legend className="filtros__legenda">Tags</legend>
            <div className="lista-filtros__button">
              {lista.map((t) => (
                <button>{t.tags}</button>
              ))}
            </div>
          </fieldset>
        </form>
      </div>
    </aside>
  );
};
