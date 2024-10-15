var map = new AMap.Map('container', {
    resizeEnable: true,
    zoom: 14
});

function addMarker(position, content) {
    var marker = new AMap.Marker({
        position: position,
        map: map
    });

    var infoWindow = new AMap.InfoWindow({
        content: content,
        offset: new AMap.Pixel(0, -30)
    });

    marker.on('click', function() {
        infoWindow.open(map, marker.getPosition());

        // 显示并设置按钮的 `onclick` 属性以传递 `storeName` 和 `storeId`
        var storeDetailsButton = document.getElementById('store-details-button');
        storeDetailsButton.style.display = 'block';
        storeDetailsButton.onclick = function() {
            window.location.href = `store-details.html?name=${encodeURIComponent(storeName)}&id=${storeId}`;
        };
    });
   // window.location.href = `../html/store-details.html`;
}

function success(position) {
    console.log("hihi! success!");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const userLocation = [longitude, latitude];
    console.log("userlocation: ", {latitude, longitude});
    map.setCenter(userLocation);
    addMarker(userLocation, '您的位置');
    const jsondata = JSON.stringify({
        longitude: longitude,
        latitude: latitude
    });
    console.log("jsondta: ", jsondata);
     // 发送用户位置到服务器
    fetch('http://127.0.0.1:3000/api/nearest-store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsondata
    })
    .then(response => {
        // console.log("得到返回值：", response);
        return response.json()})
    .then(data => {
        console.log("得到店铺信息：", data);
        var storeLocation = [data.longitude, data.latitude];
        addMarker(storeLocation, `最近的店铺: ${data.storeName}<br>距离: ${data.distance} 米<br>地址：${data.address}<br>店铺特色：${data.translated_features}<br>店铺电话：${data.storeNumber}<br>店铺营业时间：${data.opening_hours}`);
    })
    .catch(error => console.error('Error:', error));
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// 获取用户位置
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {success(position)} , error);
    // console.log("获得信息：", navigator.geolocation.getCurrentPosition())
} else {
    alert('浏览器不支持地理定位');
}
