---
title: "What is [[no_unique_address]] in C++?"
description: "A look at how C++ can have byteless allocators"
date: 2026-08-18
---

## **Context**

Let's say we want to have a button, with an `on_click` function. In C, we can use a function pointer, like so:
```c
struct button {
    void (*on_click)(void);
    int id;
}
```

The size of our struct comes out to be 16 bytes
- 8 for the on_click pointer
- 4 for the id
- 4 padding

This is standard C, and there is nothing inherintly wrong with the struct. With that being
said, that pointer is taking up 8 bytes on its own, not to mention increasing the alignment
of our struct. In C++, this can be optimized away, but it might not be how you'd expect.

## **C -> C++**

In C++, we have a couple different ways we can add on_click functionality to our button
objects. The modern way of going about storing functions in a class as a member is by
using std::function. If we implement this in our struct, it would look something like

```cpp
#include <functional>

struct button {
    std::function<void()> on_click;
    int id;
};
```

However, the size of our button class now ballooned to 40 bytes!
- 32 for on_click
- 4 for id
- 4 for padding (alignment coming from on_click)

We are now worse off than the previous C example in terms of byte usage. If we try
using the ``virtual`` keyword, we would end up having to deal with inheritance
and the overhead which comes with it. 

The solution? [[no_unique_address]]

## **[[no_unique_address]]**
```cpp
template<typename OnClickFn>
struct button {
    int id;
    [[no_unique_address]] OnClickFn on_click;
};
```

Where ``OnClickFn`` is a stateless functor. Our struct has now dropped to a dazzling 4 bytes!
Wow, in a world where 8GB of ram is too little, we still managed to make our pointless
program just a little lighter - that's what low(er) level programming is all about. But as we know,
the size of an empty object (class/struct) is 1 byte. So, just HOW can an OnClickFn functor
object take up 0 bytes. 

## **How does it work?**
TODO!

## **Actual application**
In all seriousness, this does have some real use cases outside of just being a cool CS party
trick. Take ``std::unique_ptr`` for example. One of the most commonly used containers in the 
STL library. In order to store a custom deleter, without making the class larger in size,
``std::unique_ptr`` implements its Deleter functor via this idea of [[no_unique_address]] (actually
it is implemented using a compressed pair and EBCO, but it still falls under the same concept).
Also, ``vector`` uses [[no_unique_address]] for they're custom allocators.
