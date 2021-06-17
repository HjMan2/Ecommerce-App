import { Redirect } from "react-router-dom"

function Shipping(props) {
    console.log(props.history)
    return (
        <>
            <h1>وارد کردن اطلاعات</h1>
            <Redirect to="/payment">پرداخت</Redirect>
        </> 
    )
}

export { Shipping }