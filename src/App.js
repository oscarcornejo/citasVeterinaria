import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // CARGAR LAS CITAS DE LOCALSTORAGE COMO STATE INICIAL
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  // SI EXISTE ALGO EN LOCALSTORAGE EL VALOR SE MANTIENE
  // DE LO CONTRARIO SE CREA UN ARREGLO VACIO
  // Y ESO PASA A SER EL STATE INICIAL
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // useState retorna 2 parámetros
  // state = corresponde al state actual, this.state
  // actualizarState = funcion que actualiza el state actual, this.setState({})
  // Una de las ventajas es que los puedes llamar como tu quieras
  const [citas, guardarCita] = useState(citasIniciales);

  // AGREGAR LAS NUEVAS CITAS AL STATE
  const crearCita = (cita) => {

    // Tomar una copia del state y agregar la nueva cita
    const nuevasCitas = [
      ...citas,
      cita
    ];

    // Almacenamos en el State
    guardarCita(nuevasCitas);
  }

  const eliminarCita = (index) =>{
      const nuevasCitas = [...citas];
      nuevasCitas.splice(index, 1);
      guardarCita(nuevasCitas);
  }

  // SE EJECUTA CUANDO EL COMPONENTE CARGA O SE ACTUALIZA
  useEffect(() =>{
    console.log('Componente listo o algo cambio.');
    // Convierte un texto en un objeto de JavaScript
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      // JSON.stringify: convierte un objeto o valor de JavaScript en un String
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]); 
  // DEPENDENCIAS '[citas]', es decir que va a tener que cambiar para que se ejecute 
  // o que es lo que debe cambira para que se ejecute
  // De no ocupar las dependencias, useEffect se estaría ejecutando todo el tiempo, incluso con el cambio de otro componente



  // CARGAR CONDICIONALMENTE UN TITULO
  // Object.keys: REVISA LAS POSICIONES QUE TIENE EL ARREGLO
   const titulo = Object.keys(citas).length === 0 ? 'No hay Citas' : 'Administrar las Citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
              {
                citas.map( (cita, index) => {
                  console.log(cita);  
                  return (
                      <Cita key={index} index={index} cita={cita} eliminarCita={eliminarCita} />
                    );
                })
              }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
