let x;
let y;
let active;
let f = n => n * 100 + 100;
let onXChange = function (cb) {
    active = cb;
    active()
    active = null;
};

//  依赖收集
class Dep {
    deps = new Set();

    // 依赖收集的方法
    depend() {
        if (active) {
            this.deps.add(active)
        }
    }

    // 执行依赖收集的方法
    notify() {
        this.deps.forEach(dep => dep());
    }
}

let ref = initValue => {
    let value = initValue;
    let dep = new Dep();
    return Object.defineProperty({}, 'value', {
        get() {
            dep.depend()
            return value
        },
        set(newValue) {
            value = newValue;
            dep.notify()
        }
    })
}

x = ref(1)

onXChange(() => {
    y = f(x.value)
    console.log(y);
})

x.value = 2;
x.value = 3;

