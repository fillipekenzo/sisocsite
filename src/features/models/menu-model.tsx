export interface MenuModel {
    menuID: number,
    nome: string,
    navegarURL: string,
    ativo: boolean,
    possuiMenu: boolean,
    submenus?: any[]
}