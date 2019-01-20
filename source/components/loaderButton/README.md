# Loader button

**based on the Material-UI flat & raised buttons with custom features.**

### Features:
  - Disable button on click.
  - Display loader while running the callback function.
  - Can render a flat or raised button.
  - optionally can render an icon alongside the label.

## Available Props:

| Prop | Type | Purpose | Required
| ------ | ------ | ------ | ------ |
| label | String | Label for the button | Yes |
| onSubmit | Function | callback function to run on click | Yes |
| flat | Boolean | If true, the button will render as flat button, otherwise it will render as raised button | Yes |
| icon | Node | Render an icon alongside the label (optional) | No |

##### For more built-in options please refer to the Material-UI docs:
 - Flat Button: <http://www.material-ui.com/#/components/flat-button>
 - Raised Button: <http://www.material-ui.com/#/components/raised-button>

## Usage:
**Clicked function:**
```javascript
submit(callback){
    ...             //some process to run when clicked
    callback();     //the callback automatically stops the loader when process is ended
}
```
**Button element:**
```javascript
<LoaderButton 
    secondary={true} 
    flat={true} 
    onSubmit={this.test} 
    icon={<FontIcon className='fa fa-facebook' />} 
    label='clickMe' 
/>
```