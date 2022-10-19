import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface ISubsubmenuModel {
    SubmenuID: number,
    MenuID: number,
    Nome: string,
    NavegarURL: string,
    Ativo: boolean,
    PossuiSubmenu: boolean,
}

interface  ISubsubmenuFiltroModel {
    Nome?: string,
    NavegarURL?: string,
    Ativo: boolean,
}

const SubmenuService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Submenu}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (submenuFiltroModel: ISubsubmenuFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Submenu}/comfiltros?nome=${submenuFiltroModel?.Nome}&navegarURL=${submenuFiltroModel.NavegarURL}&ativo=${submenuFiltroModel.Ativo}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id:number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Submenu}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (submenuModel: ISubsubmenuModel): Promise<RespostaWebAPI<any>> => {
        return Api.post(`${OperacoesWebAPI.Submenu}`, submenuModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (submenuModel: ISubsubmenuModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.Submenu}`, submenuModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },
    
    delete: async (menuID : number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.Submenu}?id=${menuID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default SubmenuService;