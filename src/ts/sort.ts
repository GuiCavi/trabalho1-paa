class Utils {
  constructor() {
    console.log("Utils class loaded");
  }
  
  public static swap(a: any, b: any) {    
    return [b, a];
  }
  
  public static calculate(func: any, arr: number[]) {
    let start = performance.now();
    func(arr);
    let end = performance.now();
    
    return end-start;
  }
  
  public static generateHTML(arr: any[], type: string) {
    switch (type) {
      case 'ul':
        let $ul = document.createElement('ul');
      
        for (let i = 0; i < arr.length; i++) {
          let $li = document.createElement('li');
          
          $li.textContent = arr[i];
          $ul.appendChild($li);          
        }
        
        return $ul;
    
      default:
        break;
    }
  }
  
  public static siftDown(numbers: number[], root: number, bottom: number) {
    let maxChild = root * 2 + 1;
    
    if (maxChild < bottom) {
      let otherChild = maxChild + 1;
      maxChild = (numbers[otherChild] > numbers[maxChild]) ? otherChild : maxChild;
    }
    else if (maxChild > bottom) return;
    
    if (numbers[root] >= numbers[maxChild]) return;
    
    [numbers[root], numbers[maxChild]] = Utils.swap(numbers[root], numbers[maxChild]);
    
    this.siftDown(numbers, maxChild, bottom);
  }
  
  public static merge(numbers: number[], begin: number, mid: number, end: number) {    
    let temp: number[] = [],
        i = begin, j = mid, k = 0;
    
    while (i < mid && j < end) {
      if (numbers[i] <= numbers[j]) temp[k++] = numbers[i++];
      else temp[k++] = numbers[j++];
    }
    
    while (i < mid) temp[k++] = numbers[i++];
    while (j < end) temp[k++] = numbers[j++];
    
    for (i = begin; i < end; i++) {
      numbers[i] = temp[i-begin];
    }
    
    return numbers;
  }
  
  public static partition(numbers: number[], left: number, right: number) {
    // let pivot: number = Math.floor(left+right / 2),
    let pivot: number = left,
        i = left, j = right;       
        
    while (i <= j) {
      while (numbers[i] < numbers[pivot]) i++;
      while (numbers[j] > numbers[pivot]) j--;
      
      if (i <= j) {
        [numbers[i], numbers[j]] = Utils.swap(numbers[i], numbers[j]);
        
        i++;
        j--;
      }
    }
    
    return i;
  }
}

/**
 * Algorithms
 */
class Sort {
  constructor() {
    console.log("new object of Sort");
  }
  
  /**
   * Uneficient bubbleSort
   */
  bubbleSort1(numbers: number[]) {
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length-1; j++) {
        if (numbers[j] > numbers[j + 1]) {
          [numbers[j], numbers[j + 1]] = Utils.swap(numbers[j], numbers[j + 1]);
        }
      }
    }
  }
  
  /**
   * Most eficient bubbleSort
   */
  bubbleSort2(numbers: number[]) {
    let finish = false,
        j = 0;
    
    while (j < numbers.length && !finish) {
      finish = true;
      
      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > numbers[i + 1]) {
          [numbers[i], numbers[i + 1]] = Utils.swap(numbers[i], numbers[i + 1]);
          finish = false;
        }
      }
      
      j++;
    }
  }
  
  /**
   * Quick sort
   */
  quickSort(numbers: number[], left: number, right: number) {
    let index;
    
    if (numbers.length > 1) {
      index = Utils.partition(numbers, left, right);
      
      if (left < index - 1) this.quickSort(numbers, left, index - 1);      
      if (index < right) this.quickSort(numbers, index, right);
    }
    
    return numbers;
  }
  
  /**
   * Insertion Sort
   */
  insertionSort(numbers: number[]) {
    let atual: number;
    
    for (let i = 1; i < numbers.length; i++) {
      atual = numbers[i];
      
      for (var j = i - 1; j >= 0 && atual < numbers[j]; j--) {
        numbers[j + 1] = numbers[j]; 
      }
      
      numbers[j + 1] = atual;
    }
  }
  
  /**
   * Shell Sort
   */
  shellSort(numbers: number[]) {    
    for (let salto = Math.floor(numbers.length/2); salto > 0; salto = Math.floor(salto / 2)) {
      for (let i = salto; i < numbers.length; i++) {
        let x = numbers[i];
        for (var j = i; (j >= salto) && (x < numbers[j - salto]); j -= salto) {
          numbers[j] = numbers[j - salto];
        }
        numbers[j] = x;
      }
    }
  }
  
  /**
   * Selection Sort
   */
  selectionSort(numbers: number[]) {    
    for (let i = 0; i < numbers.length - 1; i++) {
      let k = i;
      let menor = numbers[i];
      
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[j] < menor) {
          k = j;
          menor = numbers[j];
        }
      }
      
      numbers[k] = numbers[i];
      numbers[i] = menor;
    }
  }
  
  /**
   * Heap Sort
   */
  heapSort(numbers: number[]) {    
    for (let i = Math.floor(numbers.length / 2); i >= 0; i--) {
      Utils.siftDown(numbers, i, numbers.length-1);
    }
    
    for (let i = numbers.length - 1; i >= 1; i--) {
      [numbers[0], numbers[i]] = Utils.swap(numbers[0], numbers[i]);
      
      Utils.siftDown(numbers, 0, i - 1);
    }
  }
  
  /**
   * Merge Sort
   */
  mergeSort(numbers: number[], begin:number, end: number) {
    if (begin < end -1) {
      let mid = Math.floor((begin + end) / 2);      
      
      this.mergeSort(numbers, begin, mid);
      this.mergeSort(numbers, mid, end);
      numbers = Utils.merge(numbers, begin, mid, end);
    }
    
    return numbers;
  }
}

class Main {
  constructor() {}
  
  public static main() {
    let sort = new Sort(),
        results: string[] = [];

    // let array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    let array: number[] = new Array(100).join('0').split('').map(function() {
      return parseInt('' + (Math.random() * 10));
    });
    
    for (let i = 0; i < 10; i++) {
      results.push(Utils.calculate(sort.insertionSort, array.slice(0)) + ' ms');
    }
    
    let $ul = Utils.generateHTML(results, 'ul');
    document.getElementById('results').appendChild($ul);
  }
}

Main.main();