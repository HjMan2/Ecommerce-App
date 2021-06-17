import { Link } from 'react-router-dom'
function Product() {
    return (
        <>
        
        <h1>شلوار</h1>
        <Link to="/cart">افزودن به سبد خرید</Link>
        </>
    )
}

export { Product }