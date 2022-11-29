import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface IAnexoModel {
    AnexoID: number,
    Nome: string,
    TipoAnexo: string,
    ArquivoURL: string,
    InteracaoOcorrenciaID?: number,
    OcorrenciaID?: number,
}

interface IAnexoFiltroModel {
    Nome?: string,
    TipoAnexo?: string,
}

const AnexoService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Anexo}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (anexoFiltroModel: IAnexoFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Anexo}/comfiltros?nome=${anexoFiltroModel?.Nome}&tipoAnexo=${anexoFiltroModel.TipoAnexo}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id: number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Anexo}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (anexoModel: IAnexoModel, formData: any): Promise<RespostaWebAPI<any>> => {
        console.log(formData);
        
        return Api.post(`${OperacoesWebAPI.Anexo}`, anexoModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (anexoModel: IAnexoModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.Anexo}`, anexoModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    delete: async (anexoID: number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.Anexo}?id=${anexoID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default AnexoService;