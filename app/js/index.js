import Vue from 'vue';

var app = new Vue({
    el: '#aftertext',
    data: {
      message: 'Hello Vue!'
    }
});
setTimeout(() => {
    app.message = 'test';
}, 5000);

