# web_find_starbucks_store
### 一、数据集介绍
关于本次实验我使用的数据集，是从网上搜集的现有的数据集（ https://www.kaggle.com/datasets/saneryee/starbucks-stores-in-china-mainland ）。它包含在中国的星巴克店铺的详细信息，特征如下：
| 列名        | 含义                                                         | 类型     |
| ----------- | ------------------------------------------------------------ | -------- |
| city        | 店铺所在城市                                                 | String   |
| address     | 店铺详细地址                                                 | String   |
| postalCode  | 邮政编码                                                     | 整数型   |
| latitude    | 纬度                                                         | 浮点型   |
| longitude   | 经度                                                         | 浮点型   |
| features    | 特征（包含八个缩写。我在中国大陆的星巴克官方网站上找到了其中6的含义。OG：折纸咖啡； DL：外送服务；MIC：星巴克冰淇淋；SBB：手工调制甄选；PO：手冲咖啡；NCB：氮气冷萃；RC：甄选；BE：未知） | String   |
| hasArtwork  | 是否包含艺术作品                                             | Boolean  |
| storeName   | 商铺名称                                                     | String   |
| storeNumber | 商铺号                                                       | String   |
| closeTime   | 歇业时间                                                     | DataTime |
| openTime    | 开业时间                                                     | DataTime |

### 二、涉及技术
HTML、CSS、JavaScript、Node.js、Express框架、MySQL数据库以及地图API的使用

### 二、功能介绍
本次项目实现了三个页面。分别是**首页**、**星巴克简介**和**店铺查询**。

* #### 首页
  在该页面中，用户可以实现**登录**和**注册**的功能。该页面默认出现的是登录界面，可以通过超链接实现登录与注册页面的切换。在注册时，同一个用户名不可以重复注册，因此当用户点击“注册”按钮时，将输入信息与starbucksbd的users表中的信息进行比对，如果出现用户名重复的情况，则alert错误信息。登录时，如果用户将用户名或者密码输入错误是无法登录的，因此当用户点击“登录按钮”时，将输入信息与starbucksbd的users表中的信息进行比对，如果users表中没有该用户名或者用户密码错误，则alert错误信息。

* #### 星巴克简介
  在该页面中，我使用**表格**结构将星巴克简介信息进行结构化的展现。主体以文字介绍为主，分为总体概述和关于星巴克两个部分。在关于星巴克的部分，内容分为背景、高品质的星巴克咖啡和第一无二的星巴克体验三个部分。此页面中文字内容均来自星巴克官网。（ https://www.starbucks.com.cn ）

* #### 店铺查询
  在该页面中，显示的是高德地图提供的图形界面，当打开该页面时，会申请获取用户所在位置。用户允许时，则将用户的位置信息传给后端，通过遍历数据库中的stores表并依次计算两点之间的欧式距离，找出离用户所在位置最近的店铺，并返回店铺的详细信息在图形界面中，用户可以通过点击显示的图标进行详细信息的获取。


### 三、项目结构

```py
starbucks/
|---- frontend/
|     |---- html/
|     |     |---- index.html						// 首页页面的实现
|     |     |---- about.html						// 星巴克简介页面的实现
|     |     |---- search.html						// 查询店铺页面的实现
|     |
|     |---- js/
|     |     |---- login_register.js			// 用户登录和注册的前端逻辑实现，向后端传递参数
|     |     |---- search.js							// 查询店铺的逻辑实现，向后端传递用户所在位置
|     |
|     |---- css/
|     |     |---- index.css							// 首页页面的样式
|     |     |---- about.css							// 星巴克简介页面的样式
|     |     |---- search.css						// 查询店铺页面的样式
|     |
|     |---- src/
|           |---- 首页.jpg
|           |---- 顶部背景.jpg
|           |---- 表格背景.jpg
|
|---- backend/
|     |---- server.js										// 项目入口文件，用于配置和启动Express服务器
|     |
|     |---- config/
|     |     |---- db.js									// 连接sql数据库
|     |
|     |---- routes/											// 存储路由文件，用于定义api端点（在/api下）
|     |     |---- auth.js								// 定义用户注册（/auth/register）和登录（/auth/login）的api
|     |     |---- stores.js							// 定义查询最近店铺（/nearest-store）的api
|     |
|     |---- controller/                 // 存储控制器文件，用于实现具体业务逻辑
|           |---- authController.js			// 实现与users表的交互，实现登录和注册时的数据存储以及读取
|           |---- storesController.js   // 实现与stores表的交互，获取最近商铺信息
|
|---- database/
      |---- schema.sql									// 包含数据库的创建和表结构定义的SQL脚本
```

