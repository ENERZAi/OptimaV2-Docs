# Chapter 6. Helper functions

In Opto, we provide some helper functions that can be useful for writing kernels. Some of them are builtin inside the language itself, and some of them are interpreted as library function (Which means it is imported from another opto implementation file). Language builtin functions are called using () bracket. Such as 'func(args..)' and library functions are called using '<|' operator just like other opto functions. We can use these to enhance readability and reduce boilerplate codes.

### Language builtin helper functions 

* **print** (expression)
    * Prints expression to the console output
    * expression can be any type
    * Available in compile time (Support on runtime is on its way)
* **toStr** (expression)
    * Converts expression into string
    * expression can be any type
    * Available in compile time
* **len** (expression)
    * Gets length of list or tuple
    * expression should be list or tuple type
    * Available in compile time
    * returns idx type
* **except** (expression)
    * Throws exception and halts the execution
    * expression should be string type
    * Available in compile time
* **cast**</'type'/> (expression)
    * Casts expression to another type
    * See Chapter 2 for more information
    * Available in both compile time and runtime with exactly same rule
    * returns casted rule
* **typeof** (expression)
    * Gets data type of the runtime tensor type
    * expression should be runtime tensor type
    * returns runtime number type
* **shapeof** (expression)
    * Gets shape of the runtime tensor type
    * returns idx type

### Language builtin helper functions (Compile time only)
* **fold** (state : 'T', iterator : list<'U'>, function : 'T' -> 'U' -> 'T' ) 
    * type : T -> list<'U'> -> (T -> U -> T) -> T
    * Applies a function to each element of the collection, threading an accumulator argument through the computation. function will be applied from the beginning of the list, and keep updating the state value. Final state will be returned as output.
    * State can be any type
    * iterator should be list type
    * function should be type of (T -> U -> T), which means it should be in the form of lambda(state, element of the list) {'body returning next state'}
    * returns 'T' type
    * Example
    ```c++
    // This code will add up all values in the list
    let body_func sum num =  sum + num // This function is applied to every element where 'sum' corresponds to 'state', and 'num' corresponds to element in the iterator
    let output = fold <| 0 <| list_value <| body_func
    output // output will be sum of all values in the list
    ```

* **broadcast** (listA : list<'T'>, lsitB : list<'T'>)
    * type :  list<'T'> -> list<'T'> -> list<'T'>
    * Broadcasts two lists with broadcasting semantics.
        * Follows [pytorch broadcasting semantics](https://pytorch.org/docs/stable/notes/broadcasting.html)
    * returns list<'T'> type
    * Example
    ```
    let left = [1,3,3,3,1]
    let right = [3,1,1,2]

    // Broadcasts two lists
    let output = broadcast <| left <| right
    output // returns broadcated output, which is [1, 3, 3, 3, 2]
    ```

* **zip** (iterables : (tuple of lists) or (list<'list<'T'>'>))
    * type : T -> list<'U'>
    * Merges each element in the iterables to a single list. Each element will be merged as a tuple. For example, [1, 2, 3] and [a, b, c] will be merged as [(1, a), (2, b), (3, c)].
    * Each list in 'iterables' should have same length, or it will cause compile time interpreter error
    * Example
    ```
    let listA = [1,2,3]
    let listB = ["a", "b", "c"]
    let mergedList = zip([listA, listB])
    mergedList // output will be [(1,"a"), (2,"b"), (3,"c")]
    ```

* **max** (a : T, b : T)
    * type : T -> T -> T
    * Gets larger value between a or b.
    * returns T type  

* **min** (a : T, b : T)
    * type : T -> T -> T
    * Gets smaller value between a or b.
    * returns T type
