import './css/HeaderLogo.css'
export const HeaderLogo = () => {
    return (
        <a className="brand">
                    <svg className="brand-logo" width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="24" rx="6" fill="currentColor" opacity="0.08"></rect>
                        <path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="texto">Produtivo</span>
                </a>
    )
}