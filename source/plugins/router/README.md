

# core router plugin

A web based router allowing complex state linking and a dynamic rendering tree.

### Properties
* Router `{ReactComponent}`
* get `{Function}`
* set `{Function}`
* remove `{Function}`
* to `{Function}`
* route `{Object}`

## router.Router

A React component that renders the router's resulting DOM tree. 
```jsx
var router = core.plugins.router;

var routes = [{
    name: 'dashboard',
    component: 'Dashboard',
    label: 'dashboard'
},{
    name: 'route-a',
    component: 'RouteA',
    label: 'route A'
}];

const renderApp = () => (
    <router.Router routes={ routes } defaultRoute="dashboard"/>
);  
```

### Props

  * #### routes - { Array }
    A recursive array of route objects. each route object has four possible properties:
    
    1. **name** - the text that will appear in the address bar.
    2. **component** - the name of the component to render for this route.
    3. **children** - ( optionl ) an array of route object, similar to `routes`.
    4. **label** - ( optionl ) a text label ( or translation key ) to render a route's name inside the application.

    ```js
    var routes = [{
        name: 'dashboard',
        component: 'Dashboard',
        label: 'dashboard',
        children: [{
            name: 'route-a',
            component: 'RouteA',
            label: 'route A'
        }]
    }];

    <router.Router routes={ routes } defaultRoute="/dashboard/route-a"/>
    ```

  * #### defaultRoute - { String }
    A string to use as a default address. this address will be used if the router cannot resolve the address bar's url.

  * #### onNavigation - { Function }
    A function to be called after every navigation ( both programmatic navigation and manual user navigation ).

    ```js
    <router.Router onNavigation={ route => console.log(route) }/>
    ```

  * #### components - { object }
    A key-value set of named components to use. the router will try to match the 'component' property on route objects to a component on this object. defaults to `core.components`.

    ```js
    <router.Router onNavigation={ route => console.log(route) }/>
    ```

## router.get(key)

Get a value of a query property in the router's query object.

```js
var router = core.plugins.router;

location.hash = `#/dashboard/{ "stuff": 45, "nested": { "value": 13, "array": ["koko", "loko"] } }`;

router.get('stuff'); // 45
router.get('nested.value'); // 13
router.get('nested.array.1'); // 'loko'
```

## router.set(key, value);

Set a query property value in the router's query object.

```js
var router = core.plugins.router;

router.set('stuff', 18);
router.set('nested.value', 88);
router.set('nested.array.1', 'dynamic');

location.hash; // #/dashboard/{"stuff":18,"nested":{"value":88,"array":["koko","dynamic"]}}
```

## router.remove(key, ...keys);

Removes a query property from the router's query object.

```js
var router = core.plugins.router;

location.hash; // #/dashboard/{"stuff":18,"nested":{"value":88,"array":["koko","dynamic"]}}

// remove 'stuff' from the query object
router.remove('stuff');

location.hash; // #/dashboard/{"nested":{"value":88,"array":["koko","dynamic"]}}
```

## router.to(url, [query], [silent]);

Routes to a new address.
the first argument is a string url containing only the 'route' part of the address. the second optional argument is an object that will be JSON stringified and will become the 'query' part of the address.
The `silent` flag should not be used externally as it will change the routing stack without affecting the url in the browser's address bar. 

```js
var router = core.plugins.router;

router.to('/route-a', { userId :5 });

location.hash; // #/route-a/{"userId":5}
```

