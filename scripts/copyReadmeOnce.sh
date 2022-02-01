# 由于 config.ts 中的异步 watch 无法保证在 build 前运行完，因此必须确保在那之前复制完毕

mkdir -p docs/themes/
cp -f packages/theme-ribbon/README.md docs/themes/ribbon.md
cp -f packages/theme-sparkler/README.md docs/themes/sparkler.md
cp -f packages/theme-popper/README.md docs/themes/popper.md
cp -f packages/theme-sakura/README.md docs/themes/sakura.md
