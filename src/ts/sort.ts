let _swaps;
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
  
  public static siftDown(numbers: number[], root: number, bottom: number, swaps: number):number {
    let maxChild = root * 2 + 1;
    
    if (maxChild < bottom) {
      let otherChild = maxChild + 1;
      maxChild = (numbers[otherChild] > numbers[maxChild]) ? otherChild : maxChild;
    }
    else if (maxChild > bottom) return swaps;
    
    if (numbers[root] >= numbers[maxChild]) return swaps;
    
    [numbers[root], numbers[maxChild]] = this.swap(numbers[root], numbers[maxChild]);
    ++swaps;
    
    this.siftDown(numbers, maxChild, bottom, swaps);
    
    return swaps;
  }
  
  public static merge(numbers: number[], begin: number, mid: number, end: number) {    
    let temp: number[] = [],
        i = begin, j = mid, k = 0;
    
    while (i < mid && j < end) {
      if (numbers[i] <= numbers[j]) temp[k++] = numbers[i++];
      else temp[k++] = numbers[j++];
    }
    
    while (i < mid) {
      temp[k++] = numbers[i++];
      ++_swaps;
    };
    while (j < end) {
      temp[k++] = numbers[j++];
      ++_swaps;
    };
    
    for (i = begin; i < end; i++) {
      numbers[i] = temp[i-begin];
    }
    
    return numbers;
  }
  
  public static partition(numbers: number[], left: number, right: number, swaps: number) {
    // let pivot: number = Math.floor(left+right / 2),
    let pivot: number = left,
        i = left, j = right;       
        
    while (i <= j) {
      while (numbers[i] < numbers[pivot]) i++;
      while (numbers[j] > numbers[pivot]) j--;
      
      if (i <= j) {
        [numbers[i], numbers[j]] = this.swap(numbers[i], numbers[j]);
        ++swaps;
        
        i++;
        j--;
      }
    }
    
    return [i, swaps];
  }
}

/**
 * Algorithms
 */
class Sort {
  constructor() {
    
  }
  
  /**
   * Uneficient bubbleSort
   */
  bubbleSort1(numbers: number[]) {
    let swaps = 0;
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length-1; j++) {
        if (numbers[j] > numbers[j + 1]) {
          [numbers[j], numbers[j + 1]] = Utils.swap(numbers[j], numbers[j + 1]);
          ++swaps;
        }
      }
    }
    
    return swaps;
  }
  
  /**
   * Most eficient bubbleSort
   */
  bubbleSort2(numbers: number[]) {    
    let finish = false,
        j = 0, swaps = 0;
    
    while (j < numbers.length && !finish) {
      finish = true;
      
      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > numbers[i + 1]) {          
          [numbers[i], numbers[i + 1]] = Utils.swap(numbers[i], numbers[i + 1]);
          finish = false;
          ++swaps;
        }
      }
      
      j++;
    }
    return swaps;
  }
  
  /**
   * Quick sort
   */
  static _quickSort(numbers: number[], left: number, right: number, swaps: number) {
    let index: number;
    
    if (numbers.length > 1) {
      [index, swaps] = Utils.partition(numbers, left, right, swaps);
      
      if (left < index - 1) swaps = this._quickSort(numbers, left, index - 1, swaps);
      if (index < right) swaps = this._quickSort(numbers, index, right, swaps);
    }
    
    // return numbers;
    return swaps;
  }
  quickSort(numbers: number[]) {
    let swaps = 0;
    swaps = Sort._quickSort(numbers, 0, numbers.length-1, swaps);
    return swaps;
  }
  
  /**
   * Insertion Sort
   */
  insertionSort(numbers: number[]) {
    let atual: number;
    let swaps = 0;
    
    for (let i = 1; i < numbers.length; i++) {
      atual = numbers[i];
      
      for (var j = i - 1; j >= 0 && atual < numbers[j]; j--) {
        numbers[j + 1] = numbers[j]; 
      }
      
      numbers[j + 1] = atual;
      ++swaps;
    }
    
    return swaps;
  }
  
  /**
   * Shell Sort
   */
  shellSort(numbers: number[]) {
    let swaps = 0;    
    for (let salto = Math.floor(numbers.length/2); salto > 0; salto = Math.floor(salto / 2)) {
      for (let i = salto; i < numbers.length; i++) {
        let x = numbers[i];
        for (var j = i; (j >= salto) && (x < numbers[j - salto]); j -= salto) {
          numbers[j] = numbers[j - salto];
        }
        numbers[j] = x;
        ++swaps;
      }
    }
    
    return swaps;
  }
  
  /**
   * Selection Sort
   */
  selectionSort(numbers: number[]) {
    let swaps = 0;    
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
      ++swaps;
    }
    
    return swaps;
  }
  
  /**
   * Heap Sort
   */
  heapSort(numbers: number[]) {
    let swaps:number = 0;
    
    for (let i = Math.floor(numbers.length / 2); i >= 0; i--) {
      swaps = Utils.siftDown(numbers, i, numbers.length-1, swaps);
    }
    
    for (let i = numbers.length - 1; i >= 1; i--) {
      [numbers[0], numbers[i]] = Utils.swap(numbers[0], numbers[i]);
      ++swaps;
      swaps = Utils.siftDown(numbers, 0, i - 1, swaps);
    }
    
    return swaps;
  }
  
  /**
   * Merge Sort
   */
  mergeSort(numbers: number[]) {
    _swaps = 0;
    Sort._mergeSort(numbers, 0, numbers.length);
    return _swaps;
  }
  static _mergeSort(numbers: number[], begin:number, end: number) {
    if (begin < end -1) {
      let mid = Math.floor((begin + end) / 2);
      
      this._mergeSort(numbers, begin, mid);
      this._mergeSort(numbers, mid, end);
      numbers = Utils.merge(numbers, begin, mid, end);
    }
    
    // return numbers;
  }
}