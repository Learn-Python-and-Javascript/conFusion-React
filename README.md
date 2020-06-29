This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> Coursera [course](https://www.coursera.org/learn/front-end-react/home/welcome) 
>public repo: https://github.com/jmuppala/conFusion-React

## lint

采用了 [airbnb 的 ESLint 配置](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb),
前端 `eslint-config-airbnb`，后端为 `eslint-config-airbnb-base`，lint 过程中分而治之，将暂不需要的文件目录添加到 `.eslintignore` 
中，并将 lint 命令写入脚本：`"lint": "eslint ."`，提高的 lint 效率

## Heroku

最新项目由阿里云 ECS 迁移到 [heroku](https://www.heroku.com/) 平台，自动化脚本部署简化了部署过程：
```json
{
  "scripts": {
      "build:ui": "cd path/to/front-end && yarn build --prod && cp -r build path/to/back-end",
      "deploy": "git push heroku master",
      "deploy:full": "yarn build:ui && git add . && git commit -m uibuild && yarn deploy",
      "logs:prod": "heroku logs --tail"
    }
}
```