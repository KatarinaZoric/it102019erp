import React, { useEffect, useState } from 'react'
import {Link, Await, useParams } from 'react-router-dom'
import ProductService from '../services/ProductService';
import ReviewService from '../services/ReviewService';
import UserUtility from '../utility/UserUtility';
import LoginService from '../services/LoginService';
import ReactRoutes from '../config/ReactRoutes';
import ReactStars from 'react-rating-stars-component';
import UpdateReview from '../components/Modals/UpdateReview'
import DeleteReview from '../components/Modals/DeleteReview'
import DateTimeUtility from '../utility/DateTimeUtility'

function Product(props) {

    const {productId} = useParams();
    const [reviews, setReviews] = useState([])
    const [product, setProduct] = useState([])
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [avgReview, setAvgReview] = useState(0)
    const [numberToAdd, setNumberToAdd] = useState(1)

    useEffect(() => {
        if (numberToAdd < 1) {
            setNumberToAdd(1)
        }
    }, [numberToAdd])

    let history = Await()

    useEffect(() => {
        Promise.all([
            ProductService.getProductByID(productId),
            ReviewService.getReview(productId)
        ])
        .then(([product,reviews]) => {
            setProduct(product)
            setReviews(reviews)
        })
        .catch(error => {
            console.log(error)
        })
    }, [productId])

    useEffect(() => {
        calculateRating(reviews)
    }, [reviews])

    const calculateRating = tmpReviews => {
        let average = 0
        tmpReviews.forEach(review => average += review.rating);
        console.log(average / tmpReviews.length)
        setAvgReview((average === 0)? 0 : average / tmpReviews.length)
    }

    const login = (e) => {
        e.preventDefault();
        console.log([email, password]);
        LoginService.logIn(email, password)
            .then(response => {
                if (response.hasOwnProperty("tokenRole") && response.tokenRole !== "") {
                    localStorage.setItem("ButikShopJWT", response.tokenRole.userToken);
                    localStorage.setItem("ButikShopRole", response.tokenRole.role);
                    localStorage.setItem("UserID", response.tokenRole.userId);
                    history.push('/product/' + productId)
                }
            })
            .catch(console.error)
    }

    const addReview = () => {
        console.log([rating,comment,productId])
        ReviewService.addReview(rating,comment, productId)
        .then(response => {
            setReviews([...reviews, response])
        })
    }

    function changeComment(review) {
        if (parseInt(localStorage.getItem("UserID")) === review.user.userID) {
            return(
                <div className="comment-footer"><UpdateReview review={review} productId={productId}/> <DeleteReview productId={[productId]} review={review}/> </div>
            )
        }
    }

    function commentForm()
    {
        if(UserUtility.isLoggedIn())
        {
            return(
                <div className="form-group">
                    <h4>Leave a comment</h4> <textarea onChange={e => setComment(e.target.value)} cols="30" rows="5" className="form-control"></textarea>
                    <ReactStars
                    count={5}
                    onChange={setRating}
                    size={24}
                    activeColor="#ffd700"
                    />
                    <div className="form-group"> <button type="button" className="btn btn-outline-dark mt-auto" onClick={addReview}>Post Comment</button> </div>
                </div>
            )
        }
        else
        {
            return(
                <div>
                    <input type="text" onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required autoFocus/>
                    <label htmlFor="inputEmail">Email</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" required/>
                    <label htmlFor="inputPassword">Password</label>
                    <div className="form-group"> <button type="button" className="btn btn-outline-dark mt-auto" onClick={login}>Sign in</button> </div>
                    <Link to={ReactRoutes.REGISTER}>Don't have account? Sign up</Link>
                </div>
            )
        }
    }

    const renderImage = () => {
        if (product.image === null)
            return <img className="card-img-top" src="/Assets/img/no-image.png" alt={product.name} />

        return <img className="card-img-top" src={product.image} alt={product.name} style={{width:"400px", height:"400px"}}/>
    }

    return (
        <div>
             <div className="col mb-5">
                <div className="card h-100">
                    <div className="card-body p-4">
                        <div className="text-center">
                            {renderImage()}
                            <h5 className="fw-bolder">{product.name}</h5> 
                            {product.price} RSD
                            <div className="d-flex align-items-center justify-content-center">
                                Prosecna ocena: <b>{avgReview.toFixed(2)}</b>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    {(UserUtility.isEmployee())? <span></span> : 
                        <div className="text-center d-flex align-items-center justify-content-center">
                            <input type="number" style={{width: "3rem", marginRight: "1rem"}} value={numberToAdd} onChange={(e) => setNumberToAdd(e.target.value)}></input>
                            <button onClick={() => props.addToCart(product, numberToAdd)} className="btn btn-outline-dark mt-auto">Add to cart</button>
                        </div>
                    } 
                    </div>
                </div>
            </div>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 col-md-6 col-12 pb-4">
                            <h1>Comments</h1>
                            {reviews.map(review => {
                                return(<div className="d-flex flex-row comment-row mb-4">
                                        <div className="p-2"><img src="../Assets/img/profileIcon.png" alt="user" width="50" className="rounded-circle"/></div>
                                        <div className="comment-text w-100">
                                            <h6 className="font-medium">{review.user.name} {review.user.surname}</h6>
                                            <span style={{opacity: 0.5}} className="m-b-15 d-block">{DateTimeUtility.formatDate(review.date)}</span>
                                            <span className="m-b-15 d-block">{review.comment} </span>
                                            <ReactStars count={5} edit={false} size={16} activeColor="#ffd700" value={review.rating}/>
                                            {changeComment(review)}
                                        </div>
                                        </div>)
                            })}
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
                            <form id="algin-form">
                                {commentForm()}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Product