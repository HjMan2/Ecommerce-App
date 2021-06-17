import { Link } from 'react-router-dom'
import { AdminSpecialProducts } from './Components/AdminSpecialproducts'
function Home() {
    return (
        <>
            <h1>Home Page.</h1>
            <AdminSpecialProducts/>
            <Link to="/goods/poshk">پوشاک</Link>
        </>
        
    )
}

export { Home }