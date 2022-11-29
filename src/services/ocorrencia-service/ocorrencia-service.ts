import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

interface IOcorrenciaModel {
    OcorrenciaID: number,
    Assunto: string,
    Descricao: string,
    UrgenciaENUM: string,
    SituacaoENUM: string,
    Resolucao: string,
    UsuarioAtribuidoID?: number,
    UsuarioCadastroID?: number,
    TipoOcorrenciaID?: number,
    SetorID?: number,
    File?: any,
}

interface IOcorrenciaFiltroModel {
    Assunto?: string,
    Descricao?: string,
    SituacaoENUM: string,
    UrgenciaENUM: string,
}

const OcorrenciaService = {

    get: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Ocorrencia}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getComFiltro: async (ocorrenciaFiltroModel: IOcorrenciaFiltroModel): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Ocorrencia}/comfiltros?assunto=${ocorrenciaFiltroModel?.Assunto}&descricao=${ocorrenciaFiltroModel.Descricao}&situacaoENUM=${ocorrenciaFiltroModel.SituacaoENUM}&urgenciaENUM=${ocorrenciaFiltroModel.UrgenciaENUM}`,)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    getByID: async (id: number): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Ocorrencia}/getbyid?id=${id}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    post: async (ocorrenciaModel: IOcorrenciaModel, formData: any): Promise<RespostaWebAPI<any>> => {
        console.log(formData);

        ocorrenciaModel.File = formData;
        return Api.post(`${OperacoesWebAPI.Ocorrencia}`, ocorrenciaModel, { headers: { "Content-Type": "multipart/form-data" } })
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    put: async (ocorrenciaModel: IOcorrenciaModel): Promise<RespostaWebAPI<any>> => {
        return Api.put(`${OperacoesWebAPI.Ocorrencia}`, ocorrenciaModel)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },

    delete: async (ocorrenciaID: number): Promise<RespostaWebAPI<any>> => {
        return Api.delete(`${OperacoesWebAPI.Ocorrencia}?id=${ocorrenciaID}`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    }
}

export default OcorrenciaService;