import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { CardContent, Grid, Button } from "@material-ui/core";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import axios from "utils/axios";
import Webcam from "react-webcam";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3),
  },
  formGroup: {
    marginBottom: theme.spacing(3),
  },
  fieldGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  fieldHint: {
    margin: theme.spacing(1, 0),
  },
  tags: {
    marginTop: theme.spacing(1),
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  dateField: {
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  enviarImagemComputador: {
    display: "none",
  },
  fotos: {
    margin: theme.spacing(1),
  },
}));

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const InserirImagem = (props) => {
  const classes = useStyles();

  const webcamRef = React.useRef(null);

  const handleCapturarFoto = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageData(imageSrc);
  }, [webcamRef]);

  const handleResetFoto = React.useCallback(() => {
    setImageData(null);
  }, []);

  const handleEnviarImagemComputador = React.useCallback((event) => {
    const formData = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append("fotosVestigio", event.target.files[i]);
    }
    axios
      .post("/arquivo/enviarFotos", formData)
      .then(function (response) {
        {
          response.data.paths.map((path) =>
            props.formState.values.fotos.push(path)
          );
          setImageData(null);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  const handleSalvarFoto = React.useCallback(() => {
    const formData = new FormData();
    formData.append("fotoVestigio", imageData);
    axios
      .post("/arquivo/tirarFoto", formData)
      .then(function (response) {
        const imageUrl = response.data.path;
        props.formState.values.fotos.push(imageUrl);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [imageData, setImageData] = useState(null);

  return (
    <CardContent>
      <Grid alignItems="center" container justify="flex-start">
        {props.formState.values.fotos.map((fotoVestigio, i) => (
          <Grid key={i} className={classes.fotos} item md={3} sm={5} xs={12}>
            <img
              src={`http://localhost:5000/arquivo?path=${fotoVestigio}`}
              width="100%"
            />
          </Grid>
        ))}
      </Grid>
      <Grid className={classes.item} item md={12} sm={12} xs={12}>
        <Grid className={classes.fieldGroup} item md={5} sm={8} xs={12}>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<PhotoCamera />}
            onClick={handleOpen}
          >
            Usar Câmera
          </Button>
          <input
            accept="image/*"
            className={classes.enviarImagemComputador}
            id="enviarImagemComputador"
            name="fotosVestigio"
            multiple
            type="file"
            onChange={handleEnviarImagemComputador}
          />
          <label htmlFor="enviarImagemComputador">
            <Button
              color="primary"
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Do computador
            </Button>
          </label>
        </Grid>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              {imageData ? (
                <div>
                  <div>
                    <img src={imageData} width="100%" />
                  </div>
                  <div className={classes.fieldGroup}>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleSalvarFoto}
                    >
                      Salvar foto
                    </Button>
                    <Button
                      //color="secondary"
                      variant="outlined"
                      onClick={handleResetFoto}
                    >
                      Refazer foto
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    {props.formState.values.fotos.length !== 0 ? (
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                          ></IconButton>
                        }
                      >
                        Foto Salva!
                      </Alert>
                    ) : null}
                    <Webcam
                      audio={false}
                      height="100%"
                      width="100%"
                      minScreenshotWidth={1920}
                      minScreenshotHeight={1080}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />
                  </div>
                  <div>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleCapturarFoto}
                    >
                      Capturar foto
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Fade>
        </Modal>
      </Grid>
    </CardContent>
  );
};

InserirImagem.propTypes = {
  className: PropTypes.string,
};

export default InserirImagem;
