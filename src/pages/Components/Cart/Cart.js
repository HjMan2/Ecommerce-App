import { Link } from 'react-router-dom'

function Cart() {
    return (
        <>
        <h1>سبد خرید</h1>
        <Link to="/shipping">نهایی کردن خرید</Link>
        </>
    )
}

export { Cart }