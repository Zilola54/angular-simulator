export class Collection<T> {
  private items: T[] = []

  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }
  getElements(): T[] {
    return  this.items;
  }
  getThisElements(index: number): T | undefined {
    return this.items[index];
  }
  deleteElements(): void {
    this.items = [];
  }
  deleteThisElements(index: number): void {
    this.items.splice(index, 1);
  }
  replaseThisElements(index: number, newItem: T): void {
    this.items[index] = newItem
  }
}