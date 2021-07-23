let active;
let watch = function (cb) {
    active = cb;
    active()
    active = null;
};
//  队列
let queue = [];
let nexTick = (cb) => Promise.resolve().then(cb)

//  队列添加任务
let queueJob = job => {
    if (!queue.includes(job)) {
        queue.push(job)
        nexTick(flushJobs)
    }
}

//  执行队列任务
let flushJobs = () => {
    let job;
    while ((job = queue.shift()) !== undefined) {
        job()
    }
}


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
        this.deps.forEach(dep => queueJob(dep));
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

let x = ref(1)
let y = ref(2)
let z = ref(3)

watch(() => {
    let tpl = `hello ${x.value} ${y.value} ${z.value} ...`
    console.log(tpl)
    document.write(tpl);
})

x.value = 2;
y.value = 2;
z.value = 2;



