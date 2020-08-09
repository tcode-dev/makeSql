import Vue from 'vue';

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
        const makeSelectSqlByText = {
            template: '<li id="select1" class="btn" v-on:click="click">Select</li>',
            methods: {
                click: function(){
                    this.$emit('make-sql', 'select!!!');
                }
            }
        };
        const makeInsertSqlByText = {
            template: '<li id="insert1" class="btn" v-on:click="click">Insert</li>',

            methods: {
                click: function(){
                    this.$emit('make-sql', 'insert!!!');
                }
            }
        };
        const makeDeleteSqlByText = {
            template: '<li id="delete" class="btn" v-on:click="click">Delete</li>',

            methods: {
                click: function(){
                    this.$emit('make-sql', 'delete!!!');
                }
            }
        };
        const makeUpdateSqlByText = {
            template: '<li id="update" class="btn" v-on:click="click">Update</li>',

            methods: {
                click: function(){
                    this.$emit('make-sql', 'update!!!');
                }
            }
        };
        const outputSql = {
            props: ['sql'],
            template: '<textarea cols="40" rows="13" id="aftertext" v-bind:sql="sql">{{ sql }}</textarea>'
        };

        new Vue({
            el: '#text-area',
            data(){
                return {
                    sql: ''
                }
            },
            components: {
                'make-select-sql-by-text': makeSelectSqlByText,
                'make-insert-sql-by-text': makeInsertSqlByText,
                'make-delete-sql-by-text': makeDeleteSqlByText,
                'make-update-sql-by-text': makeUpdateSqlByText,
                'output-sql': outputSql,
            },
            methods: {
                receiveSql: function(sql){
                    this.sql = sql;
                }
            }
        });
    }
}

window.Index = Index;
