module.exports = {
    title: 'Hello Lx-UI',
    description: 'Just playing around',
    themeConfig: {
        sidebar: [
            {
                title: '动态组件',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    { title: '表单', path: '/form/' },
                    { title: '表格', path: '/table/' }
                ]
            }
        ],
        nav: [
            {
                text: '概述',
                link: '/'
            },
            {
                text: 'github',
                link: 'https://github.com'
            },
            {
                text: 'Vue 学习笔记',
                items:[
                    {text:'笔记', link: '/guide/vue/test03'}, // 可不写后缀 .md
                    {text:'其它链接', link: 'https://www.baidu.com/'}// 外部链接
                ]
            }
        ]
    }
}