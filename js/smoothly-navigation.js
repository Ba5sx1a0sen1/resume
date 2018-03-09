!function () {
    var view = View('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function (element) {
            let top = element.offsetTop
            let currentTop = window.scrollY
            let targetTop = top - 80
            let s = targetTop - currentTop
            var coords = { y: currentTop };
            var t = Math.abs((s / 100) * 300)
            if (t > 500) {
                t = 500
            }
            var tween = new TWEEN.Tween(coords)
                .to({ y: targetTop }, 500)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(function () {
                    window.scrollTo(0, coords.y)
                })
                .start();
        },
        bindEvents: function () {
            let aTags = this.view.querySelectorAll('nav.menu > ul > li > a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = function(x) {//可使用箭头函数，箭头函数没有this让其往上查找
                    x.preventDefault()
                    let a = x.currentTarget
                    let href = a.getAttribute('href') // #siteAbout #siteSkills #siteWorks
                    let element = document.querySelector(href) // console.log(a.href)//a.href 带http协议
                    this.scrollToElement(element)
                }.bind(this) //可改造为箭头函数便可不bind
            }
        },
    }
    controller.init(view)
}.call()
