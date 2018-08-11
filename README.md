# canvascondense
Compress image to DataUrl with canvas for upload

Installation
------------
TypeScript
```
# Install NPM module.
npm install --save canvascondense
```
Usage
------------
# Demo in VUE
------------
```
<template>
    <div>
        <input type="file" name="picture" onchange="compress(event)"/>
    </div>
</template>
<script>
    import cvscds from 'canvascondense';
    export default{
        methods:{
            compress(){
                new cvscds(event.target, {
                    maxpix: 1000,
                    qulity: 0.8
                }).compress().then((DataUrl) => {
                    //You can post the DataUrl data to server api and save as image right here
                }).catch((err) => {
                    //err
                });
            }
        }
    }
</script>
```
------------
#Demo in Browser
------------
```
#Html
<input type="file" name="picture" onchange="compress(event)"/>

#Javascript
<script src="./js/canvascondense.min.js"></script>
<script type="text/javascript">
    var changecallback = function (event) {
        new canvascondense(event.target, {
            maxpix: 1000,
            qulity: 0.8
        }).compress().then((DataUrl) => {
            //You can post the DataUrl data to server api and save as image right here
        }).catch((err) => {
            //err
        });
    }
</script>
```