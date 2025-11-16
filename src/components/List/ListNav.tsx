import './css/ListNav.css'

export const ListNav = () => {
    
    return (
        <nav className="lista-nav">
                    <ul className="lista-nav__lista">
                    {
                    ["Hoje", "Proximo", "Inbox", "Arquivadas"].map((t) => (
                        <li className="lista-nav__item"><a className="lista-nav__link">{t}</a></li>
                        ))
                    }
                    </ul>
                </nav>
    )
}