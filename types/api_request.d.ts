interface RequestFileStationSharedFolders {
  limit?: number
  offset?: number
  onlywritable?: boolean
  sort_by?: string
  sort_direction?: 'ASC' | 'DESC'
}

interface RequestFileStationFiles {
  check_dir?: boolean
  filetype?: 'dir' | 'file' | 'all'
  folder_path: string
  goto_path?: string
  limit?: number
  offset?: number
  onlywritable?: boolean
  pattern?: string
  sort_by?: string
  sort_direction?: 'ASC' | 'DESC'
}

interface RequestLogs {
  start?: number;
  limit?: number;
  target?: string;
  logtype?: string;
  date_from?: number;
  date_to?: number;
  keyword?: string;
  level?: string;
}
