

function getStoreDetails(storeName) {
    fetch(`http://127.0.0.1:3000/api/storeDetails`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            storeName: storeName
        })
    })
        .then(response => response.json())
        .then(data => {
            const storeInfoDiv = document.getElementById('store-info');
            storeInfoDiv.innerHTML = `
                <ul>
                    <li>店铺名称: ${data.storeName}/li>
                    <li>店铺特色: ${data.features}</li>
                    <li>所在城市: ${data.city}</li>
                    <li>地址: ${data.address}</li>
                    <li>开业时间: ${data.opening_hours}</li>
                    <li>电话: ${data.storeNumber}</li>
                </ul>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// 获取 URL 参数中的 storeId
const urlParams = new URLSearchParams(window.location.search);
const storeName = urlParams.get('storeName');
console.log("获取到的店铺名称为：", storeName);

if (storeName) {
    getStoreDetails(storeName);
} else {
    console.error('店铺不存在');
}
