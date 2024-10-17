import React from 'react';
import { ProvinciasGet, LocalidadesProvincia, SendEmail} from "../services/formularioService.service";
import { useState } from "react";
import {useForm} from "react-hook-form";
import Popup from "./Popup";


const Formulario = () => {

  const [visibilityPop,setVisibilityPop] = React.useState(false);

  function handleClosePop(){
      setVisibilityPop(false)
  }
  function handleShowPop(){
      setVisibilityPop(true)
  }
  

    const [datosProvincias, setDatosProvincias] = useState([]);
    const [datosLocalidades, setDatosSeleccionados] = useState([]);
    const [datosLocalidadesDestino, setLocalidadesDestino] = useState([]);
    const [datosProvinciasDestino, setDatosProvinciasDestino] = useState([]);
    const{register, handleSubmit, formState:{errors}} = useForm();

    const HandleGet = async() => {
      let provincias = await ProvinciasGet();        
      setDatosProvincias(provincias);
    }

    const HandleProvinciaGet = async(event) => {
        const provinciaSeleccionada = event.target.value;

        let localidades = await LocalidadesProvincia(provinciaSeleccionada);
        setDatosSeleccionados(localidades)

    }


    const HandleGetDestino = async() => {
      
      let provincias = await ProvinciasGet();        
      setDatosProvinciasDestino(provincias);
    }

    const HandleLocalidadesDestino = async(event) => {
      
      const provinciasDestino = event.target.value;
      let localidadesDestino = await LocalidadesProvincia(provinciasDestino);

      setLocalidadesDestino(localidadesDestino);

    }

    const onSubmit = (data) => {
      if(validarFechas(data.FechaRetiro, data.FechaEntrega)){
        handleShowPop();
        SendEmail(data);
      }else{
        console.log("error en las fechas");
      }

      
    }

    const validarFechas = (fechaRetiro, fechaEntrega) => {
      if (fechaRetiro <= fechaEntrega) {
        return true;
      }else{
        return false;
      }
    }
    

    return (
      <>
        <div className="container mt-4 formulario">
          <h4 className="titulo">Publicar Pedido de Envío</h4>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Ingrese el tipo de carga:</label>
              <select name="TipoCarga" className="form-select"
                {...register("TipoCarga",
                  {
                    required: "Debe ingresar el tipo de carga"
                  })}
              >
                <option value="">Seleccionar</option>
                <option value="Documentacion">Documentacion</option>
                <option value="Paquete">Paquete</option>
                <option value="Granos">Granos</option>
                <option value="Hacienda">Hacienda</option>
              </select>
              <span> {errors.TipoCarga && errors.TipoCarga.message}</span>
            </div>
    
            {/* Domicilio de Retiro */}
            <h5>Domicilio de Retiro</h5>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Calle</label>
                <input name="DomicilioRetiro" type="text" className="form-control" 
                {...register("DomicilioRetiro",
                  {
                    required: "Debe ingresar el domicilio de retiro"
                  })}
                />
                <span> {errors.DomicilioRetiro && errors.DomicilioRetiro.message}</span>
              </div>
              <div className="col-md-6">
                <label className="form-label">Número</label>
                <input name="NumeroDomicilioRetiro" type="text" className="form-control"
                {...register("NumeroDomicilioRetiro",
                  {
                    required: "Debe ingresar el numero del domicilio de retiro",
                    pattern:{
                      value:/^[0-9]*$/,
                      message: "El numero de domicilio debe contener solo digitos"
                }})}
                
                />
                <span> {errors.NumeroDomicilioRetiro && errors.NumeroDomicilioRetiro.message}</span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="form-label">Provincia</label>
                <select name="ProvinciaRetiro" className="form-select" onClick={HandleGet} onChange={HandleProvinciaGet}
                {...register("ProvinciaRetiro",
                  {
                    required: "Debe ingresar una provincia de retiro",
                    onChange: (e) => {HandleProvinciaGet(e)},
                  })}
                >
                  <option value="">Seleccionar</option>
                  {datosProvincias.length > 0 ? (
                    datosProvincias.map((fila, index) => (
                      <option key={index} value={fila.id}>
                        {fila.nombre}
                      </option>
                    ))
                    ) : (
                    <option value="">Cargando provincias...</option>
                  )}
                </select>
                <span> {errors.ProvinciaRetiro && errors.ProvinciaRetiro.message}</span>
              </div>
              <div className="col-md-6">
                <label className="form-label">Localidad</label>
                <select name="LocalidadRetiro" className="form-select"
                {...register("LocalidadRetiro",
                  {
                    required: "Debe ingresar una localidad de retiro",
                  })}
                >
                  <option value="">Seleccionar</option>
                  {datosLocalidades.length > 0 ? (
                    datosLocalidades.map((fila, index) => (
                      <option key={index} value={fila.nombre}>
                        {fila.nombre}
                      </option>
                    ))
                    ) : (
                    <option value="">Cargando Localidades...</option>
                  )}

                </select>
                <span> {errors.LocalidadRetiro && errors.LocalidadRetiro.message}</span>
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Referencia (opcional)</label>
              <textarea name="ReferenciaRetiro" className="form-control" rows="2"
              {...register("ReferenciaRetiro",
                )}
              >
              </textarea>
            </div>
    
            {/* Domicilio de Destino */}
            <h5>Domicilio de Destino</h5>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Calle</label>
                <input name="DomicilioDestino" type="text" className="form-control"
                {...register("DomicilioDestino",
                  {
                    required: "Debe ingresar el domicilio de destino"
                  })}
                />
                <span> {errors.DomicilioDestino && errors.DomicilioDestino.message}</span>
              </div>
              <div className="col-md-6">
                <label className="form-label">Número</label>
                <input name="NumeroDomicilioDestino" type="text" className="form-control" 
                {...register("NumeroDomicilioDestino",
                  {
                    required: "Debe ingresar el numero del domicilio de destino",
                    pattern:{
                      value:/^[0-9]*$/,
                      message: "El numero de domicilio debe contener solo digitos"
                }})}
                />
                <span> {errors.NumeroDomicilioDestino && errors.NumeroDomicilioDestino.message}</span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="form-label">Provincia</label>
                <select name="ProvinciaDestino" className="form-select" onClick={HandleGetDestino} onChange={HandleLocalidadesDestino}
                {...register("ProvinciaDestino",
                  {
                    required: "Debe ingresar una provincia de destino",
                    onChange: (e) => {HandleLocalidadesDestino(e)},
                  })}
                >
                  <option value="">Seleccionar</option>
                  {datosProvinciasDestino.length > 0 ? (
                    datosProvinciasDestino.map((fila, index) => (
                      <option key={index} value={fila.id}>
                        {fila.nombre}
                      </option>
                    ))
                    ) : (
                    <option value="">Cargando provincias...</option>
                  )}
                </select>
                <span> {errors.ProvinciaDestino && errors.ProvinciaDestino.message}</span>
              </div>
              <div className="col-md-6">
                <label className="form-label">Localidad</label>
                <select name="LocalidadDestino" className="form-select"
                {...register("LocalidadDestino",
                  {
                    required: "Debe ingresar una localidad de destino",
                  })}
                >
                  <option value="">Seleccionar</option>
                  {datosLocalidadesDestino.length > 0 ? (
                    datosLocalidadesDestino.map((fila, index) => (
                      <option key={index} value={fila.nombre}>
                        {fila.nombre}
                      </option>
                    ))
                    ) : (
                    <option value="">Cargando Localidades...</option>
                  )}
                </select>
                <span> {errors.LocalidadDestino && errors.LocalidadDestino.message}</span>
              </div>
            </div>
            <div className="mb-3 mt-2">
              <label className="form-label">Referencia (opcional)</label>
              <textarea name="ReferenciaDestino" className="form-control" rows="2"
              {...register("ReferenciaDestino",
              )}
              >
              </textarea>
            </div>
    
            {/* Fechas y Fotos */}
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Fecha de Retiro</label>
                <input name="FechaRetiro" type="date" className="form-control" min={new Date().toJSON().slice(0, 10)}
                {...register("FechaRetiro",
                  {
                    required: "Debe ingresar la fecha de retiro",
                    
                  })}
                />
                <span> {errors.FechaRetiro && errors.FechaRetiro.message}</span>
              </div>
              <div className="col-md-6">
                <label className="form-label">Fecha de Entrega</label>
                <input name="FechaEntrega" type="date" className="form-control" min={new Date().toJSON().slice(0, 10)}
                {...register("FechaEntrega",
                  {
                    required: "Debe ingresar la fecha de entrega",
                    
                  })}
                />
                <span> {errors.FechaEntrega && errors.FechaEntrega.message}</span>
              </div>
            </div>
    
            {/* Subir Fotos */}
            <div className="mt-3">
              <label className="form-label">Fotos</label>
              <input name="Fotos" type="file" multiple accept=".jpg,.png" className="form-control"
              {...register("Fotos",
                {
                  
                })}
              />
            </div>
    
            <div className="d-flex">

            <button type="submit" className="btn btn-primary mt-4 mb-3">
              Publicar
            </button>
            
            </div>
          </form>
        </div>
        <Popup show={visibilityPop} onClose={handleClosePop} onShow={handleShowPop}></Popup>
      </>
      );
    
}

export default Formulario;