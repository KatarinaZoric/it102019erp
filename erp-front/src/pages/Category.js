import React, { useEffect } from 'react'
import {useState} from 'react'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import ProductService from '../services/ProductService'
import ProducCategorytService, { ProductCategoryService } from '../services/ProductCategoryService'
import { useParams } from 'react-router'
import PplCategoryService from '../services/PplCategoryService'

function Category(props) {

    const [products, setProducts] = useState([])
    const [unfilteredProducts, setUnfilteredProducts] = useState([])
    const [productCategories, setProductCategories] = useState([])
    const [pplCategories, setPplCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState("")
    const {categoryId} = useParams();

    useEffect(() => {
      changeProductList(categoryId)
    }, [categoryId])

    useEffect(() => {
      Promise.all([
        ProducCategorytService.getCategores(),
        PplCategoryService.getPpls()
      ])
      .then(([productCategories, pplCategories]) => {
        setProductCategories(productCategories)
        setPplCategories(pplCategories)
      })
      .catch(console.error)
    }, [])

    function changeProductList(category) {
      Promise.all([
        ProductService.getProductByCategory(category),
        ProductCategoryService.getCategoryById(category)
      ])
      .then(([products, category]) => {
        setUnfilteredProducts(products)
        setProducts(products);
        setCurrentCategory(category.name);
      })
      .catch(console.error)
    }

    const filterProductsByPpl = (pplId) => {
      let tmpProducts = [...unfilteredProducts]
      let filteredProducts = []

      tmpProducts.forEach(product => {
        if (product.pplCategories !== null) {
          product.pplCategories.forEach(pplCategory => {
            if (pplCategory.pplCategoryID === pplId) {
              filteredProducts.push(product)
            }
          })
        }
      })

      setProducts(filteredProducts)
    }

    return(
      <div>
        <Header/>
        <h5 className="text-center">{currentCategory}</h5>
        <div className="container-fluid">
          <div className="row">
            <div className="position-sticky col-12 col-lg-2 py-5">
              <div className="list-group">
                {pplCategories.map(pplCategory => {
                  return <a key={"pplFilter" + pplCategory.pplCategoryID} onClick={() => filterProductsByPpl(pplCategory.pplCategoryID)} className="list-group-item list-group-item-action">{pplCategory.name}</a>
                })}
              </div>
            </div>

            <div className="col-12 col-lg-10">
              <ProductList
                addToCart={props.addToCart}
                products={products}
                productCategories={productCategories}
                pplCategories={pplCategories}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Category;