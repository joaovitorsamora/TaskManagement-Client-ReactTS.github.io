import './Aside.css'

interface AsideProps {
    children: React.ReactNode
}
export const Aside = ({children}: AsideProps) => {
    return (
        <div className="conteudo__lateral">
            {children}
        </div>
    )
}