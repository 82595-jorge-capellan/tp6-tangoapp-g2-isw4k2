import axios from "axios";
import emailjs from '@emailjs/browser';

export const ProvinciasGet = async () => {

    try{
        let provinciasGet  = await axios.get("/api/provincias.json")
        return provinciasGet.data.provincias;
    }catch (error){
        return error.response;
    }

}

export const ProvinciaById = async (id) => {

    try{
        let provinciaID = await axios.get(`https://apis.datos.gob.ar/georef/api/provincias?id=${id}`)
        console.log(provinciaID)
        return provinciaID.data.provincias[0].nombre;
    }catch (error) {
        return error;
    }
}


export const LocalidadesProvincia = async (provincia) => {

    console.log(provincia);
    try{
        let localidadesProvinciaGet = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&campos=id,nombre&max=100`) 
        
        return localidadesProvinciaGet.data.localidades;
    }catch(error){
        return error;
    }
}

export const SendEmail = async (data) => {


    let formCont = {
        destino: 'colodnyagustin@gmail.com',
        tipo_pedido: data.TipoCarga,
        provincia_origen: await ProvinciaById(data.ProvinciaRetiro), 
        localidad_origen: data.LocalidadRetiro,  
        calle_origen: data.DomicilioRetiro, 
        numero_origen: data.NumeroDomicilioRetiro,  
        referencia_origen: data.ReferenciaRetiro,
        provincia_destino: await ProvinciaById(data.ProvinciaDestino), 
        localidad_destino: data.LocalidadDestino,  
        calle_destino: data.DomicilioDestino, 
        numero_destino: data.NumeroDomicilioDestino,  
        referencia_destino: data.ReferenciaDestino,
        fecha_retiro: data.FechaRetiro, 
        fecha_entrega: data.FechaEntrega
    };


    try {
        const result = await emailjs.send("service_qpb1y7m", "template_whr2i5d", formCont, "X6FT9jkeR_LrJ9SeX");
        console.log(result)
    }catch(error){
        console.log(error)
    }
}