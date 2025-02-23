export interface FileInfo {
  path: string
  content: string
  size: number
}

export interface DirectoryStructure {
  name: string
  type: 'file' | 'directory'
  children?: DirectoryStructure[]
}

export interface ProcessRepositoryResponse {
  summary: string
  files: FileInfo[]
  structure: DirectoryStructure[]
}
