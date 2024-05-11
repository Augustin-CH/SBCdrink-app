export interface IBaseFile {
  id: string
  name: string
  path: string
  createdAt: string
  updatedAt: string
}

export interface IUpdateFile {
  id: string
  file: File
}

export interface ICreateFile extends Omit<IBaseFile, 'id'> {}
