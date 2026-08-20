---
title: "What is [[no_unique_address]] in C++?"
description: "A look at how C++ can have byteless allocators"
date: 2026-08-18
---

Let's say we want to have a button, with an `on_click` function.
In C, we can use a function pointer, like so:
```c
struct button {
    int id;
    void (*on_click)(void)
}
```