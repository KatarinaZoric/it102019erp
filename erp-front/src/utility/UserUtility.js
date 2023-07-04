export const UserUtility = {
    isLoggedIn: function() {
        let jwt = localStorage.getItem('ButikShopJWT');
        return jwt !== null && jwt !== '';
    },

    isEmployee: function() {
        let role = localStorage.getItem("ButikShopRole");
        return role === "Employee" 
    }
}

export default UserUtility
