/**                               公用方法开始                 **/
const isTap = (self) => {
    if (self.disabled) {
        return false;
    }
    var tapObj = self.tapObj;
    return self.time < 300 && Math.abs(tapObj.distanceX) < 10 && Math.abs(tapObj.distanceY) < 10;
}

const touchstart = (e, self) => {
    var touches = e.touches[0];
    var tapObj = self.tapObj;
    tapObj.pageX = touches.pageX;
    tapObj.pageY = touches.pageY;
    tapObj.clientX = touches.clientX;
    tapObj.clientY = touches.clientY;
    self.time = +new Date();
}

const touchend = (e, self) => {
    var touches = e.changedTouches[0];
    var tapObj = self.tapObj;
    self.time = +new Date() - self.time;
    tapObj.distanceX = tapObj.pageX - touches.pageX;
    tapObj.distanceY = tapObj.pageY - touches.pageY;

    if (!isTap(self)) return;
    self.handler(e);
}

/**                               公用方法结束                 * */

export default {
    bind (el, binding) {
        el.tapObj = {};
        el.handler = (e) => { //This directive.handler
            var value = binding.value;

            if (!value && el.href && !binding.modifiers.prevent) {
                return window.location = el.href;
            }

            value.event = e;
            var tagName = value.event.target.tagName.toLocaleLowerCase();
            value.tapObj = el.tapObj

            if (tagName === 'input' || tagName === 'textarea') {
                return value.event.target.focus();
            }

            value.methods.call(this, value);
        };
        el.addEventListener('touchstart', (e) => {
            if (binding.modifiers.stop)
                e.stopPropagation();
            if (binding.modifiers.prevent)
                e.preventDefault();
            touchstart(e, el);
        }, false);
        el.addEventListener('touchend', (e) => {
            try {
                Object.defineProperty(e, 'currentTarget', { // 重写currentTarget对象 与jq相同
                    value: el,
                    writable: true,
                    enumerable: true,
                    configurable: true
                })
            } catch (e) {
                // ios 7下对 e.currentTarget 用defineProperty会报错。
                // 报“TypeError：Attempting to configurable attribute of unconfigurable property”错误
                // 在catch里重写
                console.error(e.message)
                e.currentTarget = el
            }
            if (!binding.modifiers.open) {
                e.preventDefault();
            }
            if (binding.modifiers.stop) {
                e.stopPropagation();
            }
            if (binding.modifiers.prevent) {
                e.preventDefault();
            }
            

            return touchend(e, el);
        }, false);
    },
    componentUpdated (el, binding) {
        el.tapObj = {};
        el.handler = function(e) { //This directive.handler
            var value = binding.value;
            if (!value && el.href && !binding.modifiers.prevent) {
                return window.location = el.href;
            }
            value.event = e;
            value.tapObj = el.tapObj;
            value.methods.call(this, value);
        };
    },
    unbind (el) {
        // 卸载，别说了都是泪
        el.handler = function() {};
    }
};