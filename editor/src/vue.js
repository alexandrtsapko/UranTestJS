const App = {
    data() {
        return {
            editorContent: '',
        };
    },
    methods: {
        applyList() {
            document.execCommand('insertUnorderedList');
        },
        applyOrderedList() {
            document.execCommand('insertOrderedList');
        },
        applyBold() {
            document.execCommand('bold');
        },
        applyItalic() {
            document.execCommand('italic');
        },
        applyLink() {
            const url = prompt('Введіть посилання:');
            if (url) {
                document.execCommand('createLink', false, url);
            }
        },
        updateContent(event) {
            this.editorContent = event.target.innerHTML;
        },
    },
};

const vm = Vue.createApp(App);
vm.mount('#app');