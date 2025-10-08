(function() {
    const kakaoAddressInput = document.querySelector("#kakao_address_input");

    kakaoAddressInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            console.log(event.target.value);
            event.preventDefault();
            const mapContainer = document.querySelector("#kakao_maps");
            const mapOption = {
                center: new kakao.maps.LatLng(37.5665, 126.9780),
                level: 3,
            };
        
            const map = new kakao.maps.Map(mapContainer, mapOption);
            const ps = new kakao.maps.services.Places(); // 장소 검색 객체
        
            const searchInput = event.target.value; // 검색어
            ps.keywordSearch(searchInput, function (data, status) {
                if (status === kakao.maps.services.Status.OK) {
                const place = data[0];
                const coords = new kakao.maps.LatLng(place.y, place.x);
                const marker = new kakao.maps.Marker({ position: coords });
                marker.setMap(map);
                map.setCenter(coords);
                }
            });
        }
    });    
}());