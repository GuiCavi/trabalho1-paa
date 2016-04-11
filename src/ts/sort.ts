import * as Utils from "./sortUtils";

/**
 * Algorithms
 */
class Sort {
  utils = new Utils.Utils();
  
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
          [numbers[j], numbers[j + 1]] = this.utils.swap(numbers[j], numbers[j + 1]);
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
          [numbers[i], numbers[i + 1]] = this.utils.swap(numbers[i], numbers[i + 1]);
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
    let index: number;
    
    if (numbers.length > 1) {
      index = this.utils.partition(numbers, left, right);
      
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
      this.utils.siftDown(numbers, i, numbers.length-1);
    }
    
    for (let i = numbers.length - 1; i >= 1; i--) {
      [numbers[0], numbers[i]] = this.utils.swap(numbers[0], numbers[i]);
      
      this.utils.siftDown(numbers, 0, i - 1);
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
      numbers = this.utils.merge(numbers, begin, mid, end);
    }
    
    return numbers;
  }
}