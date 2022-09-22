import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface ISetorModel {
    SetorID: number,
    Nome: string,
    Sigla: string,
}

interface  ISetorFiltroModel {
    Nome?: string,
    Sigla?: string,
}

const SetorService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Setor}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (setorFiltroModel: ISetorFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Setor}/comfiltros?nome=${setorFiltroModel?.Nome}&sigla=${setorFiltroModel.Sigla}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id:number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Setor}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (setorModel: ISetorModel): Promise<RespostaWebAPI<any>> => {
        return Api.post(`${OperacoesWebAPI.Setor}`, setorModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (setorModel: ISetorModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.Setor}`, setorModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },
    
    delete: async (setorID : number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.Setor}?id=${setorID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default SetorService;