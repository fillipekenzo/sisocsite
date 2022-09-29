import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import Api from '../api'
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';

const EnumeradorService = {
    get:  (tipoEnumerador: string): Promise<RespostaWebAPI<any>> => {
        return  Api.get(`${OperacoesWebAPI.Enumerador}?tipoEnumerador=${tipoEnumerador}`)
        .then((axiosResponse:AxiosResponse<RespostaWebAPI<any>>) => {        
            return axiosResponse.data
        })    
    },        
}

export  default EnumeradorService;