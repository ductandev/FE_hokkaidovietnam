<p align="center">
  <img width="100%" src="https://readme-typing-svg.herokuapp.com?font=Time+New+Roman&color=blue&size=20&center=true&vCenter=true&width=600&height=100&lines=HokaidoVietNam+Frond+End+App;made+with+♡+by+Front+End+team;">
</p>

<img src="https://file.hstatic.net/200000040794/file/screen_shot_2022-08-19_at_5.59.54_pm_46ae1dc1f01049bf8fe6c5bb711cb18e.png" />


# !1. Bắt đầu với Create React App
Dự án được tạo bởi [Create React App](https://github.com/facebook/create-react-app).\
Cấu hình webpack add-on bởi [Craco](https://craco.js.org/).\
Thư viện UI được sử dụng [Shadui](https://ui.shadcn.com/).

# !2. CLI
Ở root thư mục

### `npm start`

Khởi động dự án với development mode.\
Chạy [http://localhost:3000](http://localhost:3000) để mở dự án.

### `npx shadcn-ui@latest add [component]`

Component là tên component cần thiết sẽ được thêm vào khi dự án.

Ví dụ: `npx shadcn-ui@latest add button`


# !3. HOW TO USE GIT
    - TODO: KHÔNG ĐƯỢC PUSH CODE **master** && **develop**
    - Branch & quy tắc đặt tên:
        - master:
            - Chứa source stable đã release, source code được release lên môi trường Production
            - Khi phát triển 1 chức năng mới => source sẽ được lấy từ branch này.
            - Khi hotfix 1 issue => source sẽ được lấy từ branch này.

        - develop:
            - Chứa source các feature trong quá trình develop.
            - Source code ở branch này sẽ được build và deploy thường xuyên lên môi trường Develop

        - feature/XXX_YYY
            - Khi phát triển 1 chức năng thì tạo branch name có format như trên.
            - Trong đó:
                + XXX: Action - New, Update, Delete, Search, List
                + ZZZ: Object - Ex: User, ...

            - Ví dụ:
                feature/add_user

    - Môi trường Production
      - Các branch feature đã hoàn thành merge vào branch develop
      - Các branch hotfix đã fixed đã hoàn thành merge vào branch develop 

## 3. Commit Message Header theo chuẩn

Theo chuẩn 1 Commit Message Header sẽ theo cấu trúc như sau:

```sh
  type(scope?): subject . refs?
```

### type

- <strong>build</strong>: Changes that affect the build system or external dependencies (ex scopes: gulp, broccoli, npm)
- <strong>ci</strong>: Changes to our CI configuration files and scripts ( ex scopes:Gitlab CI, Circle)
- <strong>chore</strong>: Add something without touching production code (Eg:update npm dependencies)
- <strong>docs</strong>: Documentation only changes
- <strong>feat</strong>: A new feature
- <strong>fix</strong>: A bug fix
- <strong>perf</strong>: A code change that improves performance
- <strong>refactor</strong>: A code change that neither fixes a bug nor adds a feature
- <strong>revert</strong>: Reverts a previous commit
- <strong>style</strong>: Changes that do not affect the meaning of the code (Eg:adding white-space, formatting, missing semi-colons, etc)
- <strong>test</strong>: Adding missing tests or correcting existing tests
- <strong>vendor</strong>: Update npm package version

### scope

- Optional, và nếu có thì nó nên là tên của package mà commit hiện tại làm ảnh hưởng.
- Scope thường dùng ở các repository mà chứa nhiều packages dạng monorepo.