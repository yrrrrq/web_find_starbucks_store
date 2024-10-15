<?php
header('Content-Type: application/json');

// 数据库配置
$host = 'localhost';
$db = 'starbucksdb';
$user = 'root';
$pass = 'root';

// 创建数据库连接
$mysqli = new mysqli($host, $user, $pass, $db);

// 检查连接
if ($mysqli->connect_error) {
    die('连接失败: ' . $mysqli->connect_error);
}

// 查询店铺数据
$sql = "SELECT * FROM stores";
$result = $mysqli->query($sql);

$shops = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $shops[] = $row;
    }
}

// 输出JSON数据
echo json_encode(['shops' => $shops]);

// 关闭数据库连接
$mysqli->close();
?>
