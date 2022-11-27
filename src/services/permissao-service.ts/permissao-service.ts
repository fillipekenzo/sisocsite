import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface IPermissaoModel {
    PermissaoID: number,
    Consultar: boolean,
    Cadastrar: boolean,
    Editar: boolean,
    Excluir: boolean,
    MenuID?: number,
    TipoUsuarioID?: number,
}

interface IPermissaoFiltroModel {
    MenuID?: number,
    TipoUsuarioID?: number,
}

const PermissaoService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Permissao}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByMenuID: async (id: number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Permissao}/getbymenuid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByMenuIDTipoUsuarioID: async (menuID: number, tipoUsuarioID: number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Permissao}/getbymenuidtipousuarioid?menuID=${menuID}&tipoUsuarioID=${tipoUsuarioID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (permissaoFiltroModel: IPermissaoFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Permissao}/comfiltros?menuID=${permissaoFiltroModel?.MenuID}&tipoUsuarioID=${permissaoFiltroModel.TipoUsuarioID}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id: number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Permissao}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (permissaoModel: IPermissaoModel): Promise<RespostaWebAPI<any>> => {
        return Api.post(`${OperacoesWebAPI.Permissao}`, permissaoModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (permissaoModel: IPermissaoModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.Permissao}`, permissaoModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    delete: async (permissaoID: number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.Permissao}?id=${permissaoID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default PermissaoService;