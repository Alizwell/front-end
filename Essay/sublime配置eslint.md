# sublime 配置eslint
>sublime支持eslint检查需要安装如下两个插件，sublimeLinter和sublineLinter-eslint

``CTRL + SHIFT + P`` 然后搜索上面的两个插件安装即可

之后在preferences->package-settings->SublimeLinter->settings中，添加如下配置
```
// SublimeLinter Settings - User
{
    "debug": true,
    "delay": 0.25,    
    "gutter_theme": "Packages/SublimeLinter/gutter-themes/Default/Default.gutter-theme",    
    "lint_mode": "load_save",
    "linters": {
        "eslint": {
            "@disable": false,
            "args": [],
            "excludes": []
        },
        "eslint_d": {
            "@disable": false,
            "args": [],
            "excludes": []
        }
    },    
    "no_column_highlights_line": false,    
    "paths": {
        "linux": [],
        "osx": [],
        "windows": []//此处不用写目录默认会找到
    },        
    "show_marks_in_minimap": true,
    "syntax_map": {
        "html (django)": "html",
        "html (rails)": "html",
        "html 5": "html",
        "javascript (babel)": "javascript",
        "magicpython": "python",
        "php": "html",
        "python django": "python"
    }    
}

```
>以上配置是本人严格测试的，网上的一些资料给的配置控制台是会报错的，具体原因未知。

之后我们打开js文件就会发现有语法检测了，当然我们也可以自己在项目文件夹中自定义我们的语法检测规则，方法就是添加.eslintrc.js文件（或则.eslintrc.json）,这里给出我自己使用的配置文件，具体详细的配置请参考官方文档（http://eslint.cn/ ）。

```
module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "allowImportExportEverywhere": true,
        "codeFrame": false
    },
    "env": { "browser": true, "commonjs": true, "es6": true, "jquery": true },
    "rules": {
        "semi": 2,
        "strict": 0,
        "no-extra-boolean-cast": 1,               //多余的感叹号转布尔型
        "no-extra-semi": 1,                       //多余的分号
        "no-extra-parens": 1,                     //多余的括号
        "no-empty": 1,                            //空代码块
        "no-use-before-define": [1, "nofunc"],    //使用前未定义
        "complexity": [1, 10],                    //圈复杂度大于10 警告

        //常见错误
        "comma-dangle": [2, "never"],             //定义数组或对象最后多余的逗号
        "no-debugger": 2,                         //debugger 调试代码未删除
        "no-constant-condition": 2,               //常量作为条件
        "no-dupe-args": 2,                        //参数重复
        "no-dupe-keys": 2,                        //对象属性重复
        "no-duplicate-case": 2,                   //case重复
        "no-empty-character-class": 2,            //正则无法匹配任何值
        "no-invalid-regexp": 2,                   //无效的正则
        "no-func-assign": 2,                      //函数被赋值
        "valid-typeof": 2,                        //无效的类型判断
        "no-unreachable": 2,                      //不可能执行到的代码
        "no-unexpected-multiline": 2,             //行尾缺少分号可能导致一些意外情况
        "no-sparse-arrays": 2,                    //数组中多出逗号
        "no-shadow-restricted-names": 2,          //关键词与命名冲突
        // "no-undef": 2,                            //变量未定义
        "no-unused-vars": 2,                      //变量定义后未使用
        "no-cond-assign": 2,                      //条件语句中禁止赋值操作
        "no-native-reassign": 2,                  //禁止覆盖原生对象

        //代码风格优化
        "no-else-return": 1,                      //在else代码块中return，else是多余的
        "no-multi-spaces": 1,                     //不允许多个空格
        "key-spacing": [1, {"beforeColon": false, "afterColon": true}],//object直接量建议写法 : 后一个空格前面不留空格
        // "block-scoped-var": 2,                    //变量应在外部上下文中声明，不应在{}代码块中
        "consistent-return": 2,                   //函数返回值可能是不同类型
        "accessor-pairs": 2,                      //object getter/setter方法需要成对出现
        "dot-location": [2, "property"],          //换行调用对象方法  点操作符应写在行首
        "no-lone-blocks": 2,                      //多余的{}嵌套
        "no-empty-label": 2,                      //无用的标记
        "no-extend-native": 2,                    //禁止扩展原生对象
        "no-floating-decimal": 2,                 //浮点型需要写全 禁止.1 或 2.写法
        "no-loop-func": 2,                        //禁止在循环体中定义函数
        "no-new-func": 2,                         //禁止new Function(...) 写法
        "no-self-compare": 2,                     //不允与自己比较作为条件
        "no-sequences": 2,                        //禁止可能导致结果不明确的逗号操作符
        "no-throw-literal": 2,                    //禁止抛出一个直接量 应是Error对象
        "no-return-assign": [2, "always"],        //不允return时有赋值操作
        "no-redeclare": [2, {"builtinGlobals": true}],//不允许重复声明
        "no-unused-expressions": [2, {"allowShortCircuit": true, "allowTernary": true}],//不执行的表达式
        "no-useless-call": 2,                     //无意义的函数call或apply
        "no-useless-concat": 2,                   //无意义的string concat
        "no-void": 2,                             //禁用void
        "no-with": 2,                             //禁用with
        "space-infix-ops": 2,                     //操作符前后空格
        "valid-jsdoc": [2, {"requireParamDescription": true, "requireReturnDescription": true}],//jsdoc
        "no-warning-comments": [2, { "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }],//标记未写注释
        "curly": 1                                //if、else、while、for代码块用{}包围
    }
}

```