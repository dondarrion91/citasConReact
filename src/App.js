import React,{Fragment,useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';

function App() {
  
  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }



  //arreglo de citas
  const [citas,guardarCitas] = useState(citasIniciales);

  //useEffect para cuando cambia el state
  useEffect( () => { // similar a componentDidMount y a componentDidUpdate
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify([]))
    }
  },[citas]); //array vacio para que se ejecute solo 1 vez y no cicle

  //funcion que tome citas actuales y agregue nuevas

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //funcion que elimina citas por su id 
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  } 

  //mensaje condicional
  const titulo = citas.length === 0 ? 'No hay Citas' : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}

            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;
