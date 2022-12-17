import { OperacoesWebAPI } from '../../utils/global';
import { AxiosResponse } from 'axios';
import { RespostaWebAPI } from '../../features/models/resposta-webapi.model';
import Api from '../api'

const GraficoService = {

    getDadosGraficoVertical: async (): Promise<RespostaWebAPI<any>> => {
        return Api.get(`${OperacoesWebAPI.Grafico}/getDadosGraficoVertical`)
            .then((axiosResponse: AxiosResponse<RespostaWebAPI<any>>) => {
                return axiosResponse.data
            })
    },
}

export default GraficoService;