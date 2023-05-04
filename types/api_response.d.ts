interface ResponseAuthUser {
  enabled: boolean;
  id: number;
  is_admin: boolean;
  is_migration_finished: boolean;
  name: string;
  profile: ResponseAuthUserProfile;
  uid: number;
}

interface ResponseAuthUserProfile {
  email: string;
  emails: string[];
  groups?: any;
  id: string;
  nickName: string;
  photo: string;
  preferredColor: string;
  preferredLanguage: string;
  timezone: string;
  timezoneUI: string;
  title: string;
  uid: number;
  userName: string;
}

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
