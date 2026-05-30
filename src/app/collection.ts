//5. Создать файл collection.ts, который реализует внутри себя класс Collection, 
// работающий с любым типом данных. Внутри реализовать методы:

 // - получить все элементы коллекции 
 // - получить определенный элемент коллекции 
 // - очистить коллекцию deleteElements
 // - удалить определенный элемент коллекции deleteThisElements
 // - заменить определенный элемент коллекции replaseThisElements

//Реализовать коллекцию с двумя разными источниками данных


export class Collection<T> {
  private items: T[] = []

  constructor(initialItems: T[]) {
    this.items = initialItems;
    }
    getElements(): T[] {
      return  this.items;
    }
    getThisElements(index: number): T {
      return this.items[index];
    }
    deleteElements() {
      this.items = [];
    }
    deleteThisElements(index: number) {
      this.items.splice(index, 1);
    }
    replaseThisElements(index: number, newItem: T) {
      this.items[index] = newItem
    }

}