import {useEffect, useState} from 'react';
import "./miapi.css"

function MiApi (){  
  const [libros, setLibros] = useState([]);
  const [tablaLibros, setTablaLibros] = useState([]);
  const [ordenado,setOrdenar] =useState([]);
  
  const infoLibros = async () => {
    try{
      const url = "https://jsonplaceholder.typicode.com/todos";
      const response = await fetch(url)
      const data = await response.json()
      setLibros(data);
      setTablaLibros(data);
     
    }
    catch(e){
      console.error(e)
    }
  }
  useEffect(()=>{
    infoLibros();
  },[])

  
  function ordenar (a,b){
    if(a.title<b.title){
      return -1;
    }
    if(a.title>b.title){
      return 1;
    }
    return 0;

  }
 const handleOrdenar=()=>{
   setOrdenar(libros.sort(ordenar))
 }
  const handleChange = e => {
    if( e.target.value === '' ){
      setLibros(tablaLibros)
    }
    else{
      filtrar( e.target.value );
    }
  }

  const filtrar=(terminoBusqueda)=>{
    const resultadosBusqueda=tablaLibros.filter((elemento)=>{
      if(elemento.completed.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setLibros(resultadosBusqueda);
  }
 
 

  return ( 


    <div>
      <section className='portada'>
        <h2>Libreria de Medicina <br /> Disfruta de los Mejores Ejemplares. </h2>
        <div className="form-control">
          <input type="text" className='input' placeholder='Filtrar Estado Libro' onChange={handleChange}/>
          <button className='btn btn-dark' value={ordenado} onClick={handleOrdenar}> Ordenar Alfabeticamente </button>
        </div>
      </section>

      {/*className="table table-sm table-bordered" className='table-responsive' */}

    <div className='container ' >
      
     <table className="table table-sm table-bordered">
       <thead className='fijacion'>
       
          <tr >
            <th scope="col">Id</th>
            <th scope="col">Titulo Libro</th>
            <th scope="col">Estado</th>
            
          </tr>
        </thead>
        <tbody>
          {libros.map(el =>(
             <tr key={el.id}>
             <th >{el.id}</th>
             <td>{el.title}</td>
             <td>{el.completed.toString()}</td>
             
           </tr>
          ))}
          
         
        </tbody>
      </table>
    </div>
    </div>
  )

}  
export default MiApi;