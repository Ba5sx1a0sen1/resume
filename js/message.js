!function () {
    var view = document.querySelector('section.message')
    var model = {
        init: function () {
            var APP_ID = 'RP5jB6H5do4sn5yIDjUcaJ1X-gzGzoHsz';
            var APP_KEY = '4UzFg7PmGSk8n4Kd49sjYnw4';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: function () { //获取数据
            var query = new AV.Query('Message');
            return query.find() //Promise对象
        },
        //保存数据
        save: function (name, content) {
            let Message = AV.Object.extend('Message')
            let message = new Message()
            return message.save({ //Promis对象
                'name': name,
                'content': content
            })
        }
    }
    var controller = {
        view: null,
        messageList: null,
        form: null,
        model:null,
        init: function (view,model) {
            this.view = view
            this.model = model
            this.model.init()            
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            var query = new AV.Query('Message');
            this.model.fetch().then((messages) => {
                let array = messages.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}：${item.content}`
                    this.messageList.appendChild(li)
                })
            })
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault() //阻止默认事件防止刷新页面
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name,content).then(function (object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}：${object.attributes.content}`
                this.messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value=''
                console.log(object)
            })
        }
    }
    controller.init(view,model)
}.call()






