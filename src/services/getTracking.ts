import { correosService } from './urlBase';
import { TrackingInterface } from '../interfaces/TrackingInterface';

export const getTracking = async (code: string) => {
    return new Promise<TrackingInterface>((resolve, reject) => {
            correosService.get(code).then((res) => {
                if (res.status === 200) {
                    resolve(res.data)
                } else if (res.status === 404) {
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }).catch((err) => {
                console.log('Error en la peticion');
                reject(err)
            })
    })
}