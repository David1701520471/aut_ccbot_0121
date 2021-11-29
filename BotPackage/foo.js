// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const axios = require('axios');
const api= "https://sheet.best/api/sheets/1398a456-bd6c-42ba-93d8-4b5d1179b05e";

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });

    function crear_cita(agent) {
        let entidad_salud = agent.parameters["entidad_salud"];
        let identificacion = agent.parameters["identificacion"];
        let nombres = agent.parameters["nombres"];
        let apellidos = agent.parameters["apellidos"];
        let archivo = agent.parameters["archivo"];
        let numero_seg= Date.now();
        let estado="En Tramite";
        axios.post(api,
            { entidad_salud, identificacion, nombres, apellidos, archivo, numero_seg,estado});
        agent.add("Su solicitud fue enviada a tramite con el numero de identificación: " + numero_seg +
        " Por favor guarde este numero para consultar el tramite de su cita más adelante ¡Que tenga buen día!");
    }

    async function consulta_cita(agent){
        let numero_seg= agent.parameters.numero_seg;
        let response= await axios.get(api+"/numero_seg/"+numero_seg);
        let consulta=response.data;
        if (consulta.length > 0){
            let row=consulta[0];
            if(row.estado=="En Tramite"){
                agent.add("Su cita se encuentra en Tramite");
            }else{
                agent.add("Su cita fue asignada en la"+ row.fecha_consulta +"con el doctor"+ row.medico);
            }
        }else{
            agent.add("El numero de seguimiento ingresado no se encuentra en el sistema");
        }
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Tramites.crear_cita', crear_cita);
    intentMap.set('Tramites.consulta', consulta_cita);
    agent.handleRequest(intentMap);
});