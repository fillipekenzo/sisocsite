import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface ITipoUsuarioModel {
    TipoUsuarioID: number,
    Nome: string,
    Descricao: string,
}

interface  ITipoUsuarioFiltroModel {
    Nome?: string,
    Descricao?: string,
}

const TipoUsuarioService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.TipoUsuario}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (tipoUsuarioFiltroModel: ITipoUsuarioFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.TipoUsuario}/comfiltros?nome=${tipoUsuarioFiltroModel?.Nome}&descricao=${tipoUsuarioFiltroModel.Descricao}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id:number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.TipoUsuario}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (tipoUsuarioModel: ITipoUsuarioModel): Promise<RespostaWebAPI<any>> => {
        return Api.post(`${OperacoesWebAPI.TipoUsuario}`, tipoUsuarioModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (tipoUsuarioModel: ITipoUsuarioModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.TipoUsuario}`, tipoUsuarioModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },
    
    delete: async (tipoUsuarioID : number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.TipoUsuario}?id=${tipoUsuarioID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default TipoUsuarioService;