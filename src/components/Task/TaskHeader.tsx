import './css/TaskHeader.css'

export const TaskHeader = () => {
    return (
         <header className="task__header">
                    <div className="tarefas__heading">
                        <h2 className='main-title__task'>
                            Tarefas
                        </h2>
                        <p>Organize seu dia e alcance mais 📈</p>
                    </div>

                     <div className="dropdown__container">
                         <div className="opcoes">
                            <label htmlFor='ordenar' className="dropbtn__opcoes">Ordenar:</label>
                            <select id="ordenar" name="ordenar" className="dropdown__conteudo-opcoes">
                                <option value="data">Data</option>
                                <option value="prioridade">Prioridade</option>
                                <option value="titulo">Titulo</option>
                            </select>
                         </div>
                         <div className="agrupar">
                            <label htmlFor='agrupar' className="dropbtn__agrupar">Agrupar:</label>
                            <select id="agrupar" name="agrupar" className="dropdown__conteudo-agrupar">
                                <option value="nenhum">Nenhum</option>
                                <option value="tags">Tags</option>
                            <option value="projetos">Projetos</option>
                            </select>
                        </div>

                </div>
                </header>
    )
}