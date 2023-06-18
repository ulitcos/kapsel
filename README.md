# kapsel

Data and service information in one capsule.

## Installation

```bash
npm i kapsel
```

## Usage

````javascript
const kapsel = new Kapsel('Init Data');

kapsel.subscribe(({isLoading, data}) => {
    console.log({isLoading, data});
});

const provider = {
    get: () => {
      return new Promise((res) => setTimeout(() => res('Useful data'), 1000))
    }
};

kapsel.fill(provider.get());

// console.log shows:
// {isLoading: true, data: 'Init Data'}

// one second later console.log shows  
// {isLoading: false, data: 'Useful data'}
````

## Params
`initial: any` - default value

`defer?: () => Promise<any>` - will be called when the data is read for the first time. Works only one time

## API
`data: any` - current data

`prev: any` - previous data

`isLoading: boolean` - is in the process of filling in

`error: Error | null` - filling process error

`hasError: boolen` - true if error not null

`fill: (promise: Promise<any>) => void` - method for filling with data

`subscribe: (kapsel: Kapsel) => void` - adds a callback that will be called for any state change

`unsubscribe: (kapsel: Kapsel) => void` - removes the callback


