import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface IInteracaoOcorrenciaModel {
    InteracaoOcorrenciaID: number,
    Assunto: string,
    Descricao: string,
    UsuarioID?: number,
    OcorrenciaID?: number,
    File?: any
}

interface IInteracaoOcorrenciaFiltroModel {
    Assunto?: string,
    Descricao?: string,
}

const InteracaoOcorrenciaService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.InteracaoOcorrencia}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (interacaoOcorrenciaFiltroModel: IInteracaoOcorrenciaFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.InteracaoOcorrencia}/comfiltros?assunto=${interacaoOcorrenciaFiltroModel?.Assunto}&descricao=${interacaoOcorrenciaFiltroModel.Descricao}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id: number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.InteracaoOcorrencia}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (interacaoOcorrenciaModel: IInteracaoOcorrenciaModel, formData: any): Promise<RespostaWebAPI<any>> => {
        interacaoOcorrenciaModel.File = formData;
        return Api.post(`${OperacoesWebAPI.InteracaoOcorrencia}`, interacaoOcorrenciaModel, { headers: { "Content-Type": "multipart/form-data" } })
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (interacaoOcorrenciaModel: IInteracaoOcorrenciaModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.InteracaoOcorrencia}`, interacaoOcorrenciaModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    delete: async (interacaoOcorrenciaID: number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.InteracaoOcorrencia}?id=${interacaoOcorrenciaID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default InteracaoOcorrenciaService;