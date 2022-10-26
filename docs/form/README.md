# Form 组件

## API
### config
___注意：___  
在template中使用的时候应用变量进行赋值，不可直接把值写在template模板中，  
如果直接写在模板中，每一次模板更新的时候，该值都是一个全新的值，不断触发更新机制，导致组件内部逻辑形成死锁。

<font face="courier New" color=	gree size=5>正确</font>
```vue
<template>
  <div>
    <lx-form :config="config">

    </lx-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      config: [{ label: '名称', type: 'input', filed: 'name' }]
    }
  }
}
</script>
```


<font face="courier New" color=	red size=5>错误</font>
```vue
<template>
  <div>
    <lx-form :config="[{ label: '名称', type: 'input', filed: 'name' }]"></lx-form>
  </div>
</template>

```


该组件接收一个JSON类型的数组数据

```js
[
    { 
        label: '姓名',
        type: 'input',
        filed: 'name',
        span: 12,
        style: { width: '100%', },  
        classList: [
            'main-input'
        ],
        props: {
            value: ''
        },
        attrs: {
            placeholder: '请输入姓名'
        },
        on: {
            input: (val) => {
                console.log('val', val)
            },
            blur: (e) => {
                console.log('blur', e)
            }
        },
        ...
    }
]
```

### config 遵循使用常用的字段名称习惯
具体config属性
```js
{
    label: 'xxx', // form-item 的 label
    filed: 'xxxx', // 必填项 表单数据对象的字段名
    type: 'input', // 必填项 表单输入控件的类型，如：文本框：input、下拉选择框：select
    props: 'xxx', //  表单输入控件的 props
    span: 24, // 栅格化的 row > col 的 span 配置
    style: { // 样式
        width: '200px',
        marginLeft: '40px'
    },
    classList: ['default', 'text-center'], // 样式类名 
    options: [ // 当 type 为 select之类的需要配置数据的类型时的数据
        { label: '已选', value: 1 },
        { label: '未选', value: 0 }
    ],
    attrs: { // dom的原生属性
        placeholder: '请输入姓名'
    },
    on: { // 表单暴露的API方法
        change: (val) => {}
    },
    tips: String | Object // Object: { text:'我是注释', style: {} }
}
```

### Props属性
#### props 在 createElement 函数的标准上添加了一些新的属性，基本使用可以到VUE官网中查看 createElement函数的传参方式。
Vue2 createElement <br><https://v2.cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1>

####新的属性
新的属性根据 type属性的值不同，也会不同，也就是不同的type会使用不同的props的属性。

__type: 'digit-select'__  
数值选择器
`实例`
```js
{
    label: '奖励发放日期',
    type: 'digit-select',
    filed: 'dates',
    props: {
        range: [1, 31], // 数值范围， 从1开始进行递增，一直到31
        step: 1, // 递增数值，默认为1
        precision: 2, // 数值精度
        width: '500px' // 组件宽度
    }
}
```
__type: 'uploadImg'__  
图片，列表、上传。`实例`
```js
{
    label: '各类证件',
    type: 'uploadImg',
    filed: 'papers',
    props: {
      value: [], // Array（多张图片） | String（单张图片）
      isMulti: true, // 是否多选
      delConfirm: false, // 点击右上角删除按钮时是否显示确认
      limit: 6, // 可上传图片数量上限
      limitMessage: '', // 超过上限消息
      width: '155px', // 图片框宽度
      height: '255px', // 图片框高度
      limitWidth: 48, // 上传图片指定宽度
      limitHeight: 48, // 上传图片指定高度
      limitHeightRange: [48, 96], // 上传图片宽度指定范围
      limitWidthRange: [48, 96], // 上传图片高度指定范围
      restrictMessage: '', // 不符合限制条件的消息
      tips: { // 组件注释
        text: '测试拖拽'
      },
      accept: 'jpg,png', // 限制上传类型后缀
      acceptMessage: '' // 不符合限制上传类型的消息
}
```
__type: 'input-number'__  
数字输入框`实例`
```js
{
      label: '薪资',
      type: 'input-number',
      filed: 'pay',
      props: {
        value: '',
        controls: false
      },
      leftText: '每个月', // String | Object，数字输入框左边文字
      rightText: { // String | Object，数组输入框右边文字
        text: '元',
        style: {
          color: 'red'
        }
      },
      attrs: {
        placeholder: '请输入年龄'
      },
      tips: '每个月发放'
}
```


<br>

### type 类型
text 纯文本<br>
select 下拉框<br>
input-number 数字<br>
cascader 穿梭框<br>
uploadImage 上传图片<br>
radio / radioButton 单选 / 单选按钮<br>
checkbox / checkboxButton 多选 / 多选按钮<br>

### Event， on事件监听
```
{
    on: {...}
}
```
也是在原有的on基础上进行处理，本form组件为了业务方便，提供了一些新的event事件，根据type的不同，调用不同的on事件。

__type: Select__

提供一个新的Event：select
```
    on: {
        select: (item) => {
            // item 选中的 option 数据
        }
    }
```

# 自定义
自定义分两种，一是整体render，二是formItemRender  
function 类型，参数 h（createElement），参数2 form（form数据对象）  
render：
```
{   
    // label: '名字',
    // filed: 'name',
    render (h, form) {
        return <div>我占据了这一行<div>
    },
    // options: []
}
  
```
render 会覆盖整个formItem，所以其他属性可以不填写

formItemRender：
```
    formItemRender (h, form) {
        return <input />
    }
```
formItemRender 保留了label标题部分，只覆盖该行表单内容

### 查询config里的某个配置
查询config的配置，可以用于修改我们想要修改配置的属性值，例如disabled = true，改为 false

可以通过 ref 的方式调用组件内部的 searchConfig 函数
searchConfig({ key: 'filed', value: 'name' })

就可以找到 属性名：filed，值：name 的这一项配置，直接修改想要修改的属性即可
