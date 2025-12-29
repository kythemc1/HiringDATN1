export class ListManager {
  private _list: string[] = [];
  private _title: string;
  menuReady = false;
  
  get list(): string[] {
    return this._list;
  }

  get title(): string {
    return this._title;
  }

  set_title(value: string): string {
    return (this._title = value);
  }

  createnew(item: string) {
    this._list = [item];
  }

  add(item: string) {
    this._list.push(item);
  }

  remove(item: string) {
    this._list = this._list.filter(i => i !== item);
  }

  clear() {
    this._list = [];
  }

  back() {
    this._list.pop();
  }
  length(): number {
    return this._list.length;
  }
}

export const GlobalListManager = new ListManager();
