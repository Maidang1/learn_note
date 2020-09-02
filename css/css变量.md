###### css 变量

#### 基础用法

```html
<style>
  body {
    --primary-color: red;
    --PRIMARY-COLOR: green;
  }
  main {
    --primary-color: blue;
  }
  .text-primary {
    color: var(--primary-color);
  }
  <div>red</div>
  <main>blue</main>
</style>
```

#### 全局使用 css 变量

```html
<style>
  :root {
    --border-radius: 5px;
    --box-shadow: 2px 2px 10px;
    --color: #118bee;
    --color-accent: #118bee0b;
    --color-bg: #fff;
    --color-bg-secondary: #e9e9e9;
    --color-secondary: #920de9;
    --color-secondary-accent: #920de90b;
    --color-shadow: #f4f4f4;
    --color-text: #000;
    --color-text-secondary: #999;
    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    --hover-brightness: 1.2;
    --justify-important: center;
    --justify-normal: left;
    --line-height: 150%;
    --width-card: 285px;
    --width-card-medium: 460px;
    --width-card-wide: 800px;
    --width-content: 1080px;
  }
</style>
<script>
  // js和css变量交互
  document.body.style.setProperty(("--primary-color": "red"));
</script>
```

#### 新媒体查询

```html
<style>
  /** 移动优先的样式规则 */
  .breakpoints-demo > * {
    /** 小于 37.5em, 宽度 100%  */
    --xs-width: var(--media-xs) 100%;

    /** 小于 56.249em, 宽度 49%  */
    --sm-width: var(--media-sm) 49%;

    --md-width: var(--media-md) 32%;
    --lg-width: var(--media-gte-lg) 24%;

    width: var(--xs-width, var(--sm-width, var(--md-width, var(--lg-width))));

    --sm-and-down-bg: var(--media-lte-sm) red;
    --md-and-up-bg: var(--media-gte-md) green;
    background: var(--sm-and-down-bg, var(--md-and-up-bg));
  }
</style>
```

#### css-media-vars

```html
<style>
  /**
 * css-media-vars
 * BSD 2-Clause License
 * Copyright (c) James0x57, PropJockey, 2020
 */

  html {
    --media-print: initial;
    --media-screen: initial;
    --media-speech: initial;
    --media-xs: initial;
    --media-sm: initial;
    --media-md: initial;
    --media-lg: initial;
    --media-xl: initial;
    /* ... */
    --media-pointer-fine: initial;
    --media-pointer-none: initial;
  }

  /* 把当前变量变为空值 */
  @media print {
    html {
      --media-print: ;
    }
  }

  @media screen {
    html {
      --media-screen: ;
    }
  }

  @media speech {
    html {
      --media-speech: ;
    }
  }

  /* 把当前变量变为空值 */
  @media (max-width: 37.499em) {
    html {
      --media-xs: ;
      --media-lte-sm: ;
      --media-lte-md: ;
      --media-lte-lg: ;
    }
  }
</style>
```
