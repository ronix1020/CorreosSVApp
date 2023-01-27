export interface TrackingInterface {
    envio:           Envio;
    eventos:         Evento[];
    failed:          boolean;
    mensajeAmigable: string;
    message:         null;
}

export interface Envio {
    clase:         string;
    icono:         string;
    numeroRastreo: string;
    paisDestino:   null;
    paisOrigen:    string;
    peso:          number;
}

export interface Evento {
    accion:      string;
    descripcion: string;
    fecha:       Date;
    idEvento:    number;
    oficina:     string;
    razon:       string;
}