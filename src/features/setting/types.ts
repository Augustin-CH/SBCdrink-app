export interface IBaseSetting {
  dispenserEmptyingTime: number
  dispenserFillingTime: number
}

export interface IUpdateSetting extends IBaseSetting {
}

export interface IFormSetting extends IBaseSetting {
}
