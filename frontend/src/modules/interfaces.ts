export interface socketInterface {
  onMessage: (arg0: (event: { data: string; }) => void) => void,
  sendMessage: any,
  destroy: () => void,
}
