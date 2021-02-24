# git push 出现 443 错误

-   原因：GitHub 被墙了，提交要翻墙
-   解决：在 git 配置文件中添加自己的 fq 端口,如下：

.git/config

```
[http]
	proxy = 127.0.0.1:7890
```

# 第一次发布包到 npm 出现无权限

-   解决：需明确添加 --access public 发布为公共包

```
npm publish --access public
```

# 在 jest 中使用 typescript 和 ESmodule

1. package.json 中 使用 type="module"
2. bable 配置使用 cjs 后缀，即 babel.config.cjs

```js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-typescript',
    ],
};
```

3. jest 配置同样使用 cjs 后缀，即 jest.config.cjs

```js
module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/'],
};
```

最后测试文件即可使用 esmodule 语法写测试代码
