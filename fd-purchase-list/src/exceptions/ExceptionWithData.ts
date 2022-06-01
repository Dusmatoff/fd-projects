export default class ExceptionWithData extends Error {
  constructor(message: string, data: any) {
    super(message);
    this.data = data;
  }

    data: any;

    getData = () => this.data;
}
