interface ResponseAccount {
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
