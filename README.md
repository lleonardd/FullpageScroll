# Microscripts - FullscreenScroll Framework
**Version 1.0**

----------

##### The `FullscreenScroll` Framework is a simple and efficiant way to change the scrollbehaviour of your HTML page.

### Checkout the [Demo](https://micro-scripts.github.io/FullpageScroll) it includes all Documentation as well

----------

## How it works:

Simply link the Sources and than add the HTML Skeletton. Now just fill out the screen and thats it.
You can adjust the scrollspeed to your liking with the `data-scrollspeed=" "` tag on the .fullscroll element.
If the data tag isn't set, it defaults to 10.

#### Sources
```html
<link rel="stylesheet" href="./FullscreenScrollComp.css">
<script src="./FullscreenScroll.js"></script>
```
#### Skeletton
```html
<div class="fullscroll" data-scrollspeed="10">
    <div class="screen" data-anchorname="Home"></div>
    <div class="screen" data-anchorname="About"></div>
    <div class="screen" data-anchorname="Story"></div>
    <div class="screen" data-anchorname="Contact"></div>
</div>
```

## Progress indicator
Add the progress indicator - code & add the `data-progresstype=" "` to choose what style of progress indicator you want. 
It defaults to the number progress indicator.

You can place the progress indicator code wherever you want. In that way you can just show it on selected screens.
#### Progress indicator - Code
```html
<div class="fullscroll-progress" data-progresstype="bar"></div>
```

#### Progress indicator - Options

Indicator Style | data-progresstype=" "
--- | ---
1 / 4 | number
Loadingbar | bar


## Navigation Options
For the navigation you have two options.

1. Firstly you have the Dot-Navigation which is simply activated by adding the `data-dotNav="true"` tag to the .fullscroll element.

2. Secondly we have the text navigation.
In order to use it you just have to add the `.fullscroll-textnav` class into your navigation like shown below. In this element the links to your screens will automatically be placed. 

```html
<div class="fullscroll-textNav"></div>
```

----------

## Contributors
- Leonard Schedel 

----------
## License & copyright

© Leonard Schedel, Fullstack Webdeveloper

Licensed under the [Apache License 2.0](LICENSE)
