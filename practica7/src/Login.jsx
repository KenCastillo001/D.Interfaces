import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";




function Login(){
    const{register,handleSubmit} = useForm();
    const navigate = useNavigate();


    const onSubmit =(data)=>{
        console.log(data)
        localStorage.setItem('Usuario', JSON.stringify(data))
        navigate("/Article/:id")
        alert("Registro completado con éxito");
        
    }

    return <form onSubmit={handleSubmit(onSubmit)} >
            
        <div className="grid gap-12 ">
                <input type="text" placeholder="Usuario" className="p-4 max-w" {...register('usuario')} />
                <input type="text" placeholder="Email" className="p-4 max-w"{...register('email')} />
                <input type="password" placeholder="Contraseña" className="p-4 max-w" {...register('contraseña')} />
                <input type="submit" placeholder="Ingresar" className ="bg-transparent "/ >
                
        </div>

    </form>
    
        
        

    

}

export default Login;

