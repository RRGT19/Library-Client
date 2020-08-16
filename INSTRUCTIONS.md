## Introduction

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

Angular has been used to build the client, making use of some third-party libraries. The client is based on reusable components that increase the maintainability of the application and easy understanding.

## Third-party libraries

- [Bootstrap](https://getbootstrap.com/)
- [Faker](https://github.com/marak/faker.js)

## Rest API

To speed up the development of the client and not have dependence on the advance of the backend that will go to production, we have replicated a Rest API using [Angular in-memory-web-api](https://github.com/angular/in-memory-web-api). This module provides an in memory data store where we can fetch data and simulates a real Rest API backend

Inside the *src/environments/environment.ts* you can find the server API url.

No additional steps are required to start the Rest API. It will start automatically once the client is initialized.

## Routing

When you navigate to a book, for example `http://localhost:4200/book/001/page/2`, we're getting the book code and page number from the url to find exactly what you're looking for.

When we query the Rest API, we are requesting 2 additional pages so that the user can continue reading without experiencing constant loading times. If you request a page greater than 0, we also show you the previous pages so you can navigate.

By default, when opening a book for the first time, page number 0 will be displayed on the screen.

We will show you a message on the screen when a book or page has not been found.

## Logs

We are issuing messages in the console to understand what is happening behind. Especially when reading a book and navigating between its pages.

## Project structure

A structure has been used with the phrase "**Structure the app such that you can locate code quickly**" in mind.

- **Core:** universal components and other features where there’s only once instance per application.
- **Modules:** designated folders for pages- and components.
- **Shared:** where any shared components, pipes/filters, utilities and services should go.

## How to run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

