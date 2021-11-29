import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

export default function Cosumidor() {
    const url = "https://sheet.best/api/sheets/1398a456-bd6c-42ba-93d8-4b5d1179b05e/estado/En Tramite";
    const classes = useStyles();
    const [servicios, setservicios] = useState();
    const serviciosGet = async () => {
        await fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setservicios(result);
            });
    };

    const Updateservicio = (numero_seg) => {
        window.location = "/actualizar/" + numero_seg;
    };

    useEffect(() => {
        serviciosGet();
    }, []);

    return (
        <div>
            <body>
                <df-messenger intent="WELCOME" chat-title="RetoChatBot" agent-id="65f07fc5-0557-4b37-8e46-486e8a3f269a"
                    language-code="es"></df-messenger>
            </body>
            <div className={classes.root}>
                {!servicios ? (
                    <div style={{ textAlign: "center", margin: "5vh" }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <Container
                        className={classes.container}
                        maxWidth="lg"
                    >
                        <Paper className={classes.paper}>
                            <Box display="flex">
                                <Box flexGrow={1}>
                                    <Typography
                                        component="h2"
                                        variant="h6"
                                        color="primary"
                                        gutterBottom
                                    >
                                        Peticiones
                                    </Typography>
                                </Box>
                            </Box>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">Numero Seguimiento</TableCell>
                                            <TableCell align="center">Identificación</TableCell>
                                            <TableCell align="left">EPS</TableCell>
                                            <TableCell align="left">Nombres</TableCell>
                                            <TableCell align="left">Apellidos</TableCell>
                                            <TableCell align="left">Archivo</TableCell>
                                            <TableCell align="left">Estado</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {servicios.map((servicio) => (
                                            <TableRow key={servicio.ID}>
                                                <TableCell align="right">{servicio.numero_seg}</TableCell>
                                                <TableCell align="center">{servicio.identificacion}</TableCell>
                                                <TableCell align="left">{servicio.entidad_salud}</TableCell>
                                                <TableCell align="left">{servicio.nombres}</TableCell>
                                                <TableCell align="left">{servicio.apellidos}</TableCell>
                                                <TableCell align="left"><a href={servicio.archivo} >Archivo adjunto</a></TableCell>
                                                <TableCell align="left">{servicio.estado}</TableCell>
                                                <TableCell align="center">
                                                    <ButtonGroup
                                                        color="dark"
                                                        aria-label=" primary button group"
                                                    >
                                                        <Button
                                                            class="btn btn-primary"
                                                            onClick={() => Updateservicio(servicio.numero_seg)}
                                                        >
                                                            Editar
                                                        </Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Container>
                )}
            </div>
        </div>
    );
}