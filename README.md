# Ftool

常用工具函数

# 发布包到 GitHub

-   登录

    ```
    npm login --scope=@OWNER --registry=https://npm.pkg.github.com
    ```

-   密码使用的是 GitHub 的 token
-   package.json 添加如下

    ```
    "publishConfig": {
        "registry": "https://npm.pkg.github.com"
    }
    ```

-   最后 npm publish 即可发布到 GitHub package
