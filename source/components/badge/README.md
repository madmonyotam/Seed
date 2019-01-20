# Component Badge
## Description: 
`Display a badge with formatted number`
### Unique Properties:
| Property | Type | Decription |
| -------- | ---- | ---------- |
| amount | Number | the amount of items to display |
| style | Object | the style object for the root element |
| tooltipStyle | Object | the style object for the tooltip element |
| tooltipLabelStyle | Object | the style object for the tooltip label element |
| tooltipTheme | String | the tooltip theme color: light / dark |
| renderTooltipArrow | Boolean | whether to show an arrow for the tooltip |
| tooltipPosition | String | the position of the tooltip |
| tooltipSize | String | the size of the tooltip |
| showZero | Boolean | whether to show the badge or not when the amount value is zero |
| isPercentage | Boolean | whether to show the badge amount as a number or percent |
| backgroundColor | String | the color code for the badge background |
| color | String | the color code for the badge text |

### Usage example : 
```javascript
    <Badge 
        amount={500000} 
        tooltipTheme='light'
        renderTooltipArrow='top-left'
        tooltipSize='small'
        showZero={true}
    >{''}</Badge>
```