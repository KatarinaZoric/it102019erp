import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import ProductService from "../../services/ProductService";
import { useNavigate } from "react-router";
import FileUtility from "../../utility/FileUtility"
import Select from 'react-select'

function UpdateProduct (props) {

    const navigate = useNavigate();

    const [name, setName] = useState(props.product.name);
    const [price, setPrice] = useState(props.product.price);
    const [amount, setAmount] = useState(props.product.amount);
    const [image, setImage] = useState(props.product.image);
    const [category, setCategory] = useState(props.product.productCategory.productCategoryID);
    const [pplCategoriesFromProduct, setPplCategoriesFromProduct] = useState(props.product.pplCategories)
    const [pplCategories, setPplCategories] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateProduct = () => {
        FileUtility.convertToBase64(typeof(image) === "string" ? null : image)
            .then(imageAsBase64 => {
                ProductService.updateProduct(props.product.productID, name, price, amount, typeof(image) === "string" ? image : imageAsBase64, category, pplCategories)
                    .then(response => {
                        navigate("/category/" + category)
                        window.location.reload()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(console.error)
    }

    const preparePplCategories = () => {
        let selectArray = []

        props.pplCategories.forEach(pplCategory => {
            selectArray.push({
                value: pplCategory.pplCategoryID,
                label: pplCategory.name
            })
        })

        return selectArray
    }

    const prepareSelectedPplCategories = () => {
        return pplCategoriesFromProduct.map(pplCat => {
            return {
                value: pplCat.pplCategoryID,
                label: pplCat.name
            }
        })
    }

    const changePplCategories = e => {
        let tmpPplCategories = []

        e.forEach(pplCategory => {
            tmpPplCategories.push(pplCategory.value)
        })

        setPplCategories(tmpPplCategories)
    }

    return (
        <div>
             <Button variant="success" onClick={handleShow}>
               Izmeni
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                <Modal.Title>Izmeni proizvod</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-label-group">
                        <label htmlFor="inputName">Naziv</label>
                        <input type="text" id="inputName" onChange={e => setName(e.target.value)} value={name} className="form-control" placeholder="Name" required autoFocus/>           
                    </div>
                    <div className="form-label-group">
                        <label htmlFor="inputPrice">Cena</label>
                        <input type="number" id="inputPrice" onChange={e => setPrice(e.target.value)} value={price} className="form-control" placeholder="Price" required autoFocus/>
                    </div>
                    <div className="form-label-group">
                        <label htmlFor="inputAmount">Kolicina</label>
                        <input type="number" id="inputAmount" onChange={e => setAmount(e.target.value)} value={amount} className="form-control" placeholder="Amount" required autoFocus/>
                    </div>
                    <div className="form-label-group my-3">
                        <label>Slika</label>
                        <input type="file" onChange={e => setImage(e.target.files[0] ?? null)} className="form-control" required/>
                       
                    </div>
                    <div className="my-3">
                        <label>Za vrste zivotinja</label>
                        <Select isMulti defaultValue={prepareSelectedPplCategories()} options={preparePplCategories()} onChange={changePplCategories} />
                    </div>
                    <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Kategorija</a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {props.categories.map(category => {
                                return <li><a onClick={()=>setCategory(category.productCategoryID)} className="dropdown-item" key={category.productCategoryID}>{category.name}</a></li>
                            })}
                        </ul>
                        <p style={{marginLeft:"15px"}}>{(category!==null)? category.name : ""}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={updateProduct}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateProduct