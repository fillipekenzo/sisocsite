import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface ITipoOcorrenciaModel {
    TipoOcorrenciaID: number,
    Nome: string,
    Descricao: string,
}

interface  ITipoOcorrenciaFiltroModel {
    Nome?: string,
    Descricao?: string,
}

const TipoOcorrenciaService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.TipoOcorrencia}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (tipoOcorrenciaFiltroModel: ITipoOcorrenciaFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.TipoOcorrencia}/comfiltros?nome=${tipoOcorrenciaFiltroModel?.Nome}&descricao=${tipoOcorrenciaFiltroModel.Descricao}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id:number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.TipoOcorrencia}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (tipoOcorrenciaModel: ITipoOcorrenciaModel): Promise<RespostaWebAPI<any>> => {
        return Api.post(`${OperacoesWebAPI.TipoOcorrencia}`, tipoOcorrenciaModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (tipoOcorrenciaModel: ITipoOcorrenciaModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.TipoOcorrencia}`, tipoOcorrenciaModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },
    
    delete: async (tipoOcorrenciaID : number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.TipoOcorrencia}?id=${tipoOcorrenciaID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default TipoOcorrenciaService;