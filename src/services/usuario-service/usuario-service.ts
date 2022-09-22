import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface IUsuarioModel {
    UsuarioID: number,
    Nome: string,
    Email: string,
    TipoUsuarioID: number,
    SetorID: number,
}

interface  IUsuarioFiltroModel {
    Nome?: string,
    Email?: string,
}

const UsuarioService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Usuario}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (usuarioFiltroModel: IUsuarioFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Usuario}/comfiltros?nome=${usuarioFiltroModel?.Nome}&email=${usuarioFiltroModel.Email}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id:number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Usuario}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (usuarioModel: IUsuarioModel): Promise<RespostaWebAPI<any>> => {
        return Api.post(`${OperacoesWebAPI.Usuario}`, usuarioModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (usuarioModel: IUsuarioModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.Usuario}`, usuarioModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },
    
    delete: async (usuarioID : number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.Usuario}?id=${usuarioID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default UsuarioService;