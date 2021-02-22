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
