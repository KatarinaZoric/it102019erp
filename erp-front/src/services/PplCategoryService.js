import ApiRoutes from "../config/ApiRoutes"

export const PplCategoryService = {
    getPpls: function() {
        return new Promise((resolve, reject) => {
            fetch(ApiRoutes.PPL_CATEGORY, {
                method: "GET",
            })
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))

        })
    }
}

export default PplCategoryService
