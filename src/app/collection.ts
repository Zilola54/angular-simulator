export class Collection<T> {
  private items: T[] = []

  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }
  public getElements(): T[] {
    return  this.items;
  }
  public getThisElements(index: number): T | undefined {
    return this.items[index];
  }
  public deleteElements(): void {
    this.items = [];
  }
  public deleteThisElements(index: number): void {
    this.items.splice(index, 1);
  }
  public replaseThisElements(index: number, newItem: T): void {
    this.items[index] = newItem
  }
}