import React from 'react';
import UserUtility from '../utility/UserUtility';
import Card from './Card'
import AddProduct from './Modals/AddProduct'

const ProductList = ({products, productCategories, addToCart, pplCategories}) => {

    const renderAddProduct = () => {
        if(UserUtility.isEmployee())
        {
            return (
                <AddProduct pplCategories={pplCategories} categories={productCategories}/>
            )
        }
    }

    const renderProducts = () => (
        <section className="py-5">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {products.map(product => {
                     return <Card key={product.id} product={product} categories={productCategories} pplCategories={pplCategories} addToCart={addToCart} />
                    })}
                </div>
            </div>
        </section>
    )

    return (
        <div>
            {renderAddProduct()}
            {renderProducts()}
        </div>
    )
}

export default ProductList

