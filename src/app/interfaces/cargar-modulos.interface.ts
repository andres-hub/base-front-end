import { Modulo } from '../models/modulos.model';
export interface CargarModulo{
    ok: boolean;
    action: string;
    total: number;
    mensaje: Modulo[];
}