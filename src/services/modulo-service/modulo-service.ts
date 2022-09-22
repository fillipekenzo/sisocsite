import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface IModuloModel {
    ModuloID: number,
    Nome: string,
    NavegarURL: string,
    Ativo: boolean,
    PossuiMenu: boolean,
}

interface  IModuloFiltroModel {
    Nome?: string,
    NavegarURL?: string,
    Ativo: boolean,
}

const ModuloService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Modulo}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (moduloFiltroModel: IModuloFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Modulo}/comfiltros?nome=${moduloFiltroModel?.Nome}&navegarURL=${moduloFiltroModel.NavegarURL}&ativo=${moduloFiltroModel.Ativo}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id:number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Modulo}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (moduloModel: IModuloModel): Promise<RespostaWebAPI<any>> => {
        return Api.post(`${OperacoesWebAPI.Modulo}`, moduloModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (moduloModel: IModuloModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.Modulo}`, moduloModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },
    
    delete: async (moduloID : number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.Modulo}?id=${moduloID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default ModuloService;