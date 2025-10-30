import { parse } from "marked";

/**
 * 包裹 h1~h6 的辅助函数，生成分组样式卡片
 */
function cardWrapper(html) {
    const group = html
        .replace(/<h1/g, ':::<h1')
        .replace(/<h2/g, ':::<h2')
        .replace(/<h3/g, ':::<h3')
        .replace(/<h4/g, ':::<h4')
        .replace(/<h5/g, ':::<h5')
        .replace(/<h6/g, ':::<h6')
        .split(':::');

    return group
        .map((fragment) => {
            if (fragment.includes('<h3')) {
                return `<div class="card">${fragment}</div>`;
            }
            return fragment;
        })
        .join('');
}

// 在文件级作用域初始化 marked 配置，防止重复创建
const renderer = new marked.Renderer();
marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
    xhtml: true,
});

export default function markdownLoader(markdown) {
    const options = this.getOptions();
    console.log(6666)
    return parse(markdown, options);
}