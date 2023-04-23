import { ReactNode } from "react"

interface Props {
    children: ReactNode
    className?: string
}

const Layout = ({ children, className }: Props) => {
    return (
        <>
            <main className={className}>{children}</main>
        </>
    )
}

export default Layout