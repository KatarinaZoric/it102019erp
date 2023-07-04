import { useNavigate } from "react-router"
import ReactRoutes from "../config/ReactRoutes";
import { OrderService } from "../services/OrderService"

const Cart = ({cart, updateCart, deleteFromCart, emptyCart}) => {

    const navigate = useNavigate();
    const makeNewOrder = () => {
        OrderService.makeOrder(cart)
            .then(response => {
                console.table(response)
                emptyCart()
                navigate(ReactRoutes.MY_ORDERS)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const renderTable = () => {
        return (
            <div>
                <table className="table table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>Proizvod</th>
                            <th>Kolicina</th>
                            <th>Cena po jedinici</th>
                            <th>Ukupna cena</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.map(item => {
                            return (
                                <tr>
                                    <td>{item.product.name}</td>
                                    <td>{<input type="number" style={{width: "3rem"}} value={item.amount} onChange={(e) => updateCart(item.product.productID, e.target.value)}></input>}</td>
                                    <td>{item.product.price} rsd</td>
                                    <td>{item.amount * item.product.price} rsd</td>
                                    <td><button onClick={() => deleteFromCart(item.product.productID)} className="btn btn-danger btn-sm">&#10006;</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className="d-flex align-items-center justify-content-end mt-5">
                    <button onClick={emptyCart} className="btn btn-danger me-3">Obrisi sve</button>
                    <button onClick={makeNewOrder} className="btn btn-success">Poruci</button>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            {cart.length != 0 ? renderTable() : (<h1>Korpa je prazna!</h1>)}
        </div>
    )
}

export default Cart