# 薪酬有数 · 综合所得税测算

纯静态网页，可直接发布到 GitHub Pages。无需 Python、Node.js、安装依赖或配置服务器。所有计算在访问者浏览器中完成，输入不上传、不保存。

## 发布为网址（网页操作）

1. 登录 GitHub，点击右上角 **+ → New repository**。
2. 仓库名建议填 `income-tax-calculator`，选择 **Public**，创建仓库。不要上传自己的真实收入数据，页面里的初始数字只是原代码示例。
3. 在仓库页面选择 **uploading an existing file**（已有文件时选择 **Add file → Upload files**）。
4. 解压下载的压缩包，把里面的文件上传到仓库根目录，然后点击 **Commit changes**。不要直接上传 ZIP，也不要把外层文件夹整体套进去。仓库首页应该能直接看到 `index.html`、`app.js` 和 `tax.js`。
5. 打开仓库 **Settings → Pages**。
6. 在 **Build and deployment → Source** 选择 **Deploy from a branch**。
7. **Branch** 选择 `main`，文件夹选择 **/(root)**，点击 **Save**。如果仓库默认分支不是 main，选择存放上述文件的实际分支。
8. 等部署完成后刷新 Pages 页面，点击显示的网址。一般格式为 `https://你的用户名.github.io/income-tax-calculator/`，以 Pages 实际显示的地址为准。

`.nojekyll` 是空标记文件，表示不需要 Jekyll 处理。Windows 可能将它隐藏；即使网页上传时没选中它，本项目的普通 HTML/JS 文件也可发布。

以后修改网页：上传替换对应文件并提交，GitHub Pages 会重新部署。若还是旧页面，尝试强制刷新。

## 常见问题

- **显示 README、404 或没有计算结果**：确认 `index.html` 在所选发布目录根层；`app.js` 和 `tax.js` 与它同层，文件名大小写保持一致。
- **找不到网址**：查看仓库 Actions 中 Pages 部署是否完成，再回 Settings → Pages 查看状态。
- **本地使用**：双击 `index.html`，不需要联网。
- **手机使用**：打开发布网址，页面自动适配窄屏。

## 功能与口径

支持全年工资薪金、劳务报酬、稿酬和全年扣除，推荐工资与奖金分配，支持奖金上限、指定奖金对比、税额明细、税负曲线及打印。

工资薪金总额包含待拆分年终奖；扣除总额包含 60,000 元基本减除费用，不再重复扣除。劳务按 80%、稿酬按 56% 计入综合所得。仅扣个税后收入不等于实际到手收入。

沿用 `code_20260930.py` 的计算公式，以分段端点及相邻分值检查替代固定步长遍历，分配精度 0.01 元。按未舍入税额选优，展示保留两位小数，同税额时优先较小奖金。实际申报以税务系统为准。

页面采用符合条件的居民个人全年一次性奖金单独计税口径，未包含所有收入类型、预缴抵扣及减免。政策链接和适用期限见页面底部。

## 文件

- `index.html`：界面与样式。
- `app.js`：交互与展示。
- `tax.js`：计算逻辑。
- `test.cjs`：可选的开发验证，有 Node.js 时执行 `node test.cjs`，发布和使用均不需要运行。
- `.nojekyll`：静态发布标记。

GitHub 官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
