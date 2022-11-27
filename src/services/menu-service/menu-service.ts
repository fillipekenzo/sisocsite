import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface IMenuModel {
    MenuID: number,
    Nome: string,
    NavegarURL: string,
    Ativo: boolean,
    PossuiMenu: boolean,
}

interface IMenuFiltroModel {
    Nome?: string,
    NavegarURL?: string,
    Ativo: boolean,
}

const MenuService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Menu}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getPorTipoUsuarioID: async (tipoUsuarioID: number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Menu}/getbytipousuarioid?tipousuarioid=${tipoUsuarioID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (menuFiltroModel: IMenuFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Menu}/comfiltros?nome=${menuFiltroModel?.Nome}&navegarURL=${menuFiltroModel.NavegarURL}&ativo=${menuFiltroModel.Ativo}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id: number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Menu}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (menuModel: IMenuModel): Promise<RespostaWebAPI<any>> => {
        return Api.post(`${OperacoesWebAPI.Menu}`, menuModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (menuModel: IMenuModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.Menu}`, menuModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    delete: async (menuID: number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.Menu}?id=${menuID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default MenuService;