import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
});

const cochabambaExamples = {
    //Question about the bot
    "HOLA":{
        content:"",
    },
    "TRAMITES":{
        content:"",
    },
    "QUIEN ERES":{
        content:"Soy AVONNI TU ASISTENTE, una asistente virtual basada en inteligencia artificial implementada por la Alcaldía de Cochabamba, Estoy aquí para ayudarte con preguntas, conversaciones o cualquier otra cosa con referencia a los tramites que se realizan en la alcaldía de Cochabamba o sus 7 sub alcaldías.",
    },
    "COMO FUNCIONAS":{
        content:"Funciono procesando el texto que me proporcionas y generando respuestas basadas en mi comprensión del lenguaje natural y mi entrenamiento con una gran cantidad que la alcaldía me proporciono para aprender",
    },
    "QUE PUEDES HACER":{
        content:"Puedo ayudarte a responder preguntas, proporcionar información sobre los temas de la alcaldía de Cochabamba.",
    },
    "DE DONDE OBTIENES TU INFORMACION":{
        content:"Mi conocimiento se basa en información proporcionada por la alcaldía de Cochabamba, y otras fuentes de información pública.",
    },
    "PUEDES APRENDER":{
        content:"Sí, puedo aprender de nuevas interacciones contigo y mejorar mis respuestas con el tiempo",
    },
    "TIENES EMOCIONES":{
        content:"No tengo emociones ni conciencia propia. Soy un programa de inteligencia artificial diseñado para procesar y generar respuestas basadas en el texto que recibo.",
    },
    //quetions about cochabamba
    "QUE ES EL TRAMITE DE VISADO ANTEPROYECTO DE URBANIZACION":{
        content:" Es un tramite a realizar cuando se requiere urbanizar un terreno de su propiedad con superficie a 1300 metros cuadrados, con caracter previo al diseno de los planos definitivos del proyecto de urbanizacion, debe solicitar al Gobierno Autonomo Municipal de Cochabamba la visacion de los planos del anteproyecto.",
    },
    "DONDE SE REALIZA EL TRAMITE DE VISADO ANTEPROYECTO DE URBANIZACION":{
        content:"Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DEL TRAMITE DE VISADO ANTEPROYECTO DE URBANIZACION":{
        content:"El costo depende del terreno por ejemplo la tasa de visacion de anteproyecto: por terreno plano es 0.05 Bolivianos por metro cuadrado",
    },
    "DONDE SE REALIZA EL TRAMITE DE APROBACION DEL PLANO DE REMODELACION AMPLIACION, REGULARIZACION Y/O SUSTITUCION DE EDIFICIO ":{ 
        content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "QUE ES LA APROBACION DEL PLANO DE REMODELACION AMPLIACION, REGULARIZACION Y/O SUSTITUCION DE EDIFICIO": {
        content:" Es un tramite a realizar cuando se tiene plano de construccion aprobado y se desea realizar modificaciones funcionales y/o de volumetria o se requiera realizar una ampliacion a la edificacion (mayor a tres plantas), para ello se debe solicitar la aprobacion de remodelacion o ampliacion segun el caso. El presente tramite tambien es aplicable en el caso que se desee realizar la regularizacion de una edificacion construida que cumple la normativa vigente. Tambien se aplica el tramite en caso que se requiera sustituir un plano de construccion aprobado por otro proyecto, siempre y cuando no este construida la edificacion.", 
    },
    "CUALES SON LOS COSTOS DEL TRAMITE DE APROBACION DEL PLANO DE REMODELACION AMPLIACION,REGULARIZACION Y/O SUSTITUCION DE EDIFICIO ":{
        content:"El costo para Remodelacion sin cambiar la funcion es de 0.25 bolivianos por metro cuadrado, y si cambia funcion el costo es de 0.50 bolivianos por metro cuadrado, el costo por Ampliacion de area residencial es de 1.00 boliviano por metro cuadrado, por ampliacion de area no residencial es de 2.00 bolivianos por metro cuadrado, por ampliacion de plano estructural es de 2.00 bolivianos por metro cubico",
    },
    "CUALES SON LOS REQUISITOS DEL TRAMITE DE APROBACION DEL PLANO DE REMODELACION AMPLIACION, REGULARIZACION Y/O SUSTITUCION DE EDIFICIO ":{
        content:"Los requisitos son, el derecho de admision 16 (DA 16), folder municipal, formulario de solicitud de tramite, certificado catastral, impuestos al dia, fotocopia de carnet de identidad vigente, plano de lotes aprobados y fotocopia legalizada, planos arquitectonicos del proyecto de remodelacion o ampliacion, certificado de estabilidad estructural emitida por la Sociedad de Ingenieros de Bolivia ",
    },
    "CUANTO DURA EL TRAMITE DE APROBACION DEL PLANO DE REMODELACION AMPLIACION, REGULARIZACION Y/O SUSTITUCION DE EDIFICIO ":{
        content:" El tramite si cumple todos los requisitos y no hay observaciones, dura 40 dias habiles aproximadamente.",
    },
    "QUE ES LA APROBACION DEL PLANO DE VERJA": {
        content:" Es un tramite para aprobar un proyecto de construccion de verja.",
    },
    "DONDE SE REALIZA LA APROBACION DEL PLANO DE VERJA ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DE LA APROBACION DEL PLANO DE VERJA ":{content:"El costo por metro lineal del frente del terreno es de 2 bolivianos, el costo de fijacion de rasante por metro lineal del subdistrito 1 al 16 es de 1 boliviano y del subdistrito 17 al 32 es de 1.5 bolivianos por metro lineal",
    },
    "CUALES SON LOS REQUISITOS DE LA APROBACION DEL PLANO DE VERJA ":{
        content:"Los requisitos son: Derecho de admision 17 (DA 17), folder municipal, formulario de solicitud, plano de lote aprobado, registro catastral, plano de construccion, fotocopia Carnet de identidad vigente. ",
    }, 
    "CUANTO ES LA DURACION DE LA APROBACION DEL PLANO DE VERJA ":{
        content:" El tramite si cumple todos los requisitos y no hay observaciones, dura 10 dias habiles aproximadamente.",
    },
    "DONDE SE REALIZA EL TRAMITE DE AUTORIZACION DE TRABAJOS MENORES":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DE AUTORIZACION DE TRABAJOS MENORES":{
        content:"Son varios los costos por la autorizacion de trabajos menores, el costo de tramite por construccion de habitacion provisional es de 50 bolivianos por Unidad, por excavaciones en via publica el costo es de 100 Bolivianos, el costo por construccion de muro perimetral es de 0.50 bolivianos por metro cuadrado, por la apertura o colocado de puertas y ventanas es de 20 Bolivianos la unidad.",
    },
    "CUALES SON LOS REQUISITOS DE AUTORIZACION DE TRABAJOS MENORES ":{ content:"Los requisitos son: solicitud de tramite, folder amarillo. Plano de lote aprobado, titulo de propiedad, fotocopia de Carnet de identidad vigente, impuestos al dia. ",
    },
    "CUANTO ES LA DURACION DE AUTORIZACION DE TRABAJOS MENORES ":{
        content:" La duracion del tramite si cumple todos los requisitos es de 3 dias habiles aproximadamente.",
    },
    "DONDE SE REALIZA EL VISADO DE ANTEPROYECTO DE EQUIPAMIENTOS PUBLICOS Y PRIVADOS ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DEL VISADO DE ANTEPROYECTO DE EQUIPAMIENTOS PUBLICOS Y PRIVADOS ":{ content:"el precio del visado del plano es de 30 bolivianos, el precio de Derecho de admision 18 (DA 18) es de 5 bolivianos y el timbre de 10 bolivianos por cada fotocopia. ",
    },
    "CUALES SON LOS REQUISITOS DEL VISADO DE ANTEPROYECTO DE EQUIPAMIENTOS PUBLICOS Y PRIVADOS ":{ content:"Los requisitos son: Visado del plano arquitectonico, derecho de admision 18 (DA 18) del tramite, formulario de solicitud del tramite, certificado catastral, planos arquitectonicos de anteproyecto, plano de lote aprobado, fotocopia de  Carnet de identidad vigente. ",
    },
    "CUANTO ES LA DURACION DEL VISADO DE ANTEPROYECTO DE EQUIPAMIENTOS PUBLICOS Y PRIVADOS ":{ content:" La duracion del tramite si cumple todos los requisitos es de 30 dias habiles aproximadamente.",
    },
    "DONDE SE REALIZA LA APROBACION DE PLANO DE EQUIPAMIENTOS PUBLICOS Y PRIVADOS ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DE LA APROBACION DE PLANO DE EQUIPAMIENTOS PUBLICOS Y PRIVADOS ":{ content:"Los timbres tienen un costo de 20 Bolivianos, folder municipal a 5 bolivianos, reposicion de boleta comprobante y folder 6 bolivianos, tasa de aprobacion area residencial por metro cuadrado es de 2 bolivianos, tasa de aprobacion plano estructural por metro cubico a 2 bolivianos ",
    },
    "CUALES SON LOS REQUISITOS DE LA APROBACION DE PLANO DE EQUIPAMIENTOS PUBLICOS Y PRIVADOS ":{ content:"Los requisitos son: formulario de solicitud de tramite, certificado catastral, impuestos al dia, licencia ambiental, planos arquitectonicos de anteproyecto visado por la alcaldia, planos del proyecto estructural, plano de instalacion hidrosanitaria, plano instalacion electrica, plano de instalaciones especiales, fotocopia carnet de identidad vigente",
    },
    "CUANTO ES LA DURACION DE LA APROBACION DE PLANO DE EQUIPAMIENTOS PUBLICOS Y PRIVADOS ":{ content:" La duracion del tramite si cumple todos los requisitos es de 30 dias habiles aproximadamente.",
    },
    "DONDE SE REALIZA EL VISADO DE PLANO DE ANTEPROYECTO DE ESTACION DE SERVICIO Y SURTIDORES ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DEL VISADO DE PLANO DE ANTEPROYECTO DE ESTACION DE SERVICIO Y SURTIDORES ":{ content:"El precio de derecho de admision 20 (DA  20) es de 46 bolivianos, folder municipal 5 bolivianos, la tasa de verificacion de superficies de 0.50 bolivianos por metro cuadrado, tasa de fijacion de rasante por metro lineal en el subdistrito 1 al 16 de 1 boliviano el metro lineal y del sub distrito 17 al 32 de 1.5 bolivianos el metro lineal ",
    },
    "CUALES SON LOS REQUISITOS DEL VISADO DE PLANO DE ANTEPROYECTO DE ESTACION DE SERVICIO Y SURTIDORES ":{ content:"Son el derecho de admision 20 (DA 20), folder municipal, memorial dirigido al sub alcalde, plano de lote aprobado, titulo de propiedad, impuestos al dia, fotocopia Carnet de identidad vigente, solvencia fiscal, anteproyecto de construccion, certificado de ubicacion. ",
    },
    "CUANTO ES LA DURACION DEL VISADO DE PLANO DE ANTEPROYECTO DE ESTACION DE SERVICIO Y SURTIDORES ":{ content:" La duracion del tramite si cumple todos los requisitos es de 30 dias habiles aproximadamente.",
    },
    "DONDE SE REALIZA LA APROBACION DEL PLANO DE ESTACION DE SERVICIO Y SURTIDORES ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    }, 
    "CUALES SON LOS COSTOS DE LA APROBACION DEL PLANO DE ESTACION DE SERVICIO Y SURTIDORES ":{ content:"El precio de derecho de admision 21 (DA 21) es de 46 bolivianos, folder municipal 5 bolivianos, tasa de aprobacion por metro cuadrado a 3 bolivianos, tasa de aprobacion por metro cuadrado de edificaciones 2 bolivianos, tasa de fijacion de rasante 1.5 bolivianos por metro lineal.",
    }, 
    "CUALES SON LOS REQUISITOS DE LA APROBACION DEL PLANO DE ESTACION DE SERVICIO Y SURTIDORES ":{ content:"Son el derecho de admision 21 (DA 21), folder municipal, memorial dirigido al sub alcalde, plano de lote aprobado, titulo de propiedad, impuestos al dia, fotocopia Carnet de identidad vigente, solvencia fiscal, plano de proyecto de construccion, plano de detalle construccion, plano de detalles constructivos, plano de instalaciones electricas, plano de instalacion sanitaria, certificado de ubicacion, anteproyecto visado, licencia ambiental. ",
    },
    "CUANTO ES LA DURACION DE LA APROBACION DEL PLANO DE ESTACION DE SERVICIO Y SURTIDORES ":{ content:" La duracion del tramite si cumple todos los requisitos es de 30 dias habiles aproximadamente.",
    },
    "DONDE SE REALIZA LA AUTORIZACION EVENTUAL PARA USO DE ESPACIOS PUBLICOS PARA ACTIVIDADES CIVICAS, RELIGIOSAS, TRADICIONALES, CULTURALES Y OTROS ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DE LA AUTORIZACION EVENTUAL PARA USO DE ESPACIOS PUBLICOS PARA ACTIVIDADES CIVICAS, RELIGIOSAS, TRADICIONALES, CULTURALES Y OTROS ":{ content:"Para las actividades sin fines de lucro no tiene costo, para las actividades con fines de lucro el derecho de admision 21 (DA 21) es de 20 bolivianos, folder municipal a 5 bolivianos,y el costo de comprobante de pago de patente.",
    },
    "CUALES SON LOS REQUISITOS DE LA AUTORIZACION EVENTUAL PARA USO DE ESPACIOS PUBLICOS PARA ACTIVIDADES CIVICAS, RELIGIOSAS, TRADICIONALES, CULTURALES Y OTROS ":{ content:"Los requisitos son solicitud escrita dirigida al sub alcalde indicado, carta notariada de compromiso de entrega en las mismas condiciones, contrato de emsa, derecho de admision 22 (DA 22), folder municipal, comprobante de pago de la patente. ",
    },
    "CUANTO ES LA DURACION DE LA AUTORIZACION EVENTUAL PARA USO DE ESPACIOS PUBLICOS PARA ACTIVIDADES CIVICAS, RELIGIOSAS, TRADICIONALES, CULTURALES Y OTROS ":{ content:" La duracion del tramite si cumple todos los requisitos es de 2 dias habiles aproximadamente.",
    },
    "DONDE SE REALIZA LA VISACION TECNICA Y LEGAL DE MINUTAS ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DE LA VISACION TECNICA Y LEGAL DE MINUTAS ":{ content:" Los costos son, Tasa de visacion de predio, lote o inmueble ubicado en area urbana: Hasta 500 metros cuadrados de lote 25 Bolivianos, Hasta 500 metros cuadrados de lote con edificacion 40 Bolivianos, Mas de 501 metros cuadrados de lote 60 Bolivianos, Mas de 500 metros cuadrados de lote con edificacion 90 Bolivianos, Tasa de visacion de predio, lote o inmueble ubicado en area rural o rustica: Terreno de uso agricola, mayor a 5000 metros cuadrados 120 Bolivianos, Terrenos rusticos transferidos en su integridad 90 Bolivianos, Derecho de admision 23 (DA 23) de tramite 5 Bolivianos.",
    },
    "CUALES SON LOS REQUISITOS DE LA VISACION TECNICA Y LEGAL DE MINUTAS ":{ content:"Los requisitos son solicitud, fotocopia Carnet de identidad vigente, titulo de propiedad y folio real actualizado, registro catastral, plano de lote, impuestos al dia, minuta de transferencia",
    },
    "CUANTO ES LA DURACION DE LA VISACION TECNICA Y LEGAL DE MINUTAS ":{ content:" La duracion del tramite si cumple todos los requisitos es de 1 dia habil aproximadamente.",
    },
    "DONDE SE REALIZA EL SELLO SECO EN TESTIMONIOS Y/O MINUTAS CON RECONOCIMIENTO DE FIRMAS PARA SU REGISTRO EN DERECHOS REALES ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DE SELLO SECO EN TESTIMONIOS Y/O MINUTAS CON RECONOCIMIENTO DE FIRMAS PARA SU REGISTRO EN DERECHOS REALES ":{ content:"El costo del timbre es de 10 Bolivianos",
    },
    "CUALES SON LOS REQUISITOS DE EL SELLO SECO EN TESTIMONIOS Y/O MINUTAS CON RECONOCIMIENTO DE FIRMAS PARA SU REGISTRO EN DERECHOS REALES ":{ content:"Los requisitos son solicitud, testimonio protocolizado, minuta de Transferencia con reconocimiento de firmas, formulario de pago de impuestos.",
    },
    "CUANTO ES LA DURACION DE EL SELLO SECO EN TESTIMONIOS Y/O MINUTAS CON RECONOCIMIENTO DE FIRMAS PARA SU REGISTRO EN DERECHOS REALES ":{ content:" La duracion del tramite si cumple todos los requisitos es Inmediato.",
    },
    "DONDE SE REALIZA LA ATENCION DE DENUNCIAS SOBRE PROBLEMAS TECNICOS Y LEGALES DE CONSTRUCCION ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DE LA ATENCION DE DENUNCIAS SOBRE PROBLEMAS TECNICOS Y LEGALES DE CONSTRUCCION ":{ content:"No tiene costo alguno",
    },
    "CUALES SON LOS REQUISITOS DE LA ATENCION DE DENUNCIAS SOBRE PROBLEMAS TECNICOS Y LEGALES DE CONSTRUCCION ":{ content:"Los requisitos son solicitud, documentos que respalden la denuncia, fotocopia de Carnet de identidad vigente.",
    },
    "CUANTO ES LA DURACION DE LA ATENCION DE DENUNCIAS SOBRE PROBLEMAS TECNICOS Y LEGALES DE CONSTRUCCION ":{ content:" La presentacion de la denuncia es inmediata. El tiempo de respuesta varia en funcion al contenido de la denuncia.",
    },
    "DONDE SE REALIZA EL AVALUO DE INMUEBLE CON ORDEN JUDICIAL Y/O A PETICION DE PARTE ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DEL AVALUO DE INMUEBLE CON ORDEN JUDICIAL Y/O A PETICION DE PARTE ":{ content:" El costo es: derecho de admision 24 (DA 24) de tramite 27 Bolivianos, Folder municipal 5 Bolivianos, Tasa por verificacion de superficie en lote 0.50 Bolivianos por metro cuadrado, Tasa por verificacion de superficie en inmueble edificado 0.80 Bolivianos por metro cuadrado, Certificacion 30 Bolivianos, Certificacion (segun Ordenanza Municipal Numero 2636, valido solo para el Distrito 9) 50 Bolivianos ",
    },
    "CUALES SON LOS REQUISITOS DEL AVALUO DE INMUEBLE CON ORDEN JUDICIAL Y/O A PETICION DE PARTE ":{ content:"Los requisitos son Requerimiento fiscal. Plano aprobado del predio, escritura publica o folio real, fotocopia de Carnet de identidad vigente.",
    },
    "CUANTO ES LA DURACION DEL AVALUO DE INMUEBLE CON ORDEN JUDICIAL Y/O A PETICION DE PARTE ":{ content:" De no encontrarse observaciones es de 10 dias habiles aproximadamente.",
    },
    "DONDE SE REALIZA LA NUMERACION DOMICILIARIA ":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS LA NUMERACION DOMICILIARIA ":{ content:" El costo es: derecho de admision 25 (DA 25) de tramite es 25 Bolivianos, Folder municipal 5 Bolivianos, Tasa por numeracion de domicilio 17 Bolivianos",
    },
    "CUALES SON LOS REQUISITOS DE LA NUMERACION DOMICILIARIA ":{ content:"Los requisitos son solicitud, fotocopia de  Carnet de identidad vigente, el inmueble o lote debe contar con muro o verja de cierre frontal, titulo de propiedad registrado en Derechos reales, impuestos al dia, plano de lote aprobado",
    },
    "CUANTO ES LA DURACION DE LA NUMERACION DOMICILIARIA ":{ content:" De no encontrarse observaciones es de 10 dias habiles aproximadamente.",
    },
    "DONDE SE REALIZA LA LEGALIZACION DE COPIA DE DOCUMENTOS DE DERECHO PROPIETARIO (TESTIMONIO, Y OTROS), RESOLUCIONES, INFORMES, PLANOS APROBADOS, IMPUESTOS Y OTROS PARA USO EXCLUSIVO DEL Gobierno Autonomo Municipal de Cochabamba":{ content:" Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    }, 
    "CUALES SON LOS COSTOS LA LEGALIZACION DE COPIA DE DOCUMENTOS DE DERECHO PROPIETARIO (TESTIMONIO, Y OTROS), RESOLUCIONES, INFORMES, PLANOS APROBADOS, IMPUESTOS Y OTROS PARA USO EXCLUSIVO DEL Gobierno Autonomo Municipal de Cochabamba":{ content:" El costo es de 10 bolivianos el timbre por cada documento legalizado y de 5 bolivianos por cada impuesto legalizado.",
    }, 
    "CUALES SON LOS REQUISITOS DE LA LEGALIZACION DE COPIA DE DOCUMENTOS DE DERECHO PROPIETARIO (TESTIMONIO, Y OTROS), RESOLUCIONES, INFORMES, PLANOS APROBADOS, IMPUESTOS Y OTROS PARA USO EXCLUSIVO DEL Gobierno Autonomo Municipal de Cochabamba":{ content:"Los requisitos son solicitud, documento a legalizar, timbre municipal por cada documento",
    },
    "CUANTO ES LA DURACION DE LA LEGALIZACION DE COPIA DE DOCUMENTOS DE DERECHO PROPIETARIO (TESTIMONIO, Y OTROS), RESOLUCIONES, INFORMES, PLANOS APROBADOS, IMPUESTOS Y OTROS PARA USO EXCLUSIVO DEL Gobierno Autonomo Municipal de Cochabamba":{ content:" Inmediato, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
    "QUE ES EL TRAMITE DE VISADO ANTEPROYECTO DE URBANIZACION": {
        content:" Es un tramite a realizar cuando se requiere urbanizar un terreno de una propiedad con superficie a 1300 metros cuadrados, con caracter previo al diseno de los planos definitivos del proyecto de urbanizacion, debe solicitar al Gobierno Autonomo Municipal de Cochabamba. la visacion de los planos del anteproyecto.",
    },
    
    "QUE ES LA AUTORIZACION DE TRABAJOS MENORES": {content:" Es un tramite para la ejecucion de obras de pequena magnitud, excavaciones en via publica, construccion de muro perimetral, apertura de puertas y ventanas, cambio total de cubiertas, acopio de material y escombros, bardas temporales en la vereda, arreglo de fachada o trabajos externos con uso de la acera, demolicion de bloque o de unidad.",
    }, 
    "QUE ES VISADO DE ANTEPROYECTO DE EQUIPAMIENTOS PUBLICOS Y PRIVADOS": {content:" Es un tramite a realizar cuando se requiere la aprobacion del plano arquitectonico de anteproyecto de equipamientos publico y privados.",
    },  
    "QUE ES LA APROBACION DE PLANO DE EQUIPAMIENTOS PUBLICOS Y PRIVADOS": {content:" Es un tramite a realizar cuando se requiere la aprobacion del plano arquitectonico de anteproyecto de equipamientos publicos y privado",
    },
    "QUE ES EL VISADO DE PLANO DE ANTEPROYECTO DE ESTACION DE SERVICIO Y SURTIDORES": {content:" Es un tramite a para visar un anteproyecto de construccion de estacion de servicio o surtidor",
    },
    "QUE ES LA APROBACION DEL PLANO DE ESTACION DE SERVICIO Y SURTIDORES": {content:" Es un tramite realizado para aprobar un proyecto de construccion de estacion de servicio o surtidor",
    }, 
    "QUE ES LA AUTORIZACION EVENTUAL PARA USO DE ESPACIOS PUBLICOS PARA ACTIVIDADES CIVICAS, RELIGIOSAS, TRADICIONALES, CULTURALES Y OTROS": {content:" Es un tramite para solicitar autorizacion eventual cuando una persona natural, institucion, agrupacion, organizacion o empresa, requiera utilizar en forma temporal algun espacio publico municipal para actividades con fines o sin fines de lucro: instalacion de circos, parques de diversiones o la realizacion de kermeses, ferias u otras actividades similares ",
    },
    "QUE ES LA VISACION TECNICA Y LEGAL DE MINUTAS": {content:" es cuando se desea obtener el visado de una minuta",
    },
    "QUE ES SELLO SECO EN TESTIMONIOS Y/O MINUTAS CON RECONOCIMIENTO DE FIRMAS PARA SU REGISTRO EN DERECHOS REALES": {content:" es cuando se desea obtener sello seco en testimonios protocolizados y/o en minutas con reconocimiento de firmas para su registro en Derechos Reales. ",
    },
    "QUE ES LA ATENCION DE DENUNCIAS SOBRE PROBLEMAS TECNICOS Y LEGALES DE CONSTRUCCION": {content:" es cuando se desee realizar una denuncia para la solucion de problemas tecnicos y legales de construccion.",
    },
    "QUE ES EL AVALUO DE INMUEBLE CON ORDEN JUDICIAL Y/O A PETICION DE PARTE": {content:" Es un tramite a realizarse por Orden Judicial y/o Peticion de Parte para atribuir el valor de un predio dentro de la jurisdiccion del Gobierno Autonomo Municipal de Cochabamba con referencia a las tablas de valoracion de superficie construida, antiguedad, categoria y zona homogenea de valor de terreno y edificaciones definidos y actualizados por el Gobierno Autonomo Municipal de Cochabamba.",
    },
    "QUE ES LA NUMERACION DOMICILIARIA": {content:" Es un tramite a realizarse cuando desee obtener el numero de domicilio para identificacion fisica de su inmueble.",
    }, 
    "QUE ES LA LEGALIZACION DE COPIA DE DOCUMENTOS DE DERECHO PROPIETARIO (TESTIMONIO, Y OTROS), RESOLUCIONES, INFORMES, PLANOS APROBADOS, IMPUESTOS Y OTROS PARA USO EXCLUSIVO DEL Gobierno Autonomo Municipal de Cochabamba":{
        content:"Es un tramite a realizar para obtener documentos legalizados para uso exclusivo en el Gobierno Autonomo Municipal de Cochabamba"
    }, 
    "CUAL ES LA UNIDAD RESPONSABLE DE LA EJECUCION DEL TRAMITE": {
        content: "Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia y Direccion de Urbanismo y Servicios Municipales.",
    },
    "DONDE SE REALIZA EL TRAMITE DE VISADO ANTEPROYECTO DE URBANIZACION": {
        content:"Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS REQUISITOS DEL TRAMITE DE VISADO DE ANTEPROYECTO DE URBANIZACION": {
        content: "Los requisitos para el tramite de visado de anteproyecto de urbanizacion son los siguientes: 1.    Derecho de admision 111 (DA 111) 2.    Memorial dirigido al Sub Alcalde solicitando el tramite requerido con la firma del o los propietarios, copropietarios o apoderado.3.    Titulos de propiedad registrado en Derechos Reales a nombre del actual propietario, fotocopia legalizada por la Sub Alcaldia a la que corresponde el predio (En caso de estar matriculado, acompanar Folio Real). 4.    Impuestos al dia Proforma del sistema RUAT que evidencie el no adeudo tributario. 5.    Plano de levantamiento topografico geo referenciado firmado y sellado por un Topografo o profesional acreditado. 6.    Plano de Anteproyecto, tres ejemplares en papel bond y 1 copia digital en formato CAD), firmado y sellado por el Arquitecto. 7.    Fotocopia del carnet de identidad vigente del o los propietarios. 10.  Inspeccion.",
    },
    "CUALES SON LOS COSTOS DE LOS REQUISITOS DEL VISADO ANTEPROYECTO DE URBANIZACION": {
        content: "Los costos son los siguientes: 1.    Para el derecho de admision 111 (DA 111) del tramite el costo es de 27 bolivianos. 2.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos. 3.    Para la tasa de visacion de anteproyecto el costo es de 0.05 bolivianos por metros cuadrados por terreno plano metro cuadrado 4.    Para el terreno con pendiente metro cuadrado el costo es de 0.08 bolivianos por metros cuadrados 5.    Para la inspeccion el costo es de 20 bolivianos.",
    },
    //problema
    "CUANTO DURA EL TRAMITE": {
        content: "El tramite llega a durar aproximadamente 90 dias calendario despues de cumplirse todos los requisitos y no encontrar observaciones.",
    },
    //Vehiculos
    "CUALES SON LOS REQUISITOS DE LA INSCRIPCION DE VEHICULO AUTOMOTOR TERRESTRE CON FACTURA ":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente, foto 3 por 3 fondo rojo, declaracion unica de importacion, formulario de registro vehicular, certificado unico de datos tecnicos de automotor, poliza de importacion, factura comercial (original y fotocopia), y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS DE LA INSCRIPCION DE VEHICULO AUTOMOTOR TERRESTRE CON FACTURA Y TRANSFERENCIA ":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente, foto 3 por 3 fondo rojo, declaracion unica de importacion, formulario de registro vehicular, poliza de importacion, factura comercial (original y fotocopia), documento de compra y venta (original y fotocopia), fotocopia vigente del vendedor y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS DE LA INSCRIPCION IMPORTACION DIRECTA DEL VEHICULO AUTOMOTOR TERRESTRE":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, declaracion unica de importacion, formulario de registro vehicular, poliza de importacion, y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS DE LA INSCRIPCION IMPORTACION DIRECTA DEL VEHICULO AUTOMOTOR TERRESTRE CON TRANSFERENCIA":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, declaracion unica de importacion, formulario de registro vehicular, poliza de importacion, Documento compra y venta (original y fotocopia), Fotocopia de documento de identidad del vendedor y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS DE LA TRANSFERENCIA DEL VEHICULO AUTOMOTOR TERRESTRE":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, Documento de compra y venta (Original y fotocopia), registro a la propiedad del vehiculo automotor terrestre (original y fotocopia) y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    
    "CUALES SON LOS REQUISITOS DE LA TRANSFERENCIA DEL VEHICULO AUTOMOTOR TERRESTRE CON CAMBIO DE RADICATORIA":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, Documento de compra y venta (Original y fotocopia), registro a la propiedad del vehiculo automotor terrestre (original y fotocopia) y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS DEL CAMBIO DE RADICATORIA DEL VEHICULO AUTOMOTOR TERRESTRE.":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, registro a la propiedad del vehiculo automotor terrestre (original y fotocopia) y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS PARA EL CAMBIO DE SERVICIO DEL VEHICULO AUTOMOTOR TERRESTRE CASO 1  PARTICULAR A PUBLICO.":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, registro a la propiedad del vehiculo automotor terrestre (original y fotocopia), Certificado de transporte del servicio publico, fotocopia de licencia o equivalente, y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS PARA EL CAMBIO DE RADICATORIA DEL VEHICULO AUTOMOTOR TERRESTRE POSEEDOR.":{ content:"Los requisitos son  DECLARACION JURADA VIRTUAL  Cambio de Radicatoria Poseedor  registro a la propiedad del vehiculo automotor terrestre (original y fotocopia),fotocopia de cedula de identidad del poseedor, fotocopia del documento que acredite su condicion de poseedor de buena fe (opcional). ",
    },
    "CUALES SON LOS REQUISITOS PARA EL CAMBIO DE SERVICIO DEL VEHICULO AUTOMOTOR TERRESTRE CASO 1  PARTICULAR A PUBLICO.":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, registro a la propiedad del vehiculo automotor terrestre (original y fotocopia), informe tecnico emitido por la policia boliviana, informe de datos tecnicos emitido por el Gobierno Autonomo Municipal de Cochabamba, y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS PARA DUPLICADOS CASO 1: EXTRAVIO DEL CERTIFICADO DE PROPIEDAD DE VEHICULO AUTOMOTOR TERRESTRE (Certificado de Registro de Propiedad del Vehiculo Automotor).":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, Original (Para Verificacion) y Fotocopia de la Factura de Publicacion en un medio de prensa escrita de circulacion nacional, comunicando el extravio del Certificado de Registro de Propiedad del Vehiculo Automotor por tres (3) dias continuos, y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS PARA DUPLICADOS CASO 2: ROBO DEL CERTIFICADO DE PROPIEDAD DE VEHICULO AUTOMOTOR TERRESTRE (Certificado de Registro de Propiedad del Vehiculo Automotor).":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, Original y Fotocopia de la Certificacion de Denuncia por Robo/Hurto del Certificado de Registro de Propiedad del Vehiculo Automotor (Policia Boliviana - FELCC), Original (Para Verificacion) y Fotocopia de la Factura de Publicacion en un medio de prensa escrita de circulacion nacional, comunicando el extravio del Certificado de Registro de Propiedad del Vehiculo Automotor por tres (3) dias continuos, y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS PARA DUPLICADOS CASO 3: DETERIORO DEL CERTIFICADO DE PROPIEDAD DE VEHICULO AUTOMOTOR TERRESTRE (Certificado de Registro de Propiedad del Vehiculo Automotor).":{ content:"Los requisitos son  Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, original del certificado de registro a la propiedad del vehiculo automotor terrestre deteriorado y en caso de ser apoderado presentar el poder de representacion legal. ",
    },
    "CUALES SON LOS REQUISITOS PARA DUPLICADOS CASO 4: DETERIORO DE PLACAS METALICAS / PLAQUETAS.":{ content:"Los requisitos son Original y fotocopia del certificado de registro a la propiedad del vehiculo automotor terrestre, devolucion al Gobierno Autonomo Municipal de Cochabamba de las placas metalicas deterioradas, certificado emitido por la unidad correspondiente de la policia boliviana y en caso de ser apoderado presentar el poder de representacion legal.",
    },
    "CUALES SON LOS REQUISITOS PARA DUPLICADOS CASO 4: DETERIORO DE PLACAS METALICAS / PLAQUETAS.":{ content:"Los requisitos son Original y fotocopia del certificado de registro a la propiedad del vehiculo automotor terrestre, devolucion al Gobierno Autonomo Municipal de Cochabamba de las placas metalicas deterioradas, certificado emitido por la unidad correspondiente de la policia boliviana y en caso de ser apoderado presentar el poder de representacion legal.",
    },
    "CUALES SON LOS REQUISITOS PARA LA REGULARIZACION DE PROPIEDAD DE VEHICULO AUTOMOTOR TERRESTRE.":{ content:"Los requisitos son Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, Derecho de admision 102 (DA  102)  transferencia especial, Original y fotocopia del certificado de registro a la propiedad del vehiculo automotor terrestre, testimonio que acredite el motivo de transferencia, Fotocopia de la factura, y en caso de ser apoderado presentar el poder de representacion legal.",
    },
    "CUALES SON LOS REQUISITOS PARA EL REEMPLAQUE VEHICULO AUTOMOTOR.":{ content:"Los requisitos son Los requisitos son Fotocopia de cedula de identidad vigente a color, foto 3 por 3 fondo rojo, Original y Fotocopia de la Comunicacion al Poseedor (COPO) Documento a Recabarse en Aduana Nacional o Poliza Titularizada del Automotor (PTA), de no Contar Con El Original Presentar La Certificacion de la Denuncia Registrada en la FELCC, Original y Fotocopia del Carnet de Propiedad (Anterior), de no contar con el documento original debera presentar la Certificacion de la Denuncia Registrada en la FELCC, Declaracion Jurada de No Emplacado (a Obtener en Recaudaciones), Original y Fotocopia de Informe De Datos Tecnicos  Relevamiento de las Caracteristicas del Vehiculo emitido por la Seccion correspondiente del Gobierno Autonomo Municipal de Cochabamba (formulario RUA 08), de Corresponder. y en caso de ser apoderado presentar el poder de representacion legal.",
    },
    "CUALES SON LOS REQUISITOS PARA BAJA TRIBUTARIA POR ROBO.":{ content:"Los requisitos son, Original de la certificacion de denuncia de robo emitida por la policia boliviana, original del certificado de propiedad de vehiculo automotor original y copia de cedula de identidad del titular, impuestos al dia, derecho de admision 101 (DA  101), folder municipal, timbre para la emision de la certificacion y en caso de ser apoderado presentar el poder de representacion legal.",
    },
    "CUALES SON LOS REQUISITOS PARA BAJA TRIBUTARIA POR FIN DE VIDA UTIL.":{ content:"Los requisitos son, Original y Copia Legalizada del Documento que Evidencie la condicion de Obsoleto o Fin de Vida Util Emitido por el Gobierno Autonomo Municipal de Cochabamba Devolucion del Certificado de Propiedad del Vehiculo Automotor Terrestre (Certificado de Registro de Propiedad del Vehiculo Automotor), Devolucion de Placas y Plaquetas, No debe ser Otra Radicatoria, Tampoco debe registrar gravamenes y los impuestos al Dia para proceder a la Baja, Original y Copia de la Cedula de Identidad del Sujeto Pasivo, Derecho de Admision 101 (DA  101) Baja de Vehiculo  a ser Depositado en la cuenta Por 37 Bolivianos. En Caso de ser Apoderado Ademas debe adjuntar lo siguiente Original (Para Verificacion) y Fotocopia de Poder de representacion Legal, Fotocopia de Documento de Identidad del Apoderado.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene el plan visado de anteproyecto de urbanizacion",
    },
    "ACLARACIONES PARA EL TRAMITE DE VISADO ANTEPROYECTO DE URBANIZACION": {
        content: "las aclaraciones son las siguientes: 1.    El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto. 2.    En ningun caso el interesado debe cancelar otros montos economicos.3.    La vigencia de la documentacion presentada en copia legalizada debera ser maximo de un ano a partir de la fecha de legalizacion. 4.    En caso que requiera opinion tecnica adicional, el tramite podra derivarse a la Direccion de Urbanismo y Servicios Municipales. 5.    El visado de planos del Anteproyecto tendra vigencia de seis meses a partir de su emision. 6.    El visado de planos del Anteproyecto se constituye como requisito para la obtencion de Licencia Ambiental ante la Gobernacion. 7.    Cuando el proyecto se encuentre en un area con planos sectoriales actuales y no modifique la estructura vial y el uso de suelo, no es necesario solicitar visado del anteproyecto. 8.    Cuando el anteproyecto comprenda mas de una propiedad, se debe presentar los diferentes titulos de propiedad.",
    },
    "QUE ES EL TRAMITE DE APROBACION DEL PLANO DE URBANIZACION": {
        content: "Es un tramite a realizar cuando se requiere aprobar un proyecto de terreno mayor a 1300 metros cuadrados que ha cumplido con el visado de anteproyecto de acuerdo a normativas usadas",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE DE APROBACION DEL PLANO DE URBANIZACION ": {
        content: "Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE APROBACION DEL PLANO DE URBANIZACION": {
        content: "Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS REQUISITOS DE LA APROBACION DEL PLANO DE URBANIZACION": {
        content: "Los requisitos son los siguientes: REQUISITOS: 1.    Derecho de admision 111 (DA 111). 2.    Folder municipal 3.    Memorial dirigido al Sub Alcalde solicitando el tramite requerido con la firma del o los propietarios, copropietarios o apoderado.4.    Titulo de propiedad registrado en Derechos Reales a nombre del actual propietario, fotocopia legalizada por la Sub Alcaldia a la que corresponde el predio (En caso de estar matriculado, acompanar Folio Real). 5.    Impuestos al dia Proforma del sistema RUAT que evidencie el no adeudo tributario. 6.    Plano del proyecto de urbanizacion, cinco ejemplares en papel bond y 1 copia digital en formato CAD), firmado y sellado por el Arquitecto. 7.    Plano de anteproyecto visado por la Sub Alcaldia, fotocopia legalizada.8.    Licencia ambiental. 9.    Fotocopia del carnet de identidad vigente del o los propietarios. 10.  Plano de instalaciones sanitarias visado por SEMAPA y/o certificacion de la institucion proveedora del servicio. 11.  Planos de instalaciones electricas visados por ELFEC.",
    },
    "CUALES SON LOS COSTOS DE LA APROBACION DEL PLANO DE URBANIZACION": {
        content: "Los costos son los siguientes: COSTOS: 1.    Para el derecho de admision (DA 111) del tramite el costo es de 27 bolivianos. 2.    Para el folder municipal 5 bolivianos. 3.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos. 4.    Por cada fotocopia un timbre el cual el costo es de 10 bolivianos. 5.    Para la tasa de aprobacion de la urbanizacion el costo es de 0.20 bolivianos por metro cuadrado. 6.    Para la tasa de fijacion de rasante por metro lineal del sub distrito 1 al 16 el costo es de 1 boliviano por metro lineal. 7.    Para los sub distritos 17 al 32 el costo es de 1.5 bolivianos por metro lineal.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene proyecto de urbanizacion aprobado con resolucion emitida por la Sub alcaldia.",
    },
    "ACLARACIONES PARA EL TRAMITE DE VISADO ANTEPROYECTO DE URBANIZACION": {
        content: "las aclaraciones son las siguientes:1.    El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto.2.    En ningun caso el interesado debe cancelar otros montos economicos.3.    No es requisito la presentacion de planos de infraestructura, ni licencia ambiental cuando la urbanizacion es igual o menor a nueve lotes.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DONDE PUEDE ACLARAR DUDAS, PRESENTAR QUEJAS Y/O SUGERENCIAS": {
        content: "Unidad de urbanismo y tramites administrativos de la sub alcaldia.",
    },

    "QUE ES EL TRAMITE DE APROBACION DEL PLANO DE REGULARIZACION DE LOTE": {
        content: "Tramite a realizar cuando se requiere regularizar un lote de terreno ubicado en area urbanizable hasta 1300 metros cuadrados que no cuenta con plano aprobado o que contando con ello, existe diferencia entre la superficie y dimensiones del plano aprobado.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE DE APROBACION DEL PLANO DE REGULARIZACION DE LOTE": {
        content: "Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS REQUISITOS DE LA APROBACION DEL PLANO DE REGULARIZACION DE LOTE": {
        content: "Los requisitos son los siguientes: REQUISITOS: 1.    Valorados municipales, Derecho de admision 111 (DA 111) . 2.    Folder municipal 3.    Memorial dirigido al Sub Alcalde solicitando el tramite requerido con la firma del o los propietarios, copropietarios o apoderado. 4.    titulos de propiedad registrado en Derechos Reales a nombre del actual propietario, fotocopia legalizada por la Sub Alcaldia a la que corresponde el predio (En caso de estar matriculado, acompanar Folio Real). 5.    Impuestos al dia Proforma del sistema RUAT que evidencie el no adeudo tributario. 6.    Plano de regularizacion de lote con numero de registro proporcionado por el Colegio Profesional correspondiente, firmado y sellado por el Arquitecto con registro profesional, cinco ejemplares en papel bond. 7.    Fotocopia del Carnet de identidad vigente del o los propietarios. 8.    Licencia ambiental. 9.    Fotocopia Carnet de identidad vigente del o los propietarios. 10.  Plano de Lote o Urbanizacion aprobado fotocopia legalizada y/o Registro Catastral y/o Plano de construccion (presentar en caso de existir para no pago de sesiones). 11.  Carimbo, manzano de la Planimetria, superficie de ARCO y Resolucion de aprobacion de ARCO (Solo para Distrito 9). 12.  Tradicion de la minuta, original o fotocopia legalizada (Solo para Distrito 9).13.  Declaratoria de herederos (en caso necesario) y/o Poder suficiente conferido por el o los propietarios del inmueble (Solo para Distrito 9).",
    },
    "CUALES SON LOS COSTOS DE LA APROBACION DEL PLANO DE REGULARIZACION DE LOTE": {
        content: "Los costos son los siguientes: COSTOS: 1.    Para el derecho de admision 111 (DA 111) del tramite el costo es de 27 bolivianos. 2.    Para el folder municipal 5 bolivianos. 3.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos. 4.    Para los planos del lote o urbanizacion aprobada por cada fotocopia un timbre el cual el costo es de 10 bolivianos. 5.    Para la tradicion de la minuta por cada fotocopia un timbre el cual el costo es de 10 bolivianos 6.    Para la tasa por regularizacion de lote el costo es de 0.20 bolivianos por metro cuadrado. 7.    Para la tasa de fijacion de rasante por metro lineal del sub distrito 1 al 16 el costo es de 1 boliviano por metro lineal. 8.    Para los sub distritos 17 al 32 el costo es de 1.5 bolivianos por metro lineal.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene Plano de regularizacion de lote aprobado con resolucion emitida por la Sub Alcaldia.",
    },
    "ACLARACIONES PARA EL TRAMITE DE APROBACION DEL PLANO DE REGULARIZACION DE LOTE": {
        content: "las aclaraciones son las siguientes: 1.    El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto. 2.    En ningun caso el interesado debe cancelar otros montos economicos. 3.    No corresponde el cobro de cesiones segun Ordenanza Municipal numero 3285/04, cuando la superficie afectada es mayor a la superficie de cesion obligatoria, cuando se presenta plano de construccion o lote aprobado anteriormente o registro catastral. 4.    Se podra realizar el tramite de regularizacion, anexion y subdivision indistintamente cumpliendo los requisitos exigidos para cada caso.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DONDE PUEDE ACLARAR DUDAS, PRESENTAR QUEJAS Y/O SUGERENCIAS": {
        content: "Unidad de urbanismo y tramites administrativos de la sub alcaldia.",
    },
    "QUE ES EL TRAMITE DE APROBACION DEL PLANO DE ANEXION DE LOTE": {
        content: "Es un Tramite realizado para anexar lotes contiguos.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE DE APROBACION DEL PLANO DE ANEXION DE LOTE": {
        content: "Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS REQUISITOS DE LA APROBACION DEL PLANO DE ANEXION DE LOTE": {
        content: "Los requisitos son los siguientes: REQUISITOS: 1.    Derecho de admision 111 (DA 111) . 2.    Folder municipal 3.    Memorial dirigido al Sub Alcalde solicitando el tramite requerido con la firma del o los propietarios, copropietarios o apoderado. 4.    Titulos de propiedad registrado en Derechos Reales a nombre del actual propietario, fotocopia legalizada por la Sub Alcaldia a la que corresponde el predio (En caso de estar matriculado, acompanar Folio Real). 5.    Impuestos al dia Proforma del sistema RUAT que evidencie el no adeudo tributario. 6.    Plano del proyecto de anexion de lote, cinco ejemplares en papel bond y 1 copia digital en formato CAD), firmado y sellado por el Arquitecto. 7.    Fotocopia del Carnet de identidad vigente del o los propietarios. 8.    Registro Catastral o Certificacion de Registro Catastral. 9.    Plano de lotes aprobados, fotocopia legalizada.",
    },
    "CUALES SON LOS COSTOS DE LA APROBACION DEL PLANO DE ANEXION DE LOTE": {
        content: "Los costos son los siguientes: COSTOS: 1.    Para el derecho de admision 111 (DA 111) del tramite el costo es de 27 bolivianos. 2.    Para el folder municipal 5 bolivianos. 3.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos.4.    Para los planos de lote aprobados por cada fotocopia, un timbre el cual el costo es de 10 bolivianos.5.    Para la tasa por anexion de lote el costo es de 0.25 bolivianos por metro cuadrado. 6.    Para la tasa de fijacion de rasante por metro lineal del sub distrito 1 al 16 el costo es de 1 bolivianos por metro lineal. 7.    Para los sub distritos 17 al 32 el costo es de 1.5 bolivianos por metro lineal.",
    },
    "CUALES SON LOS COSTOS DE LA APROBACION DEL PLANO DE SUBDIVISION DE LOTE": {
        content: "Los costos son los siguientes: COSTOS: 1.    Para el derecho de admision 111 (DA 111) del tramite el costo es de 27 bolivianos.2.    Para el folder municipal 5 bolivianos.3.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos.4.    Para los planos de lote aprobados por cada fotocopia, un timbre el cual el costo es de 10 bolivianos.5.    Para la tasa por subdivision de lote el costo es de 0.20 bolivianos por metro cuadrado. 6.    Para la tasa de fijacion de rasante por metro lineal del sub distrito 1 al 16 el costo es de 1 boliviano por metro lineal.7.    Para los sub distritos 17 al 32 el costo es de 1.5 bolivianos por metro lineal.",
    },
    "DURACION DEL TRAMITE": {
        content: "El tramite llega a durar 20 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
     
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Plano de subdivision de lote aprobado mediante Resolucion emitida por la Sub Alcaldia.",
    },
    "ACLARACIONES PARA EL TRAMITE DE APROBACION DEL PLANO DE ANEXION DE LOTE": {
        content: "las aclaraciones son las siguientes:4.    El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto. 5.    En ningun caso el interesado debe cancelar otros montos economicos. 6.    Se podra realizar el tramite de regularizacion, anexion y subdivision indistintamente cumpliendo los requisitos exigidos para cada caso.",
    },
    "QUE ES EL TRAMITE CERTIFICACION DE PLANO DE LOTE": {
        content: "Es un Tramite a realizar cuando se tiene un plano de urbanizacion, subdivision, anexion o regularizacion aprobado y se requiere una certificacion de plano individual a nombre del actual propietario.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE DE CERTIFICACION DE LOTE": {
        content: "La Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS REQUISITOS DE LA CERTIFICACION DE PLANO DE LOTE": {
        content: "Los requisitos son los siguientes: REQUISITOS: 1.    Derecho de admision 06 (DA 06) de tramite. 2.    Folder municipal 3.    Solicitud verbal o nota simple. 4.    titulos de propiedad registrado en Derechos Reales a nombre del actual propietario, fotocopia legalizada por la Sub Alcaldia a la que corresponde el predio (En caso de estar matriculado, acompanar Folio Real). 5.    Impuestos al dia Proforma del sistema RUAT que evidencie el no adeudo tributario. 6.    Plano del proyecto de certificacion de lote, cinco ejemplares en papel bond y 1 copia digital en formato CAD), firmado y sellado por el Arquitecto. 7.    Plano de lotes aprobado, fotocopia legalizada 8.    Certificacion.",
    },
    "CUALES SON LOS COSTOS DE LA CERTIFICACION DE PLANO DE LOTE": {
        content: "Los costos son los siguientes: COSTOS: 1.    Para el derecho de admision 06 (DA 06)del tramite el costo es de 27 bolivianos. 2.    Para el folder municipal 5 bolivianos. 3.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos. 4.    Para los planos de lote aprobados por cada fotocopia un timbre el cual el costo es de 10 bolivianos. 5.    Para la certificacion 30 bolivianos.",
    },
    "DURACION DEL TRAMITE": {
        content: "La duracion del tramite llega a ser de 5 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene el Plano de lote certificado a nombre del actual propietario.",
    }, 
    "QUE ES EL TRAMITE CERTIFICACION DE RESOLUCIONES COMPLEMENTARIAS": {
        content: "Es un Tramite a realizar cuando se tiene algun dato que esta errado dentro la Resolucion Administrativa Municipal, y debe modificarse, en ese caso se emite una Resolucion Complementaria.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE DE CERTIFICACION DE RESOLUCIONES COMPLEMENTARIAS": {
        content: "La Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS REQUISITOS DE LAS RESOLUCIONES COMPLEMENTARIAS": {
        content: "Los requisitos son los siguientes: REQUISITOS:1.    Derecho de admision 07 (DA 07). 2.    Folder municipal 3.    Memorial dirigido al sub alcalde solicitando Resolucion complementaria.  4.    titulos de propiedad registrado en Derechos Reales a nombre del actual propietario, fotocopia legalizada por la Sub Alcaldia a la que corresponde el predio (En caso de estar matriculado, acompanar Folio Real).5.    Impuestos pagados de las ultimas 5 gestiones, fotocopia simple del comprobante de pago de impuestos o proforma del sistema RUAT que evidencie el no adeudo tributario. 6.    Resolucion municipal, Fotocopia legalizada. 7.    Fotocopia del carnet de identidad del o los propietarios. 8.    Inspeccion (de ser necesario).9.    Certificacion.10.  Certificacion (segun Ordenanza Municipal Numero 2636, valido solo para el Distrito 9).",
    },
    "CUALES SON LOS COSTOS DE LAS RESOLUCIONES COMPLEMENTARIAS": {
        content: "Los costos son los siguientes: COSTOS: 1.    Para el derecho de admision 07 (DA 07) del tramite el costo es de 27 bolivianos. 2.    Para el folder municipal 5 bolivianos. 3.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos. 4.    Para los planos de lote aprobados por cada fotocopia un timbre el cual el costo es de 10 bolivianos. 5.    Para la inspeccion 20 bolivianos. 6.    Para la certificacion 30 bolivianos. 7.    Para la Certificacion (segun Ordenanza Municipal Numero 2636, valido solo para el Distrito 9).",
    },
    "DURACION DEL TRAMITE": {
        content: "La duracion del tramite llega a ser de 10 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
     
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene la certificacion de datos tecnicos de funcion al requerimiento.",
    },
    "ACLARACIONES PARA EL TRAMITE DE RESOLUCIONES COMPLEMENTARIAS": {
        content: "las aclaraciones son las siguientes: 1.    El seguimiento del tramite tambien puede ser realizado por una tercera persona, siempre y cuando esta se identifique con su Cedula de Identidad. 2.    En ningun caso el interesado debe cancelar otros montos economicos que no esten indicados en la presente guia de tramite. 3.    En caso de requerir certificacion de perfil de via, no se requiere presentar Plano de Lote aprobado, Titulo de Propiedad, ni comprobantes de pago de impuestos.",
    },
    "QUE ES EL TRAMITE DE CERTIFICACIONES VARIOS": {
        content: "Es un Tramite a realizar cuando se desee obtener una certificacion de datos tecnicos, legales y/o administrativos en aplicacion de la Normativa Urbana",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE DE CERTIFICACIONES VARIOS": {
        content: "La Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS REQUISITOS DEL TRAMITE CERTIFICACIONES VARIOS": {
        content: "Los requisitos son los siguientes: REQUISITOS: 1.   Derecho de admision 07 (DA 07) de tramite 2.    Folder municipal 3.    Memorial dirigido al sub alcalde solicitando la certificacion.4.    titulos de propiedad registrado en Derechos Reales a nombre del actual propietario, fotocopia legalizada por la Sub Alcaldia a la que corresponde el predio (En caso de estar matriculado, acompanar Folio Real). 5.    Proforma del sistema RUAT que evidencie el no adeudo tributario. 6.    Plano de lote aprobado, fotocopia legalizada. 7.    Fotocopia del Carnet de identidad del solicitante. 8.    Inspeccion (de ser necesario). 9.    Certificacion. 10.  Certificacion (segun Ordenanza Municipal Numero 2636, valido solo para el Distrito 9).",
    },
    "CUALES SON LOS COSTOS DEL TRAMITE CERTIFICACIONES VARIOS": {
        content: "Los costos son los siguientes: COSTOS: 1.    Para el derecho de admision 07 (DA 07) del tramite el costo es de 25 bolivianos. 2.    Para el folder municipal 5 bolivianos. 3.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos. 4.    Para los planos de lote aprobados por cada fotocopia un timbre el cual el costo es de 10 bolivianos.5.    Para la inspeccion 20 bolivianos. 6.    Para la certificacion 30 bolivianos. 7.    Certificacion (segun Ordenanza Municipal Numero 2636, valido solo para el Distrito 9).",
    },
    "DURACION DEL TRAMITE": {
        content: "La duracion del tramite llega a ser de 15 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene la certificacion en funcion al requerimiento.",
    },
    "ACLARACIONES PARA EL TRAMITE DE CERTIFICACIONES VARIOS": {
        content: "las aclaraciones son las siguientes: 1.    El seguimiento del tramite tambien puede ser realizado por una tercera persona, siempre y cuando esta se identifique con su Cedula de Identidad. 2.    En ningun caso el interesado debe cancelar otros montos economicos que no esten indicados en la presente guia de tramite.",
    }, 
    "QUE ES EL TRAMITE DE CERTIFICACION DE USO DE SUELO": {
        content: "Es un Tramite a realizar cuando se desee obtener una certificacion de cualidades fisicas urbanas de un territorio o sitio urbano definido para un determinado uso.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE DE CERTIFICACION DE USO DE SUELO": {
        content: "La Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS REQUISITOS DEL TRAMITE CERTIFICACION DE USO DE SUELO": {
        content: "Los requisitos son los siguientes: REQUISITOS: 1.    Derecho de admision 09 (DA 09) . 2.    Folder municipal 3.    Memorial dirigido al sub alcalde solicitando el tramite. 4.    titulos de propiedad registrado en Derechos Reales a nombre del actual propietario, fotocopia legalizada por la Sub Alcaldia a la que corresponde el predio (En caso de estar matriculado, acompanar Folio Real). 5.    Impuesto al dia Proforma del sistema RUAT que evidencie el no adeudo tributario. 6.    Plano de lote aprobado, fotocopia legalizada.7.    Plano de Lote geo referenciado preferentemente por el Instituto Geografico Militar (solo en caso de area Rural). 8.    Fotocopia Carnet de identidad vigente del o los propietarios.9.    Certificacion. 10.  Certificacion (segun Ordenanza Municipal Numero 2636, valido solo para el Distrito 9).11.  Inspeccion",
    },
    "CUALES SON LOS COSTOS DEL TRAMITE CERTIFICACION DE USO DE SUELO": {
        content: "Los costos son los siguientes: COSTOS: 1.    Para el derecho de admision 09 (DA 09) del tramite el costo es de 25 bolivianos. 2.    Para el folder municipal 5 bolivianos. 3.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos. 4.    Para los planos de lote aprobados por cada fotocopia un timbre el cual el costo es de 10 bolivianos. 5.    Para la certificacion 30 bolivianos. 6.    Certificacion (segun Ordenanza Municipal Numero 2636, valido solo para el Distrito 9). 7.    Para la inspeccion 20 bolivianos.",
    },
    "DURACION DEL TRAMITE": {
        content: "La duracion del tramite llega a ser de 15 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene la certificacion de uso de suelo.",
    },
    "ACLARACIONES PARA EL TRAMITE DE CERTIFICACION DE USO DE SUELO": {
        content: "las aclaraciones son las siguientes: 1.    El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto. 2.    En ningun caso el interesado debe cancelar otros montos economicos que no esten indicados en la presente guia de tramite.",
    },
    "QUE ES EL TRAMITE DE FIJACION DE LINEA A NIVEL": {
        content: "Es un Tramite a realizar cuando se requiere establecer la linea y nivel para la construccion del cordon y acera de un predio que tenga o no plano aprobado.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE DE FIJACION DE LINEA A NIVEL": {
        content: "La Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS REQUISITOS DEL TRAMITE FIJACION DE LINEA A NIVEL": {
        content: "Los requisitos son los siguientes: REQUISITOS: 1.    Memorial dirigido al Sub Alcalde solicitando el tramite requerido con la firma del o los propietarios, copropietarios o apoderado. 2.    Impuestos al dia (Proforma del sistema RUAT que evidencie el no adeudo tributario). 3.    Plano de Lote Aprobado, fotocopia legalizada (si tiene). 4.    Titulo de propiedad registrado en Derechos Reales a nombre del actual propietario, fotocopia legalizada por la Sub Alcaldia a la que corresponde el predio (En caso de estar matriculado, acompanar Folio Real) (Si tiene). 5.    Fotocopia del Carnet de identidad vigente del o los propietarios. 6.    Derecho de admision 10 (DA 10) del tramite. 7.    Folder municipal. 8.  Inspeccion topografica.",
    },
    "CUALES SON LOS COSTOS DEL TRAMITE FIJACION DE LINEA A NIVEL": {
        content: "Los costos son los siguientes: COSTOS: 1.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos. 2.    Para los planos de lote aprobados por cada fotocopia un timbre el cual el costo es de 10 bolivianos. 3.    Para el derecho de admision 10 (DA 10) del tramite el costo es de 28 bolivianos. 4.    Para el folder municipal 5 bolivianos. 5.    Para las Tasas de fijacion de rasante por metro lineal: Sub Distritos 1 al 16 el costo es de 1 boliviano por metro lineal. 6.    Para los sub distritos 17 al 32 el costo es de 1.5 bolivianos por metro lineal. 7.    Para la inspeccion topografica el costo es de 20 bolivianos",
    },
    "DURACION DEL TRAMITE": {
        content: "La duracion del tramite llega a ser de 15 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene el Informe Topografico de Linea y Nivel.",
    },
    "ACLARACIONES PARA EL TRAMITE FIJACION DE LINEA A NIVEL": {
        content: "las aclaraciones son las siguientes: El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto. En ningun caso el interesado debe cancelar otros montos economicos que no esten indicados en la presente guia de tramite.",
    },
    "QUE ES EL TRAMITE DE FIJACION DE RASANTE, VERIFICACION DE MEDIDAS Y SUPERFICIE DE LOTE": {
        content: "Es un Tramite a realizar cuando:· No se cuenta con plano aprobado y se requiere establecer la rasante municipal y se desconoce la ubicacion de las estacas respecto a la via o vias colindantes; o que teniendo plano aprobado se ha modificado la rasante.·         Se requiere verificar una superficie de lote con o sin plano aprobado para conocer con exactitud su superficie, dimensiones de sus limites y posibles afectaciones en relacion con la via o vias colindantes.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE DE FIJACION DE RASANTE, VERIFICACION DE MEDIDAS Y SUPERFICIE DE LOTE": {
        content: "La Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "Se puede realizar en la Sub Alcaldia a la que corresponde el predio.",
    },
    "CUALES SON LOS REQUISITOS DE FIJACION DE RASANTE, VERIFICACION DE MEDIDAS Y SUPERFICIE DE LOTE": {
        content: "Los requisitos son los siguientes: REQUISITOS:1.    Memorial dirigido al Sub Alcalde solicitando el tramite requerido con la firma del o los propietarios, copropietarios o apoderado.2.    Impuestos al dia (Proforma del sistema RUAT que evidencie el no adeudo tributario).3.    Plano de Lote Aprobado, fotocopia legalizada (si tiene).4.    Titulo de propiedad registrado en Derechos Reales a nombre del actual propietario, fotocopia legalizada por la Sub Alcaldia a la que corresponde el predio (En caso de estar matriculado, acompanar Folio Real).5.    Plano demostrativo de la ubicacion del lote en detalle (en caso de no contar con Plano de Lote aprobado).6.    Fotocopia del carnet de identidad vigente del o los propietarios.7.    Derecho de admision 11 (DA 11) de tramite.8.    Folder municipal.9.    Formulario tecnico Numero 012.10.  Certificacion.11.  Inspeccion.",
    },
    "CUALES SON LOS COSTOS DE FIJACION DE RASANTE, VERIFICACION DE MEDIDAS Y SUPERFICIE DE LOTE": {
        content: "Los costos son los siguientes: COSTOS:1.    Por cada testimonio un timbre el cual el costo es de 10 bolivianos.2.    Para los planos de lote aprobados por cada fotocopia, un timbre el cual el costo es de 10 bolivianos.3.    Para el derecho de admision 11 (DA 11) del tramite el costo es de 28 bolivianos.4.    Para el folder municipal 5 bolivianos.5.    Para el formulario tecnico N 012 el costo es de 12 bolivianos.6.    Para las Tasas de fijacion de rasante por metro lineal: Sub Distritos 1 al 16 el costo es de 1 boliviano por metro lineal.7.    Para los sub distritos 17 al 32 el costo es de 1.5 bolivianos por metro lineal.8.    Para la tasa por verificacion de superficie en lote el costo es de 0.50 bolivianos por metro cuadrado.9.    Para la tasa por verificacion de superficie metro cuadrado en inmueble edificado el costo es de 0.80 bolivianos por metro cuadrado.10.  Para la certificacion el costo es de 30 bolivianos.11.  Para la inspeccion el costo es de 20 bolivianos.",
    },
    "DURACION DEL TRAMITE": {
        content: "La duracion del tramite llega a ser de 20 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene lo siguiente:·         Formulario Tecnico N 012 llenado y firmado, en caso de fijacion de rasante.·         Informe Tecnico y Plano demostrativo, en caso de verificacion de medidas y superficies de lote.",
    },
    "ACLARACIONES PARA EL TRAMITE DE FIJACION DE RASANTE, VERIFICACION DE MEDIDAS Y SUPERFICIE DE LOTE": {
        content: "las aclaraciones son las siguientes: 1.    El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto.2.    En ningun caso el interesado debe cancelar otros montos economicos que no esten indicados en la presente guia de tramite.",
    },
    "QUE ES EL TRAMITE VISADO DE ANTEPROYECTO DE CONSTRUCCION DE EDIFICIO O VIVIENDA MULTIFAMILIAR": {
        content: "Es un Tramite a realizar cuando se tiene un predio ubicado en area urbana con plano de lote aprobado y se desea construir una edificacion mayor a tres plantas de uno o mas bloques.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE VISADO DE ANTEPROYECTO DE CONSTRUCCION DE EDIFICIO O VIVIENDAS MULTIFAMILIAR": {
        content: "La Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "Sub Alcaldia a la que corresponde el predio. Si el predio se encuentra en el Area de preservacion Historica (centro Historico) los tramites deberan ser presentados en las Oficinas del Departamento de Patrimonio Territorial – Direccion de Planeamiento (Pasaje Sucre).",
    },
    "CUALES SON LOS REQUISITOS DE VISADO DE ANTEPROYECTO DE CONSTRUCCION DE EDIFICIO O VIVIENDA MULTIFAMILIAR": {
        content: "Los requisitos son los siguientes:REQUISITOS:1.    Visado del plano arquitectonico.2.    Derecho de admision 12 (DA 12 )del tramite.3.    Formulario de Solicitud de Tramite, firmado por el propietario segun Certificado o Registro Catastral y/o firmado por el apoderado segun Poder o Carta Notariada.4.    Certificado Catastral o Registro Catastral Computarizado a nombre del actual propietario emitido por la Direccion de Informacion Geografica y Catastro.5.    Planos arquitectonicos de Anteproyecto (tres ejemplares y en medio magnetico formato PDF), firmado y sellado por el Arquitecto con registro profesional correspondiente.6.    Plano de Lote aprobado, fotocopia legalizada.7.    Fotocopia del carnet de identidad vigente del o los propietarios.",
    },
    "CUALES SON LOS COSTOS DE VISADO DE ANTEPROYECTO DE CONSTRUCCION DE EDIFICIO O VIVIENDA MULTIFAMILIAR": {
        content: "Los costos son los siguientes:COSTOS:1.    Para el visado de plano arquitectonico el costo es de 30 bolivianos2.    El derecho de admision 12 (DA 12) de tramite tiene un costo de 5 bolivianos.3.    Para los planos de lote aprobado un timbre de 10 bolivianos por cada fotocopia.",
    },
    "DURACION DEL TRAMITE": {
        content: "La duracion del tramite llega a ser de 20 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene el Plano de Anteproyecto de Construccion Visado por la Sub Alcaldia.",
    },
    "ACLARACIONES PARA EL TRAMITE DE VISADO DE ANTEPROYECTO DE CONSTRUCCION DE EDIFICIO O VIVIENDA MULTIFAMILIAR": {
        content: "las aclaraciones son las siguientes:1.    El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto.2.    En ningun caso el interesado debe cancelar otros montos economicos que no esten indicados en la presente guia de tramite.3.    En caso que requiera opinion tecnica adicional, el tramite podra derivarse a la DNUR (Direccion de Planeamiento).4.    El visado de plano del Anteproyecto tendra vigencia de seis meses a partir de su emision.5.    El visado de plano del Anteproyecto se constituye como requisito para la obtencion de Licencia Ambiental ante la Gobernacion.",
    },
    "QUE ES EL TRAMITE APROBACION DEL PLANO DE CONSTRUCCION DE VIVIENDA UNIFAMILIAR O MULTIFAMILIAR": {
        content: "Es un Tramite a realizar para la aprobacion de un proyecto de construccion o edificacion de vivienda unifamiliar o mas unidades de vivienda en un lote hasta tres plantas.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE APROBACION DEL PLANO DE CONSTRUCCION DE VIVIENDA UNIFAMILIAR O MULTIFAMILIAR": {
        content: "La Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "Sub Alcaldia a la que corresponde el predio. Si el predio se encuentra en el Area de preservacion Historica (centro Historico) los tramites deberan ser presentados en las Oficinas del Departamento de Patrimonio Territorial – Direccion de Planeamiento (Pasaje Sucre).",
    },
    "CUALES SON LOS REQUISITOS DE APROBACION DEL PLANO DE CONSTRUCCION DE VIVIENDA UNIFAMILIAR O MULTIFAMILIAR": {
        content: "Los requisitos son los siguientes:REQUISITOS:1.    Derecho de admision 13 (DA 13) de tramite.2.    Folder Municipal.3.    Formulario de Solicitud de Tramite, firmado por el propietario segun Certificado o Registro Catastral y/o firmado por el apoderado segun Carta o Poder Notariado.4.    Plano de lote aprobado, fotocopia legalizada.5.    Plano del proyecto de construccion, cinco ejemplares en papel bond y 1 copia digital en formato CAD), firmado y sellado por el Arquitecto.6.    Fotocopia Carnet de identidad vigente del o los propietarios.7.    Certificado Catastral o Registro Catastral Computarizado a nombre del actual propietario emitido por la Direccion de Informacion Geografica y Catastro.",
    },
    "CUALES SON LOS COSTOS DE APROBACION DEL PLANO DE CONSTRUCCION DE VIVIENDA UNIFAMILIAR O MULTIFAMILIAR": {
        content: "Los costos son los siguientes:COSTOS:1.    El derecho de admision 13 (DA 13) de tramite tiene un costo de 36 bolivianos.2.    Para el folder municipal tiene un costo de 5 bolivianos3.    Para los planos de lote aprobado un timbre de 10 bolivianos por cada fotocopia.4.    Para la tasa de aprobacion residencial el costo es de 1.00 bolivianos por metro cuadrado.5.    Para la tasa de aprobacion no residencial (comercial) el costo es de 2.00 bolivianos por metro cuadrado.6.    Para las Tasas de fijacion de rasante por metro lineal: Sub Distritos 1 al 16 el costo es de 1 Boliviano por metro lineal.7.    Para subdistritos 17 al 32 el costo es de 1.5 bolivianos por metro lineal",
    },
    "DURACION DEL TRAMITE": {
        content: "La duracion del tramite llega a ser de 20 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
     
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene el Plano de Anteproyecto de Construccion Visado por la Sub Alcaldia.",
    },
    "ACLARACIONES PARA EL TRAMITE DE APROBACION DEL PLANO DE CONSTRUCCION DE VIVIENDA UNIFAMILIAR O MULTIFAMILIAR": {
        content: "las aclaraciones son las siguientes:1.    El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto.2.    En ningun caso el interesado debe cancelar otros montos economicos que no esten indicados en la presente guia de tramite.3.    En caso que requiera opinion tecnica adicional, el tramite podra derivarse a la DNUR (Direccion de Planeamiento).4.    El visado de plano del Anteproyecto tendra vigencia de seis meses a partir de su emision.5.    El visado de plano del Anteproyecto se constituye como requisito para la obtencion de Licencia Ambiental ante la Gobernacion.",
    },
    "QUE ES EL TRAMITE APROBACION DEL PLANO DE REMODELACION Y AMPLIACION DE VIVIENDA": {
        content: "Es un Tramite a realizar cuando se tiene plano de construccion aprobado y se desea realizar modificaciones funcionales y/o de volumetria o se requiere realizar una ampliacion a la edificacion, siempre y cuando la altura total construida (incluyendo la ampliacion) sea hasta tres plantas.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE APROBACION DEL PLANO DE REMODELACION DE AMPLIACION DE VIVIENDA": {
        content: "La Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "En la Sub Alcaldia a la que corresponde el predio. Si el predio se encuentra en el Area de preservacion Historica (centro Historico) los tramites deberan ser presentados en las Oficinas del Departamento de Patrimonio Territorial – Direccion de Planeamiento (Pasaje Sucre).",
    },
    "CUALES SON LOS REQUISITOS DEL TRAMITE APROBACION DEL PLANO DE REMODELACION Y AMPLIACION DE VIVIENDA": {
        content: "Los requisitos son los siguientes:REQUISITOS:1.    Derecho de admision 14 (DA 14) de tramite.2.    Folder Municipal.3.    Fotocopia Carnet de identidad vigente del o los propietarios.4.    Formulario de Solicitud de Tramite, firmado por el propietario segun Certificado o Registro Catastral y/o firmado por el apoderado segun Poder o Carta Notariada.5.    Proforma del sistema RUAT que evidencie el no adeudo tributario.6.    Plano de lote aprobado, fotocopia legalizada.7.    Plano del proyecto de ampliacion o remodelacion, cinco ejemplares en papel bond y 1 copia digital en formato CAD), firmado y sellado por el Arquitecto.8.    Certificado Catastral o Registro Catastral Computarizado a nombre del actual propietario emitido por la Direccion de Informacion Geografica y Catastro.",
    },
    "CUALES SON LOS COSTOS DEL TRAMITE APROBACION DEL PLANO DE REMODELACION Y AMPLIACION DE VIVIENDA": {
        content: "Los costos son los siguientes:COSTOS:1.    El derecho de admision 14 (DA 14) de tramite tiene un costo de 26 bolivianos.2.    Para el folder municipal tiene un costo de 5 bolivianos3.    Para los planos de lote aprobado un timbre de 10 bolivianos por cada fotocopia.4.    La tasa de aprobacion de remodelacion sin cambiar funcion tiene un costo de 0.25 bolivianos por metro cuadrado.5.    La tasa de aprobacion de remodelacion cambiando funcion tiene un costo de 0.50 bolivianos por metro cuadrado.6.    La tasa de aprobacion de ampliacion area residencial tiene un costo de 1.00 bolivianos por metro cuadrado.7.    La tasa de aprobacion de ampliacion area no residencial tiene un costo de 2.00 bolivianos por metro cuadrado.",
    },
    "DURACION DEL TRAMITE": {
        content: "La duracion del tramite llega a ser de 20 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
    "ACLARACIONES PARA EL TRAMITE APROBACION DEL PLANO DE REMODELACION Y AMPLIACION DE VIVIENDA": {
        content: "las aclaraciones son las siguientes: 1.    El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto.2.    En ningun caso el interesado debe cancelar otros montos economicos que no esten indicados en la presente guia de tramite.3.    En caso de inicio de obras sin el respectivo plano aprobado y autorizacion de inicio de obra, se hara pasible a sanciones de acuerdo Reglamento de Sanciones por Contravenciones a Disposiciones Municipales.4.    La aprobacion de los planos de construccion y autorizacion de inicio de obra tendra una vigencia de un ano luego de ser otorgado. Transcurrido el plazo debera solicitar su revalidacion (costo de 35 bolivianos).5.    La Municipalidad, en cualquier momento, podra realizar inspecciones aleatorias (sin aviso) a la construccion.6.    Culminada la obra, el propietario debe comunicar la finalizacion en la Comuna / Sub Alcaldia correspondiente a su distrito.7.    Los danos que se ocasionen a los vecinos colindantes por la demolicion, excavaciones y durante todo el proceso de construccion, son de absoluta responsabilidad del ejecutor y/o propietario de la obra, debiendo en consecuencia subsanar los danos ocasionados. Si el dano persiste, la obra se paralizara en su ejecucion previa evaluacion e informe de la instancia municipal correspondiente.8.    Las ampliaciones y remodelaciones se sujetan a normativa en vigencia, vale decir, siempre y cuando respeten retiros o alturas.9.    En caso de no contar con Plano de Construccion aprobado, el interesado debera realizar el tramite de Regularizacion de Plano de Construccion.",
    },
    "QUE ES EL TRAMITE APROBACION DEL PLANO DE CONSTRUCCION DE EDIFICIO": {
        content: "Es un Tramite a realizar para la aprobacion de un proyecto de construccion de una edificacion superior a tres plantas, cuando usted posee un predio ubicado en area urbana con plano de lote aprobado.",
    },
    "CUAL ES LA UNIDAD RESPONSABLE DEL TRAMITE APROBACION DEL PLANO DE CONSTRUCCION DE EDIFICIO": {
        content: "La Unidad de Urbanismo y Tramites Administrativos correspondiente a la Sub Alcaldia."
    },
    "DONDE SE REALIZA EL TRAMITE": {
        content: "En la Sub Alcaldia a la que corresponde el predio. Si el predio se encuentra en el Area de preservacion Historica (centro Historico) los tramites deberan ser presentados en las Oficinas del Departamento de Patrimonio Territorial – Direccion de Planeamiento (Pasaje Sucre).",
    },
    "CUALES SON LOS REQUISITOS DEL TRAMITE APROBACION DEL PLANO DE CONSTRUCCION DE EDIFICIO": {
        content: "Los requisitos son los siguientes: REQUISITOS:1.    Formulario de Solicitud de Tramite, firmado por el propietario segun Certificado o Registro Catastral y/o firmado por el apoderado segun Poder o Carta Notariada.2.    Certificado Catastral o Registro Catastral Computarizado a nombre del actual propietario emitido por la Direccion de Informacion Geografica y Catastro.3.    Impuestos al dia (Proforma del sistema RUAT que evidencie el no adeudo tributario).4.    Fotocopia Carnet de identidad vigente del o los propietarios.5.    Licencia Ambiental o constancia de inicio de tramite debidamente acreditado por la secretaria Departamental de los Derechos de la Madre Tierra.6.    Planos Arquitectonicos de Anteproyecto visado por el Gobierno Autonomo Municipal de Cochabamba.7.    Plano del proyecto de construccion, cinco ejemplares en papel bond y 1 copia digital en formato CAD), firmado y sellado por el Arquitecto.8.    Planos del Proyecto Estructural, si sobrepasa los 3 pisos, tres ejemplares y en medio magnetico formato pdf, con numero de registro del proyecto proporcionado por el Colegio Profesional correspondiente y firmado y sellado por el Ingeniero con registro profesional. Tambien debe anexarse la Memoria de Calculo y el Estudio de Suelos.9.    Plano de Instalacion Hidrosanitaria, tres ejemplares y en medio magnetico formato pdf, con numero de registro del proyecto proporcionado por el Colegio Profesional correspondiente y firmado y sellado por el Ingeniero con registro profesional. Tambien debe anexarse la Memoria de Calculo.10.  Plano de Instalacion Electrica, tres ejemplares y en medio magnetico formato pdf, con numero de registro del proyecto proporcionado por el Colegio Profesional correspondiente y firmado y sellado por el Ingeniero con registro profesional. Tambien debe anexarse la Memoria de Calculo.11.  Plano de Instalaciones Especiales cuando corresponda (Ejm: gas, aire acondicionado, ascensores, etc.), tres ejemplares y en medio magnetico formato pdf, con numero de registro del proyecto proporcionado por el Colegio Profesional correspondiente y firmado y sellado por el profesional con registro que lo acredite. Tambien debe anexarse la Memoria de Calculo.",
    },
    "CUALES SON LOS COSTOS DEL TRAMITE APROBACION DEL PLANO DE CONSTRUCCION DE EDIFICIO": {
        content: "Los costos son los siguientes:COSTOS:1.    El derecho de admision 15 (DA 15) de tramite tiene un costo de 26 bolivianos.2.    Para el folder municipal tiene un costo de 5 bolivianos3.    La tasa de aprobacion residencial tiene un costo de 1.00 bolivianos por metro cuadrado.4.    La tasa de aprobacion no residencial (comercial) tiene un costo de 2.00 bolivianos por metro cuadrado.5.    La tasa de aprobacion del plano estructural tiene un costo de 2.00 bolivianos por metro al cubo.6.    La tasa de fijacion de rasante por metro lineal de los sub distritos 1 al 16 tiene un costo de 1.00 bolivianos por metro lineal.7.    Para los sub distritos 17 al 32 tiene un costo de 1.5 bolivianos por metro lineal.",
    },
    "DURACION DEL TRAMITE": {
        content: "La duracion del tramite llega a ser de 40 dias habiles aproximadamente, despues de cumplirse todos los requisitos y no encontrarse observaciones.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene lo siguiente:·         Plano de construccion aprobado con Resolucion emitida por la Sub Alcaldia.·         Autorizacion de Inicio de Obra.",
    },
    "ACLARACIONES PARA EL TRAMITE APROBACION DEL PLANO DE CONSTRUCCION DE EDIFICIO": {
        content: "las aclaraciones son las siguientes:1.    El tramite tambien puede ser realizado por una tercera persona, siempre y cuando se presente Carta o Poder Notariado para el efecto.2.    En ningun caso el interesado debe cancelar otros montos economicos que no esten indicados en la presente guia de tramite.3.    En caso de inicio de obras sin el respectivo plano aprobado y autorizacion de inicio de obra, se hara pasible a sanciones de acuerdo Reglamento de Sanciones por Contravenciones a Disposiciones Municipales.4.    La aprobacion de los planos de construccion y autorizacion de inicio de obra tendra una vigencia de un ano luego de ser otorgado. Transcurrido el plazo debera solicitar su revalidacion (costo de 35 bolivianos).5.    El proyecto arquitectonico deberan contener la siguiente informacion, plano de ubicacion, de emplazamiento, de plantas, de elevaciones y fachada, prevision contra incendios y salidas de emergencia, de cortes, de cimientos o fundaciones, de cierre frontal (verja), de techos o cubiertas, detalle constructivo (corte de borde), de cota cero, de rampas de acceso, de sala de maquinas, de piscina (de existir) y depositos de agua, de emplazamiento con relacion a sus colindantes, de vegetacion sobre fajas jardin y acera, de escaleras, de parqueos, salon de copropietarios y otros. Tambien los planos deberan presentarse con el formato del carimbo establecido.6.    El proyecto estructural debera contener la informacion especificada en el Documento de Contenido Minimo de Proyecto Estructural, los planos a presentar son emplazamiento de cimientos, emplazamiento de diferentes niveles, cimientos, muros de contencion y/o sotanos, detalles constructivos, losas y escaleras, columnas, vigas y otros. Ademas, estos deberan presentarse con el formato del carimbo establecido.7.    Todos los planos de los diferentes proyectos deberan registrar los datos del propietario segun certificado catastral.8.    Para el inicio de la construccion necesariamente se debe contar con el director de Obra.9.    Para el recojo del Plano de Construccion aprobado es imprescindible presentar la Licencia Ambiental aprobada.",
    },
    "QUE DOCUMENTOS SE OBTIENEN CON EL TRAMITE": {
        content: "Se obtiene el Plano de Anteproyecto de Construccion Visado por la Sub Alcaldia.",
    },
    "REQUISITOS PARA LA TRANSFERENCIA (BIENES INMUEBLES)": {
        content: "Los requisitos son los siguientes:1.	original y copia de la declaracion jurada aprobada del sistema de visacion de minuta de inmuebles.2.	fotocopia del comprobante de pago de impuestos a la propiedad del bien inmueble de la ultima gestion.3.	original de la minuta de compraventa o documento privado con reconocimiento de firmas.4.	fotocopia de la cedula de identidad del comprador (en caso de no tener registro en el padron municipal de contribuyente.5.	fotocopia de cedula de identidad a color.6.	1 foto 3 por 3 fondo rojo.7.	fotocopia de la cedula de identidad del vendedor.8.	titulo de propiedad y folio real legalizado por la sub alcaldia correspondiente.9.	plano del bien inmueble aprobado por la sub alcaldia correspondiente o el departamento de normas urbanas y rurales (propiedad horizontal), original y fotocopia.10. registro catastral emitido por la comuna correspondiente (original y fotocopia).11. en caso de existir poder notariado del comprador y/o vendedor fotocopia legalizada de la notaria de fe publica.Recomendaciones: Con la finalidad de recibir una atencion efectiva y oportuna, se recomienda ordenar los documentos conforme lo descrito en originales y copias. Una vez verificado el cumplimiento de los requisitos, se procedera con el tramite y otorgar la proforma de pago por el Impuesto Municipal a la Transferencia (IMT).Un dato importante:en caso de venta judicial debera incluir copia de la sentencia como tambien el acta de remate.",
    },
    "REQUISITOS PARA LA TRANSFERENCIA ESPECIAL (BIENES INMUEBLES)": {
    content: "Los requisitos son los siguientes:1.    FOLIO REAL (original y fotocopia legalizada por la Sub Alcaldia correspondiente).2.    Titulo de propiedad, Declaratoria de Herederos, Anticipo de legitima u otro (original y fotocopia legalizada).3.    Fotocopia de la cedula de Identidad de los ACTORES (En caso de NO tener registro en el Padron Municipal de Contribuyente (PMC) adjuntar: Fotocopia de Cedula de Identidad a color y 1 Foto 3 por 3 Fondo Rojo).4.    Registro Catastral (Original y fotocopia).5.    Comprobante de pago por concepto del Impuesto a la Propiedad de Bien Inmueble - (IPBI), a la fecha de pago del Titulo de Propiedad.6.    Certificacion del Servicio Impuestos Nacionales.7.    Certificacion del Gobierno Autonomo Departamental de Cochabamba del pago del impuesto a la Transferencia. (A partir de la gestion 2016).Recomendaciones: Con la finalidad de recibir una atencion efectiva y oportuna, recomienda ordenar los documentos conforme lo descrito en originales y copias, para realizar el registro de la Transferencia Especial del Bien Inmueble de la Jurisdiccion del Gobierno Autonomo Municipal de Cochabamba.",
    },
    "REQUISITOS PARA LA REGULARIZACION ACCIONES Y DERECHOS (BIENES INMUEBLES)": {
    content: "Recomendaciones: Establecer los requisitos basicos para proceder a la modificacion del porcentaje definido para la propiedad del bien inmueble cuando corresponda, en funcion del FOLIO REAL ACTUALIZADO. Los requisitos son los siguientes:1.    Comprobante de Pago del Impuesto a la Propiedad del Bien Inmueble de una gestion pasada.2.    Fotocopia de la cedula de identidad del titular(es) para su registro en el padron municipal de contribuyente, (En caso de NO tener registro Adjuntar: Fotocopia de cedula de identidad a color y 1 Foto 3 por 3 Fondo Rojo).3.    TITULO DE PROPIEDAD acredita derecho propietario del titular del inmueble (Original y copia).4.    FOLIO REAL (ACTUALIZADO) original y fotocopia legible de todos los asientos registrados.5.    Plano del bien inmueble aprobado por la Sub Alcaldia correspondiente o el Departamento de Normas Urbanas y Rurales (Propiedad Horizontal) – (Original y Fotocopia).6.    REGISTRO CATASTRAL emitido por Comuna Correspondiente (Original y fotocopia).7.    En caso de existir Poder notariado, presentar la original y copia que le faculte la realizacion del presente tramite.8.    Otros documentos que acrediten el derecho propietario en funcion al folio real y su asiento debidamente registrado.",
    },
    "REQUISITOS PARA EXENCION DE INMUEBLE (DESCUENTO TERCERA EDAD)": {
    content: "Los requisitos son los siguientes:1.    FOTOCOPIA, simple de Testimonio de Propiedad o Folio Real a nombre del titular que solicite la exencion. 2.    FOTOCOPIA, de Cedula de identidad que consigne la direccion del Inmueble sujeto o exencion. 3.    FOTOCOPIA del comprobante de pago de Impuesto del Inmueble o proforma resumida.4.    Declaracion jurada impresa en caso de ser terceras personas (si Corresponde) para el descuento de la tercera edad.Recomendaciones:Los sujetos pasivos de mas de 60 anos de edad, gozaran del beneficio de la exencion establecido en la Disposicion Adicional Primera de la ley Municipal Numero 0719/2020 de Incentivo Tributario, En caso de ser 2 o mas propietarios, todos deben sobrepasar los 60 anos de edad, caso contrario no corresponde. La direccion detallada en la cedula de identidad debe ser la misma del inmueble que solicita la exencion por tercera edad, caso contrario no Corresponde. En las declaraciones juradas que solicitan la declaracion jurada deberan firmar el o los titulares con su huella dactilar y ubicar correctamente en el plano digital.",
    },
    "REQUISITOS PARA LA VISACION MINUTAS": {
    content: "Los requisitos son los siguientes:1.    DERECHO DE ADMISION (DA -99), la persona natural o juridica debe cancelar el derecho de Admision de tramite al numero cuenta:  DA-99 por 20 bolivianos en la Entidad Financiera Autorizada o Caja Recaudadora del Gobierno Autonomo Municipal de Cochabamba.2.    DECLARACION JURADA IMPRESA, EI formulario de Visacion de Minutas debera estar firmado por el comprador o vendedor o apoderado, debiendo verificar la firma con la cedula de identidad.3.    ORIGINAL DEL REGISTRO CATASTRAL O CERTIFICACION CATASTRAL, en caso de ser primera transferencia no corresponde. (ultimo asiento a nombre del titular).4.    ORIGINAL DEL FOLIO REAL O INFORMACION RAPIDA ACTUALIZADO (emitido en la presente gestion a del titular).5.    Cuando el vendedor es persona juridica: Fotocopia del NIT, Poder del representante Legal y Cedula de identidad.6.    FOTOCOPIA DE LA CEDULA DE IDENTIDAD de las partes intervinientes VENDEDORES y COMPRADORES.7.    PLANO APROBADO DE LOTE, CONSTRUCCION O UNIDAD DE PROPIEDAD HORIZONTAL LEGALIZADO, segun el objeto de La transferencia.8.    MINUTA DE TRANSFERENCIA DEL BIEN INMUEBLE (con firma de las partes y el abogado).9.    ORIGINAL DEL TITULO DE PROPIEDAD.10. ORIGINAL DEL PODER DE REPRESENTACION LEGAL (otorgado por el comprador o vendedor).RECOMENDACIONES:Para la admision del tramite de visacion, el contribuyente debe cancelar el derecho de admision (DA 99), llenar la declaracion jurada en el sistema de visaciones y realizar la aprobacion de la declaracion.El inmueble no debera consignar mora tributaria a la fecha de su registro.Para los casos de venta judicial adjuntar. SENTENCIA, ACTA DE REMATE Y AUTO DE ADJUDICACION.Una vez revisada toda la documentacion original, se debera presentar adjunta una copia simple en el mismo orden.",
    },
    /*"QUE ES EL TRAMITE DE VISADO ANTEPROYECTO DE URBANIZACION": {
        content: "Es un trámite a realizar cuando se requiere urbanizar un terreno de su propiedad con superficie a 1300 m2, con carácter previo al diseño de los planos definitivos del proyecto de urbanización, debe solicitar al G.A.M.C. la visación de los planos del anteproyecto.",
    },
    "DONDE SE REALIZA EL TRAMITE DE VISADO ANTEPROYECTO DE URBANIZACION": {
        content: "Se puede realizar en la Sub Alcaldía a la que corresponde el predio.",
    },
    "CUALES SON LOS COSTOS DEL TRAMITE DE VISADO ANTEPROYECTO DE URBANIZACION": {
        content: "El costo depende del terreno por ejemplo la tasa de visación de anteproyecto: por terreno plano m2 es 0.05 Bs/m2",
    },
    "CUALES SON LOS COSTOS DEL TRAMITE 101": {
        content: "el costo funciona para los tramites 101 es de 65 bolivianos",
    },
    "CUALES SON LOS COSTOS DEL TRAMITE":{
        content: "Por favor sea mas especifico sobre el costo que quiera saber",
    },*/
};

// Función para calcular la distancia de Levenshtein entre dos cadenas
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Inicializar la matriz
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Calcular la distancia de Levenshtein
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// Función para verificar si una pregunta es similar a otra usando un umbral de distancia
function isSimilar(question1, question2, threshold) {
    if (question1.toUpperCase() === question2.toUpperCase()) {
        return true; // Si las preguntas son idénticas, devolver true
    }
    // Calcular la distancia de Levenshtein
    const distance = levenshteinDistance(question1.toUpperCase(), question2.toUpperCase());
    return distance <= threshold || question1.toUpperCase().includes(question2.toUpperCase()) || question2.toUpperCase().includes(question1.toUpperCase());
}

export async function GET(req) {
    const question = req.nextUrl.searchParams.get("question");

    let matchedQuestion = null;

    /*for (const exampleQuestion in cochabambaExamples) {
        if (isSimilar(exampleQuestion, question, 1)) {
            matchedQuestion = exampleQuestion;
            break;
        }
    }*/
    // Verificar si la pregunta es exactamente igual a alguna clave
    if (cochabambaExamples.hasOwnProperty(question)) {
        matchedQuestion = question;
    } else {
        // Si no es exactamente igual, buscar coincidencias similares
        for (const exampleQuestion in cochabambaExamples) {
            if (isSimilar(exampleQuestion, question, 5)) {
                matchedQuestion = exampleQuestion;
                break;
            }
        }
    }

    if (!matchedQuestion) {
        return Response.json({ error: "La pregunta no es válida" });
    }

    const cochabambaExample = cochabambaExamples[matchedQuestion];

    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Eres un asistente virtual de trámites del Gobierno Municipal de Cochabamba (Alcaldía de Cochabamba). Tu cliente te está haciendo una pregunta sobre trámites realizados o que se realizan en la subalcaldía de Cochabamba. Debes responder con: 
                    - spanish: la versión en español de la pregunta, dividida en palabras ej: ${JSON.stringify(
                        cochabambaExample.spanish
                    )}
                    - content: Tu respuesta proporcionando información sobre procesos de trámites en sub alcaldías de Cochabamba.`,
                },
                {
                    role: "system",
                    content: `Siempre debes responder con un objeto JSON con el siguiente formato: 
                    {
                        "spanish": [
                            {
                                "word": ""
                            }
                        ],
                        "content": ""
                    }`,
                },
                {
                    role: "user",
                    content: question,
                },
            ],
            model: "gpt-3.5-turbo",
            response_format: {
                type: "json_object",
            },
        });

        const chatResponse = JSON.parse(chatCompletion.choices[0].message.content);
        const combinedResponse = {
            spanish: cochabambaExample.spanish,
            content: `${cochabambaExample.content} ${chatResponse.content}`,
        };
        
        console.log("Respuesta de la API de OpenAI:", chatCompletion);
        return Response.json(combinedResponse);
    } catch (error) {
        return Response.json({ error: "Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde." });
    }
}