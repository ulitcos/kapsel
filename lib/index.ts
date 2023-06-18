export interface IKapselCallback {
  (kapsel: Kapsel): void;
}

export interface IDeferCallback<D> {
  (): Promise<D>;
}

export class Kapsel<D = unknown> {
  private payload: D;

  public prev: D | null = null;

  private isProcess: boolean = false;

  private err: Error | null = null;

  private defer: IDeferCallback<D> | null = null;

  private clients: Set<IKapselCallback> = new Set();

  constructor(initial: D, defer: IDeferCallback<D> | null = null) {
    this.payload = initial;
    this.defer = defer;
  }

  public get data(): D {
    this.defer && this.fill(this.defer());

    return this.payload;
  }

  public set data(payload: D) {
    this.err = null;
    this.defer = null;
    this.prev = this.payload;
    this.payload = payload;
    this.notify();
  }

  public get isLoading(): boolean {
    return this.isProcess;
  }

  private set isLoading(value: boolean) {
    this.isProcess = value;
    this.notify();
  }

  public get error(): Error | null {
    return this.err;
  }

  private set error(err: Error | null) {
    this.err = err;
    this.notify();
  }

  public get hasError(): boolean {
    return Boolean(this.err);
  }

  public fill(promise: Promise<D>): void {
    this.defer = null;
    this.err = null;
    this.isLoading = true;

    promise
      .then((data) => {
        this.isProcess = false;
        this.data = data;
      })
      .catch((error) => {
        this.isProcess = false;
        this.error = error;
      });
  }

  public subscribe(callback: IKapselCallback) {
    this.clients.add(callback);
  }

  public unsubscribe(callback: IKapselCallback) {
    this.clients.delete(callback);
  }

  private notify() {
    this.clients.forEach((callback) => callback(this));
  }
}
