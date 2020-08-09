import Vue from 'vue';
import TextPage from './page/text/Index.vue';

class Index {
    init() {
        const fileSql = new Vue({
            el: '#output',
            data: {
                list: [
                    {
                        title: 'title',
                        fileName: 'sql1',
                        sql: 'text',
                    }
                ]
            }
        });

        new Vue(TextPage);
    }
}

window.Index = Index;
