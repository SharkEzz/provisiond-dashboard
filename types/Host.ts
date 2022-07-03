export default interface HostType {
  name: string;
  slug: string;
  host: string;
  port: number;
  username: string;
  type: 'password' | 'key';
  password?: string;
  privateKey?: string;
  privateKeyPassphrase?: string;
}
