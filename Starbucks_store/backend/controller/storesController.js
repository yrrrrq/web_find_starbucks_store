const db = require('../config/db');

const dictionary = {
    'OG': '折纸咖啡',
    'DL': '外送服务',
    'MIC': '星巴克冰淇淋',
    'SBB': '手工调制甄选',
    'PO': '手冲咖啡',
    'NCB': '氮气冷萃',
    'RC': '甄选',
    'BE': '未知'
}

exports.getAllStores = (req, res) => {
    const query = 'SELECT * FROM stores';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
        console.log("result: ", results)
    });
};

exports.findNearestStore = (req, res) => {
    const { longitude, latitude } = req.body;
    const query = 'SELECT * FROM stores';
    db.query(query, (err, results) => {
        if (err) {
            console.error('数据库查询错误: ', err);
            res.status(500).send('查询失败');
            return;
        }

        let nearestStore = null;
        let minDistance = Infinity;

        results.forEach(store => {
            const distance = getDistanceFromLatLonInKm(latitude, longitude, store.latitude, store.longitude);
            if (distance < minDistance) {
                minDistance = distance;
                nearestStore = {
                    storeName: store.storeName,
                    latitude: store.latitude,
                    longitude: store.longitude,
                    distance: distance * 1000,  // 转换为米
                    city: store.city,
                    address: store.address,
                    postalCode: store.postalCode,
                    features: store.features,
                    hasArtwork: store.hasArtwork,
                    storeNumber: store.storeNumber,
                    closeTime: store.closeTime,
                    openTime: store.openTime
                };
            };
        });

        /* 修正获取的信息，包括features的值的转换、商家营业时间的格式转换等，使得前端显示更加得体*/
        // console.log("获得到的特征是！：", nearestStore.features);
        const unfix_features = nearestStore.features;
        const unfix_features_array = JSON.parse(unfix_features);
        // console.log("转换数组成功！", unfix_features_array);
        const fixed_features = unfix_features_array.map(feature => dictionary[feature]).join('、');
        console.log("转换后的特征！：", fixed_features); 

        const opening_time = nearestStore.openTime + " - " + nearestStore.closeTime;

        const fixed_Store = {
            storeName: nearestStore.storeName,
            longitude: nearestStore.longitude,
            latitude: nearestStore.latitude,
            distance: nearestStore.distance,
            city: nearestStore.city,
            address: nearestStore.address,
            postalCode: nearestStore.postalCode,
            translated_features: fixed_features,
            hasArtwork: nearestStore.hasArtwork,
            storeNumber: nearestStore.storeNumber,
            opening_hours: opening_time
        };
        
        console.log("最近的商家：", fixed_Store);
        res.status(200).json(fixed_Store);
        // res.json(nearestStore, minDistance);
    });
};

// 获取商铺详细信息
exports.getStoreDetails = (req, res) => {
    const {storeName} = req.body;
    console.log("商铺名称：", storeName);
    const query = 'SELECT * FROM stores WHERE storeName = ?';
    db.query(query, [storeName], (err, results) => {
        if (err) {
            console.error('数据库查询错误: ', err);
            res.status(500).send('获取商铺详细信息失败');
            return;
        }
        // console.log("获得的结果：", results);
        if (results.length === 0) {
            res.status(404).send('商铺未找到');
            return;
        }
        //console.log("获得的结果：", results[0]);

        const thisStore = results[0];
        /* 修正获取的信息，包括features的值的转换、商家营业时间的格式转换等，使得前端显示更加得体*/
        // console.log("获得到的特征是！：", nearestStore.features);
        const unfix_features = thisStore.features;
        const unfix_features_array = JSON.parse(unfix_features);
        console.log("转换数组成功！", unfix_features_array);
        const fixed_features = unfix_features_array.map(feature => dictionary[feature]).join('、');
        console.log("转换后的特征！：", fixed_features);  // 输出: "折纸、交付、倒过来"

        const opening_time = thisStore.openTime + " - " + thisStore.closeTime;

        const fixed_Store = {
            storeName: thisStore.storeName,
            distance: thisStore.distance,  // 转换为米
            city: thisStore.city,
            address: thisStore.address,
            postalCode: thisStore.postalCode,
            translated_features: fixed_features,
            hasArtwork: thisStore.hasArtwork,
            storeNumber: thisStore.storeNumber,
            opening_hours: opening_time
        };
        console.log("修正后的商铺信息为：", fixed_Store);
        res.status(200).json(fixed_Store);
    });
};


// 计算两点间的距离
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径 (km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 距离 (km)
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}