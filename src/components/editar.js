import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useParams } from "react-router-dom";

export default function Editar() {
    const url = "https://sheet.best/api/sheets/1398a456-bd6c-42ba-93d8-4b5d1179b05e";

    const { id } = useParams();
    useEffect( () => {
        fetch(url + "/numero_seg/" + id)
            .then((res) => res.json())
            .then((result) => {
                setNombres(result[0].nombres);
                setApellidos(result[0].apellidos);
                setArchivo(result[0].archivo);
                setEntidad_salud(result[0].entidad_salud);
                setMedico(result[0].medico);
                setFecha(result[0].fecha);
                setIdentificacion(result[0].identificacion);
                console.log(result[0]);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            numero_seg: id,
            identificacion: identificacion,
            entidad_salud: entidad_salud,
            nombres: nombres,
            apellidos: apellidos,
            medico: medico,
            fecha_consulta: fecha_consulta,
            archivo: archivo,
            estado: "aceptado",
        };
        console.log(data);
        fetch(url + "/numero_seg/"+id, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                    alert("modificado");
                    window.location = "/";
            });
    };

    const [medico, setMedico] = useState("");
    const [fecha_consulta, setFecha] = useState(null);
    const [identificacion,setIdentificacion] = useState("");
    const [entidad_salud,setEntidad_salud] = useState("");
    const [nombres,setNombres] = useState("");
    const [apellidos,setApellidos] = useState("");
    const [archivo,setArchivo] = useState("");


    return (
        <Container style={{ marginTop: "2vh", marginBottom: "2vh" }} maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <Typography component="h1" variant="h5">
                    servicio
                </Typography>
                <div class="mb-3">
                    <label class="form-label">Nombre del servicio</label>
                    <select
                        id="serviciosSelect"
                        class="form-select form-select-sm mb-4"
                        onChange={(e) => setMedico(e.target.value)}
                        required
                    >
                        <option selected disabled>
                            Seleccione el medico
                        </option>
                        <option value="Carlos Matiz">Carlos Matiz</option>
                        <option value="Rafael Enrique Conde Camacho">Rafael Enrique Conde Camacho</option>
                        <option value="Juan Pablo Rodríguez Gallego">Juan Pablo Rodríguez Gallego</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">fecha del servicio</label>
                    <input
                        type="datetime-local"
                        class="form-control"
                        id="fecha"
                        value={fecha_consulta}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" class="btn btn-primary">
                    actualizar
                </button>
            </form>
        </Container>
    );
}