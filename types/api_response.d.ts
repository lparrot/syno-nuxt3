interface ResponseApiInfo {
  maxVersion: number;
  minVersion: number;
  path: string;
  requestFormat?: string;
}

interface ResponseAuthLogin {
  account: string;
  device_id: string;
  ik_message: string;
  is_portal_port: boolean;
  sid: string;
  synotoken: string;
}

interface ResponseAuthAccount {
  OTP_enable: boolean;
  OTP_enforced: boolean;
  disallowchpasswd: boolean;
  editable: boolean;
  email: string;
  fullname: string;
  password_last_change: number;
  username: string;
}

interface ResponseMonitoring {
  cpu: {
    '15min_load': number;
    '1min_load': number;
    '5min_load': number;
    device: string;
    other_load: number;
    system_load: number;
    user_load: number;
  };
  disk: {
    disk: [{
      device: string;
      display_name: string;
      read_access: number;
      read_byte: number;
      type: string;
      utilization: number;
      write_access: number;
      write_byte: number;
    }];
    total: {
      device: string;
      read_access: number;
      read_byte: number;
      utilization: number;
      write_access: number;
      write_byte: number;
    };
  };
  lun: any[];
  memory: {
    avail_real: number;
    avail_swap: number;
    buffer: number;
    cached: number;
    device: string;
    memory_size: number;
    real_usage: number;
    si_disk: number;
    so_disk: number;
    swap_usage: number;
    total_real: number;
    total_swap: number;
  };
  network: [{
    device: string;
    rx: number;
    tx: number;
  }];
  nfs: [{
    device: string;
    read_OPS: number;
    read_max_latency: number;
    total_OPS: number;
    total_max_latency: number;
    write_OPS: number;
    write_max_latency: number;
  }];
  space: {
    total: Total;
    volume: [{
      device: string;
      display_name: string;
      read_access: number;
      read_byte: number;
      utilization: number;
      write_access: number;
      write_byte: number;
    }];
  };
  time: number;
}

interface ResponseMonitoringProcess {
  command: string;
  cpu: number;
  mem: number;
  mem_shared: number;
  pid: number;
  status: string;
}

interface ResponseMonitoringService {
  byte_read_per_sec: number;
  byte_write_per_sec: number;
  cpu_time: number;
  cpu_utilization: number;
  icon: {
    app_id: string;
    cls: string;
    name: string;
  }
  memory: number;
  name: string;
  name_i18n: string;
  process: [{
    byte_read_per_sec: number;
    byte_write_per_sec: number;
    cpu_time: number;
    cpu_utilization: number;
    memory: number;
    name: string;
    pid: number;
  }];
  unit_name: string;
}

interface ResponseFileManagerSharedFolder {
  offset: number;
  shares: [{
    additional: ResponseFileManagerAdditional
    isdir: boolean;
    name: string;
    path: string;
  }];
  total: number;
}

interface ResponseFileManagerFile {
  offset: number;
  files: [{
    additional: ResponseFileManagerAdditional
    isdir: boolean;
    name: string;
    path: string;
  }];
  total: number;
}

interface ResponseFileManagerAdditional {
  owner: {
    gid: number;
    group: string;
    uid: number;
    user: string;
  };
  perm: {
    acl: {
      append: boolean;
      del: boolean;
      exec: boolean;
      read: boolean;
      write: boolean;
    };
    acl_enable: boolean;
    adv_right: {
      disable_download: boolean;
      disable_list: boolean;
      disable_modify: boolean;
    };
    is_acl_mode: boolean;
    is_share_readonly: boolean;
    posix: number;
    share_right: string;
  };
  real_path: string;
  time: {
    atime: number;
    crtime: number;
    ctime: number;
    mtime: number;
  };
  volume_status: {
    freespace: number;
    readonly: boolean;
    totalspace: number;
  };
}

interface ResponseFetchPackages {
  additional: {
    dsm_apps: string;
    status: string;
  }
  id: string;
  name: string;
  timestamp: number;
  version: string;
}
