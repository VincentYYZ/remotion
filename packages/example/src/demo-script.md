# 道路场景静态与动态要素识别系统

background: #fafafa

## Scene 1: 系统概览

start: 0
duration: 300

### text

position: 540, 120
animation: typewriter
fontSize: 52
fontWeight: 700
content: 道路场景静态与动态要素识别系统

### node

position: 540, 400
animation: spring-pop
label: 前端界面
width: 240
height: 100
bgColor: #e3f2fd
borderColor: #1565c0

### node

position: 540, 900
animation: spring-pop
label: Python后端
width: 240
height: 100
bgColor: #e8e8e8
borderColor: #333

### node

position: 250, 900
animation: spring-pop
label: YOLOv8
width: 180
height: 80
bgColor: #ffebee
borderColor: #c62828

### node

position: 250, 1200
animation: spring-pop
label: 视频文件
width: 180
height: 80
bgColor: #fff8e1
borderColor: #f9a825

### node

position: 250, 1450
animation: spring-pop
label: OpenCV
width: 180
height: 80
bgColor: #e8f5e9
borderColor: #2e7d32

### node

position: 540, 1500
animation: spring-pop
label: SQLite
width: 160
height: 100
bgColor: #f3e5f5
borderColor: #7b1fa2

## Scene 2: 数据流转

start: 300
duration: 300

### arrow

from: 540, 850
to: 540, 460
animation: draw
color: #1565c0

### arrow

from: 340, 900
to: 430, 900
animation: draw
color: #c62828

### arrow

from: 430, 940
to: 340, 940
animation: draw
color: #c62828

### arrow

from: 250, 1280
to: 250, 950
animation: draw
color: #f9a825

### arrow

from: 250, 1530
to: 250, 1280
animation: draw
color: #2e7d32

### arrow

from: 540, 1450
to: 540, 960
animation: draw
color: #7b1fa2

## Scene 3: 前端说明

start: 600
duration: 300

### text

position: 540, 300
animation: typewriter
fontSize: 28
color: #1565c0
content: 前端大致流程如下：

- 用户登录或注册
- 登录成功后保存 token
- 建立 ws://localhost:8000/ws/stream 连接
- 持续接收后端推送的数据
- 更新画面和图表

### text

position: 820, 300
animation: typewriter
fontSize: 28
color: #1565c0
content: 前端主要使用以下技术：

- Vue 3
- Vite
- Element Plus
- ECharts
- 视频画面
- 统计卡片
- 折线图
- 饼图等可视化组件

## Scene 4: 后端说明

start: 900
duration: 300

### text

position: 820, 900
animation: typewriter
fontSize: 28
color: #333
content: FastAPI：提供 HTTP API 和 WebSocket 服务

- 当前处理后的视频帧
- 当前统计信息
- 动态目标详情
- 静态目标详情
- 道路信息

### text

position: 820, 1200
animation: typewriter
fontSize: 28
color: #333
content: 后端大致流程如下：

- 启动 FastAPI
- 初始化数据库
- 加载 YOLO 模型
- 读取视频流
- 对每一帧做检测、跟踪、分割
- 生成统计数据
- 编码图像并通过 WebSocket 推送给前端

### code

position: 540, 1700
animation: fade-up
content: ws://localhost:8000/ws/stream?token=xxx
fontSize: 24
