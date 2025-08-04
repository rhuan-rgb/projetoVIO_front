import {Navigate} from "react-router-dom"
import DefaultLayout from "./DafaultLayout";

const ProtectedRoute = ({children}) =>{
    const isAunthenticated = localStorage.getItem("authenticated");
    return isAunthenticated ? <DefaultLayout>{children}</DefaultLayout> : <Navigate to="/" />

    // se for true renderiza o component children, senão vai pra para a pagina de login
    // ? é uma condicional "if", : como se fosse um "else"   

}

export default ProtectedRoute;